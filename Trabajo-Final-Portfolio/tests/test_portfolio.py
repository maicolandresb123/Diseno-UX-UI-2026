from pathlib import Path
from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
from base64 import b64encode

ROOT=Path(__file__).resolve().parents[1]
STYLES=(ROOT/'styles.css').read_text()
SCRIPT=(ROOT/'script.js').read_text()
def html_with_embedded_assets(filename):
 raw=(ROOT/filename).read_text()
 soup=BeautifulSoup(raw,'html.parser')
 for link in list(soup.find_all('link')):
  if link.get('rel')==['stylesheet'] and link.get('href')=='styles.css':
   x=soup.new_tag('style');x.string=STYLES;link.replace_with(x)
  elif link.get('href','').startswith('https://fonts.googleapis.com') or link.get('href','').startswith('https://fonts.gstatic.com'):
   link.decompose()
 for img in soup.find_all('img'):
  src=img.get('src','')
  if src.startswith('assets/'):
   img['loading']='eager'
   data=(ROOT/src).read_bytes()
   med='image/svg+xml' if src.endswith('.svg') else ('image/png' if src.endswith('.png') else 'image/jpeg')
   img['src']=f'data:{med};base64,{b64encode(data).decode()}'
 for script in list(soup.find_all('script')):
  if script.get('src')=='script.js':script.decompose()
 return str(soup)
OUT=ROOT/'tests'/'generated_screenshots';OUT.mkdir(parents=True,exist_ok=True)
checks=[]
def check(name,val,details=None):
 checks.append((name,bool(val),details))
 print(('PASS' if val else 'FAIL'),name,':',details or '')

with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
 for width in [375,768,1280,1440]:
  page=browser.new_page(viewport={'width':width,'height':900},device_scale_factor=1)
  page.set_default_timeout(10000)
  errors=[]
  page.on('pageerror',lambda error: errors.append(str(error)))
  page.set_content(html_with_embedded_assets('index.html'),wait_until='domcontentloaded')
  page.add_script_tag(content=SCRIPT)
  page.wait_for_timeout(1000)
  dims=page.evaluate('''() => ({innerWidth:innerWidth,scrollWidth:document.documentElement.scrollWidth,bodyScroll:document.body.scrollWidth})''')
  check(f'No horizontal overflow {width}px',dims['scrollWidth']<=dims['innerWidth'] and dims['bodyScroll']<=dims['innerWidth'],str(dims))
  check(f'One H1 {width}px',page.locator('h1').count()==1)
  check(f'All mandatory content {width}px',all(page.locator('#'+x).count()==1 for x in ['inicio','metricas','skills','proyectos','experiencia','formacion','sobre-mi','contacto']))
  check(f'No JS errors {width}px',not errors,str(errors))
  imginfo=page.locator('img').evaluate_all('es=>es.map(e=>({src:e.getAttribute("src"),alt:e.getAttribute("alt"),ok:e.complete&&e.naturalWidth>0}))')
  check(f'Images loaded {width}px',all(x['ok'] for x in imginfo),str([{'alt':x['alt'],'ok':x['ok']} for x in imginfo if not x['ok']]))
  page.screenshot(path=str(OUT/f'home-{width}.png'),full_page=True,animations='disabled')
  if width==375:
   toggle=page.locator('.nav-toggle')
   check('Menu starts closed',toggle.get_attribute('aria-expanded')=='false')
   toggle.click()
   check('Menu toggles open',toggle.get_attribute('aria-expanded')=='true' and page.locator('#nav-principal').is_visible())
   page.keyboard.press('Escape')
   check('Escape closes nav',toggle.get_attribute('aria-expanded')=='false')
   toggle.click()
   page.locator('#nav-principal').get_by_text('Proyectos').click()
   check('Anchor navigation closes menu',toggle.get_attribute('aria-expanded')=='false')
   check('Anchor navigation correct URL',page.url.endswith('#proyectos'))
  if width==1280:
   page.get_by_role('button',name='Académicos').click()
   visible=page.locator('[data-project-type]:visible').count()
   check('Projects filter academic',visible==2,str(visible))
   page.get_by_role('button',name='Profesionales').click()
   visible=page.locator('[data-project-type]:visible').count()
   check('Projects filter professional',visible==3,str(visible))
   page.get_by_role('button',name='Datos',exact=True).click()
   visible=page.locator('.cert-card:visible').count()
   check('Certification filter data',visible==3,str(visible))
   page.get_by_role('button',name='Todas',exact=True).click()
   check('Certification filter reset',page.locator('.cert-card:visible').count()==6)
   page.get_by_role('button',name='Ver todas las credenciales').click()
   check('Certification show-all expands collection',page.locator('.cert-card:visible').count()==15)
   page.get_by_role('button',name='Mostrar menos credenciales').click()
   check('Certification show-less collapses collection',page.locator('.cert-card:visible').count()==6)
  page.close()
 for pathname in ['caso-cubri.html','caso-agrimensura.html','404.html']:
  pg=browser.new_page(viewport={'width':375,'height':812})
  pg.set_content(html_with_embedded_assets(pathname),wait_until='domcontentloaded')
  check(f'{pathname} loads',pg.locator('main').count()==1)
  check(f'{pathname} one H1',pg.locator('h1').count()==1)
  dim=pg.evaluate('''() => ({view:innerWidth,doc:document.documentElement.scrollWidth})''')
  check(f'{pathname} no overflow',dim['doc']<=dim['view'],str(dim))
  pg.screenshot(path=str(OUT/pathname.replace('.html','.png')),full_page=True)
  pg.close()
 browser.close()

fails=[c for c in checks if not c[1]]
print(f'\nRESULT: {len(checks)-len(fails)}/{len(checks)} checks PASS')
if fails:print('FAILURES:',fails)
raise SystemExit(1 if fails else 0)
