/* Progressive enhancement only: screenshot fallback and subtle depth shift.
   No analytics, remote JavaScript, automatic scrolling or user tracking. */
(() => {
  'use strict';
  document.querySelectorAll('img[data-portfolio-shot]').forEach(image => {
    const fallback = image.parentElement?.querySelector('[data-portfolio-fallback]');
    const onError = () => {
      // The local capture is the preferred, stable asset. Fall back only when
      // the browser really cannot load it; never leave a blank screenshot box.
      if (image.dataset.fallbackAttempted !== 'true' && image.dataset.fallbackSrc) {
        image.dataset.fallbackAttempted = 'true';
        image.src = image.dataset.fallbackSrc;
        return;
      }
      image.hidden = true;
      if (fallback) fallback.hidden = false;
    };
    image.addEventListener('error', onError);
    if (image.complete && image.naturalWidth === 0) onError();
  });
  const stage = document.querySelector('[data-webcase-parallax]');
  if (!stage || !window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
  stage.addEventListener('pointermove', event => {
    const r = stage.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - r.left) / r.width - .5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - r.top) / r.height - .5) * 2));
    stage.style.setProperty('--px', x.toFixed(3));
    stage.style.setProperty('--py', y.toFixed(3));
  }, { passive: true });
  stage.addEventListener('pointerleave', () => {
    stage.style.setProperty('--px', '0');
    stage.style.setProperty('--py', '0');
  });
})();
