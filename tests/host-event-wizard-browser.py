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
    titles = [
        'Acara apa yang kamu rencanakan?',
        'Beri nama untuk momenmu.',
        'Kapan acaranya dimulai?',
        'Siapa yang bisa melihat foto?',
        'Kapan foto dibagikan?',
        'Siapkan ruang untuk semua momen.',
        'Periksa sekali lagi.',
        'Semua detail di satu tempat.',
    ]
    assert js('document.querySelector("#event-wizard-title").textContent') == titles[number - 1]

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
assert_step(6)
assert js('document.querySelector("#event-plan").getAttribute("aria-valuetext")') == 'Belum memilih plan'
click_named('Lanjutkan')
assert_step(6)
assert js('document.activeElement.id') == 'event-plan'
assert 'Pilih plan event.' in js('document.querySelector("#event-plan-error").textContent')

def range_key(key, code):
    js('document.querySelector("#event-plan").focus()')
    cdp('Input.dispatchKeyEvent', type='keyDown', key=key, code=key, windowsVirtualKeyCode=code)
    cdp('Input.dispatchKeyEvent', type='keyUp', key=key, code=key, windowsVirtualKeyCode=code)
    time.sleep(.15)

range_key('Home', 36)
assert js('document.querySelector("#event-plan").getAttribute("aria-valuetext")').startswith('Mini,')
assert js('document.querySelector("#event-plan-error") === null')
plans = [
    ('Mini', 10, 200, '29.000'),
    ('Intimate', 25, 500, '49.000'),
    ('Celebration', 50, 1000, '79.000'),
    ('Grand', 100, 2000, '129.000'),
    ('Festival', 200, 4000, '219.000'),
    ('Big Event', 400, 8000, '349.000'),
]
for index, (name, photographers, total, price) in enumerate(plans):
    click_named(f'Plan {name}, {photographers} fotografer')
    assert js('document.querySelector("#event-plan").value') == str(index)
    assert js('document.querySelector("#event-plan").getAttribute("aria-valuetext")').startswith(name + ',')
    content = js('document.querySelector("[data-event-wizard]").textContent')
    assert price in content
    assert f'{total:,}'.replace(',', '.') + ' foto' in content
    assert '20 foto per fotografer' in content

range_key('Home', 36)
for name, _, _, _ in plans[1:]:
    range_key('ArrowRight', 39)
    assert js('document.querySelector("#event-plan").getAttribute("aria-valuetext")').startswith(name + ',')
range_key('End', 35)
assert js('document.querySelector("#event-plan").value') == '5'
click_named('Plan Grand, 100 fotografer')
for width in [320, 375, 390, 430, 1440]:
    cdp('Emulation.setDeviceMetricsOverride', width=width, height=844, deviceScaleFactor=1, mobile=False)
    time.sleep(.2)
    assert js('document.documentElement.scrollWidth <= window.innerWidth'), f'Plan overflow at {width}'
    (output / f'plan-{width}.png').write_bytes(base64.b64decode(cdp('Page.captureScreenshot', captureBeyondViewport=True)['data']))
cdp('Emulation.setDeviceMetricsOverride', width=390, height=844, deviceScaleFactor=1, mobile=False)
click_selector('[data-event-wizard] footer button[type=button]')
assert_step(5)
click_named('Lanjutkan')
assert js('document.querySelector("#event-plan").getAttribute("aria-valuetext")').startswith('Grand,')
click_named('Lanjutkan')
assert_step(7)
assert 'Acara QA' in js("document.querySelector('section[aria-label=\"Ringkasan event\"]').textContent")
assert 'Grand' in js("document.querySelector('section[aria-label=\"Ringkasan event\"]').textContent")
assert '2.000 foto' in js('document.querySelector("[data-event-wizard]").textContent')
assert '129.000' in js('document.querySelector("[data-event-wizard]").textContent')

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
