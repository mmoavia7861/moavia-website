/* Decorative pointer halo. The native cursor is kept for accessibility. */
(() => {
  'use strict';
  if (!window.matchMedia || !document.body) return;

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let halo = null;
  let frame = 0;
  let targetX = 0, targetY = 0, x = 0, y = 0;
  let positioned = false;

  function enabled() { return finePointer.matches && !reduceMotion.matches; }

  function mount() {
    if (halo || !enabled()) return;
    halo = document.createElement('div');
    halo.className = 'moavia-cursor-halo';
    halo.setAttribute('aria-hidden', 'true');
    document.body.appendChild(halo);
  }

  function hide() {
    if (halo) halo.classList.remove('is-visible', 'is-hover', 'is-pressed');
  }

  function unmount() {
    hide();
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    if (halo) halo.remove();
    halo = null;
    positioned = false;
  }

  function paint() {
    frame = 0;
    if (!halo) return;
    x += (targetX - x) * 0.25;
    y += (targetY - y) * 0.25;
    halo.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%,-50%)';
    if (Math.abs(targetX - x) > 0.35 || Math.abs(targetY - y) > 0.35) {
      frame = requestAnimationFrame(paint);
    }
  }

  function onMove(event) {
    if (!enabled() || event.pointerType !== 'mouse') return;
    mount();
    if (!halo) return;
    targetX = event.clientX;
    targetY = event.clientY;
    if (!positioned) {
      x = targetX; y = targetY; positioned = true;
      halo.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%,-50%)';
    }
    halo.classList.add('is-visible');
    const el = event.target;
    const interactive = el instanceof Element && el.closest(
      'a, button, input, textarea, select, summary, label, [role="button"], [role="link"]'
    );
    halo.classList.toggle('is-hover', Boolean(interactive));
    if (!frame) frame = requestAnimationFrame(paint);
  }

  document.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('pointerdown', (event) => {
    if (halo && event.pointerType === 'mouse') halo.classList.add('is-pressed');
  }, { passive: true });
  document.addEventListener('pointerup', () => {
    if (halo) halo.classList.remove('is-pressed');
  }, { passive: true });
  document.addEventListener('pointercancel', hide, { passive: true });
  document.addEventListener('pointerout', (event) => {
    if (!event.relatedTarget) hide();
  }, { passive: true });
  document.addEventListener('visibilitychange', () => { if (document.hidden) hide(); });
  window.addEventListener('blur', hide);
  window.addEventListener('pagehide', hide);

  function sync() { if (enabled()) mount(); else unmount(); }
  for (const query of [finePointer, reduceMotion]) {
    if (query.addEventListener) query.addEventListener('change', sync);
    else if (query.addListener) query.addListener(sync);
  }
  sync();
})();
