"""Run: Get-Content tests/galerikita-browser.py -Raw | browser-harness

Requires Laravel on http://127.0.0.1:8013 and built Vite assets.
Set GK_NAV_ONLY=1 to check only the mobile drawer (built or local Vite assets).
"""
import base64
import os
import time
from pathlib import Path

url = os.environ.get('GK_URL', 'http://127.0.0.1:8013')
navigation_only = os.environ.get('GK_NAV_ONLY') == '1'
target = new_tab(url)
cdp('Page.bringToFront')
cdp('Emulation.setEmulatedMedia', features=[{'name':'prefers-reduced-motion','value':'no-preference'}])
cdp('Page.addScriptToEvaluateOnNewDocument', source='window.__gkErrors=[];window.addEventListener("error",event=>window.__gkErrors.push(event.message));window.addEventListener("unhandledrejection",event=>window.__gkErrors.push(String(event.reason)));const original=console.error;console.error=(...args)=>{window.__gkErrors.push(args.map(String).join(" "));original.apply(console,args)};')
cdp('Page.reload')
wait_for_load()
time.sleep(2)
assert js('document.querySelector("[data-landing]") !== null'), 'Landing page missing'
if not navigation_only:
    assert js('Array.from(document.querySelectorAll("link[rel=stylesheet]")).every(link=>new URL(link.href).pathname.startsWith("/build/"))'), 'Production assets required'
assert js('document.querySelectorAll("[data-landing] header, [data-landing] main > section, [data-landing] footer").length') == 10

assert js('getComputedStyle(document.querySelector("header")).position') == 'sticky'

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
        x, y = sum(box[0::2]) / 4, sum(box[1::2]) / 4
        cdp('Input.dispatchMouseEvent', type='mousePressed', x=x, y=y, button='left', clickCount=1)
        cdp('Input.dispatchMouseEvent', type='mouseReleased', x=x, y=y, button='left', clickCount=1)
        time.sleep(.03)
    time.sleep(.15)

def press_key(key, code):
    for event in ['keyDown', 'keyUp']:
        cdp('Input.dispatchKeyEvent', type=event, key=key, code=key, windowsVirtualKeyCode=code)

