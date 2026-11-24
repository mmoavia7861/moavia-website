/* Hand-crafted, dependency-free dimensional illustrations for portfolio skill pages.
 * Decorative only: no tracking, remote assets, WebGL, scroll listeners or animations in JS.
 * Elements are created only when near the viewport to keep startup lightweight.
 */
(() => {
  'use strict';
  const el = (tag, cls, value) => {
    const item = document.createElement(tag);
    if (cls) item.className = cls;
    if (value !== undefined) item.textContent = value;
    return item;
  };
  const add = (parent, ...items) => { items.forEach(item => parent.appendChild(item)); return parent; };
  const dots = (parent, count, cls) => {
    for (let i = 0; i < count; i++) parent.appendChild(el('i', cls));
    return parent;
  };
  function browserScene(stage, isShop) {
    const browser = el('div', 'craft3d-browser craft3d-float-main');
    const chrome = el('div', 'craft3d-browser-chrome');
    add(chrome, dots(el('div', 'craft3d-window-dots'), 3, ''), el('div', 'craft3d-address', isShop ? 'shop.example / storefront' : 'yourbrand.com / projects'));
    const ui = el('div', 'craft3d-browser-ui');
    const nav = el('div', 'craft3d-browser-nav');
    add(nav, el('span', 'craft3d-ui-brand', isShop ? 'ATELIER / SHOP' : 'STUDIO / WEB'), el('span', 'craft3d-ui-navlink', 'Home   Work   Contact'));
    const hero = el('div', 'craft3d-browser-content');
    const copy = el('div', 'craft3d-ui-copy');
    add(copy, el('span', 'craft3d-eyebrow', isShop ? 'THE NEW COLLECTION' : 'MODERN DIGITAL EXPERIENCES'),
      el('strong', 'craft3d-ui-title', isShop ? 'Made for everyday.' : 'Design that connects.'),
      el('span', 'craft3d-ui-description', isShop ? 'Thoughtful products, better experiences.' : 'Beautiful. Fast. Made to perform.'),
      el('i', 'craft3d-ui-button'));
    const visual = el('div', isShop ? 'craft3d-product-art' : 'craft3d-page-art');
    add(visual, el('div', 'craft3d-art-glow'), el('div', 'craft3d-art-cube'), el('div', 'craft3d-art-ring'));
    add(hero, copy, visual);
    const foot = dots(el('div', 'craft3d-ui-cards'), 3, '');
    add(ui, nav, hero, foot);
    add(browser, chrome, ui);
    const smallPanel = el('div', 'craft3d-floating-panel craft3d-panel-left');
    add(smallPanel, el('i', 'craft3d-panel-icon'), el('span', '', isShop ? 'Secure checkout' : 'Responsive UI'));
    const metric = el('div', 'craft3d-floating-panel craft3d-panel-right');
    add(metric, el('span', 'craft3d-mini-dot'), el('span', '', isShop ? 'Storefront UX' : 'Clean components'));
    add(stage, browser, smallPanel, metric);
  }
  function androidScene(stage) {
    const phone = el('div', 'craft3d-phone craft3d-float-main');
    const screen = el('div', 'craft3d-phone-screen');
    const status = el('div', 'craft3d-phone-status');
    add(status, el('span', '', '9:41'), el('span', '', '●●●  ▰'));
    const head = el('div', 'craft3d-phone-head');
    add(head, el('span', 'craft3d-app-kicker', 'MOBILE STUDIO'),
      el('strong', '', 'Everything in one place.'),
      el('span', 'craft3d-app-body', 'Simple flows. Thoughtful details.'));
    const feature = el('div', 'craft3d-phone-feature');
    add(feature, el('span', 'craft3d-phone-feature-glyph', '✦'),
      el('strong', '', 'Hello, Android'), el('span', '', 'A cleaner way to build.'));
    const tileGrid = dots(el('div', 'craft3d-phone-tiles'), 4, '');
    const nav = dots(el('div', 'craft3d-phone-bottom-nav'), 3, '');
    add(screen, el('div', 'craft3d-phone-notch'), status, head, feature, tileGrid, nav);
    add(phone, screen);
    const left = el('div', 'craft3d-floating-panel craft3d-android-left');
    add(left, el('span', 'craft3d-mini-dot'), el('span', '', 'Kotlin · Compose'));
    const right = el('div', 'craft3d-floating-panel craft3d-android-right');
    add(right, el('i', 'craft3d-panel-icon'), el('span', '', 'Mobile UI'));
    add(stage, phone, left, right);
  }
  function aiScene(stage) {
    const flow = el('div', 'craft3d-flow-lines');
    dots(flow, 4, 'craft3d-flow-track');
    const core = el('div', 'craft3d-core craft3d-float-main');
    const face = el('div', 'craft3d-core-front');
    add(face, el('span', 'craft3d-core-symbol', '✳'), el('span', 'craft3d-core-label', 'AI'));
    add(core, el('div', 'craft3d-core-back'), face);
    const nodes = [
      ['craft3d-node-trigger', '01', 'INPUT'],
      ['craft3d-node-think', '02', 'REASON'],
      ['craft3d-node-process', '03', 'PROCESS'],
      ['craft3d-node-output', '04', 'OUTPUT'],
    ];
    add(stage, flow, core);
    for (const [cls, count, label] of nodes) {
      const node = el('div', 'craft3d-flow-node ' + cls);
      add(node, el('span', 'craft3d-node-index', count), el('strong', '', label));
      stage.appendChild(node);
    }
    const footer = el('div', 'craft3d-ai-footnote');
    add(footer, el('span', 'craft3d-mini-dot'), el('span', '', 'Connected workflows'));
    stage.appendChild(footer);
  }
  function render(host) {
    if (host.dataset.sceneReady === 'true') return;
    const kind = host.getAttribute('data-skill-scene');
    if (!['web', 'commerce', 'android', 'ai'].includes(kind)) return;
    host.dataset.sceneReady = 'true';
    const stage = el('div', 'craft3d-stage craft3d-stage--' + kind);
    stage.setAttribute('aria-hidden', 'true');
    add(stage, el('div', 'craft3d-halo'), el('div', 'craft3d-ground'), el('div', 'craft3d-floor-grid'));
    if (kind === 'web' || kind === 'commerce') browserScene(stage, kind === 'commerce');
    else if (kind === 'android') androidScene(stage);
    else aiScene(stage);
    host.appendChild(stage);
  }
  const hosts = Array.from(document.querySelectorAll('[data-skill-scene]'));
  if (!('IntersectionObserver' in window)) {
    hosts.forEach(render);
    return;
  }
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      entry.target.classList.toggle('craft3d-in-view', entry.isIntersecting);
      if (entry.isIntersecting) render(entry.target);
    }
  }, { rootMargin: '160px 0px' });
  hosts.forEach(host => observer.observe(host));
})();
