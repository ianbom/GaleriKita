import base64
import os
import time
from pathlib import Path

base = os.environ.get('ADMIN_QA_URL', 'http://127.0.0.1:8025').rstrip('/')
target = os.environ.get('ADMIN_QA_TARGET')
if target:
    switch_tab(target)
else:
    new_tab(base + '/dashboard')

cdp('Page.addScriptToEvaluateOnNewDocument', source='window.__adminErrors=[];window.addEventListener("error",event=>window.__adminErrors.push(event.message));window.addEventListener("unhandledrejection",event=>window.__adminErrors.push(String(event.reason)));')
output = Path('storage/app/admin-qa')
output.mkdir(parents=True, exist_ok=True)


def click(name, role='button', index=0):
    nodes = [node for node in cdp('Accessibility.getFullAXTree')['nodes']
             if node.get('role', {}).get('value') == role
             and node.get('name', {}).get('value') == name]
    assert nodes, (role, name)
    node = nodes[index]
    cdp('DOM.scrollIntoViewIfNeeded', backendNodeId=node['backendDOMNodeId'])
    box = cdp('DOM.getBoxModel', backendNodeId=node['backendDOMNodeId'])['model']['content']
    click_at_xy(sum(box[0::2]) / 4, sum(box[1::2]) / 4)
    time.sleep(.15)


def fill(name, value):
    node = next(node for node in cdp('Accessibility.getFullAXTree')['nodes']
                if node.get('role', {}).get('value') in ['textbox', 'combobox']
                and node.get('name', {}).get('value') == name)
    cdp('DOM.focus', backendNodeId=node['backendDOMNodeId'])
    cdp('Input.dispatchKeyEvent', type='keyDown', key='a', code='KeyA', modifiers=2, windowsVirtualKeyCode=65)
    cdp('Input.dispatchKeyEvent', type='keyUp', key='a', code='KeyA', modifiers=2, windowsVirtualKeyCode=65)
    cdp('Input.dispatchKeyEvent', type='keyDown', key='Backspace', code='Backspace', windowsVirtualKeyCode=8)
    cdp('Input.dispatchKeyEvent', type='keyUp', key='Backspace', code='Backspace', windowsVirtualKeyCode=8)
    cdp('Input.insertText', text=value)


def open_page(path):
    goto_url(base + '/' + path)
    wait_for_load()
    deadline = time.monotonic() + 15
    while js('location.pathname') != '/' + path and time.monotonic() < deadline:
        time.sleep(.15)
    time.sleep(.35)
    assert js('location.pathname') == '/' + path, (path, js('location.pathname'), 'A verified isolated QA account must be signed in.')
    assert js('location.origin') == base
    assert not js('document.documentElement.scrollWidth > innerWidth'), path
    assert js('window.__adminErrors') == [], (path, js('window.__adminErrors'))


paths = ['dashboard', 'admin/tasks', 'admin/users', 'admin/apps', 'admin/chats', 'admin/help-center']
paths += ['admin/settings/' + name for name in ['profile', 'account', 'appearance', 'notifications', 'display']]
paths += ['admin/demo/auth/' + name for name in ['sign-in', 'sign-in-2', 'sign-up', 'forgot-password', 'otp']]
paths += ['admin/demo/errors/' + str(code) for code in [401, 403, 404, 500, 503]]

for width in [1440, 390]:
    cdp('Emulation.setDeviceMetricsOverride', width=width, height=1000, deviceScaleFactor=1, mobile=False)
    for path in paths:
        open_page(path)
        assert js('document.body.innerText.length') > 50
        if path in ['dashboard', 'admin/tasks', 'admin/chats', 'admin/demo/auth/sign-in-2']:
            image = cdp('Page.captureScreenshot', format='png')['data']
            (output / (path.replace('/', '-') + '-' + str(width) + '.png')).write_bytes(base64.b64decode(image))
    print('Rendered', len(paths), 'pages at', width)

