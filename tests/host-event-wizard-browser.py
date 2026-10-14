"""Run: Get-Content tests/host-event-wizard-browser.py -Raw | browser-harness

Requires a logged-in browser session on GK_URL (default http://127.0.0.1:8000).
Exercises frontend-only checkout; creates no events or transactions.
"""
import base64
import json
import os
import time
from pathlib import Path

target = new_tab(os.environ.get('GK_URL', 'http://127.0.0.1:8000') + '/?create-event=1')
wait_for_load()
time.sleep(2)
assert js('document.querySelector("[data-event-wizard]") !== null'), 'Login required on GK_URL before running this check'
assert js('document.querySelector("[data-slot=sidebar], body > footer") === null'), 'Wizard must not use dashboard layout'


def click_named(name, role='button'):
    nodes = cdp('Accessibility.getFullAXTree')['nodes']
    node = next(item for item in nodes if item.get('role', {}).get('value') == role and item.get('name', {}).get('value', '').startswith(name))
    backend = node['backendDOMNodeId']
    remote = cdp('DOM.resolveNode', backendNodeId=backend)['object']['objectId']
    if role == 'radio':
        label = cdp('Runtime.callFunctionOn', objectId=remote, functionDeclaration='function(){return this.closest("label")}')['result']['objectId']
        backend = cdp('DOM.describeNode', objectId=label)['node']['backendNodeId']
        cdp('Runtime.releaseObject', objectId=remote)
        remote = label
    cdp('Runtime.callFunctionOn', objectId=remote, functionDeclaration='function(){this.scrollIntoView({behavior:"instant",block:"center"})}')
    cdp('Runtime.releaseObject', objectId=remote)
    time.sleep(.1)
    box = cdp('DOM.getBoxModel', backendNodeId=backend)['model']['content']
    click_at_xy(sum(box[0::2]) / 4, sum(box[1::2]) / 4)
    time.sleep(.15)


def set_value(selector, value):
    js('''(() => {
        const input = document.querySelector(%s);
        const prototype = input.tagName === 'SELECT' ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
        Object.getOwnPropertyDescriptor(prototype, 'value').set.call(input, %s);
        input.dispatchEvent(new Event(input.tagName === 'SELECT' ? 'change' : 'input', {bubbles: true}));
    })()''' % (json.dumps(selector), json.dumps(value)))
    time.sleep(.15)


def assert_step(number):
    assert js('document.querySelector("progress").value') == number

def click_selector(selector):
    js('document.querySelector(%s).scrollIntoView({block:"center",behavior:"instant"})' % json.dumps(selector))
    time.sleep(.1)
    box = js('(() => { const r=document.querySelector(%s).getBoundingClientRect(); return [r.x+r.width/2,r.y+r.height/2]; })()' % json.dumps(selector))
    click_at_xy(*box)
    time.sleep(.15)


output = Path('storage/app/galerikita-qa/wizard')
output.mkdir(parents=True, exist_ok=True)
for width in [320, 375, 390, 430, 1440]:
    cdp('Emulation.setDeviceMetricsOverride', width=width, height=844, deviceScaleFactor=1, mobile=False)
    time.sleep(.3)
    assert js('document.documentElement.scrollWidth <= window.innerWidth'), f'Overflow at {width}'
    (output / f'categories-{width}.png').write_bytes(base64.b64decode(cdp('Page.captureScreenshot', captureBeyondViewport=True)['data']))

cdp('Emulation.setDeviceMetricsOverride', width=390, height=844, deviceScaleFactor=1, mobile=False)
click_named('Lanjutkan')
assert_step(1)
assert js('document.activeElement.id') == 'event-category'
click_named('Pernikahan', 'radio')
click_named('Lanjutkan')
assert_step(2)
click_named('Lanjutkan')
assert js('document.activeElement.id') == 'event-name'
set_value('#event-name', 'Acara QA')
root = cdp('DOM.getDocument')['root']['nodeId']
file_input = cdp('DOM.querySelector', nodeId=root, selector='#event-cover')['nodeId']
cdp('DOM.setFileInputFiles', nodeId=file_input, files=[str(Path('public/images/galerikita/placeholders/photo-placeholder.svg').resolve())])
time.sleep(.3)
click_named('Lanjutkan')
assert_step(3)
selected_day = js('(() => {const date=new Date();date.setDate(date.getDate()+2);return date.toLocaleDateString();})()')
day_selector = 'button[data-day=' + json.dumps(selected_day) + ']'
if not js('document.querySelector(%s) !== null' % json.dumps(day_selector)):
    click_selector('.rdp-button_next')
