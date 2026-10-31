from pathlib import Path
from html import escape
out=Path(__file__).resolve().parents[1] / 'assets' / 'img';out.mkdir(parents=True,exist_ok=True)
# Illustrations originales, sin fotografías de terceros ni datos reales.
base='''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 320" role="img" aria-labelledby="title desc"><title id="title">{title}</title><desc id="desc">{desc}</desc><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#101C37"/><stop offset="1" stop-color="#171136"/></linearGradient><linearGradient id="beam" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="900" y2="0"><stop stop-color="#38BDF8"/><stop offset=".55" stop-color="#2563EB"/><stop offset="1" stop-color="#8B5CF6"/></linearGradient><radialGradient id="glow"><stop stop-color="#2563EB" stop-opacity=".3"/><stop offset="1" stop-color="#2563EB" stop-opacity="0"/></radialGradient><pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" stroke="#A5B4FC" stroke-opacity=".075" stroke-width="1" fill="none"/></pattern><style><![CDATA[.flow{{stroke-dasharray:12 10;animation:dash 7s linear infinite}} .shimmer{{animation:glow 3s ease-in-out infinite alternate}} .blink{{animation:blink 3s ease-in-out infinite}}@keyframes dash{{to{{stroke-dashoffset:-264}}}}@keyframes glow{{to{{opacity:.5}}}}@keyframes blink{{0%,100%{{opacity:.32}}50%{{opacity:1}}}}@media(prefers-reduced-motion:reduce){{.flow,.shimmer,.blink{{animation:none!important}}}}]]></style></defs><rect width="900" height="320" rx="24" fill="url(#bg)"/><rect width="900" height="320" rx="24" fill="url(#grid)"/><circle cx="760" cy="90" r="260" fill="url(#glow)"/><path d="M0 286H900" stroke="#38BDF8" stroke-opacity=".19"/><text x="34" y="38" fill="#93C5FD" font-family="sans-serif" font-size="14" font-weight="700" letter-spacing="3">{kicker}</text><circle class="blink" cx="851" cy="32" r="6" fill="#38BDF8"/>{art}<text x="34" y="295" fill="#A7B8D5" font-size="14" font-family="sans-serif" letter-spacing="1">{footer}</text></svg>'''
def window(x,y,w,h,color='#7C9CEE'):
 return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="13" fill="#0B1933" stroke="{color}" stroke-opacity=".6" stroke-width="2"/><rect x="{x}" y="{y}" width="{w}" height="32" rx="13" fill="#1C3156"/><circle cx="{x+19}" cy="{y+16}" r="4" fill="#38BDF8"/><circle cx="{x+34}" cy="{y+16}" r="4" fill="#8B5CF6"/>'
def arrow(d):return f'<path class="flow" d="{d}" stroke="url(#beam)" stroke-width="4" stroke-linecap="round" fill="none"/>'
def label(x,y,t,size=17,fill='#E2E8F0'):return f'<text x="{x}" y="{y}" font-family="sans-serif" font-size="{size}" fill="{fill}" font-weight="600">{escape(t)}</text>'
def chip(x,y,w,t,color='#38BDF8'):return f'<rect x="{x}" y="{y}" width="{w}" height="34" rx="9" fill="#223151" stroke="{color}" stroke-opacity=".4"/>'+label(x+14,y+23,t,14)
arts={}
# SOFTWARE
s=window(38,88,226,151)+label(61,155,'{ API }',29,'#38BDF8')+label(61,190,'REST / WEBHOOKS',14,'#AFBEE1')
s+=arrow('M280 160H377')+window(381,107,168,118,'#8B5CF6')+label(416,172,'SQL / ERP',20,'#C4B5FD')
s+=arrow('M560 160H662')+window(665,101,190,129,'#38BDF8')+label(699,175,'AUTOMATION',17)
arts['software']=(s,'01 / SOFTWARE','APIs, ERP y bases de datos unidos por integraciones','INTEGRATION PIPELINE')
# INDUSTRIA
s=window(39,91,183,152)+label(72,157,'SENSOR',19)+label(67,195,'Entrada 4–20 mA',14,'#AABBDD')
s+=arrow('M233 171H345')+window(355,93,192,148,'#38BDF8')+label(408,153,'PLC',34,'#38BDF8')+label(388,194,'CONTROL',16)
s+=arrow('M550 171H651')+window(654,86,200,165,'#8B5CF6')+label(695,148,'HMI / SCADA',17)
s+='<path d="M677 200l20-20 19 9 19-32 18 25 18-13 19 18 25-22" stroke="#38BDF8" stroke-width="4" fill="none" stroke-linejoin="round"/>'
arts['industria']=(s,'02 / INDUSTRY 4.0','Sensor industrial conectado a PLC e interfaz de supervisión','SENSOR / PLC / SCADA')
# DATOS
s=window(42,84,304,165)+label(68,141,'DASHBOARD',19)
for i,h in enumerate([37,56,43,80,57]):
 s+=f'<rect x="{75+46*i}" y="{222-h}" width="26" height="{h}" rx="4" fill="{["#2563EB","#38BDF8","#8B5CF6","#38BDF8","#2563EB"][i]}"/>'