cdp('Emulation.setDeviceMetricsOverride', width=1440, height=1000, deviceScaleFactor=1, mobile=False)
open_page('dashboard')
click('Analytics', 'tab')
assert js('document.body.innerText.includes("Traffic Overview")')
click('Toggle sidebar')
assert js('document.querySelector("[data-state=collapsed][data-sidebar]") !== null || document.querySelector("[data-collapsible=icon]") !== null')
click('Toggle sidebar')
click('Search admin pages')
fill('Search pages', 'Tasks')
click('Tasks /admin/tasks', 'option')
deadline = time.monotonic() + 10
while js('location.pathname') != '/admin/tasks' and time.monotonic() < deadline:
    time.sleep(.15)
assert js('location.pathname') == '/admin/tasks'

open_page('admin/tasks')
click('Create')
click('Save changes')
assert js('document.body.innerText.includes("Title is required.")')
fill('Title', 'Admin QA task')
click('Status', 'combobox')
click('In Progress', 'option')
click('Feature', 'radio')
click('High', 'radio')
click('Save changes')
assert js('document.querySelector("tbody").innerText.includes("Admin QA task")')
click('Open menu')
click('Edit', 'menuitem')
fill('Title', 'Admin QA task edited')
click('Save changes')
assert js('document.querySelector("tbody").innerText.includes("Admin QA task edited")')
click('Open menu')
click('Delete', 'menuitem')
click('Delete')
assert not js('document.querySelector("tbody").innerText.includes("Admin QA task edited")')
open_page('admin/tasks')
assert not js('document.querySelector("tbody").innerText.includes("Admin QA task")')

open_page('admin/users')
click('Add User')
for name, value in [('First Name', 'Demo'), ('Last Name', 'Person'), ('Username', 'demo-person'), ('Email', 'demo-person@example.test'), ('Phone Number', '+6281234567890'), ('Password', 'DemoPassword1!'), ('Confirm Password', 'DemoPassword1!')]:
    fill(name, value)
click('Role', 'combobox')
click('Admin', 'option')
click('Save changes')
assert js('document.querySelector("tbody").innerText.includes("demo-person")')
assert not js('document.body.innerText.includes("DemoPassword1!")')
open_page('admin/users')
assert not js('document.querySelector("tbody").innerText.includes("demo-person@example.test")')

open_page('admin/apps')
click('Connect')
assert js('document.body.innerText.includes("Demo connection changed locally")')
open_page('admin/chats')
click('Open conversation with Alex John')
fill('Chat Text Box', 'Admin QA message')
click('Send message')
assert js('document.body.innerText.includes("Admin QA message")')
open_page('admin/chats')
assert not js('document.body.innerText.includes("Admin QA message")')

cdp('Emulation.setDeviceMetricsOverride', width=390, height=1000, deviceScaleFactor=1, mobile=False)
open_page('dashboard')
click('Toggle sidebar')
time.sleep(.7)
assert js('document.querySelector("[role=dialog]") !== null')
cdp('Input.dispatchKeyEvent', type='rawKeyDown', key='Escape', code='Escape', modifiers=0, windowsVirtualKeyCode=27, nativeVirtualKeyCode=27)
cdp('Input.dispatchKeyEvent', type='keyUp', key='Escape', code='Escape', modifiers=0, windowsVirtualKeyCode=27, nativeVirtualKeyCode=27)
time.sleep(.7)
assert js('document.querySelector("[role=dialog]") === null')
open_page('admin/chats')
click('Open conversation with Alex John')
fill('Chat Text Box', 'Mobile QA message')
click('Send message')
assert js('document.body.innerText.includes("Mobile QA message")')
click('Back to conversations')
assert js('document.querySelector(`[aria-label="Back to conversations"]`).closest(".absolute").classList.contains("hidden")')
print('ADMIN_BROWSER_CHECKS_PASSED')
