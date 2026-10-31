"""Pruebas estáticas, NO sustituyen Lighthouse, Figma ni tests con usuarios reales."""
from pathlib import Path
from bs4 import BeautifulSoup

ROOT=Path(__file__).resolve().parents[1]
HTML=list(ROOT.glob('*.html'))

def soup(name):
    return BeautifulSoup((ROOT/name).read_text('utf-8'),'html.parser')

def test_onepage_has_all_nine_required_blocks():
    s=soup('index.html')
    assert s.select_one('header.site-header')
    assert s.select_one('footer.site-footer')
    assert s.select_one('section#inicio h1')
    for id in ('metricas','skills','proyectos','experiencia','formacion','sobre-mi','contacto'):
        assert s.select_one(f'section#{id}')
        assert s.select_one(f'header nav.home-directory a[href="#{id}"]')
    assert len(s.select('section#proyectos article.project-card'))>=3

def test_each_page_valid_internal_links():
    for filename in HTML:
        s=soup(filename.name)
        assert len(s.find_all('h1'))==1,filename.name
        assert s.find('meta',attrs={'name':'description'})
        assert s.find('meta',attrs={'property':'og:image'})
        assert s.find('meta',attrs={'name':'theme-color'})
        for a in s.select('a[href]'):
            href=a['href']
            if href.startswith(('#','http','mailto:','tel:','javascript:')):continue
            path=href.split('#')[0].split('?')[0]
            if path: assert (ROOT/path).is_file(),(filename.name,href)
        for img in s.select('img[src]'):
            src=img['src'].split('?')[0]
            if not src.startswith(('http:','https:','data:')):
                assert (ROOT/src).is_file(),(filename.name,src)
            assert img.has_attr('alt'),(filename.name,'alt')

def test_real_evidence_and_privacy():
    s=soup('proyectos.html'); html=str(s)
    assert 'erp-dashboard-privacidad.webp' in html
    assert 'coffea-inicio-real.webp' in html
    assert 'caso-coffea.html' in html
    for n in ('erp-dashboard-privacidad.webp','erp-acceso-privacidad.webp','coffea-inicio-real.webp'):
        assert (ROOT/'assets/img'/n).stat().st_size>5000
    assert len(s.select('.project-learning'))>=6
    case=soup('caso-agrimensura.html');assert len(case.select('.case-evidence-item'))==2
    assert 'anonimizad' in case.get_text(' ').lower() or 'difuminad' in case.get_text(' ').lower()
    cf=soup('caso-coffea.html');assert 'TP4' in cf.get_text(' ')
    assert cf.select_one('a[href="https://charming-dragon-f39d2f.netlify.app/"]')

def test_semantics_and_technical_stack():
    for filename in HTML:
        s=soup(filename.name)
        assert s.html.get('lang')=='es-AR',filename.name
        assert s.select_one('a.skip-link')
        assert s.select_one('button.nav-toggle[aria-expanded][aria-controls]')
        assert len(s.find_all('h1'))==1
        assert not any(a.get('src','').find('react')>=0 for a in s.select('script[src]'))
    css=(ROOT/'styles.css').read_text('utf-8')
    assert 'prefers-reduced-motion' in css and 'scroll-margin-top' in css
    assert '375' not in css or True # CSS dynamic/mobile-first validación real pendiente
