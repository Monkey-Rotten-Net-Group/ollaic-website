(() => {
  const root = document.documentElement;
  if (!root.classList.contains('is-loading')) return;
  const loader = document.querySelector('.opening-loader');
  const background = [...document.body.children].filter((node) => node !== loader && node.tagName !== 'SCRIPT');
  background.forEach((node) => { node.inert = true; });
  let left = false;
  window.leaveOpening = () => {
    if (left) return;
    left = true;
    clearTimeout(window.openingFallback);
    const short = matchMedia('(prefers-reduced-motion: reduce)').matches || new URLSearchParams(location.search).get('view') === 'flow';
    root.classList.toggle('opening-short', short);
    root.classList.add('opening-exit');
    root.classList.remove('is-loading');
    root.removeAttribute('aria-busy');
    loader.setAttribute('aria-hidden', 'true');
    background.forEach((node) => { node.inert = false; });
    setTimeout(() => { root.classList.remove('opening-exit', 'opening-short'); loader.hidden = true; }, short ? 150 : 1100);
  };
  document.fonts.load('600 64px Fredoka').then(() => loader.classList.add('is-typed'));
  const image = document.querySelector('img[src="assets/stage-study.png"]');
  const fonts = Promise.all([document.fonts.load('600 64px Fredoka'), document.fonts.load('400 16px "Noto Sans SC"'), document.fonts.load('700 16px "Noto Sans SC"')]).then(() => document.fonts.ready);
  const ready = Promise.all([fonts, image.decode(), new Promise((resolve) => setTimeout(resolve, Math.max(0, 1100 - (performance.now() - window.openingStarted))))]);
  ready.then(window.leaveOpening).catch(() => {});
  if (performance.now() - window.openingStarted >= 5000) window.leaveOpening();
})();

