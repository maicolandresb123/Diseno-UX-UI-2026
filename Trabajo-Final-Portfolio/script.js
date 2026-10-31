'use strict';

// Portfolio — interacción progresiva, sin dependencias ni servicios externos.
const menuButton = document.querySelector('.nav-toggle');
const menu = document.querySelector('#nav-principal');
const menuMedia = window.matchMedia('(min-width: 1100px)');

function closeMenu({ restoreFocus = false } = {}) {
  if (!menuButton || !menu) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
  menu.removeAttribute('data-open');
  document.body.classList.remove('menu-open');
  if (restoreFocus) menuButton.focus();
}

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const opening = menuButton.getAttribute('aria-expanded') !== 'true';
    if (opening) {
      menuButton.setAttribute('aria-expanded', 'true');
      menuButton.setAttribute('aria-label', 'Cerrar menú');
      menu.dataset.open = 'true';
      document.body.classList.add('menu-open');
    } else {
      closeMenu();
    }
  });
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu({ restoreFocus: true });
    }
  });
  document.addEventListener('click', (event) => {
    if (menuButton.getAttribute('aria-expanded') === 'true' && !menu.contains(event.target) && !menuButton.contains(event.target)) {
      closeMenu();
    }
  });
  menuMedia.addEventListener('change', (event) => {
    if (event.matches) closeMenu();
  });
}

function setupFilter(buttonSelector, itemSelector, attribute, statusId) {
  const buttons = [...document.querySelectorAll(buttonSelector)];
  const items = [...document.querySelectorAll(itemSelector)];
  const status = statusId ? document.getElementById(statusId) : null;
  if (!buttons.length || !items.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.getAttribute(attribute);
      buttons.forEach((b) => {
        const selected = b === button;
        b.setAttribute('aria-pressed', String(selected));
        b.classList.toggle('is-active', selected);
      });
      let visible = 0;
      items.forEach((item) => {
        const matches = value === 'todos' || value === 'todas' || item.dataset.projectType === value || item.dataset.certCategory === value;
        item.hidden = !matches;
        if (matches) visible++;
      });
      if (status) status.textContent = `${visible} resultados visibles para ${button.textContent.trim()}.`;
    });
  });
}

setupFilter('[data-project-filter]', '[data-project-type]', 'data-project-filter', 'project-filter-status');
// Las credenciales no saturan el one-page: seis destacadas hasta que el usuario amplíe.
const certButtons = [...document.querySelectorAll('[data-cert-filter]')];
const certCards = [...document.querySelectorAll('.cert-card')];
const certMoreButton = document.getElementById('cert-show-all');
const certStatus = document.getElementById('cert-filter-status');
if (certButtons.length && certCards.length && certMoreButton) {
  let active = 'todas';
  let expanded = false;
  function renderCertificates() {
    let visible = 0;
    certCards.forEach((card, index) => {
      const matches = active === 'todas' || card.dataset.certCategory === active;
      const capped = active === 'todas' && !expanded && index >= 6;
      card.hidden = !matches || capped;
      if (!card.hidden) visible++;
    });
    certMoreButton.hidden = active !== 'todas';
    certMoreButton.textContent = expanded ? 'Mostrar menos credenciales' : 'Ver todas las credenciales';
    certMoreButton.setAttribute('aria-expanded', String(expanded));
    certButtons.forEach((button) => {
      const pressed = button.dataset.certFilter === active;
      button.setAttribute('aria-pressed', String(pressed));
      button.classList.toggle('is-active', pressed);
    });
    if (certStatus) certStatus.textContent = `${visible} grupos de certificaciones visibles.`;
  }
  certButtons.forEach((button) => button.addEventListener('click', () => {
    active = button.dataset.certFilter;
    expanded = active !== 'todas';
    renderCertificates();
  }));
  certMoreButton.addEventListener('click', () => {
    expanded = !expanded;
    renderCertificates();
  });
  renderCertificates();
}

const year = document.getElementById('copyright-year');
if (year) year.textContent = String(new Date().getFullYear());

// La indicación de sección activa no bloquea la navegación por anclas.
if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const map = new Map(links.map((link) => [link.getAttribute('href').slice(1), link]));
  const sections = [...map.keys()].map((id) => document.getElementById(id)).filter(Boolean);
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (!visible.length) return;
    links.forEach((link) => link.removeAttribute('aria-current'));
    const active = map.get(visible[0].target.id);
    if (active) active.setAttribute('aria-current', 'location');
  }, { rootMargin: '-90px 0px -50% 0px', threshold: [0, 0.01, 0.2, 0.4] });
  sections.forEach((section) => observer.observe(section));
}
