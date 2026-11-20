/*!
 * ATMAX STUDIOS — intro animation add-on
 * ------------------------------------------------------------
 * Plays the logo animation:
 *   1. when someone opens the website  - red, silent, once per visit
 *   2. before every film                - black, with sound
 *   3. before every trailer             - black, with sound
 *   (all at normal speed; viewers can tap Skip)
 *
 * HOW TO USE: put this file next to index.html and add ONE line
 * inside <head>, as high up as possible:
 *
 *     <script src="atmax-intro.js"></script>
 *
 * Optional settings — add BEFORE that line if you want to change anything:
 *
 *     <script>window.ATMAX_INTRO_CONFIG = { sound:false }</script>
 * ------------------------------------------------------------
 */
(function () {
  'use strict';
  if (window.ATMAXIntro) return;

  var CFG = Object.assign({
    splash: true,              // play when the website opens
    splashEveryLoad: false,    // false = once per visit (refreshing won't replay it)
    beforeFilms: true,         // play before every film
    beforeTrailers: true,      // play the quick cut before trailers
    sound: true,               // whoosh + chime before films and trailers (the website intro is always silent)
    red: '#F20000'
  }, window.ATMAX_INTRO_CONFIG || {});

  var NS = 'http://www.w3.org/2000/svg';
  var W = 1600, H = 900, CAP = 0.70;
  var F_BOLD = 'Montserrat, "Arial Black", sans-serif';
  var F_SANS = '"Canva Sans", "Albert Sans", "Helvetica Neue", Arial, sans-serif';
  var HEAD = document.head || document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------------------------------------------------------------- styles
  var css = '' +
    '.atx-ov{position:fixed;top:0;right:0;bottom:0;left:0;z-index:2147483000;overflow:hidden;' +
    '-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;cursor:default}' +
    '.atx-red{--atx-bg:' + CFG.red + ';--atx-fg:#fff;--atx-icon:#fff;--atx-iconText:' + CFG.red + '}' +
    '.atx-clear{--atx-bg:transparent;--atx-fg:#fff;--atx-icon:#fff;--atx-iconText:' + CFG.red + '}' +
    '.atx-clear .atx-vig,.atx-clear .atx-sheen{display:none}' +
    '.atx-black{--atx-bg:#000;--atx-fg:#fff;--atx-icon:' + CFG.red + ';--atx-iconText:#fff}' +
    '.atx-bg{position:absolute;top:0;right:0;bottom:0;left:0;background:var(--atx-bg)}' +
    '.atx-svg{position:absolute;top:0;left:0;width:100%;height:100%;display:block;overflow:visible}' +
    '.atx-fg{fill:var(--atx-fg)}.atx-ic{fill:var(--atx-icon)}.atx-ict{fill:var(--atx-iconText)}' +
    '.atx-st-fg{fill:none;stroke:var(--atx-fg)}.atx-st-ic{fill:none;stroke:var(--atx-icon)}' +
    '.atx-vig{position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none}' +
    '.atx-red .atx-vig{background:radial-gradient(ellipse 70% 60% at 50% 45%,rgba(255,255,255,.10) 0%,rgba(255,255,255,0) 55%,rgba(0,0,0,.22) 100%)}' +
    '.atx-black .atx-vig{background:radial-gradient(ellipse 60% 55% at 50% 45%,rgba(242,0,0,.13) 0%,rgba(0,0,0,0) 62%)}' +
    '.atx-sheen{position:absolute;top:-50%;left:-50%;width:200%;height:200%;pointer-events:none;opacity:0;' +
    'background:linear-gradient(105deg,rgba(255,255,255,0) 44%,rgba(255,255,255,.7) 50%,rgba(255,255,255,0) 56%);mix-blend-mode:soft-light}' +
    '.atx-ov.atx-embed{position:absolute;z-index:0;border-radius:inherit;cursor:inherit}' +
    '.atx-embed .atx-skip{display:none}' +
    '.atx-skip{position:absolute;right:max(20px,env(safe-area-inset-right));bottom:max(20px,env(safe-area-inset-bottom));' +
    'font:500 14px/1 "Albert Sans",system-ui,sans-serif;letter-spacing:.04em;color:#fff;background:rgba(0,0,0,.28);' +
    'border:1px solid rgba(255,255,255,.35);border-radius:999px;padding:11px 18px;cursor:pointer;opacity:0;' +
    'transition:opacity .4s,background .2s;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}' +
    '.atx-skip.on{opacity:1}.atx-skip:hover,.atx-skip:focus-visible{background:rgba(255,255,255,.2);outline:none}';
  var style = document.createElement('style');
  style.textContent = css;
  HEAD.appendChild(style);

  // fonts (Montserrat ExtraBold + Albert Sans, the web stand-in for Canva Sans)
  var fl = document.createElement('link');
  fl.rel = 'stylesheet';
  fl.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@800&family=Albert+Sans:wght@400;500&display=swap';
  HEAD.appendChild(fl);

  // animation engine (GSAP), loaded once
  var gsapReady = window.gsap ? Promise.resolve(window.gsap) : new Promise(function (res, rej) {
    function load(src, next) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = function () { window.gsap ? res(window.gsap) : rej(); };
      s.onerror = next || rej;
      HEAD.appendChild(s);
    }
    // your own copy first (fast, works offline); the public copy only if it is missing
    load('gsap.min.js', function () { load('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'); });
  });

  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  var fontsReady = (function () {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    var all = Promise.all([
      document.fonts.load('800 100px Montserrat', 'ATMAX'),
      document.fonts.load('400 100px "Albert Sans"', 'STUDıOS amediaproductiongency'),
      document.fonts.load('400 100px "Canva Sans"', 'STUDıOS')
    ]).then(function () { return document.fonts.ready; });
    return Promise.race([all, wait(2200)]).catch(function () {});
  })();
  var ready = Promise.all([gsapReady, fontsReady]);

  // ---------------------------------------------------------------- sound
  var AC = null;
  function audio() {
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      if (AC.state === 'suspended') AC.resume();
    } catch (e) { AC = null; }
    return AC;
  }
  // unlock audio on the first tap/click anywhere (needed on phones)
  ['pointerdown', 'keydown', 'touchstart'].forEach(function (ev) {
    window.addEventListener(ev, function () { if (CFG.sound) audio(); }, { capture: true, passive: true });
  });

  function noiseBuffer(c, dur) {
    var b = c.createBuffer(1, Math.floor(c.sampleRate * dur), c.sampleRate), d = b.getChannelData(0);
    for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return b;
  }
  function whoosh(dur, vol, f0, f1) {
    var c = AC; if (!c || c.state !== 'running') return;
    var t = c.currentTime, src = c.createBufferSource(), bp = c.createBiquadFilter(), g = c.createGain();
    src.buffer = noiseBuffer(c, dur);
    bp.type = 'bandpass'; bp.Q.value = 1.4;
    bp.frequency.setValueAtTime(f0, t);
    bp.frequency.exponentialRampToValueAtTime(f1, t + dur * 0.75);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + dur * 0.55);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(bp); bp.connect(g); g.connect(c.destination);
    src.start(t); src.stop(t + dur + 0.05);
  }
  function tone(freq, dur, vol, type, delay) {
    var c = AC; if (!c || c.state !== 'running') return;
    var t = c.currentTime + (delay || 0), o = c.createOscillator(), g = c.createGain();
    o.type = type || 'sine'; o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(c.destination);
    o.start(t); o.stop(t + dur + 0.05);
  }
  function thump() {
    var c = AC; if (!c || c.state !== 'running') return;
    var t = c.currentTime, o = c.createOscillator(), g = c.createGain();
    o.frequency.setValueAtTime(120, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.35);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.5, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
    o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + 0.7);
  }
  function chime() {                         // bright two-note "ding" when the dot lands
    tone(1318.5, 1.6, 0.16, 'sine');
    tone(1975.5, 1.2, 0.07, 'sine', 0.06);
    tone(659.25, 1.0, 0.08, 'triangle');
  }
  var SFX = {
    draw:    function () { whoosh(0.7, 0.10, 400, 2600); },
    pop:     function () { thump(); },
    rise:    function () { whoosh(0.8, 0.14, 300, 1800); },
    fly:     function () { whoosh(0.6, 0.12, 2400, 700); },
    land:    function () { chime(); },
    sheen:   function () { whoosh(1.1, 0.05, 3000, 6000); }
  };

  // ---------------------------------------------------------------- helpers
  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function splitText(parent, str, o) {
    var spacing = o.spacing || 0;
    var probe = el('text', { x: 0, y: 0, 'font-size': o.size, 'font-family': o.family, 'font-weight': o.weight || 400,
      'letter-spacing': spacing, style: 'white-space:pre' }, parent);
    probe.textContent = str;
    var n = str.length, xs = [], ext = [];
    for (var i = 0; i < n; i++) { xs.push(probe.getStartPositionOfChar(i).x); ext.push(probe.getExtentOfChar(i)); }
    var width = probe.getEndPositionOfChar(n - 1).x - spacing;
    probe.remove();
    var letters = [];
    for (var j = 0; j < n; j++) {
      if (str[j] === ' ') continue;
      var t = el('text', { x: xs[j], y: 0, 'font-size': o.size, 'font-family': o.family, 'font-weight': o.weight || 400,
        'class': o.cls || 'atx-fg' }, parent);
      t.textContent = str[j];
      letters.push(t);
    }
    return { letters: letters, width: width, xs: xs, ext: ext };
  }
  var uid = 0;
  function buildIcon(parent, defs, s, withOutline) {
    var r = s * 0.22, g = el('g', {}, parent), outline = null;
    if (withOutline) outline = el('rect', { x: 0, y: 0, width: s, height: s, rx: r, 'class': 'atx-st-ic', 'stroke-width': Math.max(2, s * 0.014) }, g);
    var body = el('rect', { x: 0, y: 0, width: s, height: s, rx: r, 'class': 'atx-ic' }, g);
    var id = 'atxclip' + (++uid);
    el('rect', { x: 0, y: 0, width: s, height: s, rx: r }, el('clipPath', { id: id }, defs));
    var inner = el('g', {}, el('g', { 'clip-path': 'url(#' + id + ')' }, g));
    var fs = s * 0.47, sp = splitText(inner, 'AMS', { size: fs, family: F_SANS, cls: 'atx-ict' });
    if (sp.width > s * 0.92) {
      inner.innerHTML = ''; fs *= (s * 0.92) / sp.width;
      sp = splitText(inner, 'AMS', { size: fs, family: F_SANS, cls: 'atx-ict' });
    }
    inner.setAttribute('transform', 'translate(' + (s - sp.width) / 2 + ',' + (s / 2 + fs * CAP / 2) + ')');
    return { g: g, body: body, outline: outline, letters: sp.letters, perim: 4 * s - (8 - 2 * Math.PI) * r };
  }

  // ---------------------------------------------------------------- overlay + lockup
  function makeOverlay(theme, parent) {
    var o = document.createElement('div');
    o.className = 'atx-ov atx-' + theme;
    o.setAttribute('role', 'img');
    o.setAttribute('aria-label', 'ATMAX Studios — a media production agency');
    o.innerHTML = '<div class="atx-bg"></div>' +
      '<svg class="atx-svg" xmlns="' + NS + '" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet"><defs></defs><g></g></svg>' +
      '<div class="atx-vig"></div><div class="atx-sheen"></div>' +
      '<button class="atx-skip" type="button" aria-label="Skip intro">Skip ›</button>';
    parent.appendChild(o);
    return o;
  }

  function buildLockup(o) {
    var svg = o.querySelector('svg'), defs = svg.querySelector('defs'), root = svg.querySelector('g');
    var fsW = 118, capH = fsW * CAP, padX = capH * 0.18, padY = capH * 0.18, gapAS = capH * 0.38;
    var frameStroke = Math.max(3, capH * 0.042), iconS = 210, gapIW = 84, gapWT = 74, tagFs = 29;

    var atmaxOuter = el('g', {}, root), atmaxG = el('g', {}, atmaxOuter);
    var atmax = splitText(atmaxG, 'ATMAX', { size: fsW, family: F_BOLD, weight: 800, spacing: fsW * 0.03 });
    var studiosG = el('g', {}, root);
    var studios = splitText(studiosG, 'STUDıOS', { size: fsW, family: F_SANS, spacing: fsW * 0.01 });

    var frameW = studios.width + padX * 2, frameH = capH + padY * 2;
    var totalW = atmax.width + gapAS + frameW, totalH = iconS + gapIW + frameH + gapWT + tagFs * CAP;
    var left = (W - totalW) / 2, top = (H - totalH) / 2 + 6;
    var iconX = (W - iconS) / 2, iconY = top;
    var frameX = left + atmax.width + gapAS, frameY = top + iconS + gapIW;
    var baseline = frameY + padY + capH, tagBase = frameY + frameH + gapWT + tagFs * CAP;

    atmaxG.setAttribute('transform', 'translate(' + left + ',' + baseline + ')');
    studiosG.setAttribute('transform', 'translate(' + (frameX + padX) + ',' + baseline + ')');

    var mId = 'atxmask' + (++uid);
    el('rect', { x: left - 20, y: baseline - capH - 40, width: atmax.width + 40, height: capH + 42 },
      el('clipPath', { id: mId, clipPathUnits: 'userSpaceOnUse' }, defs));
    atmaxOuter.setAttribute('clip-path', 'url(#' + mId + ')');

    var frame = el('rect', { x: frameX, y: frameY, width: frameW, height: frameH, 'class': 'atx-st-fg', 'stroke-width': frameStroke }, root);
    root.insertBefore(frame, studiosG);

    var iExt = studios.ext[4], dotS = fsW * 0.115;
    var dotCX = frameX + padX + iExt.x + iExt.width / 2, dotY = baseline - capH;

    var iconMove = el('g', {}, root), iconWrap = el('g', {}, iconMove);
    var icon = buildIcon(iconWrap, defs, iconS, true);
    icon.g.setAttribute('transform', 'translate(' + iconX + ',' + iconY + ')');

    var tagG = el('g', {}, root);
    var tag = splitText(tagG, 'a media production agency', { size: tagFs, family: F_SANS, spacing: tagFs * 0.22 });
    tagG.setAttribute('transform', 'translate(' + (W - tag.width) / 2 + ',' + tagBase + ')');

    var ripple = el('rect', { x: -dotS / 2, y: -dotS / 2, width: dotS, height: dotS, rx: dotS * 0.22, 'class': 'atx-st-fg', 'stroke-width': 1.6, opacity: 0 }, root);
    var flyer = buildIcon(root, defs, iconS, false);

    // keep the logo a good size on phones (portrait) and TVs (landscape)
    function fit() {
      var a = (o.clientWidth || innerWidth) / (o.clientHeight || innerHeight || 1);
      var room = o.__atxRoom, needW = totalW * (room ? (a < 1 ? room[0] : room[1]) : (a < 1 ? 1.12 : 1.48)), needH = totalH * (room ? 2.1 : 1.8), vbW, vbH;
      if (needW / needH > a) { vbW = needW; vbH = needW / a; } else { vbH = needH; vbW = needH * a; }
      svg.setAttribute('viewBox', (W / 2 - vbW / 2) + ' ' + (H / 2 - vbH / 2) + ' ' + vbW + ' ' + vbH);
    }
    fit();
    window.addEventListener('resize', fit);

    return {
      root: root, atmax: atmax, studios: studios, tag: tag, frame: frame, framePerim: 2 * (frameW + frameH),
      icon: icon, iconMove: iconMove, iconWrap: iconWrap, iconS: iconS, iconX: iconX, iconY: iconY,
      flyer: flyer, ripple: ripple, dotS: dotS, dotCX: dotCX, dotY: dotY, capH: capH,
      sheen: o.querySelector('.atx-sheen'),
      destroy: function () { window.removeEventListener('resize', fit); }
    };
  }

  // the quick cut: whole logo in ~1.4s (site visit and trailers)
  function buildQuickTimeline(gsap, L, withSound) {
    var s = L.iconS, capH = L.capH, dotScale = L.dotS / s;
    var fx1 = L.dotCX - s / 2, fy1 = L.dotY + L.dotS / 2 - s / 2;
    var sfx = function (name) { return function () { if (withSound && CFG.sound) SFX[name](); }; };

    gsap.set(L.icon.outline, { opacity: 0 });
    gsap.set(L.iconMove, { y: 0, scale: 1 });
    gsap.set(L.icon.body, { scale: 0.3, opacity: 0, transformOrigin: '50% 50%' });
    gsap.set(L.icon.letters, { y: s * 0.75 });
    gsap.set(L.atmax.letters, { y: capH * 1.35 });
    gsap.set(L.studios.letters, { opacity: 0, y: capH * 0.35 });
    gsap.set(L.tag.letters, { opacity: 0, y: 8 });
    gsap.set(L.frame, { strokeDasharray: L.framePerim, strokeDashoffset: L.framePerim });
    gsap.set(L.flyer.g, { x: L.iconX, y: L.iconY, scale: 1, rotation: 0, transformOrigin: '50% 50%', autoAlpha: 0 });
    gsap.set(L.ripple, { x: L.dotCX, y: L.dotY + L.dotS / 2, transformOrigin: '50% 50%' });

    var tl = gsap.timeline({ defaults: { ease: 'expo.out' }, paused: true });
    tl.call(sfx('pop'), null, 0)
      .to(L.icon.body, { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2)' }, 0)
      .to(L.icon.letters, { y: 0, duration: 0.45, stagger: 0.04 }, 0.06)
      .call(sfx('rise'), null, 0.1)
      .to(L.atmax.letters, { y: 0, duration: 0.5, stagger: 0.035 }, 0.14)
      .to(L.frame, { strokeDashoffset: 0, duration: 0.5, ease: 'power3.inOut' }, 0.18)
      .to(L.studios.letters, { opacity: 1, y: 0, duration: 0.4, stagger: 0.03, ease: 'power3.out' }, 0.26)
      .set(L.flyer.g, { autoAlpha: 1 }, 0.36)
      .to(L.iconWrap, { scale: 0.95, transformOrigin: '50% 50%', duration: 0.1, ease: 'power2.out' }, 0.36)
      .to(L.iconWrap, { scale: 1, duration: 0.45, ease: 'elastic.out(1,0.4)' }, 0.46)
      .to(L.flyer.g, { x: fx1, duration: 0.55, ease: 'power2.inOut' }, 0.36)
      .to(L.flyer.g, { y: fy1, duration: 0.55, ease: 'power3.in' }, 0.36)
      .to(L.flyer.g, { scale: dotScale, rotation: 360, duration: 0.55, ease: 'power3.inOut' }, 0.36)
      .call(sfx('land'), null, 0.91)
      .to(L.flyer.g, { scaleX: dotScale * 1.35, scaleY: dotScale * 0.7, duration: 0.06, ease: 'power2.out' }, 0.91)
      .to(L.flyer.g, { scaleX: dotScale, scaleY: dotScale, duration: 0.4, ease: 'elastic.out(1.1,0.35)' }, 0.97)
      .fromTo(L.ripple, { scale: 1, opacity: 0.9 }, { scale: 4, opacity: 0, duration: 0.5, ease: 'power2.out', immediateRender: false }, 0.91)
      .to(L.tag.letters, { opacity: 1, y: 0, duration: 0.35, stagger: 0.01, ease: 'power2.out' }, 0.7);
    return tl;   // ends at ~1.4s
  }

  // the Version 1 choreography (before films, sped up to fit 3 seconds)
  function buildTimeline(gsap, L, withSound, withSheen) {
    var s = L.iconS, capH = L.capH;
    var centreOffset = (H / 2 - s / 2) - L.iconY;
    var dotScale = L.dotS / s;
    var fx1 = L.dotCX - s / 2, fy1 = L.dotY + L.dotS / 2 - s / 2;
    var sfx = function (name) { return function () { if (withSound && CFG.sound) SFX[name](); }; };

    gsap.set(L.flyer.g, { x: L.iconX, y: L.iconY, scale: 1, rotation: 0, transformOrigin: '50% 50%', autoAlpha: 0 });
    gsap.set(L.ripple, { x: L.dotCX, y: L.dotY + L.dotS / 2, transformOrigin: '50% 50%' });
    gsap.set(L.icon.outline, { strokeDasharray: L.icon.perim, strokeDashoffset: L.icon.perim });
    gsap.set(L.frame, { strokeDasharray: L.framePerim, strokeDashoffset: L.framePerim });
    gsap.set(L.iconMove, { y: centreOffset, scale: 1.18, transformOrigin: '50% 50%' });
    gsap.set(L.icon.body, { scale: 0.35, opacity: 0, transformOrigin: '50% 50%' });
    gsap.set(L.icon.letters, { y: s * 0.75 });
    gsap.set(L.atmax.letters, { y: capH * 1.35 });
    gsap.set(L.studios.letters, { opacity: 0, y: capH * 0.35 });
    gsap.set(L.tag.letters, { opacity: 0, y: 12 });

    var T = 3.85, tl = gsap.timeline({ defaults: { ease: 'expo.out' }, paused: true });
    tl.call(sfx('draw'), null, 0.15)
      .to(L.icon.outline, { strokeDashoffset: 0, duration: 1.15, ease: 'power2.inOut' }, 0.15)
      .call(sfx('pop'), null, 1.0)
      .to(L.icon.body, { scale: 1, opacity: 1, duration: 0.95, ease: 'back.out(1.7)' }, 1.0)
      .to(L.icon.outline, { opacity: 0, duration: 0.4, ease: 'power1.out' }, 1.25)
      .to(L.icon.letters, { y: 0, duration: 1.0, stagger: 0.09 }, 1.25)
      .to(L.iconWrap, { scaleX: 1.07, scaleY: 0.92, transformOrigin: '50% 100%', duration: 0.2, ease: 'power2.out' }, 2.15)
      .to(L.iconWrap, { scaleX: 1, scaleY: 1, duration: 0.9, ease: 'elastic.out(1,0.38)' }, 2.35)
      .call(sfx('rise'), null, 2.3)
      .to(L.iconMove, { y: 0, scale: 1, duration: 1.15, ease: 'expo.inOut' }, 2.3)
      .to(L.atmax.letters, { y: 0, duration: 1.05, stagger: 0.065 }, 2.95)
      .to(L.frame, { strokeDashoffset: 0, duration: 1.2, ease: 'power3.inOut' }, 3.05)
      .to(L.studios.letters, { opacity: 1, y: 0, duration: 0.9, stagger: 0.05, ease: 'power3.out' }, 3.4)
      .set(L.flyer.g, { autoAlpha: 1 }, T)
      .call(sfx('fly'), null, T + 0.45)
      .to(L.iconWrap, { scale: 0.95, transformOrigin: '50% 50%', duration: 0.15, ease: 'power2.out' }, T)
      .to(L.iconWrap, { scale: 1, duration: 0.7, ease: 'elastic.out(1,0.4)' }, T + 0.15)
      .to(L.flyer.g, { x: fx1, duration: 1.15, ease: 'power2.inOut' }, T)
      .to(L.flyer.g, { y: L.iconY - 46, duration: 0.38, ease: 'power2.out' }, T)
      .to(L.flyer.g, { y: fy1, duration: 0.77, ease: 'power3.in' }, T + 0.38)
      .to(L.flyer.g, { scale: dotScale, rotation: 360, duration: 1.15, ease: 'power3.inOut' }, T)
      .call(sfx('land'), null, T + 1.15)
      .to(L.flyer.g, { scaleX: dotScale * 1.35, scaleY: dotScale * 0.7, duration: 0.1, ease: 'power2.out' }, T + 1.15)
      .to(L.flyer.g, { scaleX: dotScale, scaleY: dotScale, duration: 0.7, ease: 'elastic.out(1.1,0.35)' }, T + 1.25)
      .fromTo(L.ripple, { scale: 1, opacity: 0.9 }, { scale: 4.2, opacity: 0, duration: 0.9, ease: 'power2.out', immediateRender: false }, T + 1.15)
      .to(L.tag.letters, { opacity: 1, y: 0, duration: 0.55, stagger: 0.028, ease: 'power2.out' }, T + 1.3);
    if (!withSheen) return tl;
    tl.call(sfx('sheen'), null, T + 2.2)
      .fromTo(L.sheen, { xPercent: -60, opacity: 0 }, { xPercent: 60, opacity: 1, duration: 1.6, ease: 'power2.inOut', immediateRender: false }, T + 2.2)
      .to(L.sheen, { opacity: 0, duration: 0.4 }, T + 3.4);
    return tl;
  }

  // ---------------------------------------------------------------- the player
  var active = null;   // the intro currently on screen

  function run(opts) {
    // opts: { theme, parent, cut:'quick'|'film', speed, hold, exitTime, sound, exit:'curtain'|'fade', overlay }
    return new Promise(function (resolve) {
      var o = opts.overlay || makeOverlay(opts.theme, opts.parent);
      var finished = false, tl = null, L = null, exitTl = null;
      var skipBtn = o.querySelector('.atx-skip');

      function cleanup() {
        if (finished) return;
        finished = true;
        window.removeEventListener('keydown', onKey, true);
        setTimeout(function () { window.removeEventListener('keyup', onKeyUp, true); }, 400);
        if (tl) tl.kill();
        if (exitTl) exitTl.kill();
        if (L) L.destroy();
        if (o.parentNode) o.parentNode.removeChild(o);
        if (active === ctl) active = null;
        resolve();
      }
      function exit(fast) {
        if (finished || exitTl) return;
        var gsap = window.gsap;
        if (!gsap || !L) return cleanup();
        if (tl) tl.pause();
        skipBtn.classList.remove('on');
        exitTl = gsap.timeline({ onComplete: cleanup });
        var d = fast ? Math.min(0.5, opts.exitTime || 0.5) : (opts.exitTime || 0.6);
        if (opts.exit === 'curtain') {
          // logo eases back, then the red lifts away like a curtain
          exitTl.to(L.root, { scale: 0.92, opacity: 0, transformOrigin: '50% 50%', duration: d * 0.5, ease: 'power2.in' })
                .to(o, { yPercent: -100, duration: d * 0.85, ease: 'expo.inOut' }, d * 0.15);
        } else {
          exitTl.to(o, { opacity: 0, duration: d, ease: 'power2.inOut' });
        }
      }
      function onKey(e) {
        var k = e.key;
        if (k === 'Enter' || k === ' ' || k === 'Escape' || k === 'Spacebar') {
          e.preventDefault(); e.stopImmediatePropagation();
          exit(true);
        }
      }
      function onKeyUp(e) {          // stop Space from also pressing a focused button underneath
        if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter') { e.preventDefault(); e.stopImmediatePropagation(); }
      }
      var ctl = { skip: function () { exit(true); }, overlay: o };
      active = ctl;
      window.addEventListener('keydown', onKey, true);
      window.addEventListener('keyup', onKeyUp, true);
      o.addEventListener('click', function () { exit(true); });

      ready.then(function () {
        if (finished) return;
        var gsap = window.gsap;
        try { L = buildLockup(o); } catch (e) { return cleanup(); }
        tl = opts.cut === 'quick' ? buildQuickTimeline(gsap, L, opts.sound) : buildTimeline(gsap, L, opts.sound, opts.cut === 'full');
        tl.timeScale(opts.speed || 1);
        tl.eventCallback('onUpdate', function () { if (!o.isConnected) cleanup(); });
        tl.eventCallback('onComplete', function () { gsap.delayedCall(opts.hold || 0, function () { exit(false); }); });
        setTimeout(function () { if (!finished && !exitTl) skipBtn.classList.add('on'); }, 350);
        tl.play();
      }).catch(function () {
        // no internet for the animation engine: get out of the way quietly
        o.style.transition = 'opacity .4s'; o.style.opacity = '0';
        setTimeout(cleanup, 420);
      });
    });
  }

  // the three versions (lengths include the curtain / fade at the end)
  var CUTS = {
    site:    { theme: 'red',   cut: 'full', speed: 1, hold: 0.3, exitTime: 0.95, sound: false, exit: 'curtain' }, // full animation, normal speed
    film:    { theme: 'black', cut: 'full', speed: 1, hold: 0.3, exitTime: 0.6,  sound: true,  exit: 'fade' },
    trailer: { theme: 'black', cut: 'full', speed: 1, hold: 0.3, exitTime: 0.6,  sound: true,  exit: 'fade' }
  };
  function preset(name, extra) { return Object.assign({}, CUTS[name], extra || {}); }

  // 1 ── when the website opens ────────────────────────────────────────
  var splashOverlay = null;
  function shouldSplash() {
    if (!CFG.splash || reduceMotion) return false;
    if (CFG.splashEveryLoad) return true;
    try {
      if (sessionStorage.getItem('atmax_intro_seen')) return false;
      sessionStorage.setItem('atmax_intro_seen', '1');
    } catch (e) {}
    return true;
  }
  if (shouldSplash()) {
    // cover the page straight away so the site never flashes before the intro
    splashOverlay = makeOverlay('red', document.body || document.documentElement);
    var startSplash = function () {
      if (document.body && splashOverlay.parentNode !== document.body) document.body.appendChild(splashOverlay);
      run(preset('site', { overlay: splashOverlay }));
    };
    if (document.body) startSplash();
    else document.addEventListener('DOMContentLoaded', startSplash);
  }

  // 2 ── before every film ─────────────────────────────────────────────
  var lastWasTrailer = false;
  function wrapPlay() {
    if (typeof window.play === 'function' && !window.play.__atx) {
      var orig = window.play;
      var wrapped = function (id, tr) { lastWasTrailer = !!tr; return orig.apply(this, arguments); };
      wrapped.__atx = true;
      window.play = wrapped;
    }
  }

  function introBeforeFilm(player) {
    if (!CFG.beforeFilms || reduceMotion) return;
    if (lastWasTrailer && !CFG.beforeTrailers) return;
    var v = player.querySelector('video'), f = player.querySelector('iframe');
    if (!v && !f) return;                         // "no video added yet" screen
    if (CFG.sound) audio();

    // hold the film while the intro plays (it keeps loading in the background)
    var holdPlay = null, iframeSrc = null;
    if (v) {
      v.autoplay = false;
      v.removeAttribute('autoplay');
      holdPlay = function () { v.pause(); };
      v.addEventListener('play', holdPlay);
    }
    if (f && f.getAttribute('src') && !/drive\.google\./.test(f.getAttribute('src'))) {
      // YouTube/Vimeo start playing by themselves, so load them after the intro
      iframeSrc = f.getAttribute('src');
      f.setAttribute('src', 'about:blank');
    }

    run(preset(lastWasTrailer ? 'trailer' : 'film', { parent: player })).then(function () {
      if (!player.isConnected) return;            // viewer closed the player during the intro
      if (v) {
        v.removeEventListener('play', holdPlay);
        var p = v.play(); if (p && p.catch) p.catch(function () {});
      }
      if (iframeSrc) f.setAttribute('src', iframeSrc);
    });
  }

  function watchPlayers() {
    wrapPlay();
    new MutationObserver(function (muts) {
      wrapPlay();
      for (var i = 0; i < muts.length; i++) {
        var added = muts[i].addedNodes;
        for (var j = 0; j < added.length; j++) {
          var n = added[j];
          if (n.nodeType === 1 && n.classList && n.classList.contains('player')) introBeforeFilm(n);
        }
      }
    }).observe(document.body, { childList: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', watchPlayers);
  else watchPlayers();


  // 4 ── embedded, e.g. on the sign-in screen ──────────────────────────
  // loop:true  → plays at normal speed, holds, fades and plays again
  // loop:false → plays once, holds the finished logo with a soft light sweep now and then; tap to replay
  function mount(el, opts) {
    opts = opts || {};
    if (!el || el.__atxMounted) return;
    el.__atxMounted = true;
    var o = makeOverlay(opts.theme || 'red', el);
    o.classList.add('atx-embed');
    o.__atxRoom = [1.42, 1.62];
    o.removeAttribute('role');
    var L = null, tl = null, timer = null, dead = false;
    function alive() {
      if (!o.isConnected) { stop(); return false; }
      return true;
    }
    function stop() {
      if (dead) return; dead = true;
      if (tl) tl.kill();
      if (timer) timer.kill();
      if (L) L.destroy();
      el.__atxMounted = false;
    }
    function play() {
      var gsap = window.gsap;
      if (!alive()) return;
      if (tl) tl.kill();
      if (timer) timer.kill();
      gsap.set(L.root, { opacity: 1, scale: 1 });
      tl = buildTimeline(gsap, L, false, true);
      tl.eventCallback('onUpdate', alive);
      tl.eventCallback('onComplete', function () {
        if (!alive()) return;
        if (opts.loop !== false) {
          timer = gsap.delayedCall(opts.hold || 2.2, function () {
            if (!alive()) return;
            gsap.to(L.root, { opacity: 0, scale: 0.97, transformOrigin: '50% 50%', duration: 0.6, ease: 'power2.in', onComplete: function () { gsap.delayedCall(0.35, play); } });
          });
        } else {
          (function sweep() {
            timer = gsap.delayedCall(6, function () {
              if (!alive()) return;
              gsap.fromTo(L.sheen, { xPercent: -60, opacity: 0 }, { xPercent: 60, opacity: 1, duration: 1.6, ease: 'power2.inOut' });
              gsap.to(L.sheen, { opacity: 0, duration: 0.4, delay: 1.2 });
              sweep();
            });
          })();
        }
      });
      tl.play();
    }
    ready.then(function () {
      if (!alive()) return;
      try { L = buildLockup(o); } catch (e) { o.remove(); return; }
      el.classList.add('atx-on');
      if (reduceMotion) { buildTimeline(window.gsap, L, false, false).progress(1); return; }
      if (opts.loop === false) o.addEventListener('click', play);
      play();
    }).catch(function () { o.remove(); });
    return { stop: stop };
  }

  // ---------------------------------------------------------------- public controls
  window.ATMAXIntro = {
    config: CFG,
    /** play the website-opening version on demand */
    playSplash: function () {
      return run(preset('site', { parent: document.body }));
    },
    /** play the before-film or before-trailer version inside any element (defaults to full screen) */
    playFilmIntro: function (parent) { if (CFG.sound) audio(); return run(preset('film', { parent: parent || document.body })); },
    playTrailerIntro: function (parent) { if (CFG.sound) audio(); return run(preset('trailer', { parent: parent || document.body })); },
    skip: function () { if (active) active.skip(); },
    /** play the logo animation inside an element: { loop:true|false, theme:'red'|'black' } */
    mount: mount
  };
})();