def check_mobile_drawer():
    expected = js("""({create:document.querySelector('header [data-create-event]').href,account:document.querySelector('header a:not([href^="#"]):not([data-create-event])').href})""")
    output = Path('storage/app/galerikita-qa')
    output.mkdir(parents=True, exist_ok=True)
    for width, height in [(320,568), (390,844), (430,932), (768,1024), (390,360)]:
        cdp('Emulation.setDeviceMetricsOverride', width=width, height=height, deviceScaleFactor=1, mobile=False)
        js('window.scrollTo({top:850,behavior:"instant"})')
        assert js('''(() => {
            const box=document.querySelector('header button').getBoundingClientRect();
            return box.left >= 0 && box.right <= document.documentElement.clientWidth;
        })()'''), f'Hamburger clipped at {width}'
        overflow = js('getComputedStyle(document.body).overflowY')
        click_named('Buka navigasi')
        time.sleep(.55)
        assert js('''(() => {
            const drawer=document.querySelector('#mobile-navigation');
            if (!drawer || drawer.getAttribute('role') !== 'dialog' || drawer.getAttribute('aria-modal') !== 'true') return false;
            const box=drawer.getBoundingClientRect();
            return Math.abs(box.left) < 1 && Math.abs(box.top) < 1
                && Math.abs(box.width-window.innerWidth) < 1 && Math.abs(box.height-window.innerHeight) < 1;
        })()'''), f'Fullscreen modal drawer missing at {width}x{height}'
        assert js('getComputedStyle(document.querySelector("#mobile-navigation")).backgroundColor') == 'rgb(9, 9, 11)'
        assert js('document.documentElement.scrollWidth <= window.innerWidth'), f'Drawer overflow at {width}'
        assert js('getComputedStyle(document.body).overflowY') == 'hidden', 'Page scroll must be locked'
        assert js('Array.from(document.querySelectorAll("#mobile-navigation nav a")).map(link=>link.textContent.trim())') == ['Beranda','Cara Kerja','Fitur','Harga','FAQ']
        assert js('document.querySelector("#mobile-navigation [data-create-event]").href') == expected['create']
        assert js('Array.from(document.querySelectorAll("#mobile-navigation a")).find(link=>["Masuk","Dashboard"].includes(link.textContent.trim())).href') == expected['account']
        assert js('''(() => {
            const button=document.querySelector('#mobile-navigation > button');
            const box=button.getBoundingClientRect();
            return box.width >= 44 && box.height >= 44;
        })()'''), 'Close button must be a usable touch target'
        for attempt in range(12):
            press_key('Tab', 9)
            assert js('document.querySelector("#mobile-navigation").contains(document.activeElement)'), 'Focus escaped the drawer'
        assert js('''(() => {
            const drawer=document.querySelector('#mobile-navigation');
            drawer.scrollTop=drawer.scrollHeight;
            const cta=drawer.querySelector('[data-create-event]').getBoundingClientRect();
            return cta.top >= 0 && cta.bottom <= window.innerHeight;
        })()'''), 'CTA must remain reachable on short screens'
        before = js('window.scrollY')
        cdp('Input.dispatchMouseEvent', type='mouseWheel', x=width/2, y=height/2, deltaX=0, deltaY=300)
        time.sleep(.1)
        assert js('window.scrollY') == before, 'Background scrolled behind the drawer'
        image = cdp('Page.captureScreenshot', format='png')['data']
        (output / f'drawer-{width}-{height}.png').write_bytes(base64.b64decode(image))
        press_key('Escape', 27)
        time.sleep(.4)
        assert js('document.querySelector("#mobile-navigation") === null'), 'Escape must close the drawer'
        assert js('document.activeElement.getAttribute("aria-label")') == 'Buka navigasi', 'Focus must return to hamburger'
        assert js('getComputedStyle(document.body).overflowY') == overflow, 'Page scroll not restored'
    click_named('Buka navigasi')
    time.sleep(.55)
    click_named('Tutup navigasi')
    time.sleep(.4)
    assert js('document.querySelector("#mobile-navigation") === null')
    cdp('Emulation.setDeviceMetricsOverride', width=390, height=844, deviceScaleFactor=1, mobile=False)
    click_named('Buka navigasi')
    time.sleep(.55)
    js("""document.querySelector('#mobile-navigation a[href="#faq"]').click()""")
    time.sleep(1.5)
    assert js('document.querySelector("#mobile-navigation") === null && location.hash === "#faq"')
    assert js('document.querySelector("#faq").getBoundingClientRect().top >= document.querySelector("header").getBoundingClientRect().bottom && document.querySelector("#faq").getBoundingClientRect().top < innerHeight'), 'Section navigation lost its scroll position'
    click_named('Buka navigasi')
    time.sleep(.55)
    cdp('Emulation.setDeviceMetricsOverride', width=769, height=900, deviceScaleFactor=1, mobile=False)
    time.sleep(.5)
    assert js('document.querySelector("#mobile-navigation") === null && getComputedStyle(document.body).overflowY !== "hidden"'), 'Desktop resize must dismiss the modal'
    assert js('getComputedStyle(document.querySelector("header nav")).display') != 'none'
    cdp('Emulation.setDeviceMetricsOverride', width=390, height=844, deviceScaleFactor=1, mobile=False)
    cdp('Emulation.setEmulatedMedia', features=[{'name':'prefers-reduced-motion','value':'reduce'}])
    click_named('Buka navigasi')
    assert js('getComputedStyle(document.querySelector("#mobile-navigation")).animationName') == 'none'
    press_key('Escape', 27)
    time.sleep(.4)
    cdp('Emulation.setEmulatedMedia', features=[{'name':'prefers-reduced-motion','value':'no-preference'}])
    cdp('Emulation.clearDeviceMetricsOverride')
    js('history.replaceState(null,"",location.pathname);window.scrollTo({top:0,behavior:"instant"})')
    print('Mobile drawer: sizes, links, focus trap, scroll lock, Escape, close, anchor, resize, reduced motion passed')

