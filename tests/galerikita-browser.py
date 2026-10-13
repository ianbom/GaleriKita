"""Run: Get-Content tests/galerikita-browser.py -Raw | browser-harness

Requires Laravel on http://127.0.0.1:8013 and built Vite assets.
"""
import base64
import os
import time
from pathlib import Path

target = new_tab(os.environ.get('GK_URL', 'http://127.0.0.1:8013'))
cdp('Page.addScriptToEvaluateOnNewDocument', source='window.__gkErrors=[];window.addEventListener("error",event=>window.__gkErrors.push(event.message));window.addEventListener("unhandledrejection",event=>window.__gkErrors.push(String(event.reason)));const original=console.error;console.error=(...args)=>{window.__gkErrors.push(args.map(String).join(" "));original.apply(console,args)};')
cdp('Page.reload')
wait_for_load()
time.sleep(2)
assert js('document.querySelector(".gk-page") !== null'), 'Landing page missing'
assert js('document.querySelectorAll(".gk-page header, .gk-page main > section, .gk-page footer").length') == 10

def click_named(name, repeats=1):
    nodes = cdp('Accessibility.getFullAXTree')['nodes']
    node = next(item for item in nodes if item.get('role', {}).get('value') == 'button' and item.get('name', {}).get('value') == name)
    backend = node['backendDOMNodeId']
    cdp('DOM.scrollIntoViewIfNeeded', backendNodeId=backend)
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
for width in [1440, 1280, 1024, 768, 390, 375]:
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
print('GALERIKITA_BROWSER_OK', target)
