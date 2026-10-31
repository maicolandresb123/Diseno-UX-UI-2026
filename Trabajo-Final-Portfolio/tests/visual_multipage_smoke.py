"""Visual smoke test for restricted environments (no local HTTP navigation).
Run: python tests/visual_multipage_smoke.py
Injects the real CSS and JS into HTML via page.set_content; does not test network navigation.
"""
from pathlib import Path
import re, base64
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
PAGES=['index.html','skills.html','experiencia.html','formacion.html','proyectos.html','sobre-mi.html','contacto.html']
CSS=(ROOT/'styles.css').read_text('utf-8')
JS=(ROOT/'script.js').read_text('utf-8')
LOGO=base64.b64encode((ROOT/'assets/img/mb-mark.svg').read_bytes()).decode('ascii')

def render_markup(name):
    text=(ROOT/name).read_text('utf-8')
    text=text.replace('<link rel="stylesheet" href="styles.css">','<style>'+CSS+'</style>')
    text=text.replace('<script src="script.js" defer></script>','')
    text=text.replace('src="assets/img/mb-mark.svg"','src="data:image/svg+xml;base64,'+LOGO+'"')
    text=re.sub(r'<link[^>]+href="https://fonts.googleapis.com[^>]*>', '', text)
    text=re.sub(r'<link[^>]+href="https://fonts.gstatic.com[^>]*>', '', text)
    return text

def main():
    count=0
    with sync_playwright() as p:
        browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
        for w,h in [(375,812),(768,1024),(1280,850),(1440,900)]:
            page=browser.new_page(viewport={'width':w,'height':h},device_scale_factor=1)
            errors=[]
            page.on('pageerror',lambda e:errors.append(str(e)))
            for name in PAGES:
                page.set_content(render_markup(name),wait_until='domcontentloaded',timeout=15000)
                page.add_script_tag(content=JS)
                page.wait_for_timeout(100)
                width=page.evaluate('document.documentElement.scrollWidth')
                assert width <= w+1, (name,w,width)
                assert not errors, (name,w,errors)
                assert page.locator('h1').count()==1, (name,w,'h1 count')
                assert page.locator('nav#nav-principal a[aria-current="page"]').count()==1, (name,w,'active nav')
                if name=='skills.html':
                    assert page.locator('.skills-focus-card').count()==6
                    assert page.locator('.skills-workflow-track li').count()==4
                    page.locator('.reveal').evaluate_all('(els)=>els.forEach(el=>el.classList.add("is-visible"))')
                    if w in (375,1280):
                        out=ROOT/f'docs/screenshots/skills-{w}.png'
                        page.screenshot(path=str(out),full_page=True)
                count+=1
            if w==375:
                page.set_content(render_markup('index.html'),wait_until='domcontentloaded')
                page.add_script_tag(content=JS)
                page.locator('.nav-toggle').click()
                assert page.locator('.nav-toggle').get_attribute('aria-expanded')=='true'
                assert page.locator('#nav-principal a[href="skills.html"]').is_visible()
                page.keyboard.press('Escape')
                assert page.locator('.nav-toggle').get_attribute('aria-expanded')=='false'
            page.close()
        browser.close()
    print('PASS: %d page/viewport checks in Chromium, 375/768/1280/1440px. Menu toggles verified.' % count)

if __name__=='__main__':main()