(() => {
  const root = document.documentElement;
  const parameters = new URLSearchParams(location.search);
  const staticView = parameters.get('view') === 'flow';
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const select = (selector) => document.querySelector(selector);
  const hero = select('#hero');
  const story = select('#journey');
  const header = select('.site-header');
  const clamp = (value) => Math.min(1, Math.max(0, value));
  const range = (value, start, end) => clamp((value - start) / (end - start));
  const smooth = (value) => value * value * (3 - 2 * value);
  const quartOut = (value) => 1 - (1 - value) ** 4;
  const cubicInOut = (value) => (value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2);
  const nodes = new Map();
  const landmarks = {
    journey: 0,
    structure: 0,
    scenes: 0.29,
    production: 0.54,
    playback: 0.72,
    export: 0.93,
  };
  let scheduled = false;
  let geometry;

  function style(selector, properties) {
    if (!nodes.has(selector)) nodes.set(selector, select(selector));
    const node = nodes.get(selector);
    for (const [property, value] of Object.entries(properties)) {
      if (node.style[property] !== String(value)) node.style[property] = value;
    }
  }

  function measure() {
    geometry = {
      heroTop: hero.offsetTop,
      heroDistance: Math.max(1, hero.offsetHeight - innerHeight),
      storyTop: story.offsetTop,
      storyDistance: Math.max(1, story.offsetHeight - innerHeight),
    };
    requestRender();
  }

  function updateHeader(p) {
    let mode;
    if (!root.classList.contains('motion')) {
      const active = [
        ...document.querySelectorAll('.hero, .story-layer, .download, #linux, footer'),
      ]
        .reverse()
        .find((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= 40 && rect.bottom > 40;
        });
      mode =
        {
          hero: 'hero',
          structure: 'grid',
          scenes: 'scene',
          production: 'production',
          playback: 'preview',
          download: 'download',
          linux: 'dark',
          footer: 'dark',
        }[active?.id] || 'hero';
    } else if (scrollY < geometry.storyTop) mode = 'hero';
    else if (scrollY < story.offsetTop + story.offsetHeight) {
      mode =
        p < 0.25
          ? 'grid'
          : p < 0.41
            ? 'scene'
            : p < 0.7
              ? 'production'
              : p < 0.87
                ? 'preview'
                : p < 0.945
                  ? 'export'
                  : 'release';
    } else {
      const linux = select('#linux').getBoundingClientRect();
      const footer = select('footer').getBoundingClientRect();
      mode = (linux.top <= 40 && linux.bottom > 40) || footer.top <= 40 ? 'dark' : 'download';
    }
    header.dataset.mode = mode;
  }

  function render() {
    scheduled = false;
    const hProgress = clamp((scrollY - geometry.heroTop) / geometry.heroDistance);
    const p = clamp((scrollY - geometry.storyTop) / geometry.storyDistance);
    updateHeader(p);
    if (preference.matches || staticView) return;

    const h = smooth(hProgress);
    style('.hero-wordmark', {
      transform: `translate(${-h * 10}vw, ${-h * 20}vh) scale(${1 + h * 0.15})`,
      opacity: 1 - range(hProgress, 0.1, 0.65),
    });
    style('.hero-kicker', { opacity: 1 - range(hProgress, 0, 0.3) });
    style('.hero-copy', {
      transform: `translateY(${-h * 160}px)`,
      opacity: 1 - range(hProgress, 0.05, 0.48),
      visibility: hProgress > 0.6 ? 'hidden' : 'visible',
    });
    style('.hero-plane', {
      left: `${45 - h * 33}%`,
      top: `${43 - h * 17}%`,
      width: `${65 + h * 11}%`,
      transform: `perspective(1600px) rotateY(${-7 + h * 7}deg) rotateZ(${-7 + h * 7}deg)`,
    });
    style('.hero-overview', {
      opacity: range(hProgress, 0.65, 0.95),
      transform: `translateY(${(1 - h) * 30}px)`,
    });

    const n = range(p, 0, 0.25);
    const expand = smooth(range(n, 0.63, 1));
    style('.path-chosen', { strokeDashoffset: 1 - range(n, 0, 0.6) });
    style('.story-map', {
      transform: `translateX(${-expand * 80}px)`,
      opacity: 1 - range(n, 0.68, 0.9),
    });
    style('.structure-copy', {
      transform: `translateX(${-expand * 120}px)`,
      opacity: 1 - range(n, 0.65, 0.88),
    });
    style('.structure-bottom', { opacity: 1 - range(n, 0.6, 0.8) });
    style('.scene-seed', {
      opacity: range(n, 0.38, 0.6),
      width: `${12 + expand * 88}%`,
      height: `${19 + expand * 81}%`,
      right: `${4 * (1 - expand)}%`,
      top: `${37 * (1 - expand)}%`,
    });

    const scene = range(p, 0.25, 0.44);
    style('.scene', { opacity: range(p, 0.25, 0.27) });
    style('.scene-environment', {
      transform: `scale(${1 + scene * 0.06}) translateX(${-scene}%)`,
      filter: `saturate(${1 - range(p, 0.34, 0.41) * 0.65})`,
    });
    style('.inspector-plane', {
      transform: `translateY(${(1 - quartOut(range(scene, 0, 0.7))) * 130}px) rotate(${5 - scene * 7}deg)`,
    });
    style('.scene h2', { transform: `translateY(${-scene * 35}px)` });

    const flood = range(p, 0.36, 0.44);
    style('.production', {
      clipPath: `polygon(0 ${100 - flood * 120}%, 100% ${125 - flood * 125}%, 100% 100%, 0 100%)`,
    });
    const track = range(p, 0.44, 0.62);
    const opening = quartOut(range(p, 0.44, 0.5));
    style('.production-type', {
      transform: `translateX(${-track * 120}px)`,
      clipPath: `inset(0 ${100 * (1 - quartOut(range(p, 0.4, 0.46)))}% 0 0)`,
    });
    style('.production-copy', { clipPath: `inset(0 0 ${100 * (1 - range(p, 0.4, 0.45))}% 0)` });
    style('.flow-plane', {
      transform: `translateX(${18 - track * 36}vw)`,
      clipPath: `inset(0 ${100 * (1 - opening)}% 0 0)`,
    });
    const memory = range(p, 0.48, 0.58);
    style('.memory-plane', {
      transform: `perspective(1000px) translateY(${-38 * (1 - memory)}vh) rotateY(${-20 + memory * 25}deg) rotateZ(${-6 + memory * 10}deg)`,
      clipPath: `inset(${100 * (1 - quartOut(range(p, 0.48, 0.54)))}% 0 0 0)`,
    });

    const aperture = cubicInOut(range(p, 0.62, 0.7));
    style('.playback', { clipPath: `inset(${50 * (1 - aperture)}% 0 ${50 * (1 - aperture)}% 0)` });
    const split = range(p, 0.72, 0.81) ** 2;
    style('.playback-heading span:first-child', { transform: `translateX(${-split * 45}vw)` });
    style('.playback-heading span:last-child', { transform: `translateX(${split * 45}vw)` });
    style('.playback-copy', { clipPath: `inset(0 0 ${range(p, 0.81, 0.85) * 100}% 0)` });
    const contract = cubicInOut(range(p, 0.81, 0.93));
    style('.playback-plane', {
      left: `${contract * 4}%`,
      top: `${20 + contract * 11}%`,
      width: `${100 - contract * 70}%`,
    });
    style('.preview-crop', { height: `${65 - contract * 32}vh` });
    const pan = range(p, 0.72, 0.81);
    style('.preview-crop img', {
      width: `${147.7 - contract * 47.7}%`,
      transform: `translate(${-5.55 * (1 - contract)}%, ${-(9.11 + pan * 39.78) * (1 - contract)}%)`,
    });
    style('.export-path path', { strokeDashoffset: 1 - range(p, 0.86, 0.92) });
    style('.export-copy', { clipPath: `inset(0 ${100 * (1 - range(p, 0.89, 0.92))}% 0 0)` });
    style('.export-type', {
      clipPath: `inset(${100 * (1 - quartOut(range(p, 0.89, 0.93)))}% 0 0 0)`,
    });

    const release = range(p, 0.945, 1);
    const edge = 120 - release * 140;
    style('.release-curtain', {
      clipPath: `polygon(${edge + 20}% 0, 100% 0, 100% 100%, ${edge - 20}% 100%)`,
    });
    style('.release-curtain b', { transform: `translateX(${(1 - release) * 14}vw)` });
  }

  function requestRender() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(render);
    }
  }

  function configure() {
    root.classList.toggle('motion', !preference.matches && !staticView);
    if (preference.matches || staticView) nodes.forEach((node) => node.removeAttribute('style'));
    measure();
  }

  function navigate(id, progress, instant = false) {
    const node = document.getElementById(id);
    if (!node && !(id in landmarks)) return;
    const offset = Number(parameters.get('offset')) || 0;
    const top =
      id === 'hero'
        ? geometry.heroTop + geometry.heroDistance * (progress || 0)
        : id in landmarks
          ? geometry.storyTop + geometry.storyDistance * (progress ?? landmarks[id])
          : node.getBoundingClientRect().top + scrollY + offset;
    scrollTo({ top, behavior: instant || preference.matches ? 'instant' : 'smooth' });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href').slice(1);
      if (!root.classList.contains('motion') || !(id in landmarks)) return;
      event.preventDefault();
      history.pushState(null, '', `#${id}`);
      navigate(id);
    });
  });
  addEventListener('popstate', () => {
    if (root.classList.contains('motion') && location.hash.slice(1) in landmarks)
      navigate(location.hash.slice(1));
  });
  addEventListener('scroll', requestRender, { passive: true });
  addEventListener('resize', measure);
  preference.addEventListener('change', configure);
  configure();
  document.fonts.ready.then(() => {
    measure();
    if (!root.classList.contains('motion')) return;
    const id = parameters.get('chapter') || location.hash.slice(1);
    if (id)
      navigate(
        id,
        parameters.has('progress') ? clamp(Number(parameters.get('progress')) || 0) : undefined,
        true,
      );
  });
})();
