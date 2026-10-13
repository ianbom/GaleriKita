"""Run: Get-Content tests/galerikita-browser.py -Raw | browser-harness

Requires Laravel on http://127.0.0.1:8013 and built Vite assets.
"""
import base64
import os
import time
from pathlib import Path

url = os.environ.get('GK_URL', 'http://127.0.0.1:8013')
target = new_tab(url)
cdp('Page.bringToFront')
cdp('Page.addScriptToEvaluateOnNewDocument', source='window.__gkErrors=[];window.addEventListener("error",event=>window.__gkErrors.push(event.message));window.addEventListener("unhandledrejection",event=>window.__gkErrors.push(String(event.reason)));const original=console.error;console.error=(...args)=>{window.__gkErrors.push(args.map(String).join(" "));original.apply(console,args)};')
cdp('Page.reload')
wait_for_load()
time.sleep(2)
assert js('document.querySelector(".gk-page") !== null'), 'Landing page missing'
assert js('Array.from(document.querySelectorAll("link[rel=stylesheet]")).every(link=>new URL(link.href).pathname.startsWith("/build/"))'), 'Production assets required'
assert js('document.querySelectorAll(".gk-page header, .gk-page main > section, .gk-page footer").length') == 10

def click_named(name, repeats=1):
    nodes = cdp('Accessibility.getFullAXTree')['nodes']
    node = next(item for item in nodes if item.get('role', {}).get('value') == 'button' and item.get('name', {}).get('value') == name)
    backend = node['backendDOMNodeId']
    remote = cdp('DOM.resolveNode', backendNodeId=backend)['object']['objectId']
    cdp('Runtime.callFunctionOn', objectId=remote, functionDeclaration='function(){this.scrollIntoView({behavior:"instant",block:"center"})}')
    cdp('Runtime.releaseObject', objectId=remote)
    time.sleep(.1)
    box = cdp('DOM.getBoxModel', backendNodeId=backend)['model']['content']
    for attempt in range(repeats):
        click_at_xy(sum(box[0::2]) / 4, sum(box[1::2]) / 4)
        time.sleep(.03)
    time.sleep(.15)

assert js('document.querySelector("[data-capacity]").textContent.trim()') == '5,000 foto'
click_named('Tambah jumlah fotografer')
assert js('document.querySelector("[data-capacity]").textContent.trim()') == '5,100 foto'
click_named('Kurangi jumlah fotografer')
click_named('Tambah foto per fotografer')
assert js('document.querySelector("[data-capacity]").textContent.trim()') == '5,050 foto'
click_named('Kurangi foto per fotografer')
click_named('Kurangi jumlah fotografer', 49)
click_named('Kurangi foto per fotografer', 99)
assert js('document.querySelector("[data-capacity]").textContent.trim()') == '1 foto'
assert js('Array.from(document.querySelectorAll(".gk-quantity button:first-child")).every(button=>button.disabled)')
cdp('Page.reload')
wait_for_load()
time.sleep(1)
click_named('Apakah peserta harus membuat akun?')
assert js('document.querySelector("#faq button").getAttribute("aria-expanded")') == 'true'
click_named('Berapa lama event berlangsung?')
assert js('document.querySelectorAll("#faq button[aria-expanded=true]").length') == 1
click_named('Berapa lama event berlangsung?')
assert js('Array.from(document.querySelectorAll("[data-create-event]")).every(link => new URL(link.href).pathname === "/register")')
assert js('Array.from(document.querySelectorAll("img[data-photo]")).every(image => image.complete && image.naturalWidth > 0)')
assert js('document.fonts.check("16px \'Plus Jakarta Sans\'") && document.fonts.check("16px \'Instrument Serif\'")')
output = Path('storage/app/galerikita-qa')
output.mkdir(parents=True, exist_ok=True)
for width in [1440, 1280, 1024, 768, 390, 375, 549, 550, 551, 767, 769, 770, 1099, 1100, 1101, 1299, 1300, 1301]:
    cdp('Emulation.setDeviceMetricsOverride', width=width, height=1000, deviceScaleFactor=1, mobile=False)
    js('window.scrollTo(0,0)')
    time.sleep(.4)
    assert js('document.documentElement.scrollWidth <= window.innerWidth'), f'Overflow at {width}'
    if width == 390:
        click_named('Buka navigasi')
        assert js('document.querySelector("#mobile-navigation") !== null')
        cdp('Input.dispatchKeyEvent', type='keyDown', key='Escape', code='Escape', windowsVirtualKeyCode=27)
        time.sleep(.15)
        assert js('document.querySelector("#mobile-navigation") === null')
    if width in [1440, 390, 375]:
        height = js('document.documentElement.scrollHeight')
        image = cdp('Page.captureScreenshot', format='png', captureBeyondViewport=True, clip={'x': 0, 'y': 0, 'width': width, 'height': height, 'scale': 1})['data']
        (output / f'landing-{width}.png').write_bytes(base64.b64decode(image))
    print(width, js('document.documentElement.scrollHeight'))
