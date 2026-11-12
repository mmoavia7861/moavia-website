/* Set theme before first paint to avoid a light-mode flash. */
(() => {
  'use strict';
  const key = 'moaviaseo-theme';
  let saved = null;
  try { saved = window.localStorage.getItem(key); } catch { /* private browsing */ }
  let systemDark = false;
  try { systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches; } catch {}
  const theme = saved === 'dark' || saved === 'light' ? saved : (systemDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;
})();
