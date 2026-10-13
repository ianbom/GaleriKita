"""Run through browser-harness; GK_VISUAL_MODE=capture records the baseline.

Default mode compares against that baseline. GK_URL defaults to port 8013.
Requires Pillow in the browser-harness environment and production Vite assets.
"""
import base64
import json
import os
import time
from pathlib import Path
from PIL import Image, ImageChops

mode = os.environ.get('GK_VISUAL_MODE', 'compare')
root = Path('storage/app/galerikita-tailwind-qa')
baseline = root / 'before'
output = root / ('before' if mode == 'capture' else 'after')
output.mkdir(parents=True, exist_ok=True)
url = os.environ.get('GK_URL', 'http://127.0.0.1:8013')
if mode != 'capture':
    assert not Path('resources/css/galerikita.css').exists(), 'Separate stylesheet still exists'
    assert 'galerikita.css' not in Path('resources/js/pages/welcome.tsx').read_text()
target = new_tab(url)
wait_for_load()
for attempt in range(100):
    if js('document.querySelector(".gk-page") !== null'):
        break
    time.sleep(.1)
assert js('document.querySelector(".gk-page") !== null'), 'Landing page missing'

properties = ['display', 'position', 'color', 'background', 'font-family', 'font-size', 'font-weight', 'font-style', 'line-height', 'letter-spacing', 'white-space', 'width', 'height', 'min-width', 'min-height', 'max-width', 'max-height', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'padding', 'border', 'border-radius', 'box-shadow', 'outline', 'outline-offset', 'opacity', 'transform', 'transform-origin', 'overflow', 'object-fit', 'gap', 'grid-template-columns', 'grid-template-rows', 'grid-column', 'grid-row', 'flex', 'flex-direction', 'flex-wrap', 'align-items', 'justify-content', 'aspect-ratio', 'zoom', 'transition', 'animation', 'content']

def capture(name):
    js('document.querySelectorAll("img").forEach(image=>image.loading="eager")')
    js('(async()=>{await document.fonts.ready;await Promise.all(Array.from(document.images).map(image=>image.decode().catch(()=>{})));return true})()')
    js('(async()=>{await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));document.querySelectorAll(".gk-container").forEach(node=>node.getBoundingClientRect());return true})()')
    time.sleep(.6)
    snapshot = js('''(() => {
        const properties = PROPERTIES;
        const nodes = Array.from(document.querySelectorAll('.gk-page, .gk-page *, body:not(:has(.gk-page)) *')).filter(node => node instanceof HTMLElement || node.tagName.toLowerCase() === 'svg');
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
        assert snapshot == original, f'Computed style/geometry changed: {name}; inspect before/after JSON'
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
        if js('document.querySelector(".gk-page") !== null'):
            break
        time.sleep(.1)
    assert js('document.querySelector(".gk-page") !== null'), 'Landing page missing'
    js('window.scrollTo({top:0,behavior:"instant"})')
    capture(f'landing-{width}')

for route in ['login','register']:
    for theme in ['light','dark']:
        goto_url(f'{url}/{route}')
        wait_for_load()
        for attempt in range(100):
            if js('document.querySelector("form") !== null'):
                break
            time.sleep(.1)
        assert js('document.querySelector("form") !== null'), 'Auth form missing'
        cdp('Emulation.setDeviceMetricsOverride', width=1440, height=1000, deviceScaleFactor=1, mobile=False)
        js(f'document.documentElement.classList.toggle("dark",{str(theme == "dark").lower()});document.documentElement.style.colorScheme={json.dumps(theme)}')
        js('document.activeElement.blur()')
        capture(f'{route}-{theme}')
goto_url(url)
wait_for_load()
print('GALERIKITA_VISUAL_OK', mode, target)