assert js('window.__gkErrors') == [], js('window.__gkErrors')
cdp('Emulation.setDeviceMetricsOverride', width=1440, height=1000, deviceScaleFactor=1, mobile=False)
cdp('CSS.enable')
document_node = cdp('DOM.getDocument')['root']['nodeId']
button_node = cdp('DOM.querySelector', nodeId=document_node, selector='.gk-hero .gk-button')['nodeId']
cdp('CSS.forcePseudoState', nodeId=button_node, forcedPseudoClasses=['hover','focus','focus-visible'])
time.sleep(.3)
assert js('getComputedStyle(document.querySelector(".gk-hero .gk-button")).backgroundColor') == 'rgb(203, 232, 90)'
assert js('getComputedStyle(document.querySelector(".gk-hero .gk-button")).outlineColor') == 'rgb(221, 247, 106)'
assert js('getComputedStyle(document.querySelector(".gk-hero .gk-button")).outlineStyle') == 'solid'
cdp('CSS.forcePseudoState', nodeId=button_node, forcedPseudoClasses=[])
cdp('Emulation.setEmulatedMedia', features=[{'name':'prefers-reduced-motion','value':'reduce'}])
assert js('getComputedStyle(document.querySelector(".gk-hero .gk-button")).transitionProperty') == 'none'
assert js('getComputedStyle(document.documentElement).scrollBehavior') == 'auto'
cdp('Emulation.setEmulatedMedia', features=[])
saved = js('({appearance:localStorage.getItem("appearance"),cookie:document.cookie.split("; ").find(value=>value.startsWith("appearance=")) ?? null})')
try:
    for preference in ['light', 'dark', 'system']:
        js('localStorage.setItem("appearance",'+repr(preference)+');document.cookie="appearance='+preference+'; path=/"')
        cdp('Emulation.setEmulatedMedia', features=[{'name':'prefers-color-scheme','value':'light' if preference == 'light' else 'dark'}])
        for route in ['login', 'register']:
            goto_url(url+'/'+route)
            wait_for_load()
            time.sleep(.5)
            assert js('document.querySelector("form") !== null'), route
            assert not js('document.documentElement.classList.contains("dark")'), preference
            assert js('getComputedStyle(document.body).backgroundColor') == 'rgb(9, 9, 11)', (route,preference)
            assert js('getComputedStyle(document.body).color') == 'rgb(245, 244, 239)', (route,preference)
            assert js('getComputedStyle(document.body).getPropertyValue("--primary").trim()') == '#ddf76a'
            assert js('document.documentElement.scrollWidth <= innerWidth'), route
            assert js('window.__gkErrors') == [], js('window.__gkErrors')
        print('single-theme', preference)
finally:
    js('localStorage.'+('removeItem("appearance")' if saved['appearance'] is None else 'setItem("appearance",'+repr(saved['appearance'])+')'))
    js('document.cookie='+repr(saved['cookie']+'; path=/' if saved['cookie'] else 'appearance=; path=/; max-age=0'))
    cdp('Emulation.setEmulatedMedia', features=[])
    cdp('Emulation.clearDeviceMetricsOverride')
print('GALERIKITA_BROWSER_OK', target)