check_mobile_drawer()
if navigation_only:
    assert js('window.__gkErrors') == [], js('window.__gkErrors')
    raise SystemExit(0)

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
assert js('Array.from(document.querySelectorAll("button[aria-label]")).filter(button=>button.getAttribute("aria-label").startsWith("Kurangi ")).every(button=>button.disabled)')
cdp('Page.reload')
wait_for_load()
time.sleep(1)
click_named('Apakah peserta harus membuat akun?')
assert js('document.querySelector("#faq button").getAttribute("aria-expanded")') == 'true'
click_named('Berapa lama event berlangsung?')
assert js('document.querySelectorAll("#faq button[aria-expanded=true]").length') == 1
click_named('Berapa lama event berlangsung?')
assert js('Array.from(document.querySelectorAll("[data-create-event]")).every(link => new URL(link.href).pathname === "/register")')
def check_photos():
    height = js('document.documentElement.scrollHeight')
    for top in range(0, height, 750):
        js(f'window.scrollTo({{top:{top},behavior:"instant"}})')
        time.sleep(.12)
    for attempt in range(50):
        if js('Array.from(document.querySelectorAll("img[data-photo]")).every(image => image.complete && image.naturalWidth > 0)'):
            break
        time.sleep(.1)
    assert js('Array.from(document.querySelectorAll("img[data-photo]")).every(image => image.complete && image.naturalWidth > 0 && !image.src.includes("placeholder"))'), 'Missing or placeholder photo'
    assert js('Array.from(document.querySelectorAll("img[data-photo]")).every(image => new URL(image.src).origin === location.origin)'), 'Photo hotlink found'
    assert js('''(() => {
        const originals=Array.from(document.querySelectorAll("img[data-photo]")).filter(image => !image.closest('[data-gallery-clone]'));
        const photos=originals.filter(image => image.closest('#galeri'));
        const clone=Array.from(document.querySelectorAll("#galeri [data-gallery-clone] img[data-photo]"));
        return originals.length === 67 && photos.length === 11 && clone.length === photos.length
            && new Set(originals.map(image => image.currentSrc || image.src)).size === originals.length
            && clone.every((image,index) => image.src === photos[index].src);
    })()'''), 'Gallery loop must repeat its unique photos only in the hidden clone'
    js('window.scrollTo({top:0,behavior:"instant"})')

check_photos()
def check_gallery_loop():
    assert js('''(() => {
        const track=document.querySelector('#galeri [data-gallery-track]');
        const animation=track.getAnimations()[0];
        if (!animation || !track.querySelector('[data-gallery-clone][aria-hidden="true"]')) return false;
        const clock=animation.currentTime;
        const original=track.children[0], clone=track.children[1];
        try {
            animation.currentTime=0;
            const start=original.getBoundingClientRect();
            animation.currentTime=1000;
            if (original.getBoundingClientRect().left >= start.left) return false;
            animation.currentTime=39999;
            const end=clone.getBoundingClientRect();
            if (Math.abs(end.left-start.left) > .1 || Math.abs(end.width-start.width) > .1 || end.height !== start.height) return false;
            animation.currentTime=40000;
            return Math.abs(original.getBoundingClientRect().left-start.left) < .1;
        } finally { animation.currentTime=clock; }
    })()'''), 'Gallery must move left and loop without a jump'