click_selector(day_selector)
set_value('#event-hour', '15')
set_value('#event-minute', '00')
for width in [320, 375, 390, 430, 1440]:
    cdp('Emulation.setDeviceMetricsOverride', width=width, height=844, deviceScaleFactor=1, mobile=False)
    assert js('document.documentElement.scrollWidth <= window.innerWidth'), f'Calendar overflow at {width}'
cdp('Emulation.setDeviceMetricsOverride', width=390, height=844, deviceScaleFactor=1, mobile=False)
assert '24 jam' in js('document.querySelector("[data-event-wizard]").textContent')
click_selector('[data-event-wizard] footer button[type=button]')
assert js('document.querySelector("#event-name").value') == 'Acara QA'
assert js('document.querySelector("img[alt*=Pratinjau]").complete')
click_named('Lanjutkan')
assert js('document.querySelector(%s).dataset.selectedSingle' % json.dumps(day_selector)) == 'true'
assert js('document.querySelector("#event-hour").value') == '15'
assert js('document.querySelector("#event-minute").value') == '00'
click_named('Lanjutkan')
assert js('document.querySelector("#event-visibility").getAttribute("aria-checked")') == 'false'
click_named('Album Public', 'switch')
cdp('Input.dispatchKeyEvent', type='keyDown', key=' ', code='Space', windowsVirtualKeyCode=32)
cdp('Input.dispatchKeyEvent', type='keyUp', key=' ', code='Space', windowsVirtualKeyCode=32)
assert js('document.querySelector("#event-visibility").getAttribute("aria-checked")') == 'false'
click_named('Album Public', 'switch')
time.sleep(.15)
assert js('document.querySelector("#event-visibility").getAttribute("aria-checked")') == 'true'
click_named('Lanjutkan')
click_named('After Event', 'radio')
click_named('Lanjutkan')
click_named('100 fotografer', 'radio')
click_named('Lanjutkan')
assert_step(7)
assert 'Acara QA' in js('document.querySelector("section[aria-label=\"Ringkasan event\"]").textContent')
assert '10.000 foto' in js('document.querySelector("[data-event-wizard]").textContent')

for result in ['failed', 'pending', 'expired', 'success']:
    set_value('#payment-result', result)
    js('document.querySelector("[data-event-wizard] form").requestSubmit(); document.querySelector("[data-event-wizard] form").requestSubmit()')
    assert js('document.querySelector("[data-event-wizard] form").getAttribute("aria-busy")') == 'true'
    assert js('document.querySelector("button[type=submit]").disabled')
    time.sleep(.8)
    assert_step(8 if result == 'success' else 7)
    if result in ['failed', 'expired']:
        assert js('document.querySelector("[role=alert]") !== null')

assert 'Event belum diaktifkan' in js('document.querySelector("[data-event-wizard]").textContent')
assert 'Belum ada link yang bisa dibagikan' in js('document.querySelector("[data-event-wizard]").textContent')
for width in [320, 375, 390, 430, 1440]:
    cdp('Emulation.setDeviceMetricsOverride', width=width, height=844, deviceScaleFactor=1, mobile=False)
    time.sleep(.3)
    assert js('document.documentElement.scrollWidth <= window.innerWidth'), f'Detail overflow at {width}'
    (output / f'detail-{width}.png').write_bytes(base64.b64decode(cdp('Page.captureScreenshot', captureBeyondViewport=True)['data']))
print('Host wizard browser checks passed.')
