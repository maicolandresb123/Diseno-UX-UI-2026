from pathlib import Path
from html import escape
P=Path(__file__).resolve().parents[1]/'assets'/'img'
sets=[
('sc','SC Soluciones Conectadas','Integraciones · Automatización · Demos','#0A5BA8','#16ABD0','OPS','SOLUCIONES'),
('erp','ERP Agrimensura','Proyectos · Tareas · Documentación','#1B4F93','#47A5E8','ERP','GESTIÓN'),
('crm','CRM Comercial','Pipeline · Prospectos · Seguimientos','#5E43B7','#9A74EA','CRM','PIPELINE'),
('coffea','Coffea · UI académica','Landing responsive y catálogo','#8A5436','#DFAE70','WEB','COFFEA'),
('industrial','Supervisión industrial','SCADA · HMI · Automatización','#12685D','#47C4A5','HMI','CONTROL')]
for slug,title,subtitle,base,accent,badge,word in sets:
  g=f'''<svg xmlns="http://www.w3.org/2000/svg" width="960" height="620" viewBox="0 0 960 620" role="img" aria-label="Visualización esquemática conceptual de {escape(title)}">
  <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="{base}"/><stop offset="1" stop-color="{accent}"/></linearGradient>
  <filter id="s" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="14" stdDeviation="18" flood-opacity=".13"/></filter></defs>
  <rect width="960" height="620" fill="#eef4fa"/><rect x="0" y="0" width="960" height="620" fill="url(#g)" opacity=".12"/>
  <circle cx="855" cy="45" r="260" fill="{accent}" opacity=".15"/><circle cx="65" cy="540" r="160" fill="{accent}" opacity=".15"/>
  <rect x="80" y="93" width="800" height="460" rx="24" fill="#ffffff" filter="url(#s)"/>
  <rect x="80" y="93" width="800" height="56" rx="24" fill="#f8fafc"/>
  <rect x="80" y="132" width="800" height="17" fill="#f8fafc"/>
  <circle cx="118" cy="121" r="7" fill="#dfe7f0"/><circle cx="141" cy="121" r="7" fill="#dfe7f0"/><circle cx="164" cy="121" r="7" fill="#dfe7f0"/>
  <text x="205" y="128" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="{base}">{escape(title)}</text>
  <rect x="108" y="182" width="154" height="340" rx="12" fill="#f1f6fb"/>
  <rect x="124" y="211" width="120" height="29" rx="8" fill="{base}" opacity=".10"/>
  <rect x="124" y="258" width="100" height="12" rx="6" fill="#c3cfdd"/>
  <rect x="124" y="296" width="113" height="12" rx="6" fill="#c3cfdd"/>
  <rect x="124" y="334" width="95" height="12" rx="6" fill="#c3cfdd"/>
  <rect x="124" y="372" width="110" height="12" rx="6" fill="#c3cfdd"/>
  <rect x="292" y="182" width="555" height="113" rx="15" fill="{base}" opacity=".06"/>
  <text x="319" y="222" font-family="Arial, sans-serif" font-size="14" fill="{base}" letter-spacing="2">{escape(badge)} / VISTA GENERAL</text>
  <text x="319" y="260" font-family="Arial, sans-serif" font-size="31" font-weight="700" fill="#1b3553">{escape(word)}</text>
  <rect x="291" y="317" width="259" height="205" rx="15" fill="#f4f8fc"/>
  <rect x="569" y="317" width="278" height="205" rx="15" fill="#f4f8fc"/>
  <rect x="318" y="351" width="160" height="12" rx="6" fill="#b7c8d8"/>
  <rect x="318" y="386" width="33" height="103" rx="7" fill="{accent}" opacity=".55"/>
  <rect x="363" y="416" width="33" height="73" rx="7" fill="{base}" opacity=".72"/>
  <rect x="408" y="365" width="33" height="124" rx="7" fill="{accent}" opacity=".80"/>
  <rect x="453" y="398" width="33" height="91" rx="7" fill="{base}" opacity=".45"/>
  <path d="M596 465 L641 440 L686 453 L731 400 L775 373 L817 389" fill="none" stroke="{base}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="731" cy="400" r="8" fill="{accent}"/><circle cx="775" cy="373" r="8" fill="{accent}"/>
  <rect x="597" y="351" width="162" height="11" rx="6" fill="#b7c8d8"/>
  <rect x="597" y="497" width="212" height="6" rx="3" fill="#d4e0eb"/>
  <text x="80" y="586" font-family="Arial, sans-serif" font-size="16" fill="{base}">{escape(subtitle)}</text>
  <text x="870" y="586" font-family="Arial, sans-serif" font-size="12" text-anchor="end" fill="#64748b">Mockup conceptual · datos ilustrativos</text>
  </svg>'''
  (P/f'preview-{slug}.svg').write_text(g,encoding='utf8')
