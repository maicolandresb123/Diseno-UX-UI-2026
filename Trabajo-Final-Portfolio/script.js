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
filterItems('[data-cert-category]','data-cert-filter','[data-cert-filter]','cert-filter-status');
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

})();
