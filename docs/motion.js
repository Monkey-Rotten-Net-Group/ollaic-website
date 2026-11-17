(() => {
  const root = document.documentElement;
  const staticView = new URLSearchParams(location.search).get('view') === 'flow';
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('.site-header');
  const sections = [...document.querySelectorAll('.scroll-scene')];
  const select = (selector) => document.querySelector(selector);
  const clamp = (value) => Math.min(1, Math.max(0, value));
  const range = (value, start, end) => clamp((value - start) / (end - start));
  const smooth = (value) => value * value * (3 - 2 * value);
  const nodes = Object.fromEntries(
    [
      '.hero-wordmark',
      '.hero-kicker',
      '.hero-copy',
      '.hero-plane',
      '.hero-overview',
      '.structure-copy',
      '.story-map',
      '.scene-seed',
      '.structure-bottom',
      '.path-chosen',
      '.scene',
      '.scene-environment',
      '.inspector-plane',
      '.scene h2',
      '.scene-description',
      '.production-copy',
      '.production-type',
      '.flow-plane',
      '.memory-plane',
      '.playback-copy',
      '.playback-plane',
      '.export-copy',
      '.export-type',
      '.export-path path',
    ].map((selector) => [selector, select(selector)]),
  );
  let scheduled = false;
  let geometry = [];
  const style = (selector, values) => Object.assign(nodes[selector].style, values);

  function measure() {
    geometry = sections.map((section) => ({
      section,
      top: section.offsetTop,
      distance: Math.max(1, section.offsetHeight - innerHeight),
    }));
    requestRender();
  }

  function render() {
    scheduled = false;
    const y = window.scrollY;
    const darkSections = ['scenes', 'production', 'playback'];
    const active = [...document.querySelectorAll('main > section, .journey, footer')].find(
      (section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= 36 && bounds.bottom > 36;
      },
    );
    header.classList.toggle(
      'is-dark',
      darkSections.includes(active?.id) ||
        active?.tagName === 'FOOTER' ||
        (active?.id === 'journey' &&
          y > active.offsetTop + (active.offsetHeight - innerHeight) * 0.65),
    );
    if (preference.matches || staticView) return;
    const [hero, journey, production, playback] = geometry.map(({ top, distance }) =>
      clamp((y - top) / distance),
    );
    const structure = range(journey, 0, 0.65);
    const scene = range(journey, 0.65, 1);
    style('.scene', { opacity: range(journey, 0.65, 0.72) });
    const h = smooth(hero);
    style('.hero-wordmark', {
      transform: `translate(${-h * 10}vw, ${-h * 20}vh) scale(${1 + h * 0.15})`,
      opacity: 1 - range(hero, 0.1, 0.65),
    });
    style('.hero-kicker', { opacity: 1 - range(hero, 0, 0.3) });
    style('.hero-copy', {
      transform: `translateY(${-h * 160}px)`,
      opacity: 1 - range(hero, 0.05, 0.48),
      visibility: hero > 0.6 ? 'hidden' : 'visible',
    });
    style('.hero-plane', {
      left: `${45 - h * 33}%`,
      top: `${43 - h * 17}%`,
      width: `${65 + h * 11}%`,
      transform: `perspective(1600px) rotateY(${-7 + h * 7}deg) rotateZ(${-7 + h * 7}deg)`,
    });
    style('.hero-overview', {
      opacity: range(hero, 0.65, 0.95),
      transform: `translateY(${(1 - h) * 30}px)`,
    });

    const expand = smooth(range(structure, 0.63, 1));
    style('.path-chosen', { strokeDashoffset: 1 - range(structure, 0, 0.6) });
    style('.story-map', {
      transform: `translateX(${-expand * 80}px)`,
      opacity: 1 - range(structure, 0.68, 0.9),
    });
    style('.structure-copy', {
      transform: `translateX(${-expand * 120}px)`,
      opacity: 1 - range(structure, 0.65, 0.88),
    });
    style('.structure-bottom', { opacity: 1 - range(structure, 0.6, 0.8) });
    style('.scene-seed', {
      opacity: range(structure, 0.38, 0.6),
      width: `${12 + expand * 88}%`,
      height: `${19 + expand * 81}%`,
      right: `${4 * (1 - expand)}%`,
      top: `${37 * (1 - expand)}%`,
    });
    style('.scene-environment', {
      transform: `scale(${1 + scene * 0.08}) translateX(${-scene * 1.5}%)`,
    });
    style('.inspector-plane', {
      transform: `translateY(${(1 - smooth(range(scene, 0, 0.7))) * 130}px) rotate(${5 - scene * 7}deg)`,
    });
    style('.scene h2', { transform: `translateY(${-scene * 50}px)` });
    style('.scene-description', { transform: `translateY(${-scene * 20}px)` });

    const f = smooth(production);
    style('.production-type', { transform: `translateX(${-f * 100}px) rotate(${-9 + f * 9}deg)` });
    style('.production-copy', { transform: `translateY(${-f * 35}px)` });
    style('.flow-plane', {
      transform: `translate(${-f * 70}px, ${-f * 45}px) rotate(${5 - f * 6}deg)`,
    });
    style('.memory-plane', {
      transform: `translate(${f * 55}px, ${-f * 90}px) rotate(${-8 + f * 11}deg)`,
    });

    const e = smooth(range(playback, 0.15, 0.85));
    style('.playback-copy', {
      transform: `translateY(${-e * 100}px)`,
      opacity: 1 - range(playback, 0.12, 0.45),
    });
    style('.playback-plane', {
      left: `${-4 + e * 8}%`,
      top: `${24 + e * 7}%`,
      width: `${67 - e * 37}%`,
      transform: `perspective(1600px) rotateY(${8 - e * 8}deg) rotateZ(${-3 + e * 3}deg)`,
    });
    style('.export-path path', { strokeDashoffset: 1 - range(playback, 0.4, 0.82) });
    style('.export-copy', {
      opacity: range(playback, 0.45, 0.72),
      transform: `translateY(${(1 - e) * 50}px)`,
    });
    style('.export-type', {
      opacity: range(playback, 0.65, 0.95),
      transform: `translateY(${(1 - e) * 100}px)`,
    });
  }

  function requestRender() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(render);
    }
  }

  function configure() {
    root.classList.toggle('motion', !preference.matches && !staticView);
    if (preference.matches || staticView)
      Object.values(nodes).forEach((node) => node.removeAttribute('style'));
    measure();
  }
  addEventListener('scroll', requestRender, { passive: true });
  addEventListener('resize', measure);
  preference.addEventListener('change', configure);
  document.fonts.ready.then(() => {
    measure();
    const parameters = new URLSearchParams(location.search);
    const chapter = [...sections, select('#download'), select('footer')].find(
      (section) => section.id === parameters.get('chapter'),
    );
    if (chapter && !preference.matches && !staticView) {
      const progress = clamp(Number(parameters.get('progress')) || 0);
      scrollTo({
        top:
          chapter.offsetTop +
          Math.max(0, chapter.offsetHeight - innerHeight) * progress +
          (Number(parameters.get('offset')) || 0),
        behavior: 'instant',
      });
    }
  });
  configure();
})();