assert js('document.fonts.check("16px \'Plus Jakarta Sans\'") && document.fonts.check("16px \'Instrument Serif\'")')
output = Path('storage/app/galerikita-qa')
output.mkdir(parents=True, exist_ok=True)
for width in [1440, 1280, 1024, 768, 320, 390, 430, 375, 549, 550, 551, 767, 769, 770, 1099, 1100, 1101, 1299, 1300, 1301]:
    cdp('Emulation.setDeviceMetricsOverride', width=width, height=1000, deviceScaleFactor=1, mobile=False)
    js('window.scrollTo(0,0)')
    time.sleep(.4)
    check_photos()
    assert js('getComputedStyle(document.querySelector("#galeri [data-gallery-track]")).animationDuration') == '40s'
    check_gallery_loop()
    assert js('document.documentElement.scrollWidth <= window.innerWidth'), f'Overflow at {width}'
    assert js('window.scrollTo({top:1200,behavior:"instant"});document.querySelector("header").getBoundingClientRect().top') == 0, f'Sticky navbar failed at {width}'
    assert js('''(() => {
        const section=document.querySelector('#faq'), header=document.querySelector('header');
        section.scrollIntoView({block:'start',behavior:'instant'});
        return section.getBoundingClientRect().top >= header.getBoundingClientRect().bottom
            && parseFloat(getComputedStyle(section).scrollMarginTop) === 80
            && section.querySelector('button').getBoundingClientRect().height >= 80;
    })()'''), f'FAQ anchor or sizing failed at {width}'
    js('window.scrollTo({top:0,behavior:"instant"})')
    if width == 390:
        gallery_track = cdp('DOM.querySelector', nodeId=cdp('DOM.getDocument')['root']['nodeId'], selector='#galeri [role=region]')['nodeId']
        cdp('DOM.scrollIntoViewIfNeeded', nodeId=gallery_track)
        gallery_box = cdp('DOM.getBoxModel', nodeId=gallery_track)['model']['content']
        gallery_x, gallery_y = sum(gallery_box[0::2]) / 4, sum(gallery_box[1::2]) / 4
        cdp('Input.dispatchMouseEvent', type='mouseMoved', x=gallery_x, y=gallery_y)
        assert js('getComputedStyle(document.querySelector("#galeri [data-gallery-track]")).animationPlayState') == 'paused'
        cdp('Input.dispatchMouseEvent', type='mouseMoved', x=width-1, y=900)
        cdp('Input.dispatchKeyEvent', type='keyDown', key='Tab', code='Tab', windowsVirtualKeyCode=9)
        cdp('Input.dispatchKeyEvent', type='keyUp', key='Tab', code='Tab', windowsVirtualKeyCode=9)
        js('document.querySelector("#galeri [role=region]").focus()')
        assert js('getComputedStyle(document.querySelector("#galeri [data-gallery-track]")).animationPlayState') == 'paused'
        assert js('getComputedStyle(document.querySelector("#galeri [role=region]")).outlineStyle') == 'solid'
        js('document.querySelector("#galeri [role=region]").blur()')
        cdp('Emulation.setEmulatedMedia', features=[{'name':'prefers-reduced-motion','value':'reduce'}])
        assert js('getComputedStyle(document.querySelector("#galeri [data-gallery-track]")).animationName') == 'none'
        cdp('Emulation.setEmulatedMedia', features=[{'name':'prefers-reduced-motion','value':'no-preference'}])
        click_named('Buka navigasi')
        assert js('document.querySelector("#mobile-navigation") !== null')
        cdp('Input.dispatchKeyEvent', type='keyDown', key='Escape', code='Escape', windowsVirtualKeyCode=27)
        time.sleep(.4)
        assert js('document.querySelector("#mobile-navigation") === null')
    if width in [1440, 320, 390, 430, 375]:
        height = js('document.documentElement.scrollHeight')
        image = cdp('Page.captureScreenshot', format='png', captureBeyondViewport=True, clip={'x': 0, 'y': 0, 'width': width, 'height': height, 'scale': 1})['data']
        (output / f'landing-{width}.png').write_bytes(base64.b64decode(image))
    print(width, js('document.documentElement.scrollHeight'))
assert js('window.__gkErrors') == [], js('window.__gkErrors')
cdp('Emulation.setDeviceMetricsOverride', width=1440, height=1000, deviceScaleFactor=1, mobile=False)
cdp('CSS.enable')
document_node = cdp('DOM.getDocument')['root']['nodeId']
button_node = cdp('DOM.querySelector', nodeId=document_node, selector='#beranda [data-create-event]')['nodeId']
cdp('CSS.forcePseudoState', nodeId=button_node, forcedPseudoClasses=['hover','focus','focus-visible'])
time.sleep(.3)
assert js('getComputedStyle(document.querySelector("#beranda [data-create-event]")).backgroundColor') == 'rgb(203, 232, 90)'
assert js('getComputedStyle(document.querySelector("#beranda [data-create-event]")).outlineColor') == 'rgb(221, 247, 106)'
assert js('getComputedStyle(document.querySelector("#beranda [data-create-event]")).outlineStyle') == 'solid'
cdp('CSS.forcePseudoState', nodeId=button_node, forcedPseudoClasses=[])
cdp('Emulation.setEmulatedMedia', features=[{'name':'prefers-reduced-motion','value':'reduce'}])
assert js('getComputedStyle(document.querySelector("#beranda [data-create-event]")).transitionProperty') == 'none'
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
