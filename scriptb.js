/* scripts.js
   - Controls program-bar indicator movement and mobile menu toggle
   - Lightweight, dependency-free
*/

document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('primaryMenu');
  const items = Array.from(menu.querySelectorAll('.menu-item a'));
  const indicator = menu.querySelector('.indicator');
  const toggle = document.getElementById('menuToggle');

  // position the indicator under the first item initially
  function updateIndicator(el) {
    if (!el || window.innerWidth <= 720) return;
    const rect = el.getBoundingClientRect();
    const parentRect = menu.getBoundingClientRect();
    const offsetLeft = rect.left - parentRect.left;
    // place indicator with some padding
    indicator.style.width = `${rect.width + 12}px`;
    indicator.style.transform = `translateX(${offsetLeft - 6}px)`;
  }

  // set first active to Programs by default (index 1) if present, otherwise first
  const defaultIndex = Math.min(1, items.length - 1);
  let active = items[defaultIndex] || items[0];
  updateIndicator(active);

  // hover behavior: slide indicator to hovered link
  items.forEach((a) => {
    a.addEventListener('mouseenter', () => {
      updateIndicator(a);
    });
    a.addEventListener('focus', () => {
      updateIndicator(a);
    });
    a.addEventListener('click', (e) => {
      // if it's an in-page anchor, smooth scroll
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // set active permanently
      active = a;
      updateIndicator(active);
      // close mobile menu if open
      if (menu.classList.contains('open')) toggleMenu(false);
    });
    a.addEventListener('mouseleave', () => {
      // return to active when leaving
      updateIndicator(active);
    });
  });

  // When window resizes, recalc indicator
  window.addEventListener('resize', () => {
    setTimeout(() => updateIndicator(active), 60);
  });

  // Mobile menu toggle
  function toggleMenu(force) {
    const isOpen = typeof force === 'boolean' ? !!force : !menu.classList.contains('open');
    if (isOpen) {
      menu.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.classList.add('open');
    } else {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.classList.remove('open');
    }
  }
  toggle.addEventListener('click', () => toggleMenu());

  // small nicety: indicator follows scroll into section
  const sections = document.querySelectorAll('main section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const linked = items.find(a => a.getAttribute('href') === `#${id}`);
        if (linked) {
          active = linked;
          updateIndicator(active);
        }
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => observer.observe(s));

  // set year in footer
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
