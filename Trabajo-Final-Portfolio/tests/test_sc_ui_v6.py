"""Pruebas del caso de SC renderizado sin navegador externo (page.set_content)."""
from pathlib import Path
import base64
import re
import unittest
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]


def inline_page(name,embed_images=True):
    raw=(ROOT/name).read_text(encoding='utf-8')
    raw=re.sub(r'<link\b[^>]*href="https?://[^"]+"[^>]*>', '', raw)
    raw=raw.replace('<link rel="stylesheet" href="styles.css">','<style>'+ (ROOT/'styles.css').read_text(encoding='utf-8') + '</style>')
    raw=raw.replace('<script src="script.js" defer></script>', '')
    raw=raw.replace('<script defer src="script.js"></script>', '')
    if embed_images:
        for path in ('assets/img/sc-demo-medica-interfaz.webp','assets/img/sc-demo-hoteleria-interfaz.webp','assets/img/sc-demo-logistica-interfaz.webp'):
            file=(ROOT/path)
            raw=raw.replace(' src="'+path+'"', ' src="data:image/webp;base64,'+base64.b64encode(file.read_bytes()).decode('ascii')+'"')
    raw=raw.replace('</body>','<script>'+(ROOT/'script.js').read_text(encoding='utf-8')+'</script></body>')
    return raw


class DemoUITest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.pw=sync_playwright().start()
        cls.browser=cls.pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])

    @classmethod
    def tearDownClass(cls):
        cls.browser.close();cls.pw.stop()

    def test_sc_modal_and_navigation(self):
        page=self.browser.new_page(viewport={'width':1280,'height':800})
        errors=[];page.on('pageerror', lambda e: errors.append(str(e)))
        page.set_content(inline_page('caso-sc.html'),wait_until='domcontentloaded',timeout=25000)
        items=page.locator('[data-sc-ui-src]')
        self.assertEqual(items.count(),3)
        items.first.click(timeout=10000)
        self.assertTrue(page.locator('#sc-ui-modal').evaluate('(el)=>el.open'))
        self.assertIn('Salud',page.locator('#sc-ui-modal-title').inner_text())
        page.locator('[data-sc-ui-step="1"]').click()
        self.assertIn('Hotelería',page.locator('#sc-ui-modal-title').inner_text())
        page.keyboard.press('ArrowLeft')
        self.assertIn('Salud',page.locator('#sc-ui-modal-title').inner_text())
        page.keyboard.press('Escape')
        self.assertFalse(page.locator('#sc-ui-modal').evaluate('(el)=>el.open'))
        self.assertTrue(items.first.evaluate('(el)=>el===document.activeElement'))
        self.assertEqual(errors,[])
        page.close()

    def test_cert_search_no_reference_error(self):
        page=self.browser.new_page(viewport={'width':1280,'height':800})
        errors=[];page.on('pageerror',lambda e: errors.append(str(e)))
        page.set_content(inline_page('formacion.html',embed_images=False),wait_until='domcontentloaded',timeout=25000)
        search=page.locator('#cert-search')
        self.assertEqual(search.count(),1)
        search.fill('InTouch')
        self.assertEqual(errors,[])
        collection=page.locator('#aveva-collection')
        self.assertTrue(collection.is_visible())
        self.assertTrue(collection.evaluate('(el)=>el.open'))
        page.close()

    def test_images_are_original_demo_captures(self):
        for slug in ('medica','hoteleria','logistica'):
            file=ROOT/'assets/img'/f'sc-demo-{slug}-interfaz.webp'
            self.assertTrue(file.exists(),slug)
            self.assertGreater(file.stat().st_size,10000)
            self.assertLess(file.stat().st_size,130000)
        src=(ROOT/'proyectos.html').read_text(encoding='utf8')
        self.assertIn('sc-demo-hoteleria-interfaz.webp',src)
        self.assertIn('sc-demo-medica-interfaz.webp',src)
        case=(ROOT/'caso-sc.html').read_text(encoding='utf8')
        self.assertIn('datos ficticios',case.lower())


if __name__=='__main__':unittest.main()