s+=arrow('M359 161H478')+window(488,88,362,159,'#8B5CF6')+label(524,145,'SQL / KPI / ACCIÓN',18)
s+='<path d="M521 213l64-25 56 12 57-46 46 10 59-43" fill="none" stroke="#38BDF8" stroke-width="4"/>'
for x,y in [(521,213),(585,188),(641,200),(698,154),(744,164),(803,121)]:s+=f'<circle cx="{x}" cy="{y}" r="5" fill="#8B5CF6" stroke="#EDF2FF" stroke-width="1.2"/>'
arts['datos']=(s,'03 / DATA & BI','Panel de métricas y gráfico de tendencia conectados a consultas de datos','DATA ANALYTICS  /  REPORTING')
# IA
s=window(40,105,206,131)+label(70,163,'CONTEXTO',18)+label(68,193,'Datos / reglas',15,'#A9C3D9');s+=arrow('M257 174H344')
s+='<circle cx="456" cy="174" r="75" stroke="#8B5CF6" stroke-opacity=".7" stroke-width="2" fill="#241A49"/>'
pts=[(409,143),(457,124),(507,149),(427,198),(484,204),(458,165)]
for i,(x,y) in enumerate(pts):
 for j,(xx,yy) in enumerate(pts):
  if j>i and abs(i-j)>1:s+=f'<path d="M{x} {y}L{xx} {yy}" stroke="#38BDF8" stroke-width="1.6" stroke-opacity=".36"/>'
for x,y in pts:s+=f'<circle class="blink" cx="{x}" cy="{y}" r="7" fill="#A78BFA" stroke="#38BDF8"/>'
s+=arrow('M538 174H638')+window(653,102,202,132,'#38BDF8')+label(688,163,'AGENTE IA',19)+label(679,192,'Respuesta útil',15,'#A9C3D9')
arts['ia']=(s,'04 / AI & WORKFLOWS','Flujo de datos y contexto, red de decisiones y agente de IA aplicado','INPUT / REASONING / ACTION')
# REDES
s=window(359,101,189,133,'#38BDF8')+label(397,159,'ROUTER',19)+label(397,190,'VPN / DNS',15,'#A9C3D9')
for x,y,txt_ in [(77,104,'CLIENTE'),(80,220,'SERVIDOR'),(672,104,'NUBE'),(675,223,'OPERACIÓN')]:
 s+=f'<rect x="{x}" y="{y}" width="158" height="45" rx="10" fill="#1A2A4B" stroke="#8B5CF6" stroke-opacity=".8"/>'+label(x+18,y+28,txt_,14)
for d in ['M235 125H356','M237 243L355 203','M551 130L668 125','M554 200L670 244']:s+=arrow(d)
arts['redes']=(s,'05 / INFRASTRUCTURE','Enlaces de red entre clientes, servidor, servicios y operaciones','SECURE NETWORK / CONNECTIVITY')
# UXUI
s=window(51,85,424,170,'#8B5CF6')+label(89,145,'WIREFRAME  /  DESKTOP',16)
s+='<rect x="87" y="171" width="157" height="54" rx="7" fill="#223B61"/><rect x="257" y="171" width="89" height="54" rx="7" fill="#33456B"/><rect x="358" y="171" width="83" height="54" rx="7" fill="#33456B"/>'
s+=arrow('M485 165H591')+window(614,78,201,192,'#38BDF8')+label(650,130,'MOBILE UI',17)
s+='<rect x="651" y="147" width="131" height="49" rx="7" fill="#264B79"/><rect x="651" y="207" width="131" height="20" rx="6" fill="#8B5CF6"/>'
arts['uxui']=(s,'06 / UX & FRONTEND','Wireframe desktop transformado en una interfaz de teléfono responsive','RESEARCH / DESIGN / IMPLEMENT')
for name,(art,kicker,desc,footer) in arts.items():
 svg=base.format(title=escape(name.title()+' — Electric Flow'),desc=escape(desc),kicker=escape(kicker),art=art,footer=escape(footer))
 (out/('skill-'+name+'.svg')).write_text(svg,encoding='utf-8')
 print(name,len(svg))
