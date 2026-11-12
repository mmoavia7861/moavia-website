/* Accessible, persistent Light/Dark theme control for every public page. */
(() => {
  'use strict';
  const key = 'moaviaseo-theme';
  const root = document.documentElement;
  const system = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  const sun = '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
  const moon = '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.5A8.5 8.5 0 0 1 10.5 3.4a8.5 8.5 0 1 0 10.1 10.1Z"/></svg>';
  function saved() {
    try { return window.localStorage.getItem(key); } catch { return null; }
  }
  function current() {
    const stored = saved();
    if (stored === 'light' || stored === 'dark') return stored;
    return system && system.matches ? 'dark' : 'light';
  }
  function apply(theme) {
    const dark = theme === 'dark';
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    root.style.colorScheme = dark ? 'dark' : 'light';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#0b1322' : '#18243A');
    const button = document.getElementById('moavia-theme-toggle');
    if (button) {
      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      button.setAttribute('title', dark ? 'Switch to light mode' : 'Switch to dark mode');
      button.innerHTML = (dark ? sun : moon) + '<span>' + (dark ? 'Light mode' : 'Dark mode') + '</span>';
    }
  }
  function mount() {
    if (!document.body || document.getElementById('moavia-theme-toggle')) return;
    const button = document.createElement('button');
    button.id = 'moavia-theme-toggle';
    button.type = 'button';
    button.className = 'moavia-theme-toggle';
    button.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      try { window.localStorage.setItem(key, next); } catch { /* still applies to this page */ }
      apply(next);
    });
    document.body.appendChild(button);
    apply(current());
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
  if (system) {
    const onSystemChange = () => { if (!['dark', 'light'].includes(saved())) apply(current()); };
    if (system.addEventListener) system.addEventListener('change', onSystemChange);
    else if (system.addListener) system.addListener(onSystemChange);
  }
  window.addEventListener('storage', event => { if (event.key === key) apply(current()); });
})();
