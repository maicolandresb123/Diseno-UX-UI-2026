(function () {
'use strict';
// MB Electric Flow. Sin frameworks ni llamadas a servicios externos.
const root = document.documentElement;
root.classList.add('has-js');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const themeToggles = [...document.querySelectorAll('[data-theme-toggle]')];
function renderTheme() {
  const theme = root.dataset.theme === 'light' ? 'light' : 'dark';
  themeToggles.forEach((button) => {
    button.setAttribute('aria-pressed', String(theme === 'light'));
    button.setAttribute('aria-label', theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro');
    button.setAttribute('title', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    const icon = button.querySelector('svg');
    if (icon) icon.innerHTML = theme === 'dark'
      ? '<path d="M20.2 14.1A8.5 8.5 0 0 1 9.9 3.8a8.5 8.5 0 1 0 10.3 10.3Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>'
      : '<circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>';
  });
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0A1020' : '#F8FAFC');
}
renderTheme();
themeToggles.forEach(button => button.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('mb-theme', next); } catch (_) { /* file:// private mode */ }
  renderTheme();
}));
// Mobile menu
const menuButton = document.querySelector('.nav-toggle');
const menu = document.getElementById('nav-principal');
function closeMenu(focus = false) {
  if (!menuButton || !menu) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
  menu.removeAttribute('data-open');
  document.body.classList.remove('menu-open');
  if (focus) menuButton.focus();
}
if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    if (open) menu.setAttribute('data-open', 'true'); else menu.removeAttribute('data-open');
    document.body.classList.toggle('menu-open', open);
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(true); });
  document.addEventListener('click', e => { if (!menu.contains(e.target) && !menuButton.contains(e.target)) closeMenu(); });
  matchMedia('(min-width: 1181px)').addEventListener('change', e => { if (e.matches) closeMenu(); });
}
// Motion: IntersectionObserver with reduced-motion fallback.
const revealed = [...document.querySelectorAll('.reveal')];
if (!reduceMotion.matches && 'IntersectionObserver' in window) {
  const obs = new IntersectionObserver((entries, observer) => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  }), { rootMargin: '0px 0px 60px 0px', threshold: 0.05 });
  revealed.forEach(el => obs.observe(el));
} else revealed.forEach(el => el.classList.add('is-visible'));
// Lightweight pointer highlight on non-touch devices only.
if (matchMedia('(hover:hover) and (pointer:fine)').matches && !reduceMotion.matches) {
  document.querySelectorAll('.glow-card').forEach(card => card.addEventListener('pointermove', event => {
    const b = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${event.clientX - b.left}px`);
    card.style.setProperty('--my', `${event.clientY - b.top}px`);
  }));
}
// Project and credential filters, progressive and keyboard accessible.
function filterItems(selector, dataProp, group, statusId) {
  const buttons = [...document.querySelectorAll(group)];
  const cards = [...document.querySelectorAll(selector)];
  const status = document.getElementById(statusId);
  if (!cards.length || !buttons.length) return;
  buttons.forEach(btn => btn.addEventListener('click', () => {
    const target = btn.getAttribute(dataProp);
    let count = 0;
    buttons.forEach(b => {const active=b===btn;b.setAttribute('aria-pressed',String(active));b.classList.toggle('is-active',active);});
    cards.forEach(card => {
      const matches = target === 'todos' || target === 'todas' || card.dataset.projectType === target || card.dataset.certCategory === target;
      card.hidden = !matches;
      if (matches) {count++;card.classList.add('is-visible');}
    });
    if(status) status.textContent = `${count} resultados para ${btn.textContent.trim()}.`;
  }));
}
filterItems('[data-project-type]','data-project-filter','[data-project-filter]','project-filter-status');
// Certificaciones: el buscador y los filtros se combinan más abajo.
// When a source image from the public SC repo is unreachable, show an explicit conceptual local fallback.
document.querySelectorAll('img[data-fallback]').forEach(img => img.addEventListener('error', () => {
  if (!img.dataset.fallback || img.src.endsWith(img.dataset.fallback)) return;
  img.src = img.dataset.fallback;
  img.alt += ' (mostrando ilustración conceptual porque el recurso de origen no está disponible)';
}));
// Mailto form — doesn't claim to send anything without user's mail client.
const contactForm = document.getElementById('contact-form');
if (contactForm) contactForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const fd=new FormData(contactForm);
  const name=String(fd.get('nombre')||'').trim(), email=String(fd.get('email')||'').trim();
  const type=String(fd.get('tipo')||'Consulta'), msg=String(fd.get('mensaje')||'').trim();
  const subject=`Portfolio MB — ${type}`;
  const body=`Hola Maikol,\n\nSoy ${name} (${email}).\nMotivo: ${type}\n\n${msg}\n\nSaludos,\n${name}`;
  const href=`mailto:maicolandresbetancourth@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const status=document.getElementById('contact-status');
  if(status)status.textContent='Tu aplicación de correo se abrirá para revisar el mensaje. Si no se abre, podés escribir directamente al correo indicado.';
  window.location.href=href;
});
const year = document.getElementById('copyright-year');
if(year) year.textContent = String(new Date().getFullYear());

// Buscador y filtros combinados en la galería de certificados.
const certSearch = document.getElementById('cert-search');
const certFilterButtons = [...document.querySelectorAll('[data-cert-filter]')];
const certCards = [...document.querySelectorAll('.cert-card[data-cert-category]')];
const avevaCollection = document.getElementById('aveva-collection');
const certFilterStatus = document.getElementById('cert-filter-status');
function normalizeSearch(value) {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}
function filterCertificates() {
  if (!certCards.length) return;
  const active = certFilterButtons.find(b => b.getAttribute('aria-pressed') === 'true');
  const category = active?.dataset.certFilter || 'todas';
  const query = normalizeSearch(certSearch?.value).trim();
  let matches = 0, avevaMatches = 0;
  certCards.forEach(card => {
    const byCategory = category === 'todas' || card.dataset.certCategory === category;
    const byText = !query || normalizeSearch(card.dataset.certSearch || card.textContent).includes(query);
    const shown = byCategory && byText;
    card.hidden = !shown;
    if (shown) {
      matches++;
      card.classList.add('is-visible');
      if (card.closest('.aveva-collection')) avevaMatches++;
    }
  });
  if (avevaCollection) {
    avevaCollection.hidden = avevaMatches === 0;
    if (query && avevaMatches > 0) openAvevaCollection();
  }
  if (certFilterStatus) certFilterStatus.textContent = matches === 1
    ? '1 credencial coincide con la búsqueda.'
    : `${matches} credenciales coinciden con la búsqueda.`;
}
function openAvevaCollection() { if (avevaCollection) avevaCollection.open = true; }
if (certCards.length) {
  certFilterButtons.forEach(button => button.addEventListener('click', () => {
    certFilterButtons.forEach(other => {
      const selected = other === button;
      other.setAttribute('aria-pressed', String(selected));
      other.classList.toggle('is-active', selected);
    });
    filterCertificates();
  }));
  certSearch?.addEventListener('input', filterCertificates);
  filterCertificates();
}
// Visor nativo con enfoque/restauración, Escape y navegación a documentos visibles.
const certDialog = document.getElementById('cert-modal');
const previewButtons = [...document.querySelectorAll('[data-cert-preview]')];
let lastCertTrigger = null, certActiveButton = null;
function visibleCerts() {
  return previewButtons.filter(button => !button.closest('[hidden]') &&
    (!button.closest('details') || button.closest('details').open));
}
function showCert(button) {
  if (!button || !certDialog) return;
  const path = button.dataset.certSrc;
  const label = button.dataset.certTitle || 'Certificado';
  const issuer = button.dataset.certIssuer || '';
  if (!path || !path.startsWith('assets/certificados/')) return;
  certActiveButton = button;
  const image = document.getElementById('cert-modal-image');
  const title = document.getElementById('cert-modal-title');
  const meta = document.getElementById('cert-modal-meta');
  const open = document.getElementById('cert-modal-open');
  const verify = document.getElementById('cert-modal-verify');
  if (image) { image.src = path; image.alt = `Vista pública del certificado ${label}. ${issuer}`; }
  if (title) title.textContent = label;
  if (meta) meta.textContent = issuer;
  if (open) open.href = path;
  if (verify) {
    const url = button.dataset.certVerify;
    const verifiedHost = url && /^https:\/\/www\.credly\.com\//.test(url);
    verify.hidden = !verifiedHost;
    if (verifiedHost) verify.href = url; else verify.removeAttribute('href');
  }
}
if (certDialog && previewButtons.length) {
  previewButtons.forEach(button => button.addEventListener('click', () => {
    lastCertTrigger = button;
    showCert(button);
    if (!certDialog.open) certDialog.showModal();
    certDialog.querySelector('[data-cert-close]')?.focus();
  }));
  certDialog.querySelector('[data-cert-close]')?.addEventListener('click', () => certDialog.close());
  certDialog.addEventListener('click', event => { if (event.target === certDialog) certDialog.close(); });
  certDialog.addEventListener('close', () => {
    lastCertTrigger?.focus();
    const image = document.getElementById('cert-modal-image');
    if (image) image.removeAttribute('src');
  });
  function stepCertificate(shift) {
    const available = visibleCerts();
    const current = available.indexOf(certActiveButton);
    if (!available.length || current < 0) return;
    const next = available[(current + shift + available.length) % available.length];
    showCert(next);
  }
  certDialog.querySelectorAll('[data-cert-step]').forEach(button => button.addEventListener('click', () => {
    stepCertificate(Number(button.dataset.certStep) || 1);
  }));
  certDialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); stepCertificate(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); stepCertificate(-1); }
  });
}
// Vistas reales de SC bajo demanda: el usuario decide cargar la demo externa.
const scDemoFrame = document.getElementById('sc-demo-frame');
const scDemoLink = document.getElementById('sc-demo-direct');
const scDemoStatus = document.getElementById('sc-demo-status');
const scDemoPlaceholder = document.getElementById('sc-demo-placeholder');
const scDemoButtons = [...document.querySelectorAll('[data-sc-demo]')];
scDemoButtons.forEach(button => button.addEventListener('click', () => {
  const url = button.dataset.scDemo;
  let parsed;
  try { parsed = new URL(url); } catch (_) { return; }
  if (parsed.protocol !== 'https:' || parsed.hostname !== 'scsolucionesconectadas.com.ar') return;
  scDemoButtons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  if (scDemoFrame) { scDemoFrame.src = parsed.href; scDemoFrame.hidden = false; }
  if (scDemoPlaceholder) scDemoPlaceholder.hidden = true;
  if (scDemoLink) scDemoLink.href = parsed.href;
  if (scDemoStatus) scDemoStatus.textContent = `Se solicitó la vista real de ${button.textContent.trim()}. Si no aparece, abrí la demo en una pestaña nueva.`;
}));