# portrait illustration relevant to design, no identifiable person
about='''<svg xmlns="http://www.w3.org/2000/svg" width="720" height="800" viewBox="0 0 720 800" role="img" aria-label="Ilustración de un espacio técnico con pantallas, diagramas y herramientas de software">
<defs><linearGradient id="p" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e5efff"/><stop offset="1" stop-color="#d9f5f2"/></linearGradient></defs>
<rect width="720" height="800" rx="36" fill="url(#p)"/><circle cx="550" cy="200" r="150" fill="#bfdbfe" opacity=".8"/>
<path d="M80 620h560" stroke="#93a9c2" stroke-width="20" stroke-linecap="round"/>
<rect x="108" y="225" width="504" height="345" rx="24" fill="#142b49"/>
<rect x="126" y="244" width="468" height="306" rx="12" fill="#f8fafc"/>
<rect x="152" y="277" width="187" height="101" rx="12" fill="#dbeafe"/>
<rect x="366" y="277" width="192" height="101" rx="12" fill="#e0e7ff"/>
<rect x="152" y="403" width="406" height="111" rx="12" fill="#e8f7f5"/>
<path d="M175 345l44-35 44 22 44-32" fill="none" stroke="#2563eb" stroke-width="6" stroke-linecap="round"/>
<path d="M388 343l40-26 38 16 40-36 28 9" fill="none" stroke="#0f766e" stroke-width="6" stroke-linecap="round"/>
<rect x="179" y="430" width="156" height="12" rx="6" fill="#94a3b8"/>
<rect x="179" y="463" width="212" height="9" rx="4" fill="#b8c8d8"/>
<rect x="426" y="430" width="100" height="47" rx="12" fill="#2563eb"/>
<path d="M300 572h120l26 48H273z" fill="#506c8e"/><rect x="260" y="623" width="200" height="22" rx="11" fill="#8296aa"/>
<rect x="480" y="638" width="94" height="48" rx="18" fill="#fff" stroke="#c9d8e7" stroke-width="4"/>
<path d="M515 640v35" stroke="#2563eb" stroke-width="5" stroke-linecap="round"/><path d="M515 661h34" stroke="#2563eb" stroke-width="5" stroke-linecap="round"/>
<circle cx="130" cy="135" r="16" fill="#2563eb"/><circle cx="194" cy="98" r="10" fill="#0f766e"/><path d="M146 130L184 103" stroke="#94a3b8" stroke-width="4"/>
<text x="360" y="740" font-family="Arial, sans-serif" font-size="23" text-anchor="middle" fill="#244267">Sistemas · Datos · Automatización</text>
</svg>'''
(P/'about-workspace.svg').write_text(about,encoding='utf8')
(P/'favicon.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#2563eb"/><text x="32" y="42" text-anchor="middle" font-family="Arial,sans-serif" font-size="29" font-weight="bold" fill="#fff">MB</text></svg>',encoding='utf8')
print('SVGs generated',list(p.name for p in P.glob('*.svg')))
