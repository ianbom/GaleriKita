"""Run through browser-harness; GK_VISUAL_MODE=capture records the baseline.

Default mode compares against that baseline. GK_VISUAL_MODE=spacing permits
only the planned 48/80px section spacing. GK_URL defaults to port 8013.
Requires Pillow in the browser-harness environment and production Vite assets.
"""
import base64
import json
import os
import time
from pathlib import Path
from PIL import Image, ImageChops

mode = os.environ.get('GK_VISUAL_MODE', 'compare')
root = Path(os.environ.get('GK_VISUAL_ROOT', 'storage/app/galerikita-readable-qa'))
baseline = root / 'before'
output = root / ('before' if mode == 'capture' else 'after')
output.mkdir(parents=True, exist_ok=True)
url = os.environ.get('GK_URL', 'http://127.0.0.1:8013')
if mode != 'capture':
    assert not Path('resources/css/galerikita.css').exists(), 'Separate stylesheet still exists'
    assert 'galerikita.css' not in Path('resources/js/pages/welcome.tsx').read_text()
target = new_tab(url)
raw_cdp = cdp
session = raw_cdp('Target.attachToTarget', targetId=target, flatten=True)['sessionId']

def cdp(method, **params):
    return raw_cdp(method, session_id=session, **params)

def js(expression):
    result = cdp('Runtime.evaluate', expression=expression, returnByValue=True, awaitPromise=True)
    assert 'exceptionDetails' not in result, result.get('exceptionDetails')
    return result['result'].get('value')

def wait_for_load():
    for attempt in range(100):
        if js('document.readyState') == 'complete':
            return
        time.sleep(.1)
    raise AssertionError('Page did not load')

cdp('Page.bringToFront')
wait_for_load()
for attempt in range(100):
    if js('document.querySelector("#main-content") !== null'):
        break
    time.sleep(.1)
assert js('document.querySelector("#main-content") !== null'), 'Landing page missing'
assert js('Array.from(document.querySelectorAll("link[rel=stylesheet]")).every(link=>new URL(link.href).pathname.startsWith("/build/"))'), 'Production assets required'

properties = ['display', 'position', 'color', 'background', 'font-family', 'font-size', 'font-weight', 'font-style', 'line-height', 'letter-spacing', 'white-space', 'width', 'height', 'min-width', 'min-height', 'max-width', 'max-height', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'padding', 'border', 'border-radius', 'box-shadow', 'outline', 'outline-offset', 'opacity', 'transform', 'transform-origin', 'overflow', 'object-fit', 'gap', 'grid-template-columns', 'grid-template-rows', 'grid-column', 'grid-row', 'flex', 'flex-direction', 'flex-wrap', 'align-items', 'justify-content', 'aspect-ratio', 'zoom', 'transition', 'animation', 'content']

def compare_spacing(original, snapshot, spacing):
    assert len(original['nodes']) == len(snapshot['nodes']), 'Node count changed'
    assert sum(node['tag'] == 'SECTION' for node in original['nodes']) == 8
    extra_height = 7 * spacing
    assert snapshot['height'] == original['height'] + extra_height, 'Unexpected page height'
    section = -1
    for index, (before, after) in enumerate(zip(original['nodes'], snapshot['nodes'])):
        assert (before['tag'], before['text']) == (after['tag'], after['text']), f'Content changed: {index}'
        if before['tag'] == 'SECTION':
            section += 1
        expected = before['rect'].copy()
        if index == 0 or before['tag'] == 'MAIN':
            expected[3] += extra_height
        elif expected != [0, 0, 0, 0]:
            expected[1] += max(section, 0) * spacing
        assert all(abs(actual - planned) < .001 for actual, planned in zip(after['rect'], expected)), f'Internal geometry changed: {index}'
        if 'style' in before:
            for property in ['color','background','font-family','font-size','font-weight','font-style','line-height','letter-spacing','padding','border','border-radius','box-shadow','opacity','object-fit','gap','grid-template-columns','grid-template-rows']:
                assert after['style'][property] == before['style'][property], f'Style changed: {index} {property}'
            assert after['pseudo'] == before['pseudo'], f'Pseudo-element changed: {index}'

