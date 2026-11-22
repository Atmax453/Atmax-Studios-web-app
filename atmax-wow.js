/*!
 * ATMAX — "Cinema" interface add-on
 * ------------------------------------------------------------
 *  1. Projector Spotlight  rest on a film tile → the lights dim, a projector
 *                          a soft frosty glow appears behind it, the tile
 *                          lifts and tilts, and its trailer plays silently inside
 *  2. Ambient glow         the page takes on the colours of the film in focus
 *  3. Genie open/close    film details pour out of the tile like a Mac window, and back in
 *  4. Spin the Reel        "Can't decide?" — a film strip spins and picks a film
 *
 * HOW TO USE: put this file next to index.html and add ONE line inside <head>,
 * under the intro line:
 *
 *     <script src="atmax-wow.js" defer></script>
 *
 * Optional settings (add BEFORE that line):
 *     <script>window.ATMAX_WOW_CONFIG = { trailers:false }</script>
 *
 * Everything switches itself off when the admin turns animations off in
 * Look & feel, or when the viewer's device asks for reduced motion.
 * ------------------------------------------------------------
 */
(function () {
  'use strict';
  if (window.ATMAXWow) return;

  var CFG = Object.assign({
    spotlight: true,      // projector spotlight on film tiles
    trailers: true,       // silent trailer inside the spotlighted tile (skipped on data saver / mobile data)
    ambient: true,        // page tint follows the film in focus
    morph: true,          // tile grows into the details window
    reel: true,           // "Spin the reel" button on the home banner
    sound: true,          // ticks + chime in Spin the Reel
    hoverDelay: 650,      // ms the mouse rests on a tile before the spotlight
    red: '#F20000'
  }, window.ATMAX_WOW_CONFIG || {});

  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function animOff() { return reduceMotion || document.body.classList.contains('noanim'); }
  function isTV() { return document.body.classList.contains('tv'); }
  // lite = phones, TVs and weaker devices: same effects, drawn with fewer pixels and fewer frames
  function isLite() {
    var mem = navigator.deviceMemory, cores = navigator.hardwareConcurrency;
    return isTV() || (window.matchMedia && matchMedia('(pointer:coarse)').matches) || (mem && mem <= 4) || (cores && cores <= 4);
  }
  function isTouch() { return matchMedia('(hover: none)').matches; }
  function films() { try { return (typeof S !== 'undefined' && S && S.T) ? S.T : []; } catch (e) { return []; } }
  function filmById(id) { var a = films(); for (var i = 0; i < a.length; i++) if (a[i].id == id) return a[i]; return null; }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function inView(el) {
    if (!el || !el.isConnected) return false;
    var r = el.getBoundingClientRect();
    return r.width > 0 && r.bottom > 0 && r.right > 0 && r.top < innerHeight && r.left < innerWidth;
  }

  // ------------------------------------------------------------- GSAP
  var gsapReady = window.gsap ? Promise.resolve(window.gsap) : new Promise(function (res, rej) {
    function load(src, next) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = function () { window.gsap ? res(window.gsap) : rej(); };
      s.onerror = next || rej;
      (document.head || document.documentElement).appendChild(s);
    }
    // your own copy first (no wait for a third-party server); the public copy only if it is missing
    load('gsap.min.js', function () { load('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'); });
  });
  var G = null;
  gsapReady.then(function (g) { G = g; }).catch(function () {});

  // ------------------------------------------------------------- styles
  var css = '' +
    /* ambient glow */
    '#atw-amb{position:fixed;top:0;right:0;bottom:0;left:0;z-index:-1;pointer-events:none}' +
    '#atw-amb i{position:absolute;top:-10%;right:-10%;bottom:-10%;left:-10%;opacity:0;transition:opacity 1.6s ease}' +
    '#atw-amb i.on{opacity:1}' +
    /* spotlight */
    '.atw-spot{position:fixed;top:0;right:0;bottom:0;left:0;z-index:18;pointer-events:none}' +
    '.atw-veil{position:absolute;top:0;right:0;bottom:0;left:0;background:radial-gradient(ellipse at 50% 30%,rgba(6,3,4,.55),rgba(2,1,1,.82));opacity:0;transition:opacity .5s ease;pointer-events:auto}' +
    '.atw-spot.tv .atw-veil,.atw-spot.out .atw-veil{pointer-events:none}' +
    '.atw-spot.on .atw-veil{opacity:1}' +
    '.atw-frost{position:absolute;border-radius:28px;opacity:0;transition:opacity .45s ease;pointer-events:none;' +
    'background:radial-gradient(ellipse at 50% 50%,rgba(255,255,255,.34) 0%,rgba(235,244,255,.18) 38%,rgba(255,255,255,0) 72%);' +
    'box-shadow:0 0 70px 14px rgba(235,244,255,.20)}' +
    '.atw-spot.on .atw-frost{opacity:1}' +
    '.atw-card{position:fixed!important;margin:0!important;pointer-events:auto;cursor:pointer;overflow:hidden;' +
    'transition:box-shadow .5s ease!important;will-change:transform;z-index:2}' +
    '.atw-card:hover,.atw-card:focus{transform:none}' +
    '.atw-card .gl{position:relative;z-index:3}' +
    '.atw-card .gl em{max-height:1.4rem!important;opacity:1!important}' +
    '.atw-tr{position:absolute;top:0;left:50%;height:100%;border:0;pointer-events:none;opacity:0;transition:opacity .9s ease;z-index:1;transform:translateX(-50%)}' +
    'video.atw-tr{width:100%;left:0;transform:none;object-fit:cover}' +
    '.atw-tr.on{opacity:1}' +
    '.atw-grad{position:absolute;top:0;right:0;bottom:0;left:0;z-index:2;pointer-events:none;background:linear-gradient(transparent 45%,rgba(0,0,0,.88))}' +
    '.atw-shine{position:absolute;top:0;right:0;bottom:0;left:0;z-index:4;pointer-events:none;opacity:.9;' +
    'background:radial-gradient(circle at var(--mx,50%) var(--my,20%),rgba(255,255,255,.30),rgba(255,255,255,0) 46%);mix-blend-mode:overlay}' +
    '.atw-badge{position:absolute;top:10px;left:10px;z-index:4;font:600 10px/1 system-ui,sans-serif;letter-spacing:.12em;' +
    'text-transform:uppercase;color:#fff;background:' + CFG.red + ';padding:5px 7px;border-radius:5px;opacity:0;transition:opacity .5s}' +
    '.atw-badge.on{opacity:1}' +
    /* morph ghosts */
    '.atw-ghost{position:fixed!important;margin:0!important;pointer-events:none!important;z-index:21;overflow:hidden!important;transform-origin:0 0}' +
    '.atw-ghost-bd{position:fixed;top:0;right:0;bottom:0;left:0;background:rgba(14,11,12,.75);z-index:20;pointer-events:none}' +
    '.atw-genie{position:fixed;top:0;left:0;width:0;height:0;z-index:21;pointer-events:none}' +
    '.atw-gs{position:fixed;overflow:hidden;transform-origin:0 0;will-change:transform,opacity;pointer-events:none;backface-visibility:hidden}' +
    '.atw-gc{position:absolute!important;left:0!important;margin:0!important;max-height:none!important;max-width:none!important;overflow:hidden!important;' +
    'transform:none!important;visibility:visible!important;animation:none!important;transition:none!important;box-shadow:none!important}' +
    '.atw-face{position:absolute;top:0;right:0;bottom:0;left:0;z-index:50;background-size:cover;background-position:center;pointer-events:none}' +
    /* spin the reel */
    '.atw-spinbtn{display:inline-flex;align-items:center;gap:.45rem}' +
    '.atw-spinbtn svg{width:1.05em;height:1.05em}' +
    '.atw-reel{position:fixed;top:0;right:0;bottom:0;left:0;z-index:25;display:flex;flex-direction:column;align-items:center;justify-content:center;' +
    'background:radial-gradient(ellipse at 50% 45%,rgba(40,6,10,.9),rgba(3,2,2,.97));color:#fff;opacity:0;transition:opacity .35s ease;' +
    'font-family:system-ui,-apple-system,"Segoe UI",sans-serif;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}' +
    '.atw-reel.on{opacity:1}' +
    '.atw-reel h4{margin:0 0 3vh;font:600 13px/1 system-ui,sans-serif;letter-spacing:.3em;text-transform:uppercase;opacity:.7}' +
    '.atw-strip{position:relative;width:100%;height:min(46vh,420px);overflow:hidden;' +
    '-webkit-mask-image:linear-gradient(90deg,transparent,#000 18%,#000 82%,transparent);mask-image:linear-gradient(90deg,transparent,#000 18%,#000 82%,transparent)}' +
    '.atw-film{position:absolute;top:0;left:0;height:100%;display:flex;align-items:center;gap:14px;padding:0 14px;background:#0c0809;will-change:transform}' +
    '.atw-film:before,.atw-film:after{content:"";position:absolute;left:0;right:0;height:22px;' +
    'background:repeating-linear-gradient(90deg,transparent 0 10px,rgba(255,255,255,.85) 10px 26px,transparent 26px 36px);' +
    '-webkit-mask:linear-gradient(#000,#000) center/100% 10px no-repeat;mask:linear-gradient(#000,#000) center/100% 10px no-repeat;opacity:.18}' +
    '.atw-film:before{top:4px}.atw-film:after{bottom:4px}' +
    '.atw-frame{flex:0 0 auto;height:calc(100% - 64px);aspect-ratio:2/3;border-radius:10px;background-size:cover;background-position:center;' +
    'position:relative;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.6)}' +
    '.atw-frame span{position:absolute;left:0;right:0;bottom:0;padding:10px;font:600 13px/1.2 system-ui,sans-serif;background:linear-gradient(transparent,rgba(0,0,0,.85))}' +
    '.atw-gate{position:absolute;top:22px;bottom:22px;left:50%;transform:translateX(-50%);aspect-ratio:2/3;border:3px solid ' + CFG.red + ';' +
    'border-radius:14px;box-shadow:0 0 0 2000px rgba(0,0,0,.35),0 0 40px rgba(242,0,0,.55);pointer-events:none;z-index:2}' +
    '.atw-pick{margin-top:3.5vh;text-align:center;min-height:132px;opacity:0;transform:translateY(12px);transition:opacity .5s,transform .5s}' +
    '.atw-pick.on{opacity:1;transform:none}' +
    '.atw-pick b{display:block;font-size:clamp(22px,4vw,34px);margin-bottom:6px}' +
    '.atw-pick small{display:block;opacity:.7;margin-bottom:18px}' +
    '.atw-pick button{all:unset;cursor:pointer;display:inline-block;margin:0 5px 8px;padding:12px 20px;border-radius:9px;font-weight:600;font-size:15px}' +
    '.atw-pick .go{background:' + CFG.red + ';color:#fff}.atw-pick .sec{background:rgba(255,255,255,.12);color:#fff}' +
    '.atw-pick button:focus-visible{outline:2px solid #fff;outline-offset:2px}' +
    '.atw-x{position:absolute;top:max(16px,env(safe-area-inset-top));right:16px;all:unset;cursor:pointer;width:42px;height:42px;border-radius:50%;' +
    'display:grid;place-items:center;background:rgba(255,255,255,.12);color:#fff;font-size:18px}' +
    '.atw-reel .atw-x{position:absolute;top:16px;right:16px}';
  var st = document.createElement('style');
  st.textContent = css;
  (document.head || document.documentElement).appendChild(st);

  // ------------------------------------------------------------- sound
  var AC = null;
  function audio() {
    try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); if (AC.state === 'suspended') AC.resume(); }
    catch (e) { AC = null; }
    return AC;
  }
  function tone(f, dur, vol, type, delay) {
    if (!CFG.sound || !AC || AC.state !== 'running') return;
    var t = AC.currentTime + (delay || 0), o = AC.createOscillator(), g = AC.createGain();
    o.type = type || 'sine'; o.frequency.setValueAtTime(f, t);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + dur + 0.05);
  }
  function tick() { tone(2200, 0.035, 0.05, 'square'); tone(900, 0.05, 0.05, 'triangle'); }
  function chime() { tone(1318.5, 1.5, 0.15); tone(1975.5, 1.1, 0.06, 'sine', 0.06); tone(659.25, 0.9, 0.08, 'triangle'); }

  // ------------------------------------------------------------- colour of a film
  var colorCache = {}, BRAND = [155, 44, 75];
  function posterSrc(t) {
    try { if (typeof pick === 'function') { var p = pick(t, 'poster'); if (p && p.src) return p.src; } } catch (e) {}
    return t.poster_url || '';
  }
  function filmColor(t, cb) {
    if (!t) return cb(BRAND);
    if (colorCache[t.id]) return cb(colorCache[t.id]);
    var src = posterSrc(t);
    var done = function (c) { colorCache[t.id] = c; cb(c); };
    if (!src) return done(BRAND);
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function () {
      try {
        var c = document.createElement('canvas'); c.width = 24; c.height = 36;
        var x = c.getContext('2d', { willReadFrequently: true });
        x.drawImage(img, 0, 0, 24, 36);
        var d = x.getImageData(0, 0, 24, 36).data, r = 0, g = 0, b = 0, w = 0;
        for (var i = 0; i < d.length; i += 4) {
          var R = d[i], Gg = d[i + 1], B = d[i + 2];
          var mx = Math.max(R, Gg, B), mn = Math.min(R, Gg, B), sat = mx ? (mx - mn) / mx : 0, lum = mx / 255;
          var wt = sat * sat * (lum > 0.12 && lum < 0.96 ? 1 : 0.05) + 0.002;
          r += R * wt; g += Gg * wt; b += B * wt; w += wt;
        }
        var col = [r / w, g / w, b / w];
        // push towards a rich, glowing version of that colour
        var m = Math.max(col[0], col[1], col[2]) || 1, k = 210 / m;
        done([clamp(col[0] * k, 0, 255) | 0, clamp(col[1] * k, 0, 255) | 0, clamp(col[2] * k, 0, 255) | 0]);
      } catch (e) { done(BRAND); }   // picture host doesn't allow reading colours
    };
    img.onerror = function () { done(BRAND); };
    img.src = src;
  }

  // ------------------------------------------------------------- 2. ambient glow
  var amb = null, ambLayers = [], ambIdx = 0, ambFilm = null, ambTimer = null;
  function ensureAmbient() {
    if (amb || !CFG.ambient) return;
    amb = document.createElement('div');
    amb.id = 'atw-amb';
    amb.innerHTML = '<i></i><i></i>';
    document.body.appendChild(amb);
    ambLayers = $$('i', amb);
  }
  function setAmbient(t) {
    if (!CFG.ambient || animOff() || !t || ambFilm === t.id) return;
    ambFilm = t.id;
    ensureAmbient();
    filmColor(t, function (c) {
      if (ambFilm !== t.id) return;
      var rgb = c.join(',');
      ambIdx = 1 - ambIdx;
      var L = ambLayers[ambIdx], O = ambLayers[1 - ambIdx];
      L.style.background =
        'radial-gradient(55% 45% at 18% 12%,rgba(' + rgb + ',.30),rgba(' + rgb + ',0) 70%),' +
        'radial-gradient(45% 40% at 88% 55%,rgba(' + rgb + ',.20),rgba(' + rgb + ',0) 72%),' +
        'radial-gradient(60% 40% at 45% 105%,rgba(' + rgb + ',.16),rgba(' + rgb + ',0) 70%)';
      L.classList.add('on'); O.classList.remove('on');
      document.body.style.setProperty('--glc', 'rgba(' + rgb + ',.6)');
    });
  }
  function ambientSoon(t, ms) {
    clearTimeout(ambTimer);
    ambTimer = setTimeout(function () { setAmbient(t); }, ms || 0);
  }
  function heroFilm() {
    var b = document.querySelector('.hero [data-play]');
    return b ? filmById(b.getAttribute('data-play')) : null;
  }

  // ------------------------------------------------------------- 1. projector spotlight
  var spot = null, hoverTile = null, hoverTimer = null, railTimer = null;

  function dataAllowsTrailer() {
    var c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (c && (c.saveData || /(^|-)2g|3g/.test(c.effectiveType || ''))) return false;
    if (isTouch()) return !!(c && (c.type === 'wifi' || c.type === 'ethernet'));   // phones: only on Wi-Fi
    return true;
  }
  function trailerEmbed(t) {
    if (!t || !t.trailer_url || typeof embedFor !== 'function') return null;
    var e; try { e = embedFor(t.trailer_url); } catch (err) { return null; }
    if (!e) return null;
    if (e.video) return { video: e.video };
    if (e.iframe) {
      var u = e.iframe, m;
      if ((m = u.match(/youtube(?:-nocookie)?\.com\/embed\/([\w-]{11})/)))
        return { iframe: 'https://www.youtube-nocookie.com/embed/' + m[1] + '?autoplay=1&mute=1&controls=0&loop=1&playlist=' + m[1] +
          '&playsinline=1&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1', wait: 1400 };
      if ((m = u.match(/player\.vimeo\.com\/video\/(\d+)/)))
        return { iframe: 'https://player.vimeo.com/video/' + m[1] + '?background=1&autoplay=1&muted=1&loop=1', wait: 900 };
    }
    return null;   // Google Drive previews can't play silently in a tile
  }

  function startSpot(tile, mode) {
    if (!CFG.spotlight || animOff() || !G || spot) return;
    if (!tile.isConnected || document.querySelector('.mod,.player,.atw-reel,.atx-ov')) return;
    var t = filmById(tile.getAttribute('data-id'));
    var r = tile.getBoundingClientRect();
    if (r.width < 20 || r.top < -r.height * 0.3 || r.bottom > innerHeight + r.height * 0.3) return;

    var layer = document.createElement('div');
    layer.className = 'atw-spot' + (mode === 'tv' ? ' tv' : '');
    var lite = isLite(), dpr = Math.min(lite ? 1 : 1.5, window.devicePixelRatio || 1);
    layer.innerHTML = '<div class="atw-veil"></div><div class="atw-frost"></div>';
    var card = tile.cloneNode(true);
    card.removeAttribute('id');
    card.classList.add('atw-card');
    card.setAttribute('tabindex', '-1');
    card.setAttribute('aria-hidden', 'true');
    var cs = getComputedStyle(tile);
    card.style.cssText = tile.getAttribute('style') || '';
    card.style.left = r.left + 'px'; card.style.top = r.top + 'px';
    card.style.width = r.width + 'px'; card.style.height = r.height + 'px';
    card.style.borderRadius = cs.borderRadius;
    card.style.backgroundImage = cs.backgroundImage;
    card.style.backgroundPosition = cs.backgroundPosition;
    card.style.backgroundSize = 'cover';
    var grad = document.createElement('div'); grad.className = 'atw-grad'; grad.style.opacity = '0';
    var shine = document.createElement('div'); shine.className = 'atw-shine';
    var badge = document.createElement('div'); badge.className = 'atw-badge'; badge.textContent = 'Trailer';
    card.appendChild(grad); card.appendChild(shine); card.appendChild(badge);
    layer.appendChild(card);
    document.body.appendChild(layer);

    var lite = isLite(), frost = layer.querySelector('.atw-frost');

    // where the lifted card ends up (scale about 50% 60%, nudged up)
    var SC = mode === 'tv' ? 1.12 : 1.17, LIFT = -12;
    var ox = r.left + r.width / 2, oy = r.top + r.height * 0.6;
    var R = {
      left: ox - (r.width / 2) * SC, right: ox + (r.width / 2) * SC,
      top: oy - r.height * 0.6 * SC + LIFT, bottom: oy + r.height * 0.4 * SC + LIFT
    };
    var cx = (R.left + R.right) / 2, W = innerWidth;
    var apexTo = W / 2 + (cx - W / 2) * 0.35, apexFrom = W / 2 + (cx < W / 2 ? 1 : -1) * W * 0.32;

    var raf = 0, alive = true;
    // frosty glow: one soft light behind the tile (plain CSS, nothing is drawn every frame)
    frost.style.left = (R.left - 46) + 'px'; frost.style.top = (R.top - 46) + 'px';
    frost.style.width = (R.right - R.left + 92) + 'px'; frost.style.height = (R.bottom - R.top + 92) + 'px';

    requestAnimationFrame(function () { layer.classList.add('on'); });
    G.set(card, { transformPerspective: 900, transformOrigin: '50% 60%' });
    G.to(card, { scale: SC, y: LIFT, duration: 0.65, ease: 'expo.out' });
    var glow = (document.body.style.getPropertyValue('--glc') || 'rgba(242,0,0,.55)');
    card.style.boxShadow = '0 30px 60px rgba(0,0,0,.7),0 0 0 1.5px rgba(255,255,255,.35),0 0 50px ' + glow;
    if (t) setAmbient(t);

    // tilt + shine follow the pointer
    function onMove(e) {
      var b = card.getBoundingClientRect(), mx = clamp((e.clientX - b.left) / b.width, 0, 1), my = clamp((e.clientY - b.top) / b.height, 0, 1);
      G.to(card, { rotationY: (mx - 0.5) * 14, rotationX: (0.5 - my) * 10, duration: 0.5, ease: 'power2.out' });
      shine.style.setProperty('--mx', (mx * 100) + '%'); shine.style.setProperty('--my', (my * 100) + '%');
    }
    if (mode === 'mouse') card.addEventListener('pointermove', onMove);

    // silent trailer inside the tile
    var trTimer = null, trEl = null;
    if (CFG.trailers && mode !== 'tv' && dataAllowsTrailer()) {
      var em = trailerEmbed(t);
      if (em) trTimer = setTimeout(function () {
        if (!alive) return;
        if (em.video) {
          trEl = document.createElement('video');
          trEl.muted = true; trEl.loop = true; trEl.playsInline = true; trEl.autoplay = true;
          trEl.setAttribute('muted', ''); trEl.setAttribute('playsinline', '');
          trEl.className = 'atw-tr';
          trEl.addEventListener('playing', function () { if (alive) { trEl.classList.add('on'); grad.style.opacity = '1'; badge.classList.add('on'); } });
          trEl.src = em.video;
          card.insertBefore(trEl, card.firstChild);
          var pp = trEl.play(); if (pp && pp.catch) pp.catch(function () {});
        } else {
          trEl = document.createElement('iframe');
          trEl.className = 'atw-tr';
          trEl.setAttribute('allow', 'autoplay; encrypted-media');
          trEl.setAttribute('tabindex', '-1');
          trEl.style.width = (R.bottom - R.top) / SC * 16 / 9 + 'px';
          trEl.onload = function () {
            setTimeout(function () { if (alive && trEl) { trEl.classList.add('on'); grad.style.opacity = '1'; badge.classList.add('on'); } }, em.wait);
          };
          trEl.src = em.iframe;
          card.insertBefore(trEl, card.firstChild);
        }
      }, 650);
    }

    function end(instant) {
      if (!alive) return;
      alive = false;
      clearTimeout(trTimer);
      if (trEl) { try { if (trEl.pause) trEl.pause(); trEl.removeAttribute('src'); if (trEl.load) trEl.load(); } catch (e) {} }
      layer.classList.add('out');
      if (instant) { layer.remove(); spot = null; return; }
      layer.classList.remove('on');
      alive = true;  // stay alive while the card settles back
      G.to(card, { scale: 1, y: 0, rotationX: 0, rotationY: 0, duration: 0.35, ease: 'power3.inOut',
        onComplete: function () { alive = false; layer.remove(); } });
      spot = null;
    }

    card.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      end(true);
      lastTileClick = { tile: tile, at: Date.now() };
      tile.click();
    });
    if (mode === 'mouse') card.addEventListener('pointerleave', function (e) {
      if (e.relatedTarget && card.contains(e.relatedTarget)) return;
      end(false);
    });
    layer.querySelector('.atw-veil').addEventListener('pointerdown', function () { end(false); });

    spot = { tile: tile, end: end, mode: mode };
  }
  function endSpot(instant) { if (spot) spot.end(instant); }

  // --- triggers
  function tileOf(el) {
    var t = el && el.closest ? el.closest('.tile[data-id]') : null;
    return t && !t.classList.contains('atw-card') ? t : null;
  }
  function wireSpotlight() {
    // mouse: rest on a tile
    document.addEventListener('pointerover', function (e) {
      if (e.pointerType === 'touch' || isTV()) return;
      var t = tileOf(e.target);
      if (!t || spot || t === hoverTile) return;
      hoverTile = t;
      ambientSoon(filmById(t.getAttribute('data-id')), 220);
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(function () {
        if (hoverTile === t && t.matches(':hover')) startSpot(t, 'mouse');
      }, CFG.hoverDelay);
    });
    document.addEventListener('pointerout', function (e) {
      var t = tileOf(e.target);
      if (t && t === hoverTile && !(e.relatedTarget && t.contains(e.relatedTarget))) { hoverTile = null; clearTimeout(hoverTimer); }
    });
    // TV remote / keyboard focus
    document.addEventListener('focusin', function (e) {
      var t = tileOf(e.target);
      if (!t) return;
      ambientSoon(filmById(t.getAttribute('data-id')), 200);
      if (!isTV()) return;
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(function () { if (document.activeElement === t) startSpot(t, 'tv'); }, 900);
    });
    document.addEventListener('keydown', function (e) {
      if (spot) endSpot(spot.mode !== 'tv' || e.key === 'Enter' ? true : false);
      clearTimeout(hoverTimer);
    }, true);
    // phones: the tile that settles in the middle of a row after a swipe
    document.addEventListener('scroll', function (e) {
      var tg = e.target;
      if (spot) endSpot(false);
      clearTimeout(hoverTimer);
      if (!isTouch() || !tg || !tg.classList || !tg.classList.contains('rail')) return;
      clearTimeout(railTimer);
      railTimer = setTimeout(function () {
        var mid = innerWidth / 2, best = null, bd = 1e9;
        $$('.tile[data-id]', tg).forEach(function (t) {
          var b = t.getBoundingClientRect();
          if (b.left < 0 || b.right > innerWidth || b.top < 0 || b.bottom > innerHeight) return;
          var d = Math.abs((b.left + b.right) / 2 - mid);
          if (d < bd) { bd = d; best = t; }
        });
        if (best) { ambientSoon(filmById(best.getAttribute('data-id')), 0); startSpot(best, 'touch'); }
      }, 550);
    }, { capture: true, passive: true });
    window.addEventListener('resize', function () { endSpot(true); });
  }

  // ------------------------------------------------------------- 3. genie open / close (like a Mac minimising a window)
  var lastTileClick = null;   // { tile: element the film was opened from, at: time }
  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('.tile[data-id], button[data-id]') : null;
    if (el && !el.classList.contains('atw-card')) lastTileClick = { tile: el, at: Date.now() };
  }, true);

  function originFor(id, prefer) {
    if (prefer && prefer.isConnected && inView(prefer) && prefer.getAttribute('data-id') == id) return prefer;
    var c = $$('.tile[data-id="' + id + '"]:not(.atw-card)').filter(inView)[0];
    if (c) return c;
    return $$('button[data-id="' + id + '"]').filter(function (b) { return !b.closest('.mod') && inView(b); })[0] || null;
  }
  function ease3(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function smooth(x) { x = clamp(x, 0, 1); return x * x * (3 - 2 * x); }

  // Builds the sliced copy of `box` and returns { start(opening, done), cancel() }.
  function makeGenie(box, T) {
    var B = box.getBoundingClientRect();
    var top = Math.max(B.top, 0), bot = Math.min(B.bottom, innerHeight), H = bot - top;
    if (H < 40 || !B.width) return null;
    var N = innerWidth < 700 ? 30 : (isTV() ? 34 : 48), sh = H / N;
    var wrap = document.createElement('div');
    var host = box.closest('.mod');   // keep the page's own look (e.g. the dark film page) while animating
    wrap.className = 'atw-genie' + (host ? ' ' + Array.prototype.filter.call(host.classList, function (c) { return c !== 'mod'; }).join(' ') : '');
    var below = (T.top + T.height / 2) >= (top + H / 2);
    var Bcx = B.left + B.width / 2, Tcx = T.left + T.width / 2;
    var span = below ? Math.max(80, T.top - top) : Math.max(80, bot - T.bottom);
    var FR = 40, strips = [];
    for (var i = 0; i < N; i++) {
      var y0 = top + i * sh;
      var s = document.createElement('div');
      s.className = 'atw-gs';
      s.style.cssText = 'left:' + B.left + 'px;top:' + y0 + 'px;width:' + B.width + 'px;height:' + (sh + 0.75) + 'px';
      var c = box.cloneNode(true);
      c.classList.add('atw-gc');
      c.removeAttribute('id');
      c.style.cssText += ';top:' + (B.top - y0) + 'px;width:' + B.width + 'px;height:' + B.height + 'px';
      s.appendChild(c);
      wrap.appendChild(s);
      var kf = [];
      for (var f = 0; f <= FR; f++) {
        var t = f / FR;
        // the edge nearest the target leaves first, the far edge follows: content pours into the funnel
        var lead = ease3(clamp(t / 0.72, 0, 1)), trail = ease3(clamp((t - 0.28) / 0.72, 0, 1));
        var eTop = below ? top + (T.top - top) * trail : top + (T.top - top) * lead;
        var eBot = below ? bot + (T.bottom - bot) * lead : bot + (T.bottom - bot) * trail;
        var yA = eTop + (eBot - eTop) * (i / N), yB = eTop + (eBot - eTop) * ((i + 1) / N), yc = (yA + yB) / 2;
        var k = smooth(below ? (yc - top) / span : (bot - yc) / span);
        var q = smooth(t / 0.45);                                   // how hard the funnel pinches
        var w = B.width + (T.width - B.width) * k * q;
        var cx = Bcx + (Tcx - Bcx) * k * q;
        kf.push({
          transform: 'translate(' + (cx - w / 2 - B.left).toFixed(2) + 'px,' + (yA - y0).toFixed(2) + 'px) scale(' +
            (w / B.width).toFixed(4) + ',' + ((yB - yA + 0.75) / (sh + 0.75)).toFixed(4) + ')',
          opacity: t > 0.9 ? 1 - (t - 0.9) / 0.1 : 1
        });
      }
      strips.push({ el: s, kf: kf });
    }
    var anims = [], gone = false;
    return {
      wrap: wrap,
      start: function (opening, done) {
        if (!wrap.isConnected) document.body.appendChild(wrap);
        var dur = opening ? 640 : 560, left = strips.length;
        strips.forEach(function (st) {
          var a = st.el.animate(st.kf, { duration: dur, easing: opening ? 'cubic-bezier(.25,.1,.25,1)' : 'cubic-bezier(.45,0,.55,1)',
            fill: 'forwards', direction: opening ? 'reverse' : 'normal' });
          anims.push(a);
          a.onfinish = function () { if (--left === 0 && !gone) { gone = true; done && done(); wrap.remove(); } };
        });
      },
      cancel: function () { gone = true; anims.forEach(function (a) { a.cancel(); }); wrap.remove(); }
    };
  }

  function morphOpen(m, origin) {
    var box = m.querySelector('.mbox');
    if (!box || !origin) return;
    var T = origin.getBoundingClientRect();
    var g = makeGenie(box, T);
    if (!g) return;
    var bf = m.style.backdropFilter;
    box.style.visibility = 'hidden';
    m.style.backdropFilter = 'none'; m.style.webkitBackdropFilter = 'none';   // blur is heavy while animating
    m.animate([{ backgroundColor: 'rgba(4,2,3,0)' }, { backgroundColor: getComputedStyle(m).backgroundColor }], { duration: 520, easing: 'ease-out' });
    g.start(true, function () {
      box.style.visibility = '';
      m.style.backdropFilter = bf; m.style.webkitBackdropFilter = bf;
    });
  }

  function patchClose(m, id) {
    var nativeRemove = Element.prototype.remove;
    m.remove = function () {
      var box = m.querySelector('.mbox'), g = null, bd = null;
      if (box && !animOff()) {
        var origin = originFor(id, lastTileClick && lastTileClick.tile);
        if (origin) g = makeGenie(box, origin.getBoundingClientRect());
        if (!g) {   // nowhere to fly back to: a soft shrink instead
          var B = box.getBoundingClientRect(), ghost = box.cloneNode(true);
          ghost.classList.add('atw-ghost');
          ghost.style.cssText += ';left:' + B.left + 'px;top:' + B.top + 'px;width:' + B.width + 'px;height:' + B.height + 'px;max-height:none';
          g = {
            wrap: ghost,
            start: function (o, done) {
              document.body.appendChild(ghost);
              ghost.animate([{ transform: 'scale(1)', opacity: 1 }, { transform: 'translateY(24px) scale(.9)', opacity: 0 }],
                { duration: 300, easing: 'ease-in', fill: 'forwards' }).onfinish = function () { ghost.remove(); done && done(); };
            },
            cancel: function () { ghost.remove(); }
          };
        }
        bd = document.createElement('div');
        bd.className = 'atw-ghost-bd';
        bd.style.background = getComputedStyle(m).backgroundColor;
      }
      nativeRemove.call(m);
      if (!g) return;
      document.body.appendChild(bd);
      // let the app finish what it was doing first (opening the player, reopening details …)
      Promise.resolve().then(function () {
        if (document.querySelector('.mod,.player')) { g.cancel(); bd.remove(); return; }
        bd.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 480, easing: 'ease-in', fill: 'forwards' }).onfinish = function () { bd.remove(); };
        g.start(false);
      });
    };
  }

  function wrapDetail() {
    if (typeof window.detail !== 'function' || window.detail.__atw) return;
    var orig = window.detail;
    var wrapped = function (id) {
      var hadMod = !!document.querySelector('.mod');
      endSpot(true);
      var res = orig.apply(this, arguments);
      try {
        if (CFG.morph && !animOff() && !hadMod) {
          var mods = $$('.mod'), m = mods[mods.length - 1];
          if (m && m.querySelector('.mbox')) {
            var recent = lastTileClick && Date.now() - lastTileClick.at < 1200 && lastTileClick.tile.getAttribute('data-id') == id;
            if (recent) morphOpen(m, originFor(id, lastTileClick.tile));
            patchClose(m, id);
          }
        }
        var f = filmById(id); if (f) setAmbient(f);
      } catch (e) {}
      return res;
    };
    wrapped.__atw = true;
    window.detail = wrapped;
  }

  // ------------------------------------------------------------- 4. spin the reel
  var REEL_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/>' +
    '<circle cx="12" cy="6.8" r="1.7"/><circle cx="12" cy="17.2" r="1.7"/><circle cx="6.8" cy="12" r="1.7"/><circle cx="17.2" cy="12" r="1.7"/></svg>';

  function addSpinButton() {
    if (!CFG.reel) return;
    var hero = document.querySelector('.hero');
    if (!hero || hero.querySelector('.atw-spinbtn')) return;
    if (films().filter(function (t) { return t.status !== 'draft'; }).length < 2) return;
    var b = hero.querySelector('.b');
    if (!b) { b = document.createElement('div'); b.className = 'b'; hero.appendChild(b); }
    var btn = document.createElement('button');
    btn.className = 'btn ghost atw-spinbtn';
    btn.type = 'button';
    btn.innerHTML = REEL_ICON + '<span>Spin the reel</span>';
    btn.title = "Can't decide? Let the reel pick a film";
    btn.addEventListener('click', function (e) { e.stopPropagation(); openReel(); });
    b.appendChild(btn);
  }

  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.random() * (i + 1) | 0, x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function frameBg(t) {
    try { if (typeof artf === 'function') return artf(t); } catch (e) {}
    var s = posterSrc(t); return s ? "url('" + s.replace(/'/g, '%27') + "')" : 'linear-gradient(160deg,#5a0a14,#140406)';
  }
  function esc2(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return '&#' + c.charCodeAt(0) + ';'; }); }

  function openReel() {
    if (document.querySelector('.atw-reel')) return;
    if (!G) { gsapReady.then(function () { openReel(); }).catch(function () {}); return; }
    audio();
    endSpot(true);
    var pool = films().filter(function (t) { return t.status !== 'draft'; });
    if (pool.length < 2) return;
    var winner = pool[Math.random() * pool.length | 0];

    var ov = document.createElement('div');
    ov.className = 'atw-reel';
    ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', 'Spin the reel');
    ov.innerHTML = '<button class="atw-x" aria-label="Close">✕</button><h4>Spinning the reel</h4>' +
      '<div class="atw-strip"><div class="atw-film"></div><div class="atw-gate"></div></div><div class="atw-pick" aria-live="polite"></div>';
    document.body.appendChild(ov);
    requestAnimationFrame(function () { ov.classList.add('on'); });
    var strip = ov.querySelector('.atw-strip'), film = ov.querySelector('.atw-film'), pickEl = ov.querySelector('.atw-pick');

    // build a long strip; the winner sits near the end
    var seq = [], LEN = Math.max(34, pool.length * 3);
    while (seq.length < LEN) seq = seq.concat(shuffle(pool.slice()));
    seq = seq.slice(0, LEN);
    var WIN = LEN - 5; seq[WIN] = winner;
    film.innerHTML = seq.map(function (t) {
      return '<div class="atw-frame" style="background-image:' + esc2(frameBg(t)) + ';background-position:center"><span>' + esc2(t.title) + '</span></div>';
    }).join('');

    var close = function () {
      if (anim) anim.kill();
      window.removeEventListener('keydown', onKey, true);
      ov.classList.remove('on');
      setTimeout(function () { ov.remove(); }, 360);
    };
    var onKey = function (e) { if (e.key === 'Escape' || e.keyCode === 10009 || e.keyCode === 461) { e.preventDefault(); e.stopImmediatePropagation(); close(); } };
    window.addEventListener('keydown', onKey, true);
    ov.querySelector('.atw-x').onclick = close;

    var anim = null;
    requestAnimationFrame(function () {
      var frames = $$('.atw-frame', film), fw = frames[0].getBoundingClientRect().width, gap = 14, step = fw + gap;
      var center = strip.clientWidth / 2;
      var target = -(14 + WIN * step + fw / 2 - center) + (Math.random() - 0.5) * fw * 0.5;
      var startX = -(14 + 2 * step + fw / 2 - center);
      var state = { x: startX }, lastIdx = -1, lastX = startX, landing = false;
      var dur = animOff() ? 0.01 : 4.2;
      film.style.transform = 'translateX(' + startX + 'px)';
      anim = G.to(state, {
        x: target, duration: dur, ease: 'power4.out',
        onUpdate: function () {
          film.style.transform = 'translateX(' + state.x + 'px)';
          var v = Math.abs(state.x - lastX); lastX = state.x;
          film.style.filter = !isLite() && v > 6 ? 'blur(' + Math.min(6, v / 10).toFixed(1) + 'px)' : 'none';
          var idx = Math.floor((center - state.x - 14 + gap / 2) / step);
          if (idx !== lastIdx) { lastIdx = idx; tick(); }
        },
        onComplete: function () {
          // settle exactly onto the winner, then celebrate
          var exact = -(14 + WIN * step + fw / 2 - center);
          G.to(state, { x: exact, duration: 0.45, ease: 'back.out(2)', onUpdate: function () { film.style.transform = 'translateX(' + state.x + 'px)'; } });
          var wf = frames[WIN];
          G.fromTo(wf, { scale: 1 }, { scale: 1.08, duration: 0.5, ease: 'back.out(2.5)', delay: 0.15 });
          wf.style.boxShadow = '0 0 0 3px ' + CFG.red + ',0 0 60px rgba(242,0,0,.6)';
          chime();
          ov.querySelector('h4').textContent = 'Tonight you’re watching';
          var meta = [winner.year, winner.genre].filter(Boolean).join(' · ');
          pickEl.innerHTML = '<b>' + esc2(winner.title) + '</b><small>' + esc2(meta) + '</small>' +
            '<button class="go" data-a="play">▶ ' + (winner.status === 'soon' ? 'Watch trailer' : 'Watch now') + '</button>' +
            '<button class="sec" data-a="info">More info</button><button class="sec" data-a="again">Spin again</button>';
          setTimeout(function () { pickEl.classList.add('on'); var g = pickEl.querySelector('.go'); if (g) g.focus(); }, 250);
          pickEl.onclick = function (e) {
            var a = e.target.closest('button'); if (!a) return;
            var act = a.getAttribute('data-a');
            if (act === 'again') { close(); setTimeout(openReel, 380); return; }
            close();
            setTimeout(function () {
              if (act === 'info' && typeof window.detail === 'function') window.detail(winner.id);
              if (act === 'play' && typeof window.play === 'function') window.play(winner.id, winner.status === 'soon' ? 1 : undefined);
            }, 200);
          };
        }
      });
    });
  }

  // ------------------------------------------------------------- boot
  function boot() {
    if (!document.body) return;
    wireSpotlight();
    wrapDetail();
    var pending = false;
    new MutationObserver(function () {
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () {
        pending = false;
        wrapDetail();
        addSpinButton();
        if (!hoverTile && !spot && !document.querySelector('.mod')) { var h = heroFilm(); if (h) setAmbient(h); }
        if (spot && !spot.tile.isConnected) endSpot(true);
      });
    }).observe(document.body, { childList: true, subtree: true });
    addSpinButton();
    var h = heroFilm(); if (h) setAmbient(h);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();

  window.ATMAXWow = { config: CFG, spinTheReel: function () { openReel(); }, endSpotlight: function () { endSpot(true); } };
})();
