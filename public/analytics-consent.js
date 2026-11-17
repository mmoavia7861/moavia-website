// Optional Google Analytics for moaviaseo.com.
// A visitor's choice is stored locally. The Google tag is not requested before opt-in.
(() => {
  'use strict';
  const storageKey = 'moaviaseo-analytics-consent-v1';
  const googleTagId = 'GTM-P5D8P76T';
  let googleTagStarted = false;

  function readChoice() {
    try { return window.localStorage.getItem(storageKey); } catch { return null; }
  }

  function startGoogleAnalytics() {
    if (googleTagStarted || document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) return;
    googleTagStarted = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(googleTagId);
    document.head.appendChild(tag);
  }

  if (readChoice() === 'accepted') startGoogleAnalytics();

  const styles = document.createElement('style');
  styles.textContent =
    '.moavia-analytics-consent{position:fixed;bottom:16px;left:16px;right:16px;z-index:2147483000;max-width:680px;margin:0 auto;padding:18px 20px;background:#fff;color:#17233a;border:1px solid #d1d8e4;border-radius:14px;box-shadow:0 12px 44px rgba(0,0,0,.25);font:14px/1.55 system-ui,-apple-system,sans-serif}' +
    '.moavia-analytics-consent h2{font-size:17px;margin:0 0 6px;color:#17233a}' +
    '.moavia-analytics-consent p{margin:0 0 12px;color:#344054}' +
    '.moavia-analytics-consent a{color:#245ac5;text-decoration:underline}' +
    '.moavia-analytics-actions{display:flex;flex-wrap:wrap;gap:9px}' +
    '.moavia-analytics-actions button{min-height:40px;padding:9px 16px;border-radius:9px;border:1px solid #245ac5;cursor:pointer;font:600 14px system-ui,sans-serif}' +
    '.moavia-analytics-allow{background:#245ac5;color:#fff}' +
    '.moavia-analytics-reject{background:#fff;color:#245ac5}' +
    '@media(max-width:460px){.moavia-analytics-consent{bottom:8px;left:8px;right:8px;padding:14px}.moavia-analytics-actions button{flex:1}}';
  document.head.appendChild(styles);

  let banner;
  function saveChoice(choice) {
    try { window.localStorage.setItem(storageKey, choice); } catch { /* Privacy settings unavailable. */ }
    if (banner) { banner.remove(); banner = null; }
    if (choice === 'accepted') startGoogleAnalytics();
    // If consent is withdrawn on a page that already loaded the tag, reload
    // so no further Google Analytics events run on this document.
    else if (googleTagStarted) window.location.reload();
  }

  function showPreferences() {
    if (banner) return;
    banner = document.createElement('section');
    banner.className = 'moavia-analytics-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-labelledby', 'moavia-analytics-heading');

    const heading = document.createElement('h2');
    heading.id = 'moavia-analytics-heading';
    heading.textContent = 'Optional website analytics';
    const description = document.createElement('p');
    description.textContent = 'Can we use Google Analytics to measure visits and improve the website? It is optional and will load only if you allow it. ';
    const privacyLink = document.createElement('a');
    privacyLink.href = '/privacy-policy/';
    privacyLink.textContent = 'Privacy Policy';
    description.appendChild(privacyLink);

    const actions = document.createElement('div');
    actions.className = 'moavia-analytics-actions';
    const allow = document.createElement('button');
    allow.type = 'button';
    allow.className = 'moavia-analytics-allow';
    allow.textContent = 'Allow analytics';
    allow.addEventListener('click', () => saveChoice('accepted'));
    const reject = document.createElement('button');
    reject.type = 'button';
    reject.className = 'moavia-analytics-reject';
    reject.textContent = 'Reject';
    reject.addEventListener('click', () => saveChoice('rejected'));
    actions.append(allow, reject);
    banner.append(heading, description, actions);
    document.body.appendChild(banner);
  }

  document.addEventListener('click', (event) => {
    const anchor = event.target.closest && event.target.closest('a[href$="#analytics-preferences"]');
    if (anchor && new URL(anchor.href, window.location.href).pathname === '/privacy-policy/') showPreferences();
  });
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#analytics-preferences') showPreferences();
  });
  if (readChoice() !== 'accepted' && readChoice() !== 'rejected' ||
      window.location.hash === '#analytics-preferences') showPreferences();
})();
