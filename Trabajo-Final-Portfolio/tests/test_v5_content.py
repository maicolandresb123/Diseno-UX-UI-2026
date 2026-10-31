"""Content and illustration checks for v5 editorial refinement.
Run with python -m unittest discover -s tests -v.
"""
import unittest
from pathlib import Path
from xml.etree import ElementTree as ET
from bs4 import BeautifulSoup

ROOT=Path(__file__).resolve().parents[1]

class VisualRefinementTests(unittest.TestCase):
    def parse(self,filename):
        return BeautifulSoup((ROOT/filename).read_text(encoding='utf-8'),'html.parser')

    def test_original_skill_illustrations(self):
        slugs=('software','industria','datos','ia','redes','uxui')
        for slug in slugs:
            with self.subTest(slug=slug):
                path=ROOT/'assets'/'img'/('skill-'+slug+'.svg')
                self.assertTrue(path.exists())
                tree=ET.parse(path)
                self.assertTrue(tree.getroot().tag.endswith('svg'))
                source=path.read_text(encoding='utf-8')
                self.assertIn('prefers-reduced-motion',source)
                self.assertNotIn('<script',source)
                self.assertNotIn('http://',source.replace('http://www.w3.org/2000/svg',''))
                self.assertLess(path.stat().st_size,20_000)
        dom=self.parse('skills.html')
        cards=dom.select('.skills-focus-card')
        self.assertEqual(len(cards),6)
        for card in cards:
            img=card.select_one('figure.skill-illustration img')
            self.assertIsNotNone(img)
            self.assertTrue(img.get('alt'))
            self.assertTrue((ROOT/img['src']).exists())
            self.assertEqual(img['loading'],'lazy')

    def test_each_page_has_distinct_role(self):
        about=self.parse('sobre-mi.html')
        self.assertEqual(len(about.select('.about-process li')),5)
        self.assertEqual(len(about.select('.values-grid article')),3)
        skills=self.parse('skills.html')
        self.assertEqual(len(skills.select('.flow-example')),2)
        self.assertEqual(len(skills.select('.animated-flow li')),8)
        self.assertFalse(skills.select('#mi-metodo'))
        projects=self.parse('proyectos.html')
        self.assertEqual(len(projects.select('.evidence-card')),3)
        self.assertEqual(len(projects.select('.method-grid')),0)
        self.assertIn('conceptual',projects.get_text(' ',strip=True).lower())

    def test_home_one_page_unchanged(self):
        home=self.parse('index.html')
        for ident in ('inicio','metricas','skills','proyectos','experiencia','formacion','sobre-mi','contacto'):
            self.assertIsNotNone(home.select_one('#'+ident),ident)
        self.assertEqual(len(home.select('main h1')),1)
        self.assertEqual(len(home.select('#sobre-mi .values-list > div')),3)
        self.assertEqual(len(home.select('#skills .skill-card')),4)

    def test_motion_and_editorial_documentation(self):
        css=(ROOT/'styles.css').read_text(encoding='utf-8')
        for name in ('.skill-illustration','.animated-flow','.about-process','.evidence-grid'):
            self.assertIn(name,css)
        self.assertIn('prefers-reduced-motion:reduce',css)
        self.assertTrue((ROOT/'docs'/'Plan-editorial-visual-v5.md').exists())

if __name__=='__main__':unittest.main()