// Galería de evidencias reales de las demos públicas SC; navegación accesible.
const scShots = [...document.querySelectorAll('[data-sc-ui-src]')];
const scModal = document.getElementById('sc-ui-modal');
let scLastTrigger = null;
let scActiveIndex = 0;
function renderScShot(index) {
  if (!scModal || !scShots.length) return;
  scActiveIndex = (index + scShots.length) % scShots.length;
  const trigger = scShots[scActiveIndex];
  const src = trigger.dataset.scUiSrc;
  if (!/^assets\/img\/sc-demo-(medica|hoteleria|logistica)-interfaz\.webp$/.test(src || '')) return;
  const img = document.getElementById('sc-ui-modal-image');
  if (img) {
    img.src = src;
    img.alt = `Captura ampliada de la interfaz SC. ${trigger.dataset.scUiTitle}. Información ficticia.`;
  }
  const title = document.getElementById('sc-ui-modal-title');
  const desc = document.getElementById('sc-ui-modal-desc');
  if (title) title.textContent = trigger.dataset.scUiTitle || 'Demostración SC';
  if (desc) desc.textContent = trigger.dataset.scUiDesc || 'Datos ficticios.';
}
if (scModal && scShots.length) {
  scShots.forEach((trigger,index) => trigger.addEventListener('click',() => {
    scLastTrigger = trigger;
    renderScShot(index);
    scModal.showModal();
    scModal.querySelector('[data-sc-ui-close]')?.focus();
  }));
  scModal.querySelector('[data-sc-ui-close]')?.addEventListener('click',() => scModal.close());
  scModal.querySelectorAll('[data-sc-ui-step]').forEach(button => button.addEventListener('click',() => {
    renderScShot(scActiveIndex + Number(button.dataset.scUiStep));
  }));
  scModal.addEventListener('click',event => {
    if (event.target === scModal) scModal.close();
  });
  scModal.addEventListener('keydown',event => {
    if (event.key === 'ArrowRight') {event.preventDefault();renderScShot(scActiveIndex+1);}
    if (event.key === 'ArrowLeft') {event.preventDefault();renderScShot(scActiveIndex-1);}
  });
  scModal.addEventListener('close',() => {
    document.getElementById('sc-ui-modal-image')?.removeAttribute('src');
    scLastTrigger?.focus();
  });
}

})();