def capture(name):
    js('document.querySelectorAll("img").forEach(image=>image.loading="eager")')
    js('(async()=>{await document.fonts.ready;await Promise.all(Array.from(document.images).map(image=>image.decode().catch(()=>{})));return true})()')
    js('document.querySelector("#main-content").parentElement.getBoundingClientRect()')
    time.sleep(.6)
    snapshot = js('''(() => {
        const properties = PROPERTIES;
        const root = document.querySelector('#main-content').parentElement;
        const nodes = [root,...root.querySelectorAll('*')].filter(node => node instanceof HTMLElement || node.tagName.toLowerCase() === 'svg');
        const values = nodes.map(node => {
            const style = getComputedStyle(node), rect = node.getBoundingClientRect();
            const entry = {tag:node.tagName, text:node.children.length || node.tagName === 'SCRIPT' ? '' : node.textContent.trim().slice(0,60), rect:[rect.x,rect.y,rect.width,rect.height], style:Object.fromEntries(properties.map(property=>[property,property.startsWith('margin-') ? node.computedStyleMap().get(property).toString() : style.getPropertyValue(property)]))};
            entry.pseudo = Object.fromEntries(['::before','::after'].map(pseudo => {const style=getComputedStyle(node,pseudo);return [pseudo,style.content !== 'none' ? Object.fromEntries(properties.map(property=>[property,style.getPropertyValue(property)])) : null]}));
            return entry;
        });
        return {width:innerWidth,height:document.documentElement.scrollHeight,nodes:values};
    })()'''.replace('PROPERTIES', json.dumps(properties)))
    (output / f'{name}.json').write_text(json.dumps(snapshot), encoding='utf8')
    image = cdp('Page.captureScreenshot', format='png', captureBeyondViewport=True, clip={'x':0,'y':0,'width':snapshot['width'],'height':snapshot['height'],'scale':1})['data']
    (output / f'{name}.png').write_bytes(base64.b64decode(image))
    if mode != 'capture':
        original = json.loads((baseline / f'{name}.json').read_text())
        if mode == 'spacing':
            compare_spacing(original, snapshot, js('matchMedia("(min-width:48rem)").matches ? 80 : 48'))
            print(mode, name, snapshot['height'])
            return
        geometry = lambda data: [(node['tag'], node['text'], node['rect']) for node in data['nodes']]
        assert snapshot['height'] == original['height'] and geometry(snapshot) == geometry(original), f'Geometry changed: {name}; inspect before/after JSON'
        before = Image.open(baseline / f'{name}.png').convert('RGB')
        after = Image.open(output / f'{name}.png').convert('RGB')
        assert before.size == after.size, f'Screenshot size changed: {name}'
        difference = ImageChops.difference(before, after)
        if difference.getbbox():
            difference.save(output / f'{name}-diff.png')
        assert difference.getbbox() is None, f'Pixel difference: {name}'
    print(mode, name, snapshot['height'])

for width in [1440,1280,1024,768,390,375,550,769,1100,1101,1300,1301]:
    cdp('Emulation.setDeviceMetricsOverride', width=width, height=1000, deviceScaleFactor=1, mobile=False)
    cdp('Page.reload')
    wait_for_load()
    for attempt in range(100):
        if js('document.querySelector("#main-content") !== null'):
            break
        time.sleep(.1)
    assert js('document.querySelector("#main-content") !== null'), 'Landing page missing'
    js('window.scrollTo({top:0,behavior:"instant"})')
    capture(f'landing-{width}')

cdp('Emulation.setDeviceMetricsOverride', width=1440, height=1000, deviceScaleFactor=1, mobile=False)
js('(()=>{const frame=document.createElement("iframe");frame.id="breakpoint-check";frame.style="position:fixed;left:-10000px;top:0;height:1000px;border:0";frame.src='+json.dumps(url)+';document.body.append(frame)})()')
for attempt in range(200):
    if js('document.querySelector("#breakpoint-check").contentDocument?.querySelector("#main-content") != null'):
        break
    time.sleep(.1)
assert js('document.querySelector("#breakpoint-check").contentDocument?.querySelector("#main-content") != null'), 'Breakpoint frame missing'
for width in [549.5,550,550.5,767.5,768,768.5,768.99,769,769.5,1099.5,1100,1100.5,1100.99,1101,1299.5,1300,1300.5,1300.99,1301]:
    js('document.querySelector("#breakpoint-check").style.width='+json.dumps(str(width)+'px'))
    js('(async()=>{const doc=document.querySelector("#breakpoint-check").contentDocument;doc.querySelectorAll("img").forEach(image=>image.loading="eager");await doc.fonts.ready;await Promise.all(Array.from(doc.images).map(image=>image.decode().catch(()=>{})));return true})()')
    time.sleep(.2)
    snapshot = js('''(() => {
        const frame=document.querySelector('#breakpoint-check'), view=frame.contentWindow, doc=view.document;
        const root=doc.querySelector('#main-content').parentElement;
        const nodes=[root,...root.querySelectorAll('*')].filter(node=>node.namespaceURI==='http://www.w3.org/1999/xhtml' || node.tagName.toLowerCase()==='svg');
        return {width:frame.getBoundingClientRect().width,height:doc.documentElement.scrollHeight,matches:['(width<550px)','(width<=768px)','(width>=769px)','(width<=1100px)','(width>1100px)','(width<=1300px)'].map(query=>view.matchMedia(query).matches),nodes:nodes.map(node=>{const rect=node.getBoundingClientRect();return {tag:node.tagName,text:node.children.length ? '' : node.textContent.trim().slice(0,60),rect:[rect.x,rect.y,rect.width,rect.height]}})};
    })()''')
    name=f'fractional-{width}'
    (output / f'{name}.json').write_text(json.dumps(snapshot),encoding='utf8')
    if mode != 'capture':
        original=json.loads((baseline / f'{name}.json').read_text())
        if mode == 'spacing':
            assert (snapshot['width'], snapshot['matches']) == (original['width'], original['matches'])
            compare_spacing(original, snapshot, js('document.querySelector("#breakpoint-check").contentWindow.matchMedia("(min-width:48rem)").matches ? 80 : 48'))
        else:
            assert snapshot == original, f'Fractional breakpoint changed: {name}'
    print(mode,name,snapshot['height'])
js('document.querySelector("#breakpoint-check").remove()')

cdp('Page.navigate', url=url)
wait_for_load()
print('GALERIKITA_VISUAL_OK', mode, target)
