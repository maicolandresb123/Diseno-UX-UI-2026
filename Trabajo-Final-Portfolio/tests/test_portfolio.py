"""Comprobaciones estáticas sin dependencias externas: python -m unittest discover -s tests -v."""
import unittest
from pathlib import Path
from html.parser import HTMLParser

ROOT = Path(__file__).resolve().parents[1]
PAGES = ['index.html', 'proyectos.html', 'experiencia.html', 'formacion.html',
         'sobre-mi.html', 'contacto.html', 'caso-sc.html', 'caso-cubri.html',
         'caso-agrimensura.html', '404.html']

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(); self.tags=[];self.ids=[];self.links=[];self.images=[]
    def handle_starttag(self,tag,attrs):
        attr=dict(attrs); self.tags.append(tag)
        if 'id' in attr:self.ids.append(attr['id'])
        if tag=='a' and 'href' in attr:self.links.append(attr['href'])
        if tag=='img':self.images.append(attr)

class PortfolioTests(unittest.TestCase):
    def setUp(self):
        self.pages={p:(ROOT/p).read_text(encoding='utf8') for p in PAGES}
    def test_all_pages_exist(self):
        self.assertEqual(len(self.pages), 10)
    def test_html_semantics(self):
        for filename,source in self.pages.items():
            with self.subTest(page=filename):
                p=PageParser(); p.feed(source)
                self.assertEqual(p.tags.count('h1'),1)
                self.assertEqual(p.tags.count('main'),1)
                for tag in ['header','nav','footer']:
                    self.assertIn(tag,p.tags)
                self.assertIn('lang="es-AR"',source)
                self.assertIn('Saltar al contenido',source)
                self.assertIn('og:image',source)
                self.assertIn('theme-color',source)
                for img in p.images:self.assertTrue(img.get('alt') is not None)
    def test_one_page_required_sections(self):
        p=PageParser();p.feed(self.pages['index.html'])
        for section in ['inicio','metricas','skills','proyectos','experiencia','formacion','sobre-mi','contacto']:
            self.assertIn(section,p.ids)
    def test_all_local_links_work(self):
        for filename,source in self.pages.items():
            p=PageParser();p.feed(source)
            for href in p.links:
                path=href.split('#')[0].split('?')[0]
                if not path or path.startswith(('http:','https:','mailto:','tel:')):continue
                with self.subTest(page=filename,href=href):self.assertTrue((ROOT/path).exists())
    def test_css_and_js_and_accessibility(self):
        css=(ROOT/'styles.css').read_text()
        js=(ROOT/'script.js').read_text()
        self.assertIn('prefers-reduced-motion:reduce',css)
        self.assertIn(':focus-visible',css)
        self.assertIn('min-width:1181px',css)
        self.assertIn('IntersectionObserver',js)
        self.assertIn('aria-expanded',js)
        self.assertIn('data-theme',js)
        self.assertNotIn('ReactDOM',js)
    def test_project_content(self):
        page=self.pages['proyectos.html']
        for project in ['SC Soluciones Conectadas','ERP Agrimensura','CRM Comercial','Cubrí Seguros','Coffea']:
            self.assertIn(project,page)
        self.assertEqual(page.count('data-project-type="profesional"'),4)
        self.assertEqual(page.count('data-project-type="academico"'),2)
    def test_real_photo_local_and_private_data_excluded(self):
        self.assertTrue((ROOT/'assets/img/maikol-retrato.webp').is_file())
        self.assertIn('maikol-retrato.webp',self.pages['sobre-mi.html'])
        self.assertNotIn('1.018.514.736',''.join(self.pages.values()))
        self.assertNotIn('2610195614145564690',''.join(self.pages.values()))
    def test_brand_assets(self):
        for filename in ['mb-mark.svg','mb-lockup-dark.svg','mb-lockup-light.svg']:
            self.assertTrue((ROOT/'assets/img'/filename).is_file())

if __name__=='__main__':unittest.main()

class CertificateAndSCExtras(unittest.TestCase):
    def test_43_certificates_have_safe_images(self):
        import json
        entries=json.loads((ROOT/'assets/certificados/catalogo.json').read_text(encoding='utf-8'))
        self.assertEqual(len(entries),43)
        self.assertEqual(sum(e['issuer']=='AVEVA' for e in entries),29)
        self.assertEqual(len(set(e['image'] for e in entries)),43)
        for e in entries:
            path=ROOT/e['image']
            with self.subTest(name=e['title']):
                self.assertTrue(path.is_file(),path)
                self.assertGreater(path.stat().st_size,1000)
                self.assertLess(path.stat().st_size,350000)
                self.assertEqual(path.suffix,'.webp')
                self.assertNotIn('DNI',e['title'])

    def test_gallery_dialog_and_interaction(self):
        text=(ROOT/'formacion.html').read_text(encoding='utf-8')
        script=(ROOT/'script.js').read_text(encoding='utf-8')
        self.assertEqual(text.count('data-cert-category='),43)
        self.assertEqual(text.count('data-cert-preview'),43)
        self.assertIn('<dialog id="cert-modal"',text)
        self.assertIn('id="cert-search"',text)
        self.assertIn('id="aveva-collection"',text)
        self.assertIn('certDialog.showModal()',script)
        self.assertIn("lastCertTrigger?.focus()",script)
        self.assertIn("certDialog.addEventListener('keydown'",script)
        self.assertNotIn('19095824',text)

    def test_sc_live_demo_load_is_opt_in(self):
        text=(ROOT/'caso-sc.html').read_text(encoding='utf-8')
        from html.parser import HTMLParser
        self.assertEqual(text.count('data-sc-demo='),3)
        self.assertIn('id="sc-demo-frame"',text)
        self.assertIn('loading="lazy"',text)
        self.assertIn('id="sc-demo-direct"',text)
        self.assertNotIn('<iframe src="https://',text)

    def test_nav_internal_pages_preserve_home_anchors(self):
        home=(ROOT/'index.html').read_text(encoding='utf-8')
        self.assertIn('href="#proyectos"',home)
        for page in ['formacion.html','experiencia.html','proyectos.html','sobre-mi.html','contacto.html']:
            t=(ROOT/page).read_text(encoding='utf-8')
            self.assertIn('href="proyectos.html"',t)
            self.assertIn('href="experiencia.html"',t)
            self.assertIn('href="contacto.html"',t)
