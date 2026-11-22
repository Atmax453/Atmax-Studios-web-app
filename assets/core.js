var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const SUPABASE_URL = "https://xzeahvkmvrdpxcfsgwqh.supabase.co", SUPABASE_KEY = "sb_publishable_LCRngOPZzgc6E-QwT6jjZQ_hb0qqLjY";
const GOOGLE_LOGIN = true;
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const $ = (s) => document.querySelector(s), app = $("#app");
const ROLE_OPTS = '<optgroup label="Cast"><option>Lead Actor</option><option>Lead Actress</option><option>Supporting Actor</option><option>Supporting Actress</option><option>Co-Star</option><option>Guest Star</option><option>Cameo</option><option>Special Appearance</option><option>Voice Actor</option><option>Narrator</option><option>Motion Capture Performer</option><option>Stand-in</option><option>Body Double</option><option>Photo Double</option><option>Background Actor / Extra</option><option>Child Actor</option><option>Stunt Performer</option><option>Stunt Double</option></optgroup><optgroup label="Directing"><option>Director</option><option>Co-Director</option><option>Second Unit Director</option><option>Assistant Director (1st AD)</option><option>Second Assistant Director (2nd AD)</option><option>Third Assistant Director</option><option>Script Supervisor</option><option>Director\'s Assistant</option><option>Creative Director</option></optgroup><optgroup label="Producing"><option>Executive Producer</option><option>Producer</option><option>Co-Producer</option><option>Associate Producer</option><option>Line Producer</option><option>Supervising Producer</option><option>Consulting Producer</option><option>Production Manager</option><option>Unit Production Manager</option><option>Production Supervisor</option><option>Production Coordinator</option><option>Assistant Production Coordinator</option><option>Production Assistant</option><option>Production Accountant</option><option>Post-Production Supervisor</option><option>Post-Production Coordinator</option><option>Development Executive</option><option>Studio Executive</option><option>Showrunner</option></optgroup><optgroup label="Writing"><option>Writer</option><option>Screenplay</option><option>Story By</option><option>Screenwriter</option><option>Co-Writer</option><option>Staff Writer</option><option>Script Editor</option><option>Script Consultant</option><option>Story Editor</option><option>Adapted From (Source Author)</option><option>Dialogue Writer</option><option>Original Concept By</option></optgroup><optgroup label="Casting"><option>Casting Director</option><option>Casting Associate</option><option>Casting Assistant</option><option>Extras Casting</option></optgroup><optgroup label="Camera"><option>Director of Photography (DP)</option><option>Cinematographer</option><option>Camera Operator</option><option>A-Camera Operator</option><option>B-Camera Operator</option><option>First Assistant Camera (Focus Puller)</option><option>Second Assistant Camera (Clapper Loader)</option><option>DIT (Digital Imaging Technician)</option><option>Data Wrangler</option><option>Steadicam Operator</option><option>Drone Operator</option><option>Aerial Cinematographer</option><option>Underwater Cinematographer</option><option>Still Photographer</option><option>Camera Trainee</option><option>Video Assist Operator</option><option>Colour Grading Consultant</option></optgroup><optgroup label="Lighting & Grip"><option>Gaffer</option><option>Best Boy Electric</option><option>Electrician</option><option>Lighting Technician</option><option>Lighting Director</option><option>Key Grip</option><option>Best Boy Grip</option><option>Dolly Grip</option><option>Grip</option><option>Rigging Gaffer</option><option>Generator Operator</option></optgroup><optgroup label="Sound"><option>Production Sound Mixer</option><option>Boom Operator</option><option>Sound Assistant</option><option>Sound Designer</option><option>Supervising Sound Editor</option><option>Sound Editor</option><option>Dialogue Editor</option><option>ADR Editor</option><option>ADR Mixer</option><option>Foley Artist</option><option>Foley Mixer</option><option>Re-recording Mixer</option><option>Sound Effects Editor</option><option>Music Editor</option><option>Sound Recordist</option></optgroup><optgroup label="Art Department"><option>Production Designer</option><option>Art Director</option><option>Assistant Art Director</option><option>Set Decorator</option><option>Set Dresser</option><option>Leadman</option><option>Property Master</option><option>Prop Maker</option><option>Props Assistant</option><option>Scenic Artist</option><option>Graphic Designer</option><option>Concept Artist</option><option>Storyboard Artist</option><option>Illustrator</option><option>Draughtsperson</option><option>Construction Coordinator</option><option>Carpenter</option><option>Painter</option><option>Greensman</option><option>Model Maker</option><option>Art Department Coordinator</option></optgroup><optgroup label="Costume"><option>Costume Designer</option><option>Assistant Costume Designer</option><option>Costume Supervisor</option><option>Wardrobe Supervisor</option><option>Wardrobe Assistant</option><option>Costume Standby</option><option>Tailor / Seamstress</option><option>Costume Cutter</option><option>Costume Buyer</option></optgroup><optgroup label="Hair & Makeup"><option>Makeup Artist</option><option>Key Makeup Artist</option><option>Makeup Designer</option><option>Special Effects Makeup Artist</option><option>Prosthetics Designer</option><option>Hair Stylist</option><option>Key Hairstylist</option><option>Hair Designer</option><option>Wig Maker</option><option>Makeup Assistant</option></optgroup><optgroup label="Visual Effects & Animation"><option>VFX Supervisor</option><option>VFX Producer</option><option>VFX Artist</option><option>Compositor</option><option>CGI Artist</option><option>3D Artist</option><option>Animator</option><option>Lead Animator</option><option>Character Animator</option><option>Motion Graphics Artist</option><option>Matte Painter</option><option>Title Designer</option><option>Rotoscope Artist</option><option>Previs Artist</option><option>Colourist</option><option>Creature Designer</option><option>Rigging Artist</option><option>Lighting Artist (CG)</option></optgroup><optgroup label="Special Effects & Stunts"><option>Special Effects Supervisor</option><option>Special Effects Coordinator</option><option>Pyrotechnician</option><option>Armourer</option><option>Weapons Master</option><option>Stunt Coordinator</option><option>Fight Choreographer</option><option>Stunt Rigger</option><option>Safety Officer</option><option>Animal Trainer</option><option>Animal Wrangler</option><option>Intimacy Coordinator</option><option>Dance Choreographer</option><option>Choreographer</option></optgroup><optgroup label="Editing & Post"><option>Editor</option><option>Film Editor</option><option>Supervising Editor</option><option>Assistant Editor</option><option>Online Editor</option><option>Offline Editor</option><option>Trailer Editor</option><option>Post Production Sound</option><option>Subtitle Translator</option><option>Subtitler</option><option>Digital Intermediate Producer</option><option>Dailies Technician</option><option>Conform Editor</option><option>Archive Researcher</option><option>Footage Archivist</option></optgroup><optgroup label="Music"><option>Composer</option><option>Original Score By</option><option>Music Supervisor</option><option>Orchestrator</option><option>Conductor</option><option>Songwriter</option><option>Lyricist</option><option>Music Producer</option><option>Music Arranger</option><option>Sound Mixer (Music)</option><option>Soloist</option><option>Performed By</option><option>Soundtrack Artist</option><option>Song Performed By</option><option>Music Coordinator</option><option>Music Clearance</option></optgroup><optgroup label="Locations & Transport"><option>Location Manager</option><option>Assistant Location Manager</option><option>Location Scout</option><option>Location Assistant</option><option>Unit Manager</option><option>Transportation Coordinator</option><option>Transport Captain</option><option>Driver</option><option>Picture Car Coordinator</option><option>Marine Coordinator</option><option>Aerial Coordinator</option></optgroup><optgroup label="Set Operations"><option>Unit Publicist</option><option>Set Medic</option><option>Health &amp; Safety Officer</option><option>Security</option><option>Craft Services</option><option>Catering</option><option>Production Runner</option><option>Set Production Assistant</option><option>Cleaner</option><option>Fixer</option><option>Interpreter</option><option>Dialect Coach</option><option>Dialogue Coach</option><option>Acting Coach</option><option>Child Wrangler</option><option>Tutor</option></optgroup><optgroup label="Marketing & Distribution"><option>Distributor</option><option>Sales Agent</option><option>Publicist</option><option>Marketing Manager</option><option>Poster Designer</option><option>Trailer House</option><option>Social Media Manager</option><option>EPK Producer</option><option>Behind the Scenes Videographer</option><option>Making-of Producer</option></optgroup><optgroup label="Business & Legal"><option>Production Company</option><option>Financier</option><option>Completion Guarantor</option><option>Entertainment Lawyer</option><option>Insurance Broker</option><option>Clearance Coordinator</option><option>Executive in Charge of Production</option><option>Talent Agent</option><option>Manager</option></optgroup><optgroup label="Special Thanks"><option>Special Thanks</option><option>In Loving Memory Of</option><option>Sponsor</option><option>Partner</option><option>Supported By</option><option>Filmed At</option></optgroup>';
window.DEEP = (() => {
  const m = location.search.match(/[?&](film|person|house)=(\d+)/);
  return m ? m[1] == "film" ? { f: m[2] } : m[1] == "house" ? { h: m[2] } : { p: m[2] } : null;
})();
const PAGE = window.ATMAX_PAGE || "home", navTo = (p) => {
  location.href = p;
}, VPATH = { home: "/", list: "/my-list/", history: "/watched/" };
const saveSub = () => {
  try {
    sessionStorage.setItem("atmax_sub", S.sub && S.user ? JSON.stringify({ u: S.user.id, s: S.sub }) : "");
  } catch (e) {
  }
};
const loadSub = (uid) => {
  try {
    const v = JSON.parse(sessionStorage.getItem("atmax_sub") || "null");
    return v && v.u === uid ? v.s : null;
  } catch (e) {
    return null;
  }
};
const toLogin = (msg, mode) => {
  if (PAGE === "login") return login(msg);
  try {
    if (msg) sessionStorage.setItem("atmax_lmsg", msg);
  } catch (e) {
  }
  navTo("/login/" + (mode === "up" ? "?m=up" : ""));
};
const LEGAL = '<div class="legal"><a href="/films/">Films</a>\xB7<a href="/people/">Cast &amp; crew</a>\xB7<a href="/about.html" target="_blank" rel="noopener">About</a>\xB7<a href="/privacy.html" target="_blank" rel="noopener">Privacy Policy</a>\xB7<a href="/terms.html" target="_blank" rel="noopener">Terms of Service</a></div>';
const esc = (s) => String(s != null ? s : "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
let S = { set: {}, user: null, sub: null, view: "home", q: "", mode: "in", T: [], R: [], L: [], H: [], isAdmin: false, preview: false };
window.__ROOT = S;
const studioMark = () => {
  const d = S.set, nm = d.nostudio ? "" : esc(d.studio || "ATMAX STUDIOS"), lg = d.logo ? '<img class="sm-img" src="'.concat(esc(dimg(d.logo)), '" alt="').concat(esc(d.brand || "ATMAX"), '" onerror="this.style.display=\'none\'">') : "";
  return lg + (nm ? '<div class="sm-t">'.concat(nm, "</div>") : "");
};
const homeMark = () => {
  if (S.set.nohb) return "";
  const m = studioMark();
  return m ? '<div class="hb">'.concat(m, "</div>") : "";
};
const brand = () => '<div class="logo">'.concat(S.set.logo ? '<img src="'.concat(esc(dimg(S.set.logo)), '" alt="').concat(esc(S.set.brand || "ATMAX"), '" height="30" onerror="this.replaceWith(document.createTextNode(this.alt))">') : esc(S.set.brand || "ATMAX"), "</div>");
const FONTS = { clean: "system-ui,-apple-system,'Segoe UI',sans-serif", serif: "Georgia,'Times New Roman',serif", rounded: "ui-rounded,'Segoe UI',system-ui,sans-serif", cond: "'Arial Narrow','Roboto Condensed',sans-serif", poppins: "'Poppins',system-ui,sans-serif", montserrat: "'Montserrat',system-ui,sans-serif", playfair: "'Playfair Display',Georgia,serif", bebas: "'Bebas Neue',Impact,sans-serif", oswald: "'Oswald','Arial Narrow',sans-serif", lora: "'Lora',Georgia,serif" };
const CK = ["accent", "ac2", "btx", "dark", "nt", "pg", "pg2", "pgd", "tx", "mu", "sf", "sx", "star"];
const DEF = { accent: "#9b2c4b", btx: "#ffffff", dark: "#0e0b0c", nt: "#ffffff", pg: "#0a0809", pgd: "none", tx: "#f4ecef", mu: "#a89aa0", sf: "#ffffff", sx: "#141012", star: "#ffffff" };
const fillTheme = (t) => {
  const o = __spreadValues(__spreadValues({}, DEF), t);
  o.ac2 = t.ac2 || o.accent;
  o.pg2 = t.pg2 || o.pg;
  return o;
};
const THX = { ghana: ["Ghana gold & green", { accent: "#fcd116", ac2: "#f0a800", btx: "#141012", dark: "#0b1a0f", pg: "#07100a", tx: "#fff8e1" }], emerald: ["Emerald", { accent: "#10b981", ac2: "#059669", btx: "#04130d", dark: "#06130f", pg: "#050d0a", tx: "#e8f7f1" }], sunset: ["Sunset", { accent: "#f97316", ac2: "#e11d48", btx: "#ffffff", dark: "#190b08", pg: "#100705", tx: "#fdeee6" }] };
const rgbaOf = (h, a) => {
  h = String(h || "#000000").replace("#", "");
  if (h.length == 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16) || 0;
  return "rgba(" + (n >> 16 & 255) + "," + (n >> 8 & 255) + "," + (n & 255) + "," + a + ")";
};
const lightOn = () => {
  try {
    return localStorage.getItem("atmax_lt") === "1";
  } catch (e) {
    return false;
  }
};
function eff(s) {
  let d = __spreadValues({}, s);
  if (s.evt && s.evf && s.evu) {
    const n = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    if (n >= s.evf && n <= s.evu) {
      const t = s.evt.startsWith("c:") ? ((s.cthemes || []).find((x) => x.n === s.evt.slice(2)) || {}).v : window.TH && TH[s.evt] ? TH[s.evt][1] : null;
      if (t) d = __spreadValues(__spreadValues({}, d), fillTheme(t));
    }
  }
  if (s.ltg && lightOn()) d = __spreadProps(__spreadValues({}, d), { pg: "#f6f1f2", pg2: "#f6f1f2", pgd: "none", tx: "#141012", mu: "#6f6368", sf: "#ffffff", sx: "#141012" });
  return d;
}
function applyAnim(d) {
  try {
    const n = (x) => {
      x = +x;
      return x > 0 && x <= 4 ? x : 1;
    }, c = { splash: d.asOn !== false, beforeFilms: d.afOn !== false, beforeTrailers: d.atOn !== false, splashSpeed: n(d.asSp), filmSpeed: n(d.afSp), trailerSpeed: n(d.atSp), splashSound: !!d.asSn, filmSound: d.afSn !== false, trailerSound: d.atSn !== false };
    localStorage.setItem("atmax_anim", JSON.stringify(c));
    if (window.ATMAXIntro && ATMAXIntro.config) Object.assign(ATMAXIntro.config, c);
  } catch (e) {
  }
}
function theme() {
  var _a, _b;
  const d = eff(S.set), r = document.documentElement.style, b = document.body;
  r.setProperty("--wine", d.accent || "#9b2c4b");
  r.setProperty("--bar", d.dark || "#0e0b0c");
  r.setProperty("--pg", d.pg || "#0a0809");
  r.setProperty("--tx", d.tx || "#f4ecef");
  r.setProperty("--fb", FONTS[d.fb] || FONTS.clean);
  r.setProperty("--ft", FONTS[d.ft] || FONTS[d.fb] || FONTS.clean);
  if (d.fs && !TV) r.fontSize = { s: "90%", m: "100%", l: "112%" }[d.fs] || "100%";
  r.setProperty("--tr", (d.tr || 12) + "px");
  r.setProperty("--tw", { s: "150px", m: "200px", l: "250px" }[d.ts] || "200px");
  r.setProperty("--ar", { wide: "16/9", sq: "1/1" }[d.tsh] || "2/3");
  r.setProperty("--hh", { s: "38vh", m: "55vh", l: "85vh" }[d.hh] || "55vh");
  r.setProperty("--navbg", d.nb == "clear" ? "transparent" : d.nb == "solid" ? d.dark || "#0e0b0c" : rgbaOf(d.dark || "#0e0b0c", 0.72));
  r.setProperty("--nt2", rgbaOf(d.nt || "#ffffff", 0.7));
  r.setProperty("--phc", rgbaOf(d.accent || "#9b2c4b", 0.45));
  r.setProperty("--hov", rgbaOf(d.dark || "#0e0b0c", d.ho == null || d.ho === "" ? 1 : d.ho / 100));
  r.setProperty("--glc", rgbaOf(d.accent || "#9b2c4b", d.glw == null || d.glw === "" ? 0.55 : d.glw / 100));
  r.setProperty("--arn", { wide: ".5625", sq: "1" }[d.tsh] || "1.5");
  b.classList.toggle("noanim", !!d.noanim);
  b.classList.toggle("noarr", !!d.noarr);
  ["icon", "apple-touch-icon"].forEach((k) => {
    let l = document.querySelector('link[rel="'.concat(k, '"]'));
    if (!l) {
      l = document.createElement("link");
      l.rel = k;
      document.head.appendChild(l);
    }
    if (d.icon) l.href = dimg(d.icon);
  });
  const G = d.pg2 && d.pgd && d.pgd !== "none" ? d.pgd === "radial" ? "radial-gradient(circle at 50% 0%,".concat(d.pg2, ",").concat(d.pg || "#0a0809", ")") : "linear-gradient(".concat(d.pgd === "diag" ? "135deg" : "180deg", ",").concat(d.pg || "#0a0809", ",").concat(d.pg2, ")") : "";
  b.style.backgroundImage = d.bgImage ? "url('".concat(dimg(String(d.bgImage)).replace(/'/g, "%27"), "')") : G;
  r.setProperty("--ac2", d.ac2 || d.accent || "#9b2c4b");
  r.setProperty("--btx", d.btx || "#fff");
  r.setProperty("--nt", d.nt || "#fff");
  r.setProperty("--mu", d.mu || "#a89aa0");
  r.setProperty("--sf", d.sf || "#fff");
  r.setProperty("--sx", d.sx || "#141012");
  r.setProperty("--star", d.star || "#fff");
  r.setProperty("--ho", ((_a = d.ho) != null ? _a : 100) + "%");
  r.setProperty("--glw", ((_b = d.glw) != null ? _b : 55) + "%");
  r.setProperty("--lh", (d.lh || 30) + "px");
  r.setProperty("--br", { sq: "2px", pill: "999px" }[d.br] || "6px");
  r.setProperty("--rg", { c: ".5rem", r: "1.3rem" }[d.dn] || ".9rem");
  b.classList.toggle("th-glow", d.th === "glow");
  b.classList.toggle("th-none", d.th === "none");
  let st = document.getElementById("ccss");
  if (!st) {
    st = document.createElement("style");
    st.id = "ccss";
    document.head.appendChild(st);
  }
  st.textContent = String(d.ccss || "").replace(/<\/?style/gi, "");
  document.title = (d.brand || "ATMAX STUDIOS") + " \u2013 Watch Ghanaian films & series online";
}
async function init() {
  const { data } = await sb.from("settings").select("data").eq("id", 1).single();
  S.set = (data == null ? void 0 : data.data) || {};
  applyAnim(S.set);
  theme();
  try {
    const m0 = location.search.match(/[?&](?:reference|trxref)=([\w-]+)/);
    if (m0) {
      sessionStorage.setItem("atmax_ref", m0[1]);
      history.replaceState(null, "", location.pathname);
    }
  } catch (e) {
  }
  const { data: { session } } = await sb.auth.getSession();
  S.user = (session == null ? void 0 : session.user) || null;
  S.sub = S.user ? loadSub(S.user.id) : null;
  try {
    S.preview = sessionStorage.getItem("atmax_prev") === "1";
  } catch (e) {
  }
  if (PAGE === "login" && /[?&]m=up/.test(location.search)) S.mode = "up";
  S.view = PAGE === "my-list" ? "list" : PAGE === "watched" ? "history" : "home";
  try {
    await go();
  } catch (e) {
    console.error(e);
    S.user = null;
    toLogin("The page failed to load: " + (e && e.message || e));
  }
}
async function go(msg) {
  if (!S.user) {
    if (PAGE === "login") {
      let m = msg;
      try {
        m = m || sessionStorage.getItem("atmax_lmsg");
        sessionStorage.removeItem("atmax_lmsg");
      } catch (e) {
      }
      return login(m);
    }
    if (PAGE === "home") return guest();
    return navTo(["admin", "profiles", "creator", "house"].indexOf(PAGE) > -1 ? "/login/" : "/");
  }
  const { data: p } = await sb.from("profiles").select("blocked,role").eq("id", S.user.id).single();
  if (!p || p.blocked) {
    await sb.auth.signOut();
    S.user = null;
    saveSub();
    return toLogin("This account is blocked. Contact support.");
  }
  S.isAdmin = p.role === "admin";
  if (S.sub && !S.sub.id) S.sub = null;
  sb.rpc("touch_me").then(() => {
  });
  if (!S.isAdmin) {
    const dv = await sb.rpc("claim_device", { d: devId() });
    if (dv.data === false) {
      await sb.auth.signOut();
      S.user = null;
      saveSub();
      return toLogin("This account is already signed in on another device. Ask support to reset it.");
    }
  }
  if (S.set.maint && !S.isAdmin) {
    app.innerHTML = '<div class="login"><div class="card"><h1>Back soon</h1><p>'.concat(esc(S.set.brand || "ATMAX"), ' is down for maintenance.</p><button class="btn" id="mo">Sign out</button></div></div>');
    $("#mo").onclick = out;
    return;
  }
  if (S.isAdmin && !S.preview) {
    if (PAGE === "admin") return ADMIN.start();
    return navTo("/admin/");
  }
  if (PAGE === "admin") return navTo("/");
  if (PAGE === "login") return navTo(S.sub ? "/" : "/profiles/");
  if (PAGE === "profiles") return picker();
  if (!S.sub) return navTo("/profiles/");
  await browse();
  if (PAGE === "creator" || PAGE === "house") {
    const ok = PAGE === "creator" ? S.me : S.mh;
    if (!ok) return navTo("/");
    PAGE === "creator" ? creatorSheet() : houseDash();
    const iv = setInterval(() => {
      if (!document.querySelector(".mod.sheet")) {
        clearInterval(iv);
        navTo("/");
      }
    }, 400);
  }
}
function login(msg) {
  const up = S.mode === "up";
  app.innerHTML = '<div class="login"><div class="card"><h1>'.concat(up ? "Create account" : "Sign in", '</h1>\n <label for="em">Email</label><input id="em" type="email" autocomplete="email">\n <label for="pw">Password</label><div class="pwrap"><input id="pw" type="password" autocomplete="').concat(up ? "new-password" : "current-password", '"><button type="button" class="eye" id="eye" aria-label="Show password" aria-pressed="false"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path class="e1" d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z"/><circle class="e1" cx="12" cy="12" r="3"/><path class="e2" d="M3 3l18 18M10.6 5.1A10.7 10.7 0 0 1 12 5c6.5 0 10.5 7 10.5 7a17 17 0 0 1-3.1 3.9M6.6 6.6A16.6 16.6 0 0 0 1.5 12S5.5 19 12 19a10.6 10.6 0 0 0 5.4-1.5"/></svg></button></div>\n <div class="err" id="err" role="alert">').concat(esc(msg || ""), '</div>\n <button class="btn" id="go">').concat(up ? "Create account" : "Sign in", "</button>").concat(GOOGLE_LOGIN ? '<button class="btn ghost" id="gg">Continue with Google</button>' : "", '\n <div class="alt">').concat(up ? "Have an account?" : "New here?", ' <button id="sw">').concat(up ? "Sign in" : "Create account", '</button></div></div><div class="lbrand">').concat(studioMark() || brand(), '</div><div class="llegal"><a href="/about.html">About</a> \xB7 <a href="/privacy.html">Privacy Policy</a> \xB7 <a href="/terms.html">Terms of Service</a></div></div>');
  $("#sw").onclick = () => {
    S.mode = up ? "in" : "up";
    login();
  };
  $("#eye").onclick = () => {
    const i = $("#pw"), h = i.type === "password";
    i.type = h ? "text" : "password";
    const b = $("#eye");
    b.classList.toggle("on", h);
    b.setAttribute("aria-pressed", h);
    b.setAttribute("aria-label", h ? "Hide password" : "Show password");
    i.focus();
  };
  if (typeof TV !== "undefined" && TV) {
    const a = document.querySelector(".login .alt");
    if (a) {
      const b = document.createElement("button");
      b.id = "qrb";
      b.textContent = "\u25A6 Scan QR";
      b.style.marginLeft = ".8rem";
      b.onclick = showQR;
      a.appendChild(b);
    }
  }
  const kb = document.createElement("button");
  kb.className = "btn ghost";
  kb.textContent = "Keep browsing";
  kb.onclick = () => navTo("/");
  $("#go").after(kb);
  const gg = $("#gg");
  if (gg) gg.onclick = async () => {
    const { error } = await sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo: location.origin + "/" } });
    if (error) $("#err").textContent = error.message;
  };
  $("#go").onclick = async () => {
    const email = $("#em").value.trim(), password = $("#pw").value;
    const { data, error } = await (up ? sb.auth.signUp({ email, password }) : sb.auth.signInWithPassword({ email, password }));
    if (error) return $("#err").textContent = error.message;
    if (!data.session) return $("#err").textContent = "Check your email to confirm your account, then sign in.";
    S.user = data.user;
    S.sub = null;
    saveSub();
    try {
      await go();
    } catch (e) {
      console.error(e);
      S.user = null;
      login("Signed in, but the page failed to load: " + (e && e.message || e));
    }
  };
}
async function out() {
  await sb.auth.signOut();
  S.user = null;
  S.me = null;
  S.mh = null;
  S.sub = null;
  S.isAdmin = false;
  S.preview = false;
  S.H = [];
  try {
    sessionStorage.removeItem("atmax_sub");
    sessionStorage.removeItem("atmax_prev");
  } catch (e) {
  }
  navTo("/");
}
async function picker() {
  const { data } = await sb.from("sub_profiles").select("*").order("id"), l = data || [];
  app.innerHTML = '<div class="profiles"><h1>Who\'s watching?</h1><div class="plist">'.concat(l.map((p) => '<button class="prof" data-i="'.concat(p.id, '"><div class="av">').concat(esc(p.name[0].toUpperCase()), "</div>").concat(esc(p.name), "</button>")).join("")).concat(l.length < (S.set.maxp || 5) ? '<button class="prof" id="add"><div class="av add">+</div>Add profile</button>' : "", '</div><button class="btn ghost" id="out">Sign out</button>').concat(LEGAL, "</div>");
  document.querySelectorAll("[data-i]").forEach((b) => b.onclick = () => {
    S.sub = l.find((p) => p.id == b.dataset.i);
    saveSub();
    navTo("/");
  });
  const a = $("#add");
  if (a) a.onclick = async () => {
    const name = (prompt("Profile name") || "").trim().slice(0, 14);
    if (name) {
      await sb.from("sub_profiles").insert({ name });
      picker();
    }
  };
  $("#out").onclick = out;
}
async function browse() {
  const g = !S.user, E = { data: [] }, C = "id,title,year,genre,description,poster_url,trailer_url,row_id,featured,status,runtime,allow_rate,allow_comment,publish_at,banner_pc,banner_phone,header_img,focus,plays,director,series_name,episode_no,subtitles_url,credits,synopsis,behind,donate_on,in_production,fund_goal,ep_slots,ep_price";
  let [r, t, m, h, ra, co] = await Promise.all([sb.from("rows").select("*").order("position"), sb.from("titles").select(g ? C : "*").order("id"), g ? E : sb.from("my_list").select("title_id").eq("sub_id", S.sub.id), g ? E : sb.from("watch_history").select("*").eq("sub_id", S.sub.id), sb.from("ratings").select("title_id,user_id,stars"), sb.from("comments").select("*").order("created_at", { ascending: false })]);
  let tt = t;
  if (t.error) {
    const B = "id,title,year,genre,description,poster_url,trailer_url,row_id,featured,status,runtime,allow_rate,allow_comment,publish_at", alts = g ? [B + ",banner_url,phone_url,subtitles_url,kids_ok", B + ",banner_pc,banner_phone,header_img", B] : ["*"];
    for (const c of alts) {
      tt = await sb.from("titles").select(c).order("id");
      if (!tt.error) break;
    }
  }
  S.DX = { re: r.error && r.error.message, te: tt.error && tt.error.message, rn: (r.data || []).length, tn: (tt.data || []).length };
  t = tt;
  S.RALL = r.data || [];
  const off = new Set(S.RALL.filter((x) => x.active === false).map((x) => x.id)), now = Date.now();
  S.R = S.RALL.filter((x) => x.active !== false);
  S.T = (t.data || []).filter((x) => x.status !== "draft" && !off.has(x.row_id) && (!x.publish_at || new Date(x.publish_at) <= now || x.status === "soon"));
  S.T.forEach((x) => {
    if (x.status === "soon" && x.publish_at && new Date(x.publish_at) <= now) x.status = "published";
  });
  await loadPeople();
  S.me = null;
  S.mh = null;
  if (S.user && !S.isAdmin) {
    try {
      const mr = await sb.rpc("my_person");
      S.me = mr.data && mr.data[0] || null;
    } catch (e) {
    }
    try {
      const hr = await sb.rpc("my_house");
      S.mh = hr.data && hr.data[0] || null;
    } catch (e) {
    }
  }
  S.L = (m.data || []).map((x) => x.title_id);
  S.H = h.data || [];
  S.RT = ra.data || [];
  S.CM = co.data || [];
  try {
    await loadPay();
  } catch (e) {
    S.PO = {};
    S.PU = [];
  }
  draw();
  let rf = null;
  try {
    rf = sessionStorage.getItem("atmax_ref");
  } catch (e) {
  }
  if (rf && S.user && !S.payChecked) {
    S.payChecked = 1;
    try {
      sessionStorage.removeItem("atmax_ref");
    } catch (e) {
    }
    verifyPay(rf);
  }
}
const GH = (n) => "GH\u20B5" + (+n % 1 ? (+n).toFixed(2) : (+n).toFixed(0));
const DL = { 7: "1 week", 14: "2 weeks", 30: "1 month", 180: "6 months", 365: "1 year" }, dlab = (d) => DL[d] || d + " days";
const opts = (id) => (S.PO || {})[id] || [], isPaid = (id) => opts(id).some((o) => +o.price > 0);
const access = (id) => (S.PU || []).filter((p) => p.title_id == id && new Date(p.expires_at) > Date.now()).sort((a, b) => new Date(b.expires_at) - new Date(a.expires_at))[0] || null;
const daysLeft = (a) => Math.max(0, Math.ceil((new Date(a.expires_at) - Date.now()) / 864e5));
const pbadge = (t) => {
  if (t.status === "soon" || !isPaid(t.id)) return "";
  const a = access(t.id);
  return a ? '<span class="pp ok">\u2713 '.concat(daysLeft(a), "d left</span>") : '<span class="pp">From '.concat(GH(Math.min.apply(null, opts(t.id).filter((o) => +o.price > 0).map((o) => +o.price))), "</span>");
};
function ptoast(m) {
  const d = document.createElement("div");
  d.className = "ptoast";
  d.setAttribute("role", "status");
  d.textContent = m;
  document.body.appendChild(d);
  setTimeout(() => d.remove(), 7e3);
}
async function payfn(body2) {
  const r = await sb.functions.invoke("paystack", { body: body2 });
  if (r.error) {
    let m = "";
    try {
      m = (await r.error.context.json()).error;
    } catch (e) {
    }
    return { error: m || "Could not reach the payment service. Try again." };
  }
  return r.data || {};
}
async function loadPay() {
  const g = !S.user, E = { data: [] }, [po, pu] = await Promise.all([sb.from("price_options").select("id,title_id,label,days,price").eq("active", true).order("price"), g ? E : sb.from("purchases").select("id,title_id,expires_at,days,option_label,auto_renew,amount").eq("user_id", S.user.id).eq("status", "success")]);
  S.PO = {};
  (po.data || []).forEach((o) => (S.PO[o.title_id] = S.PO[o.title_id] || []).push(o));
  S.PU = pu.data || [];
}
const pricePanel = (t) => {
  if (t.status === "soon" || !isPaid(t.id)) return "";
  const a = access(t.id), os = opts(t.id).filter((o) => +o.price > 0);
  return '<div class="pbox">'.concat(a ? "<b>\u2713 You have access until ".concat(esc(new Date(a.expires_at).toLocaleDateString()), "</b> (").concat(daysLeft(a), " days left)").concat(a.auto_renew ? '<br><small>Renews automatically on your card.</small> <button class="btn ghost" id="arf" style="padding:.2rem .6rem">Stop auto-renew</button>' : "") : "<b>Pay to watch</b>", '<div class="popts">').concat(os.map((o) => "<span>".concat(esc(dlab(o.days)), " \xB7 <b>").concat(GH(o.price), "</b></span>")).join(""), "</div>").concat(a ? '<div class="acts"><button class="btn ghost" id="bx">Extend access</button></div>' : "", "</div>");
};
function buy(id) {
  const t = S.T.find((x) => x.id == id), os = opts(id).filter((o) => +o.price > 0), m = document.createElement("div");
  m.className = "mod";
  m.setAttribute("role", "dialog");
  m.setAttribute("aria-modal", "true");
  m.innerHTML = '<div class="mbox"><div class="mbody"><h3>'.concat(esc(t.title), "</h3><p>Choose how long you want to watch. You pay securely with Mobile Money or card through Paystack.</p>").concat(os.map((o) => '<button class="btn opt" data-o="'.concat(o.id, '">').concat(esc(dlab(o.days)), "<span>").concat(GH(o.price), "</span></button>")).join(""), '<label class="chk"><input type="checkbox" id="ar"> Renew automatically (card payments only)</label><div class="err" id="perr" role="alert"></div><div class="acts"><button class="btn ghost" id="pc">Cancel</button></div></div></div>');
  document.body.appendChild(m);
  const close = () => m.remove();
  m.onclick = (e) => {
    if (e.target === m) close();
  };
  m.querySelector("#pc").onclick = close;
  const first = m.querySelector("[data-o]");
  if (first) first.focus();
  m.querySelectorAll("[data-o]").forEach((b) => b.onclick = async () => {
    b.disabled = true;
    m.querySelector("#perr").textContent = "Opening Paystack\u2026";
    const d = await payfn({ action: "init", option_id: +b.dataset.o, auto_renew: m.querySelector("#ar").checked });
    if (d.url) {
      location.href = d.url;
    } else {
      m.querySelector("#perr").textContent = d.error || "Could not start the payment. Try again.";
      b.disabled = false;
    }
  });
}
async function verifyPay(ref) {
  ptoast("Confirming your payment\u2026");
  const d = await payfn({ action: "verify", reference: ref });
  if (d.ok && d.kind === "donation") {
    if (d.ep) {
      try {
        await loadPeople();
        const q = await sb.rpc("my_person");
        S.me = q.data && q.data[0] || S.me;
      } catch (e) {
      }
      try {
        const q = await sb.from("titles").select("credits").eq("id", d.title_id).single();
        const t = S.T.find((x) => x.id == d.title_id);
        if (t && q.data) t.credits = q.data.credits;
      } catch (e) {
      }
    }
    thanks("don", d.title_id, d.ep);
  } else if (d.ok) {
    await loadPay();
    draw();
    thanks("buy", d.title_id);
  } else ptoast(d.status && d.status !== "success" ? "Payment not completed (" + d.status + "). You were not charged." : d.error || "We could not confirm the payment yet. Reload this page in a minute.");
}
const dimg = (u) => {
  u = (u || "").trim();
  const m = u.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:[^#]*&)?id=)([\w-]+)/);
  return m ? "https://lh3.googleusercontent.com/d/".concat(m[1], "=w1920") : u;
};
const fpos = (t, k) => {
  const f = (t.focus || {})[k];
  return f && f.length == 2 ? f[0] + "% " + f[1] + "%" : "center";
};
const isPhone = () => matchMedia("(max-width:700px)").matches;
const pick = (t, k) => {
  const o = { poster: [["poster_url", "poster"]], pc: [["banner_pc", "pc"], ["poster_url", "poster"]], phone: [["banner_phone", "phone"], ["banner_pc", "pc"], ["poster_url", "poster"]], head: [["header_img", "head"], ["banner_pc", "pc"], ["poster_url", "poster"]] }[k];
  for (const [c, fk] of o) if (t[c]) return { src: dimg(t[c]), pos: fpos(t, fk) };
  return { src: "", pos: "center" };
};
const art = (t, k) => {
  const i = pick(t, k || "poster");
  return i.src ? "linear-gradient(transparent 45%,rgba(0,0,0,.85)),url('".concat(esc(i.src.replace(/'/g, "%27")), "')") : null;
};
const artf = (t, k) => art(t, k) || "linear-gradient(160deg,hsl(".concat(t.id * 37 % 40 + 330, " 55% 30%),hsl(").concat(t.id * 37 % 40 + 330, " 60% 14%))");
const bar = (t) => {
  const h = S.H.find((x) => x.title_id == t.id);
  return h && h.duration > 0 && h.position > 5 ? '<i class="bar" style="width:'.concat(Math.min(100, Math.round(h.position / h.duration * 100)), '%"></i>') : "";
};
const hist = () => [...S.H].sort((a, b) => new Date(b.watched_at) - new Date(a.watched_at)).map((x) => S.T.find((t) => t.id == x.title_id)).filter(Boolean);
let _cs = null;
const crewSet = () => _cs || (_cs = (() => {
  const o = /* @__PURE__ */ new Set();
  ROLE_OPTS.replace(/<optgroup label="([^"]*)">(.*?)<\/optgroup>/g, (m, g, body2) => {
    if (g !== "Cast") body2.replace(/<option>(.*?)<\/option>/g, (x, r) => {
      o.add(r.replace(/&amp;/g, "&").toLowerCase());
    });
    return m;
  });
  return o;
})());
const isCast = (r) => !!r && !crewSet().has(String(r).toLowerCase());
const pOf = (id) => (window.PPL || {})[id];
const pnorm = (x) => String(x || "").trim().toLowerCase();
async function loadHouses() {
  window.HS = {};
  window.TH = {};
  try {
    const h = await sb.from("houses").select("id,name,logo_url,about,links").order("name");
    (h.data || []).forEach((x) => window.HS[x.id] = x);
    const t = await sb.from("title_houses").select("title_id,house_id,position").order("position");
    (t.data || []).forEach((x) => (window.TH[x.title_id] = window.TH[x.title_id] || []).push(x.house_id));
  } catch (e) {
  }
}
const CHK = '<svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M2.4 6.4l2.2 2.2 5-5.2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const vb = (id) => id && window.VER && window.VER[id] ? '<i class="vfy" title="Verified" aria-label="Verified">'.concat(CHK, "</i>") : "";
const slugOf = (x) => String(x || "").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "item";
const pageUrl = (kind, id, name) => "https://atmaxstudios.com/".concat(kind, "/").concat(slugOf(name), "-").concat(id, ".html");
async function shareLink(url, title, msgEl) {
  try {
    if (navigator.share) {
      await navigator.share({ title, url });
      return;
    }
  } catch (e) {
    if (e && e.name === "AbortError") return;
  }
  let ok = false;
  try {
    await navigator.clipboard.writeText(url);
    ok = true;
  } catch (e) {
    const t = document.createElement("textarea");
    t.value = url;
    t.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(t);
    t.select();
    try {
      ok = document.execCommand("copy");
    } catch (e2) {
    }
    t.remove();
  }
  if (msgEl) msgEl.textContent = ok ? "Link copied. Paste it in your bio or send it to anyone." : url;
}
const vcl = (id) => id && window.VER && window.VER[id] ? " vv" : "";
const tcHero = (o) => '<div class="tch'.concat(o.v ? " ver" : "", '"><div class="tcb" style="').concat(o.img ? "background-image:url('".concat(esc(o.img), "')") : "", '"></div><div class="tca').concat(o.sq ? " sq" : "", '" style="').concat(o.img ? "background-image:url('".concat(esc(o.img), "')") : "", '">').concat(o.img ? "" : esc(o.name.charAt(0).toUpperCase()), '</div><h3 class="tcn">').concat(esc(o.name), "</h3>").concat(o.v ? '<span class="vpill">'.concat(CHK, " ").concat(o.vt || "Verified", "</span>") : "").concat(o.sub ? '<p class="tcs">'.concat(esc(o.sub), "</p>") : "").concat(o.chips && o.chips.length ? '<div class="tcc">'.concat(o.chips.map((c) => "<span>".concat(esc(c), "</span>")).join(""), "</div>") : "").concat(o.rt || "", "</div>");
async function loadPeople() {
  await loadHouses();
  window.VER = {};
  try {
    const v = await sb.rpc("verified_people");
    (v.data || []).forEach((x) => window.VER[x.id] = x.how);
  } catch (e) {
  }
  const r = await sb.from("people").select("id,name,label,photo_url,bio,links,verified,unverified").order("name");
  window.PPL = {};
  (r.data || []).forEach((p) => window.PPL[p.id] = p);
}
const creds = (t) => {
  const c = [];
  (Array.isArray(t.credits) ? t.credits : []).forEach((x) => {
    if (!x) return;
    if (x.pid) {
      const p = pOf(x.pid);
      if (p) c.push({ id: p.id, n: p.name, l: p.label || "", p: p.photo_url || "", r: x.r || "" });
    } else if (x.n) c.push({ id: 0, n: x.n, l: "", p: x.p || "", r: x.r || "" });
  });
  return c;
};
const pkey = (x) => x.id ? String(x.id) : "n:" + pnorm(x.n);
const crewHTML = (t) => {
  const c = creds(t);
  if (!c.length) return "";
  return '<div class="crew"><h4>Cast &amp; crew</h4><div class="crs">'.concat(c.map((x) => '<div class="cri crt'.concat(vcl(x.id), '" data-k="').concat(esc(pkey(x)), '" data-id="').concat(x.id, '"><div class="cra" style="').concat(x.p ? "background-image:url('".concat(esc(x.p), "')") : "", '">').concat(x.p ? "" : esc(x.n.trim().charAt(0).toUpperCase()), "</div><b>").concat(esc(x.n)).concat(vb(x.id), "</b><small>").concat(esc(x.r || ""), "</small>").concat(S.set.noCr || !x.id ? "" : '<em class="rtb">\u2605 Rate</em>', "</div>")).join(""), "</div></div>");
};
S.LB = S.LB || {};
async function crewWire(m, t) {
  const items = [...m.querySelectorAll(".cri.crt")];
  if (!items.length) return;
  items.forEach((i) => i.onclick = () => personSheet(i.dataset.k));
  const st = await sb.rpc("char_stats", { tid: t.id }), map = {};
  (st.data || []).forEach((x) => map[x.person_id] = x);
  items.forEach((i) => {
    const x = map[i.dataset.id], b = i.querySelector(".rtb");
    if (x && b) b.textContent = "\u2605 " + x.avg_stars + " (" + x.votes + ")";
  });
}
function rateSheet(t, pid, name, role, cur, parent) {
  if (!S.user) return gate("rate cast and crew");
  const d = document.createElement("div");
  d.className = "mod";
  d.style.zIndex = 100001;
  d.setAttribute("role", "dialog");
  d.setAttribute("aria-modal", "true");
  d.innerHTML = '<div class="mbox" style="max-width:380px"><div class="mbody" style="text-align:center"><h3 style="margin:.2rem 0">'.concat(esc(name), '</h3><p style="margin:.1rem 0 .8rem;opacity:.7">').concat(esc(role), " in ").concat(esc(t.title), '</p><div class="rstars">').concat([1, 2, 3, 4, 5].map((n) => '<button class="rs'.concat(n <= cur ? " on" : "", '" data-s="').concat(n, '" aria-label="').concat(n, ' stars">\u2605</button>')).join(""), '</div><div class="err" id="rse"></div><div class="acts" style="justify-content:center"><button class="btn ghost" id="rsc">Close</button></div></div></div>');
  document.body.appendChild(d);
  d.onclick = (e) => {
    if (e.target === d) d.remove();
  };
  d.querySelector("#rsc").onclick = () => d.remove();
  d.querySelectorAll(".rs").forEach((b) => b.onclick = async () => {
    const n = +b.dataset.s, x = await sb.from("char_votes").upsert({ title_id: t.id, person_id: pid, stars: n, updated_at: (/* @__PURE__ */ new Date()).toISOString() }, { onConflict: "user_id,title_id,person_id" });
    if (x.error) {
      d.querySelector("#rse").textContent = "Could not save your rating. Try again.";
      return;
    }
    S.LB = {};
    d.remove();
    ptoast("Thanks! You rated " + name + " " + n + " \u2605");
    if (parent && parent.isConnected) {
      const re = parent.__re;
      parent.remove();
      re ? re() : detail(t.id);
    }
  });
}
const peopleIdx = () => {
  const m = /* @__PURE__ */ new Map();
  S.T.forEach((t) => creds(t).forEach((x) => {
    const k = pkey(x);
    let e = m.get(k);
    if (!e) {
      e = { k, id: x.id, n: x.n, l: x.l, p: "", roles: /* @__PURE__ */ new Set(), films: [], cast: false };
      m.set(k, e);
    }
    if (x.p && !e.p) e.p = x.p;
    if (x.r) e.roles.add(x.r);
    if (isCast(x.r)) e.cast = true;
    if (!e.films.some((f) => f.t.id === t.id)) e.films.push({ t, r: x.r || "" });
  }));
  return m;
};
async function personSheet(key) {
  const e = peopleIdx().get(String(key));
  if (!e) return;
  const d = document.createElement("div");
  d.className = "mod sheet";
  d.style.zIndex = 1e5;
  d.setAttribute("role", "dialog");
  d.setAttribute("aria-modal", "true");
  d.__re = () => personSheet(key);
  const render = (avg2, mine, tot) => {
    d.innerHTML = '<div class="mbox"><div class="mbody"><button class="x" aria-label="Close">\u2715</button>'.concat(tcHero({ img: e.p, name: e.n, v: window.VER && window.VER[e.id], vt: "Verified", sub: e.l, chips: [...e.roles].slice(0, 4), rt: tot ? '<div class="tcr">\u2605 '.concat((+tot.avg_stars).toFixed(1), "<em>overall \xB7 ").concat(tot.votes, " vote").concat(tot.votes == 1 ? "" : "s", "</em></div>") : "" })).concat(bioHTML(e), '<h4 style="margin:1rem 0 .4rem">').concat(e.films.length, " film").concat(e.films.length == 1 ? "" : "s", "</h4>").concat(e.films.map((f) => {
      const po = pick(f.t, "poster").src, a = avg2[f.t.id], mn = mine[f.t.id];
      return '<div class="pfm"><button class="pfo" data-f="'.concat(f.t.id, '"><i style="').concat(po ? "background-image:url('".concat(esc(po), "')") : "", '"></i><span><b>').concat(esc(f.t.title), "</b><small>").concat(esc([f.r, f.t.year].filter(Boolean).join(" \xB7 ")), "</small></span></button>").concat(S.set.noCr || !e.id ? "" : '<button class="pfr" data-r="'.concat(f.t.id, '" data-ro="').concat(esc(f.r), '">').concat(mn ? "\u2605 " + mn : "\u2605 Rate").concat(a ? "<em>".concat((+a.avg_stars).toFixed(1), " \xB7 ").concat(a.votes, "</em>") : "", "</button>"), "</div>");
    }).join(""), '<div class="acts" style="justify-content:center">').concat(claimBtn(e)).concat(e.id ? '<button class="btn ghost" id="pshare">Share</button>' : "", '<button class="btn ghost" id="psc">Close</button></div><div class="ok" id="pcm" role="status"></div></div></div>');
    const cb = d.querySelector("#pclaim");
    if (cb) cb.onclick = () => claimProfile(e, d);
    const psb = d.querySelector("#pshare");
    if (psb) psb.onclick = () => shareLink(pageUrl("people", e.id, e.n), e.n + " on ATMAX STUDIOS", d.querySelector("#pcm"));
    d.querySelector(".x").onclick = d.querySelector("#psc").onclick = () => d.remove();
    d.querySelectorAll("[data-f]").forEach((b) => b.onclick = () => {
      document.querySelectorAll(".mod").forEach((m) => m.remove());
      detail(+b.dataset.f);
    });
    d.querySelectorAll("[data-r]").forEach((b) => b.onclick = () => {
      const t = S.T.find((x) => x.id == b.dataset.r);
      rateSheet(t, e.id, e.n, b.dataset.ro, mine[t.id] || 0, d);
    });
  };
  document.body.appendChild(d);
  d.onclick = (ev) => {
    if (ev.target === d) d.remove();
  };
  render({}, {}, null);
  if (!e.id) return;
  try {
    if (!S.LB.all) {
      const r = await sb.rpc("char_board", { period: "all" });
      S.LB.all = r.error ? [] : r.data || [];
    }
    const tot = S.LB.all.find((x) => x.person_id == e.id), ps = await sb.rpc("person_stats", { pid: e.id }), avg2 = {};
    (ps.data || []).forEach((x) => avg2[x.title_id] = x);
    const mine = {};
    if (S.user) {
      const q = await sb.from("char_votes").select("title_id,stars").eq("person_id", e.id);
      (q.data || []).forEach((x) => mine[x.title_id] = x.stars);
    }
    if (d.isConnected) render(avg2, mine, tot);
  } catch (er) {
  }
}
const lbHTML = () => S.set.noLb ? "" : '<section class="rw lb"><div class="lbh"><h3 class="rowt">Top Performances</h3><div class="lbtabs lbk">'.concat([["cast", "Cast"], ["crew", "Crew spotlight"]].map(([k, l]) => '<button data-lk="'.concat(k, '" class="').concat((S.lbk || "cast") == k ? "on" : "", '">').concat(l, "</button>")).join(""), '</div><div class="lbtabs">').concat([["month", "This month"], ["year", "This year"], ["all", "All time"]].map(([k, l]) => '<button data-lb="'.concat(k, '" class="').concat((S.lbp || "month") == k ? "on" : "", '">').concat(l, "</button>")).join(""), '</div></div><div class="lbs" id="lbs"><p class="empty" style="margin:1rem 0">Loading\u2026</p></div></section>');
async function lbInit() {
  const box = document.getElementById("lbs");
  if (!box) return;
  const per = S.lbp || "month";
  document.querySelectorAll("[data-lk]").forEach((b) => b.onclick = () => {
    S.lbk = b.dataset.lk;
    document.querySelectorAll("[data-lk]").forEach((x) => x.classList.toggle("on", x === b));
    lbInit();
  });
  document.querySelectorAll("[data-lb]").forEach((b) => b.onclick = () => {
    S.lbp = b.dataset.lb;
    document.querySelectorAll("[data-lb]").forEach((x) => x.classList.toggle("on", x === b));
    lbInit();
  });
  if (!S.LB[per]) {
    const r = await sb.rpc("char_board", { period: per });
    S.LB[per] = r.error ? [] : r.data || [];
  }
  const box2 = document.getElementById("lbs");
  if (!box2) return;
  const kind = S.lbk || "cast", idx = peopleIdx();
  const rows = S.LB[per].map((x) => ({ x, e: idx.get(String(x.person_id)) })).filter((o) => o.e && (kind == "cast" ? o.e.cast : [...o.e.roles].some((r) => !isCast(r))));
  if (!rows.length) {
    box2.innerHTML = '<p class="empty" style="margin:1rem 0">Nobody rated '.concat(per == "month" ? "this month" : per == "year" ? "this year" : "yet", ". Open a film and tap a name in Cast &amp; crew to rate.</p>");
    return;
  }
  box2.innerHTML = rows.map(({ x, e }, i) => {
    const f0 = e.films[0].t, po = pick(f0, "poster").src;
    return '<button class="lbc r'.concat(i < 3 ? i + 1 : 0).concat(vcl(e.id), '" data-pn="').concat(esc(e.k), '"><span class="lbn">').concat(i + 1, '</span><span class="lba" style="').concat(e.p ? "background-image:url('".concat(esc(e.p), "')") : "", '">').concat(e.p ? "" : esc(e.n.charAt(0).toUpperCase()), "</span><b>").concat(esc(e.n)).concat(vb(e.id), "</b><small>").concat(esc([...e.roles].slice(0, 1).join("")), '</small><span class="lbf"><i style="').concat(po ? "background-image:url('".concat(esc(po), "')") : "", '"></i>').concat(esc(f0.title)).concat(e.films.length > 1 ? " +".concat(e.films.length - 1) : "", '</span><span class="lbr">\u2605 ').concat((+x.avg_stars).toFixed(1), " <em>\xB7 ").concat(x.votes, " vote").concat(x.votes == 1 ? "" : "s", "</em></span></button>");
  }).join("");
  box2.querySelectorAll("[data-pn]").forEach((b) => b.onclick = () => personSheet(b.dataset.pn));
  clearInterval(S.lbT);
  if (rows.length > 3 && !matchMedia("(prefers-reduced-motion:reduce)").matches) {
    let go2 = true;
    const stop = () => {
      go2 = false;
    };
    ["pointerdown", "touchstart", "wheel", "mouseenter"].forEach((ev) => box2.addEventListener(ev, stop, { passive: true }));
    S.lbT = setInterval(() => {
      if (!go2 || !box2.isConnected) return clearInterval(S.lbT);
      if (box2.scrollLeft + box2.clientWidth >= box2.scrollWidth - 1) box2.scrollLeft = 0;
      else box2.scrollLeft += 1;
    }, 30);
  }
}
const housesOf = (t) => ((window.TH || {})[t.id] || []).map((i) => (window.HS || {})[i]).filter(Boolean);
const houseHTML = (t) => {
  const h = housesOf(t);
  if (!h.length) return "";
  return '<div class="crew"><h4>Production '.concat(h.length > 1 ? "houses" : "house", '</h4><div class="hsr">').concat(h.map((x) => '<button class="hsc" data-hs="'.concat(x.id, '"><span class="hsl" style="').concat(x.logo_url ? "background-image:url('".concat(esc(x.logo_url), "')") : "", '">').concat(x.logo_url ? "" : esc(x.name.charAt(0).toUpperCase()), "</span><b>").concat(esc(x.name), "</b></button>")).join(""), "</div></div>");
};
function houseSheet(id) {
  const h = (window.HS || {})[id];
  if (!h) return;
  const fl = S.T.filter((t) => ((window.TH || {})[t.id] || []).includes(+id)), l = linksOf(h);
  const d = document.createElement("div");
  d.className = "mod sheet";
  d.style.zIndex = 1e5;
  d.setAttribute("role", "dialog");
  d.setAttribute("aria-modal", "true");
  d.innerHTML = '<div class="mbox"><div class="mbody"><button class="x" aria-label="Close">\u2715</button>'.concat(tcHero({ img: h.logo_url, name: h.name, sq: true, sub: "Production house", chips: [fl.length + " film" + (fl.length == 1 ? "" : "s")] })).concat(h.about ? '<p style="margin:.6rem 0 0;font-size:.88rem;line-height:1.5;opacity:.85;text-align:left;white-space:pre-wrap">'.concat(esc(h.about), "</p>") : "").concat(l.length ? '<p style="margin:.5rem 0 0;font-size:.82rem">'.concat(l.map((u) => '<a href="'.concat(esc(u), '" target="_blank" rel="noopener nofollow" style="color:var(--acc,#e50914);margin:0 .4rem">').concat(esc(hostOf(u)), "</a>")).join(""), "</p>") : "", '\n <h4 style="margin:1rem 0 .4rem">').concat(fl.length, " film").concat(fl.length == 1 ? "" : "s", "</h4>").concat(fl.map((t) => {
    const po = pick(t, "poster").src;
    return '<div class="pfm"><button class="pfo" data-f="'.concat(t.id, '"><i style="').concat(po ? "background-image:url('".concat(esc(po), "')") : "", '"></i><span><b>').concat(esc(t.title), "</b><small>").concat(esc([t.year, t.genre].filter(Boolean).join(" \xB7 ")), "</small></span></button></div>");
  }).join("") || '<p class="empty">No films yet.</p>', '<div class="acts" style="justify-content:center">').concat(fl.length ? '<button class="btn ghost" id="hshare">Share</button>' : "").concat(S.user && !S.isAdmin && !S.mh ? '<button class="btn" id="hclaim">This is our production house \u2013 claim it</button>' : "", '<button class="btn ghost" id="hsx">Close</button></div><div class="ok" id="hcm" role="status"></div></div></div>');
  document.body.appendChild(d);
  d.onclick = (ev) => {
    if (ev.target === d) d.remove();
  };
  d.querySelector(".x").onclick = d.querySelector("#hsx").onclick = () => d.remove();
  const hsb = d.querySelector("#hshare");
  if (hsb) hsb.onclick = () => shareLink(pageUrl("production-houses", id, h.name), h.name + " on ATMAX STUDIOS", d.querySelector("#hcm"));
  const hc = d.querySelector("#hclaim");
  if (hc) hc.onclick = async () => {
    if (!confirm("Request to claim \u201C".concat(h.name, "\u201D? The ATMAX team will check that you really represent it before approving."))) return;
    hc.disabled = true;
    const r = await sb.from("house_claims").insert({ house_id: +id, email: S.user.email, status: "pending" }), m = d.querySelector("#hcm");
    m.textContent = r.error ? /duplicate|unique/i.test(r.error.message) ? "You already asked to claim this production house. We will get back to you." : r.error.message : "Request sent. The ATMAX team will review it, then your account becomes the production house account.";
    if (r.error && !/duplicate|unique/i.test(r.error.message)) hc.disabled = false;
  };
  d.querySelectorAll("[data-f]").forEach((b) => b.onclick = () => {
    document.querySelectorAll(".mod").forEach((m) => m.remove());
    detail(+b.dataset.f);
  });
}
async function houseDash() {
  const h = S.mh;
  if (!h) return;
  const d = document.createElement("div");
  d.className = "mod sheet";
  d.style.zIndex = 1e5;
  d.setAttribute("role", "dialog");
  d.setAttribute("aria-modal", "true");
  document.body.appendChild(d);
  d.onclick = (ev) => {
    if (ev.target === d) d.remove();
  };
  d.innerHTML = '<div class="mbox"><div class="mbody"><button class="x" aria-label="Close">\u2715</button><p class="empty">Loading your numbers\u2026</p></div></div>';
  d.querySelector(".x").onclick = () => d.remove();
  const sr = await sb.rpc("house_stats"), st = sr.data || { films: [] }, us = (await sb.rpc("house_upload_status")).data || {}, subs = (await sb.from("film_submissions").select("id,title,status,admin_note,created_at").eq("house_id", h.id).order("created_at", { ascending: false })).data || [], sm = {};
  (st.films || []).forEach((x) => sm[x.title_id] = x);
  const A = (k) => (st.films || []).reduce((a, x) => a + +x[k], 0);
  const draw2 = () => {
    const fl = S.T.filter((t) => ((window.TH || {})[t.id] || []).includes(+h.id));
    const team = /* @__PURE__ */ new Map();
    fl.forEach((t) => creds(t).forEach((x) => {
      const k = pkey(x);
      let e = team.get(k);
      if (!e) {
        e = { k, id: x.id, n: x.n, roles: /* @__PURE__ */ new Set(), films: 0 };
        team.set(k, e);
      }
      if (x.r) e.roles.add(x.r);
      e.films++;
    }));
    d.innerHTML = '<div class="mbox"><div class="mbody"><button class="x" aria-label="Close">\u2715</button>'.concat(tcHero({ img: h.logo_url, name: h.name, sq: true, sub: "Production house account", chips: [fl.length + " film" + (fl.length == 1 ? "" : "s")] }), '\n <div class="cst"><div><b>').concat(A("views"), "</b><small>views</small></div><div><b>").concat(A("uniq"), "</b><small>unique viewers</small></div><div><b>").concat(A("repeat"), "</b><small>watched again</small></div><div><b>").concat(A("buyers"), '</b><small>purchases</small></div></div>\n <div class="cst" style="grid-template-columns:1fr"><div><b>').concat(GH(A("share")), '</b><small>your share of the money made</small></div></div>\n <h4 style="margin:1rem 0 .4rem">Your films (').concat(fl.length, ")</h4>").concat(fl.map((t) => {
      const po = pick(t, "poster").src, x = sm[t.id] || {};
      return '<div class="pfm"><span class="pfo" style="cursor:default"><i style="'.concat(po ? "background-image:url('".concat(esc(po), "')") : "", '"></i><span><b>').concat(esc(t.title), '</b><span class="mchips"><em>').concat(x.views || 0, " views</em><em>").concat(x.uniq || 0, " viewers</em><em>").concat(x.repeat || 0, " watched again</em><em>").concat(GH(x.share || 0), " your share</em></span>").concat(x.others ? "<small>Co-produced with ".concat(x.others, " other house").concat(x.others == 1 ? "" : "s", ". Figures are for the whole film.</small>") : "", "</span></span></div>");
    }).join("") || '<p class="empty">No films linked to your house yet. The ATMAX team adds them.</p>', '\n <h4 style="margin:1.2rem 0 .4rem">Cast &amp; crew you worked with (').concat(team.size, ")</h4>").concat([...team.values()].sort((a, b) => b.films - a.films).map((e) => '<div class="pfm"><button class="pfo" data-pk="'.concat(esc(e.k), '"><span><b>').concat(esc(e.n)).concat(vb(e.id), "</b><small>").concat(esc([...e.roles].slice(0, 3).join(" \xB7 ")), " \xB7 ").concat(e.films, " film").concat(e.films == 1 ? "" : "s", "</small></span></button></div>")).join("") || '<p class="empty">Nobody listed yet.</p>', '\n <h4 style="margin:1.2rem 0 .4rem">Submit a film</h4>').concat(us.allowed ? us.pending >= 5 ? '<p class="empty">You have 5 films waiting for review. Wait until ATMAX reviews some before sending more.</p>' : '<form id="hsf"><label>Film title<input name="title" required maxlength="160"></label><label>Year<input name="year" type="number" min="1900" max="2100"></label><label>Genre<input name="genre" maxlength="60" placeholder="e.g. drama"></label><label>Description<textarea name="description" rows="4" maxlength="3000"></textarea></label><label>Poster picture (JPG, PNG or WebP)<input type="file" name="poster" accept="image/jpeg,image/png,image/webp"></label><label>Link to the film (YouTube, Vimeo or Google Drive, set to \u201Canyone with the link\u201D)<input name="video_link" type="url" required placeholder="https://"></label><label>Link to the trailer (optional)<input name="trailer_link" type="url" placeholder="https://"></label><label>Cast and crew: names and roles (we add them for you)<textarea name="cast_note" rows="4" maxlength="3000"></textarea></label><p style="font-size:.78rem;opacity:.65;margin:.4rem 0">Only upload films you own or have the rights to. ATMAX reviews every film before it goes live.</p><div class="acts"><button class="btn">Send for review</button></div><div class="ok" id="hsm" role="status"></div></form>' : '<p class="empty">Uploading unlocks when your house has '.concat(us.need || 3, " films on ATMAX (you have ").concat(us.films || 0, "), or when ATMAX unlocks it for you.</p>"), "\n ").concat(subs.length ? '<h4 style="margin:1rem 0 .4rem">Your submissions</h4>'.concat(subs.map((x) => '<div class="pfm"><span class="pfo" style="cursor:default"><span><b>'.concat(esc(x.title), "</b><small>").concat(x.status == "pending" ? "Waiting for review" : x.status == "approved" ? "Accepted. ATMAX is preparing it for release" : "Not accepted").concat(x.admin_note ? " \xB7 " + esc(x.admin_note) : "", " \xB7 ").concat(esc(String(x.created_at).slice(0, 10)), "</small></span></span></div>")).join("")) : "", '\n <h4 style="margin:1.2rem 0 .4rem">Edit your public page</h4><form id="hpf"><div style="display:flex;align-items:center;margin:.4rem 0"><div class="crp" style="width:70px;height:70px;border-radius:14px;margin-right:.8rem;background-image:').concat(h.logo_url ? "url('".concat(esc(h.logo_url), "')") : "none", '">').concat(h.logo_url ? "" : "+", '<input type="file" name="logo" accept="image/jpeg,image/png,image/webp"></div><small style="opacity:.7">Tap the square to change your logo (JPG, PNG or WebP).</small></div>\n <label>About (max 1,500 characters)<textarea name="about" rows="5" maxlength="1500">').concat(esc(h.about || ""), '</textarea></label><label>Links, one per line<textarea name="links" rows="3" placeholder="https://">').concat(esc(linksOf(h).join("\n")), '</textarea></label>\n <div class="acts"><button class="btn">Save</button>').concat(fl.length ? '<button type="button" class="btn ghost" id="hps">Share our page</button>' : "", '<button type="button" class="btn ghost" id="hpc">Close</button></div><div class="ok" id="hpm" role="status"></div></form></div></div>');
    d.querySelector(".x").onclick = d.querySelector("#hpc").onclick = () => d.remove();
    d.querySelectorAll("[data-pk]").forEach((b) => b.onclick = () => personSheet(b.dataset.pk));
    const hps = d.querySelector("#hps");
    if (hps) hps.onclick = () => shareLink(pageUrl("production-houses", h.id, h.name), h.name + " on ATMAX STUDIOS", d.querySelector("#hpm"));
    const sf = d.querySelector("#hsf");
    if (sf) sf.onsubmit = async (ev) => {
      ev.preventDefault();
      const v = Object.fromEntries(new FormData(sf)), b = sf.querySelector("button"), m2 = d.querySelector("#hsm");
      b.disabled = true;
      m2.textContent = "Sending\u2026";
      try {
        let poster = null;
        if (v.poster && v.poster.size) {
          if (v.poster.size > 5e6) throw new Error("Poster is too big (max 5 MB).");
          const ext = (v.poster.name.split(".").pop() || "jpg").toLowerCase(), path = "houses-own/".concat(S.user.id, "/").concat(Date.now(), "-poster.").concat(ext);
          const u = await sb.storage.from("films").upload(path, v.poster, { cacheControl: "3600", contentType: v.poster.type });
          if (u.error) throw u.error;
          poster = sb.storage.from("films").getPublicUrl(path).data.publicUrl;
        }
        const row = { house_id: h.id, title: (v.title || "").trim(), year: v.year ? +v.year : null, genre: (v.genre || "").trim() || null, description: (v.description || "").trim() || null, poster_url: poster, video_link: (v.video_link || "").trim(), trailer_link: (v.trailer_link || "").trim() || null, cast_note: (v.cast_note || "").trim() || null };
        const q = await sb.from("film_submissions").insert(row);
        if (q.error) throw new Error(/video_link|check/i.test(q.error.message) ? "Check that the film link starts with https://" : /row-level/i.test(q.error.message) ? "You can't send films right now." : q.error.message);
        d.remove();
        houseDash();
      } catch (er) {
        m2.textContent = er.message || "Something went wrong.";
        b.disabled = false;
      }
    };
    const f = d.querySelector("#hpf"), m = d.querySelector("#hpm");
    f.onsubmit = async (ev) => {
      ev.preventDefault();
      const v = Object.fromEntries(new FormData(f)), b = f.querySelector("button");
      b.disabled = true;
      m.textContent = "Saving\u2026";
      try {
        let logo = h.logo_url || "";
        if (v.logo && v.logo.size) {
          if (v.logo.size > 5e6) throw new Error("Logo is too big (max 5 MB).");
          const ext = (v.logo.name.split(".").pop() || "png").toLowerCase(), path = "houses-own/".concat(S.user.id, "/").concat(Date.now(), ".").concat(ext);
          const u = await sb.storage.from("films").upload(path, v.logo, { cacheControl: "3600", contentType: v.logo.type });
          if (u.error) throw u.error;
          logo = sb.storage.from("films").getPublicUrl(path).data.publicUrl;
        }
        const ls = (v.links || "").split(/\n+/).map((x) => x.trim()).filter(Boolean);
        if (ls.some((u) => !/^https?:\/\/[^\s]+$/i.test(u))) throw new Error("Each link must start with https://");
        const links = ls.slice(0, 5).map((u) => ({ u })), about = (v.about || "").trim();
        const q = await sb.rpc("update_my_house", { p_about: about, p_logo: logo, p_links: links.length ? links : null });
        if (q.error) throw q.error;
        Object.assign(h, { about: about || null, logo_url: logo || null, links: links.length ? links : null });
        if (window.HS[h.id]) Object.assign(window.HS[h.id], { about: h.about, logo_url: h.logo_url, links: h.links });
        draw2();
        d.querySelector("#hpm").textContent = "Saved. Your public page is updated.";
      } catch (er) {
        m.textContent = er.message || "Something went wrong.";
        b.disabled = false;
      }
    };
  };
  draw2();
}
const linksOf = (e) => {
  let l = e && e.links;
  if (!Array.isArray(l)) return [];
  return l.map((x) => x && x.u).filter((u) => /^https?:\/\//i.test(u || "")).slice(0, 5);
};
const hostOf = (u) => {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch (e) {
    return u;
  }
};
const bioHTML = (e) => {
  const p = e.id && window.PPL && window.PPL[e.id] || {};
  const b = p.bio, l = linksOf(p);
  return (b ? '<p style="margin:.6rem 0 0;font-size:.88rem;line-height:1.5;opacity:.85;text-align:left;white-space:pre-wrap">'.concat(esc(b), "</p>") : "") + (l.length ? '<p style="margin:.5rem 0 0;font-size:.82rem">'.concat(l.map((u) => '<a href="'.concat(esc(u), '" target="_blank" rel="noopener nofollow" style="color:var(--acc,#e50914);margin:0 .4rem">').concat(esc(hostOf(u)), "</a>")).join(""), "</p>") : "");
};
const claimBtn = (e) => S.user && !S.isAdmin && !S.me && e.id && !(window.PPL[e.id] && window.PPL[e.id].taken) ? '<button class="btn" id="pclaim">This is me \u2013 claim profile</button>' : "";
async function claimProfile(e, d) {
  const m = d.querySelector("#pcm"), b = d.querySelector("#pclaim");
  if (!confirm("Request to claim the profile \u201C".concat(e.n, "\u201D? The ATMAX team will check it is really you and approve."))) return;
  b.disabled = true;
  const r = await sb.from("person_claims").insert({ person_id: e.id, email: S.user.email, status: "pending" });
  m.textContent = r.error ? /duplicate|unique/i.test(r.error.message) ? "You already asked to claim this profile. We will get back to you." : r.error.message : "Request sent. The ATMAX team will review it and your account will become a creator account once approved.";
  if (r.error && !/duplicate|unique/i.test(r.error.message)) b.disabled = false;
}
async function creatorSheet() {
  if (!S.me) return;
  const me = S.me, d = document.createElement("div");
  d.className = "mod sheet";
  d.style.zIndex = 1e5;
  d.setAttribute("role", "dialog");
  d.setAttribute("aria-modal", "true");
  document.body.appendChild(d);
  d.onclick = (ev) => {
    if (ev.target === d) d.remove();
  };
  d.innerHTML = '<div class="mbox"><div class="mbody"><button class="x" aria-label="Close">\u2715</button><p class="empty">Loading your numbers\u2026</p></div></div>';
  d.querySelector(".x").onclick = () => d.remove();
  const r = await sb.rpc("creator_stats"), st = r.data || { films: [], ratings: [], trend: [], overall: {}, views: [] };
  const T = (id) => S.T.find((x) => x.id == id), rt = {}, vw = {};
  (st.ratings || []).forEach((x) => rt[x.title_id] = x);
  (st.views || []).forEach((x) => vw[x.title_id] = x);
  const ov = st.overall || {}, tv = (st.views || []).reduce((a, x) => a + x.total, 0), tu = (st.views || []).reduce((a, x) => a + x.uniq, 0);
  const tr = st.trend || [], mx = 5, myRoles = () => {
    const o = /* @__PURE__ */ new Set();
    S.T.forEach((t) => creds(t).forEach((x) => {
      if (+x.id === +me.id && x.r) o.add(x.r);
    }));
    return [...o].slice(0, 4);
  };
  const draw2 = () => {
    d.innerHTML = '<div class="mbox"><div class="mbody"><button class="x" aria-label="Close">\u2715</button>\n '.concat(tcHero({ img: me.photo_url, name: me.name, v: window.VER && window.VER[me.id], vt: "Verified creator", sub: "Creator account", chips: myRoles() }), '\n <div class="cst"><div><b>').concat(ov.avg ? (+ov.avg).toFixed(1) : "\u2013", "</b><small>\u2605 average</small></div><div><b>").concat(ov.votes || 0, "</b><small>ratings</small></div><div><b>").concat(tv, "</b><small>views</small></div><div><b>").concat(tu, '</b><small>viewers</small></div></div>\n <h4 style="margin:1rem 0 .4rem">Ratings over the last 12 months</h4>').concat(tr.length ? '<div class="ctr">'.concat(tr.map((x) => '<span title="'.concat(esc(x.m), ": ").concat(x.avg, "\u2605 (").concat(x.votes, ')"><b>').concat((+x.avg).toFixed(1), '</b><div class="ctb"><i style="height:').concat(Math.max(6, x.avg / mx * 100), '%"></i></div><small>').concat(esc(x.m.slice(5)), "</small></span>")).join(""), "</div>") : '<p class="empty" style="margin:.3rem 0">No ratings yet.</p>', '\n <h4 style="margin:1rem 0 .4rem">Your films</h4>').concat((st.films || []).map(T).filter(Boolean).map((t) => {
      const a = rt[t.id], v = vw[t.id];
      return '<div class="pfm"><span class="pfo" style="cursor:default"><span><b>'.concat(esc(t.title), '</b><span class="mchips"><em>').concat(a ? "\u2605 ".concat((+a.avg).toFixed(1), " \xB7 ").concat(a.votes) : "No ratings yet", "</em><em>").concat(v ? v.total : 0, " views</em><em>").concat(v ? v.uniq : 0, " viewers</em></span></span></span></div>");
    }).join("") || '<p class="empty">No published films yet.</p>', '\n <h4 style="margin:1.2rem 0 .4rem">Edit your public profile</h4>\n <form id="cpf"><div style="display:flex;align-items:center;margin:.4rem 0"><div class="crp" style="width:70px;height:70px;margin-right:.8rem;background-image:').concat(me.photo_url ? "url('".concat(esc(me.photo_url), "')") : "none", '">').concat(me.photo_url ? "" : "+", '<input type="file" name="photo" accept="image/jpeg,image/png,image/webp"></div><small style="opacity:.7">Tap the circle to change your photo (JPG, PNG or WebP).</small></div>\n <label>About you (max 1,200 characters)<textarea name="bio" rows="5" maxlength="1200">').concat(esc(me.bio || ""), '</textarea></label>\n <label>Links, one per line (website, Instagram, IMDb\u2026)<textarea name="links" rows="3" placeholder="https://">').concat(esc(linksOf(me).join("\n")), '</textarea></label>\n <div class="acts"><button class="btn">Save profile</button>').concat((st.films || []).length ? '<button type="button" class="btn ghost" id="cps">Share my page</button>' : "", '<button type="button" class="btn ghost" id="cpc">Close</button></div><div class="ok" id="cpm" role="status"></div></form></div></div>');
    d.querySelector(".x").onclick = d.querySelector("#cpc").onclick = () => d.remove();
    const cps = d.querySelector("#cps");
    if (cps) cps.onclick = () => shareLink(pageUrl("people", me.id, me.name), me.name + " on ATMAX STUDIOS", d.querySelector("#cpm"));
    const f = d.querySelector("#cpf"), m = d.querySelector("#cpm");
    f.onsubmit = async (ev) => {
      ev.preventDefault();
      const v = Object.fromEntries(new FormData(f)), b = f.querySelector("button");
      b.disabled = true;
      m.textContent = "Saving\u2026";
      try {
        let photo = me.photo_url || "";
        if (v.photo && v.photo.size) {
          if (v.photo.size > 5e6) throw new Error("Photo is too big (max 5 MB).");
          const ext = (v.photo.name.split(".").pop() || "jpg").toLowerCase(), path = "creators/".concat(S.user.id, "/").concat(Date.now(), ".").concat(ext);
          const u = await sb.storage.from("films").upload(path, v.photo, { cacheControl: "3600", contentType: v.photo.type });
          if (u.error) throw u.error;
          photo = sb.storage.from("films").getPublicUrl(path).data.publicUrl;
        }
        const ls = (v.links || "").split(/\n+/).map((x) => x.trim()).filter(Boolean);
        if (ls.some((u) => !/^https?:\/\/[^\s]+$/i.test(u))) throw new Error("Each link must start with https://");
        const links = ls.slice(0, 5).map((u) => ({ u })), bio = (v.bio || "").trim();
        const q = await sb.rpc("update_my_profile", { p_bio: bio, p_photo: photo, p_links: links.length ? links : null });
        if (q.error) throw q.error;
        Object.assign(me, { bio: bio || null, photo_url: photo || null, links: links.length ? links : null });
        if (window.PPL[me.id]) Object.assign(window.PPL[me.id], { bio: me.bio, photo_url: me.photo_url, links: me.links });
        m.textContent = "Saved. Your public profile is updated.";
        draw2();
        d.querySelector("#cpm").textContent = "Saved. Your public profile is updated.";
      } catch (er) {
        m.textContent = er.message || "Something went wrong.";
        b.disabled = false;
      }
    };
  };
  draw2();
}
const SFS = [["all", "All"], ["films", "Films"], ["cast", "Cast"], ["crew", "Crew"], ["genre", "Genres"]];
function searchHTML(q) {
  const f = S.sf || "all", chips = '<div class="sfc">'.concat(SFS.map(([k, l]) => '<button data-sf="'.concat(k, '" class="').concat(f == k ? "on" : "", '">').concat(l, "</button>")).join(""), "</div>");
  let h = chips;
  const has = (a) => String(a || "").toLowerCase().includes(q);
  const genres = [...new Set(S.T.flatMap((t) => String(t.genre || "").split(/[,/]/).map((x) => x.trim()).filter(Boolean)))].filter((g) => has(g));
  const films = S.T.filter((t) => f == "genre" ? genres.some((g) => String(t.genre || "").toLowerCase().includes(g.toLowerCase())) : has(t.title) || has(t.genre) || has(t.director) || has(t.series_name) || has(t.year));
  const ppl = [...peopleIdx().values()].filter((e) => (e.n.toLowerCase().includes(q) || has(e.l)) && (f == "all" || f == "cast" && e.cast || f == "crew" && [...e.roles].some((r) => !isCast(r))));
  if (f == "genre" && genres.length) h += '<div class="sfg">'.concat(genres.map((g) => '<button data-g="'.concat(esc(g), '">').concat(esc(g), "</button>")).join(""), "</div>");
  if ((f == "all" || f == "films" || f == "genre") && films.length) h += rail(f == "genre" ? "Films in this genre" : "Films", films);
  if ((f == "all" || f == "cast" || f == "crew") && ppl.length) h += '<section class="rw"><h3 class="rowt">'.concat(f == "cast" ? "Cast" : f == "crew" ? "Crew" : "People", '</h3><div class="lbs">').concat(ppl.slice(0, 40).map((e) => '<button class="lbc r0 ppc'.concat(vcl(e.id), '" data-pp="').concat(esc(e.k), '"><span class="lba" style="').concat(e.p ? "background-image:url('".concat(esc(e.p), "')") : "", '">').concat(e.p ? "" : esc(e.n.charAt(0).toUpperCase()), "</span><b>").concat(esc(e.n)).concat(vb(e.id), "</b><small>").concat(esc(e.l || [...e.roles].slice(0, 2).join(" \xB7 ")), '</small><span class="lbr" style="font-size:.7rem;color:#fff;opacity:.7">').concat(e.films.length, " film").concat(e.films.length == 1 ? "" : "s", "</span></button>")).join(""), "</div></section>");
  if (h === chips || h.length === chips.length + (f == "genre" && genres.length ? 1 : 0) && 0) h += '<p class="empty">Nothing matches \u201C'.concat(esc(S.q), "\u201D. Try a film, a person or a genre.</p>");
  return h;
}
function searchBind() {
  document.querySelectorAll("[data-sf]").forEach((b) => b.onclick = () => {
    S.sf = b.dataset.sf;
    body();
  });
  document.querySelectorAll("[data-pp]").forEach((b) => b.onclick = () => personSheet(b.dataset.pp));
  document.querySelectorAll("[data-g]").forEach((b) => b.onclick = () => {
    S.q = b.dataset.g;
    S.sf = "genre";
    const qi = document.getElementById("q");
    if (qi) qi.value = S.q;
    body();
  });
}
const cdOn = (t) => t.status === "soon" && t.publish_at && new Date(t.publish_at) > Date.now();
const cdHTML = (t, big) => {
  if (!cdOn(t)) return "";
  const d = new Date(t.publish_at), f = d.toLocaleDateString(void 0, { day: "numeric", month: "short", year: "numeric" });
  return '<div class="cd'.concat(big ? " big" : "", '" data-cd="').concat(esc(t.publish_at), '" data-cid="').concat(t.id, '"><span class="cdl">Releases in</span><div class="cdb">').concat([["d", "days"], ["h", "hrs"], ["m", "min"], ["s", "sec"]].map(([u, l]) => '<i><b data-u="'.concat(u, '">--</b><small>').concat(l, "</small></i>")).join(""), '</div><span class="cdd">').concat(f, "</span></div>");
};
function cdTick() {
  const now = Date.now();
  let flip = 0;
  document.querySelectorAll("[data-cd]").forEach((e) => {
    let r = Math.floor((new Date(e.dataset.cd) - now) / 1e3);
    if (!(r > 0)) {
      const t = (S.T || []).find((x) => x.id == e.dataset.cid);
      if (t && t.status === "soon") {
        t.status = "published";
        flip = 1;
      }
      return;
    }
    const v = { d: Math.floor(r / 86400), h: Math.floor(r % 86400 / 3600), m: Math.floor(r % 3600 / 60), s: r % 60 };
    e.querySelectorAll("[data-u]").forEach((b) => {
      const x = v[b.dataset.u], tx = b.dataset.u === "d" ? String(x) : String(x).padStart(2, "0");
      if (b.textContent !== tx) b.textContent = tx;
    });
    e.classList.toggle("far", v.d >= 60);
  });
  if (flip) draw();
}
if (!window.__cdT) window.__cdT = setInterval(cdTick, 1e3);
const tile = (t) => '<button class="tile" data-id="'.concat(t.id, '" style="background-image:').concat(artf(t), ";background-position:").concat(pick(t, "poster").pos, '"><div class="gl"><b>').concat(esc(t.title), "</b><small>").concat(esc([t.year, t.genre, t.plays > 0 ? "\u{1F441} " + t.plays : ""].filter(Boolean).join(" \xB7 ")), "</small><em>").concat(t.status === "soon" ? "Coming soon" : "\u25B6 View details", "</em></div>").concat(cdHTML(t)).concat(chip(t)).concat(pbadge(t)).concat(bar(t)).concat(t.in_production && donOn(t) ? '<span class="fundc" role="button" tabindex="0" data-fund="'.concat(t.id, '">Fund this film</span>') : "", "</button>");
const ph = (n) => '<div class="tile ph" aria-hidden="true"><div class="gl"><b>Coming soon</b><small>'.concat(esc(n), "</small></div></div>");
const rail = (n, a, min) => {
  const k = S.set.ph === false ? 0 : Math.max(0, (min || 0) - a.length);
  if (!a.length && !k) return "";
  return '<section class="rw"><h3 class="rowt">'.concat(esc(n), '</h3><div class="rc"><button class="ar l" aria-label="Scroll left">\u2039</button><div class="rail">').concat(a.map(tile).join("")).concat(Array.from({ length: k }, () => ph(n)).join(""), '</div><button class="ar r" aria-label="Scroll right">\u203A</button></div></section>');
};
function draw() {
  document.body.classList.add("dk");
  app.innerHTML = "<nav>".concat(brand(), '<div class="tabs"><button data-v="home" class="').concat(S.view == "home" ? "on" : "", '">Home</button><button data-v="list" class="').concat(S.view == "list" ? "on" : "", '">My list (').concat(S.L.length, ')</button><button data-v="history" class="').concat(S.view == "history" ? "on" : "", '">Watched</button></div>\n <input id="q" type="search" placeholder="Search titles" aria-label="Search titles" value="').concat(esc(S.q), '"><button class="btn ghost" id="sw" style="padding:.4rem .8rem">').concat(esc(S.sub.name), "</button>").concat(S.mh ? '<button class="btn ghost" id="tohs" style="padding:.4rem .8rem">Production house</button>' : "").concat(S.me ? '<button class="btn ghost" id="tocr" style="padding:.4rem .8rem">Creator</button>' : "").concat(S.isAdmin ? '<button class="btn ghost" id="toadm" style="padding:.4rem .8rem">Admin panel</button>' : "", '<button class="btn ghost" id="out" style="padding:.4rem .8rem">Sign out</button></nav>').concat(S.view === "home" ? homeMark() : "").concat(S.DX && (S.DX.re || S.DX.te || !S.T.length) ? '<div class="ann" style="background:#5a1a1a;color:#fff" role="alert">No films loaded. Rows found: '.concat(S.DX.rn, ", films found: ").concat(S.DX.tn, ", shown: ").concat(S.T.length, ". ").concat(esc(S.DX.te || S.DX.re || (S.DX.tn ? "All films are hidden (draft, future publish date, or row switched off)." : "Database returned no films for this visitor (check Row Level Security policy on titles).")), "</div>") : "").concat(S.set.announceOn && S.set.announce ? '<div class="ann" role="status">'.concat(esc(S.set.announce), "</div>") : "", '<div id="body"></div>');
  document.querySelectorAll("[data-v]").forEach((b) => b.onclick = () => {
    if (b.dataset.v === S.view) {
      S.q = "";
      draw();
    } else navTo(VPATH[b.dataset.v] || "/");
  });
  if (!S.user) {
    $("#sw").remove();
    document.querySelector('[data-v="list"]').remove();
    document.querySelector('[data-v="history"]').remove();
    const o = $("#out");
    o.textContent = "Sign in";
    o.onclick = () => toLogin("", "in");
    const su = document.createElement("button");
    su.className = "btn";
    su.style.padding = ".4rem .8rem";
    su.textContent = "Sign up";
    su.onclick = () => toLogin("", "up");
    o.after(su);
    $("#q").oninput = (e) => {
      S.q = e.target.value;
      body();
    };
    body();
    return;
  }
  $("#sw").onclick = () => {
    S.sub = null;
    saveSub();
    navTo("/profiles/");
  };
  $("#out").onclick = out;
  const th2 = $("#tohs");
  if (th2) th2.onclick = () => navTo("/house/");
  const tc = $("#tocr");
  if (tc) tc.onclick = () => navTo("/creator/");
  const ta = $("#toadm");
  if (ta) ta.onclick = () => {
    try {
      sessionStorage.removeItem("atmax_prev");
      sessionStorage.removeItem("atmax_sub");
    } catch (e) {
    }
    navTo("/admin/");
  };
  $("#q").oninput = (e) => {
    S.q = e.target.value;
    body();
  };
  body();
  if (window.DEEP) {
    const dd = window.DEEP;
    window.DEEP = null;
    setTimeout(() => {
      try {
        if (dd.f && S.T.find((x) => x.id == dd.f)) detail(+dd.f);
        else if (dd.p && window.PPL[dd.p]) personSheet(String(dd.p));
        else if (dd.h && window.HS[dd.h]) houseSheet(dd.h);
      } catch (e) {
      }
    }, 300);
  }
}
const bn = (f) => pick(f, isPhone() ? "phone" : "pc");
const heroHTML = (f) => '<section class="hero" style="background-image:linear-gradient(100deg,var(--hov,var(--bar)) 5%,transparent 90%),'.concat(bn(f).src ? "url('".concat(esc(bn(f).src.replace(/'/g, "%27")), "'),") : "", 'linear-gradient(100deg,var(--bar),var(--wine))" data-bp="').concat(bn(f).pos, '"><h2>').concat(esc(f.title), '</h2><p class="hm">').concat(heroMeta(f), "</p><p>").concat(esc(f.description), '</p><div class="b"><button class="btn" data-play="').concat(f.id, '">Play</button><button class="btn ghost" data-id="').concat(f.id, '">More info</button></div></section>');
function body() {
  const q = S.q.trim().toLowerCase();
  let h = "";
  if (q) {
    h = searchHTML(q);
  } else if (S.view == "history") {
    const r = hist();
    h = r.length ? rail("Watched", r) : '<p class="empty">Titles you play will appear here.</p>';
  } else if (S.view == "list") {
    const r = S.T.filter((t) => S.L.includes(t.id));
    h = r.length ? rail("My list", r) : '<p class="empty">Your list is empty. Open a title and select Add to list.</p>';
  } else {
    const fl = S.T.filter((t) => t.featured), f = fl.length ? fl[(S.hi || 0) % fl.length] : S.T[0];
    if (f) h += heroHTML(f);
    if (!f) h += '<section class="hero" style="background-image:linear-gradient(100deg,var(--hov,var(--bar)) 5%,transparent 90%),'.concat(S.set.heroImg ? "url('".concat(esc(dimg(S.set.heroImg).replace(/'/g, "%27")), "'),") : "", 'linear-gradient(100deg,var(--bar),var(--wine))"><h2>').concat(esc(S.set.heroT || "Coming soon"), "</h2><p>").concat(esc(S.set.heroD || "New films are on the way. Check back shortly."), "</p></section>");
    h += lbHTML();
    h += rail("Continue watching", hist().filter((t) => {
      const x = S.H.find((y) => y.title_id == t.id);
      return x.position > 5;
    }));
    const have = S.RALL.map((r) => r.name.toLowerCase());
    const dn = ["Trending Now", "Action", "Drama", "Comedy", "Documentary"];
    const auto = (n) => n == "Trending Now" ? [...S.T].reverse().slice(0, 10) : S.T.filter((t) => (t.genre || "").toLowerCase().includes(n.toLowerCase())), dl = dn.map((x) => x.toLowerCase());
    h += S.R.map((r) => {
      let a = S.T.filter((t) => t.row_id == r.id);
      if (dl.indexOf(r.name.toLowerCase()) > -1) {
        const nm = dn[dl.indexOf(r.name.toLowerCase())];
        a = a.concat(auto(nm).filter((t) => !a.some((x) => x.id == t.id) && (!t.row_id || t.row_id == r.id)));
      }
      return rail(r.name, a, 7);
    }).join("");
    h += dn.filter((n) => !have.includes(n.toLowerCase())).map((n) => rail(n, n == "Trending Now" ? [...S.T].reverse().slice(0, 10) : S.T.filter((t) => (t.genre || "").toLowerCase().includes(n.toLowerCase())), 7)).join("");
    const loose = S.T.filter((t) => !t.row_id);
    h += rail("More to watch", loose);
  }
  $("#body").innerHTML = "<main>" + h + "</main>" + LEGAL;
  lbInit();
  if (q) searchBind();
  clearInterval(S.ht);
  if (!q && S.view === "home") {
    const fl2 = S.T.filter((t) => t.featured);
    if (fl2.length > 1) S.ht = setInterval(() => {
      const el = document.querySelector(".hero");
      if (!el) {
        clearInterval(S.ht);
        return;
      }
      if (document.querySelector(".mod,.player")) return;
      S.hi = ((S.hi || 0) + 1) % fl2.length;
      el.outerHTML = heroHTML(fl2[S.hi]);
      const n = document.querySelector(".hero");
      n.querySelectorAll("[data-id]").forEach((b) => b.onclick = () => detail(+b.dataset.id));
      n.querySelectorAll("[data-play]").forEach((b) => b.onclick = () => play(+b.dataset.play));
    }, 7e3);
  }
  document.querySelectorAll(".rc").forEach((c) => {
    const r = c.querySelector(".rail");
    c.querySelector(".l").onclick = () => r.scrollBy({ left: -r.clientWidth * 0.9, behavior: "smooth" });
    c.querySelector(".r").onclick = () => r.scrollBy({ left: r.clientWidth * 0.9, behavior: "smooth" });
  });
  document.querySelectorAll("[data-id]").forEach((b) => b.onclick = () => detail(+b.dataset.id));
  document.querySelectorAll("[data-play]").forEach((b) => b.onclick = () => play(+b.dataset.play));
  if (TV && !document.querySelector(".mod,.player") && document.activeElement === document.body) {
    const f = document.querySelector("[data-play],.tile[data-id]");
    if (f) f.focus({ preventScroll: true });
  }
}
function chip(t) {
  if (S.set.noRate || t.allow_rate === false || t.status === "soon") return "";
  const a = (S.RT || []).filter((x) => x.title_id == t.id);
  return a.length ? '<span class="rt">\u2605 '.concat((a.reduce((s, x) => s + x.stars, 0) / a.length).toFixed(1), "</span>") : "";
}
function heroMeta(f) {
  const m = [f.year, f.genre].filter(Boolean).join(" \xB7 "), s = avg(f.id);
  return esc(m) + (S.set.noRate || f.allow_rate === false || f.status === "soon" ? "" : (m ? " \xB7 " : "") + (s == "No ratings yet" ? "Be the first to rate" : s));
}
function guest() {
  S.sub = { id: 0, name: "Guest" };
  browse();
}
const DON_MIN = () => Math.max(1, +S.set.donMin || 5);
const donOn = (t) => S.set.donate !== false && (!t || t.donate_on !== false && t.status !== "draft");
const donBtn = (t) => donOn(t) ? '<button class="don" data-don="'.concat(t.id, '">').concat(t.in_production ? "Fund this film" : "Donate", "</button>") : "";
const fundBox = (t) => {
  if (!t.in_production || !donOn(t)) return "";
  return '<div class="fbox" id="fbox"><b>This film is still being made</b><div id="fprog"></div><p>Your gift helps pay for the shoot and the people working on it.'.concat(+t.ep_slots > 0 && +t.ep_price > 0 ? " You can also buy an Executive Producer credit (".concat(GH(t.ep_price), " or more).") : "", ' Give any amount you like. It is a gift, not a purchase. Pay safely with Mobile Money or card.</p><button class="don" data-don="').concat(t.id, '">Fund this film</button></div>');
};
async function fundLoad(t) {
  const el = document.getElementById("fprog");
  if (!el) return;
  try {
    const r = await sb.rpc("film_funding", { p_title: t.id });
    const d = r.data || {}, raised = +d.raised || 0, goal = +t.fund_goal || 0;
    if (goal > 0) el.innerHTML = '<div class="fprog"><i style="width:'.concat(Math.min(100, Math.round(raised / goal * 100)), '%"></i></div><small>').concat(GH(raised), " raised of ").concat(GH(goal), " goal").concat(d.donors ? " \xB7 " + d.donors + " supporter" + (d.donors == 1 ? "" : "s") : "", "</small>");
    else if (raised > 0) el.innerHTML = "<small>".concat(GH(raised), " raised from ").concat(d.donors, " supporter").concat(d.donors == 1 ? "" : "s", "</small>");
  } catch (e) {
  }
}
async function donate(id) {
  if (!S.user) return gate("donate");
  const t = id ? S.T.find((x) => x.id == id) : null;
  if (S.set.donate === false || t && !donOn(t)) return ptoast("Donations are switched off right now.");
  const hasEp = !!(t && t.in_production && +t.ep_slots > 0 && +t.ep_price > 0);
  let left = 0;
  if (hasEp) {
    try {
      const r = await sb.rpc("film_funding", { p_title: t.id });
      left = +t.ep_slots - (+(r.data || {}).eps || 0);
    } catch (e) {
    }
  }
  const min = DON_MIN(), prod = t && t.in_production, m = document.createElement("div");
  m.className = "mod sheetp";
  m.setAttribute("role", "dialog");
  m.setAttribute("aria-modal", "true");
  const q = [5, 10, 20, 50, 100].filter((x) => x >= min);
  m.innerHTML = '<div class="mbox"><div class="mbody"><h3>'.concat(prod ? "Fund" : "Donate to", " ").concat(t ? esc(t.title) : esc(S.set.brand || "ATMAX STUDIOS"), "</h3><p>").concat(prod ? "This film is still being made. Your gift helps pay for the shoot and the people working on it." : t ? "Your donation supports this film and the people who made it." : "Your donation supports Ghanaian film-makers on ATMAX STUDIOS.", " It is a gift, not a purchase, and it does not unlock any film. You choose the amount and pay safely with Mobile Money or card through Paystack.</p>").concat(left > 0 ? '<div class="fbox"><label class="chk"><input type="checkbox" id="dep"> <b>Become an Executive Producer</b> for '.concat(GH(t.ep_price), " or more (").concat(left, " of ").concat(t.ep_slots, " spot").concat(t.ep_slots == 1 ? "" : "s", ' left)</label><p>Your name goes in the film\'s credits as Executive Producer, and you get your own producer profile page on ATMAX STUDIOS.</p><input id="dnm" maxlength="60" placeholder="Name to show in the credits" value="').concat(esc(S.me && S.me.name || ""), '" style="display:none;width:100%;box-sizing:border-box;padding:.6rem;border-radius:8px;border:1.5px solid currentColor;background:none;color:inherit"></div>') : hasEp ? "<p><small>All the Executive Producer spots on this film are taken. You can still donate any amount.</small></p>" : "", '<div class="dq">').concat(q.map((x) => '<button type="button" data-q="'.concat(x, '">').concat(GH(x), "</button>")).join(""), '</div><label class="dam"><b>GH\u20B5</b><input id="damt" type="number" inputmode="decimal" min="').concat(min, '" step="1" placeholder="Other amount" aria-label="Donation amount in cedis"></label><small>Smallest donation: ').concat(GH(min), '</small><div class="err" id="derr" role="alert"></div><div class="acts"><button class="don" id="dgo">Donate</button><button class="btn ghost" id="dc">Cancel</button></div></div></div>');
  document.body.appendChild(m);
  const close = () => m.remove();
  m.onclick = (e) => {
    if (e.target === m) close();
  };
  m.querySelector("#dc").onclick = close;
  const inp = m.querySelector("#damt");
  m.querySelectorAll("[data-q]").forEach((b) => b.onclick = () => {
    inp.value = b.dataset.q;
    m.querySelectorAll("[data-q]").forEach((x) => x.classList.toggle("on", x === b));
  });
  inp.oninput = () => m.querySelectorAll("[data-q]").forEach((x) => x.classList.toggle("on", x.dataset.q === inp.value));
  inp.focus();
  const go2 = m.querySelector("#dgo"), er = m.querySelector("#derr"), dep = m.querySelector("#dep"), dnm = m.querySelector("#dnm");
  if (dep) dep.onchange = () => {
    dnm.style.display = dep.checked ? "block" : "none";
    if (dep.checked && !(parseFloat(inp.value) >= +t.ep_price)) {
      inp.value = t.ep_price;
      m.querySelectorAll("[data-q]").forEach((x) => x.classList.remove("on"));
    }
  };
  go2.onclick = async () => {
    const a = Math.round(parseFloat(inp.value) * 100) / 100;
    if (!isFinite(a) || a < min) {
      er.textContent = "Enter an amount of " + GH(min) + " or more.";
      return;
    }
    const ep = !!(dep && dep.checked);
    if (ep) {
      if (a < +t.ep_price) {
        er.textContent = "An Executive Producer credit is " + GH(t.ep_price) + " or more.";
        return;
      }
      if (dnm.value.trim().length < 2) {
        er.textContent = "Enter the name to show in the credits.";
        return;
      }
    }
    go2.disabled = true;
    er.textContent = "Opening Paystack\u2026";
    const d = await payfn({ action: "donate", title_id: id || null, amount: a, ep, credit_name: ep ? dnm.value.trim() : null });
    if (d.url) {
      location.href = d.url;
    } else {
      er.textContent = d.error || "Could not start the payment. Try again.";
      go2.disabled = false;
    }
  };
}
function thanks(kind, id, ep) {
  const t = S.T.find((x) => x.id == id), m = document.createElement("div");
  m.className = "mod sheetp";
  m.setAttribute("role", "dialog");
  m.setAttribute("aria-modal", "true");
  m.innerHTML = '<div class="mbox"><div class="mbody"><h3>'.concat(ep ? "You are now an Executive Producer" : kind === "don" ? "Thank you for your support" : "Payment received", "</h3><p>").concat(ep ? "Your name is now in the credits of " + (t ? esc(t.title) : "the film") + ". You have your own producer profile: open it from the menu to add a photo, a bio and your links." : kind === "don" ? "Your donation" + (t ? " to " + esc(t.title) : "") + " went through. You are helping Ghanaian film-makers make more films." : "Enjoy " + (t ? esc(t.title) : "the film") + "!", '</p><div class="acts">').concat(kind === "buy" && t ? '<button class="btn" id="tw">Watch now</button>' : "").concat(kind === "buy" && t && donOn(t) ? '<button class="don" id="td">Donate to support it</button>' : "", '<button class="btn ghost" id="tx">Close</button></div></div></div>');
  document.body.appendChild(m);
  const close = () => m.remove();
  m.onclick = (e) => {
    if (e.target === m) close();
  };
  m.querySelector("#tx").onclick = close;
  const w = m.querySelector("#tw");
  if (w) w.onclick = () => {
    close();
    play(id);
  };
  const d = m.querySelector("#td");
  if (d) d.onclick = () => {
    close();
    donate(id);
  };
}
document.addEventListener("click", (e) => {
  const f = e.target.closest && e.target.closest("[data-fund],[data-don]");
  if (!f) return;
  e.preventDefault();
  e.stopPropagation();
  donate(+(f.dataset.fund || f.dataset.don) || null);
}, true);
function gate(m, soon) {
  const d = document.createElement("div");
  d.className = "mod";
  d.innerHTML = '<div class="mbox"><div class="mbody"><h3>'.concat(soon ? "Coming soon" : "Sign in to continue", "</h3><p>").concat(soon ? esc(m) : "Create a free account or sign in to " + esc(m) + ".", '</p><div class="acts">').concat(soon ? "" : '<button class="btn" id="g1">Sign up</button><button class="btn ghost" id="g2">Sign in</button>', '<button class="btn ghost" id="g3">Close</button></div></div></div>');
  document.body.appendChild(d);
  d.querySelector("#g3").onclick = () => d.remove();
  if (!soon) {
    d.querySelector("#g1").onclick = () => {
      d.remove();
      S.mode = "up";
      login();
    };
    d.querySelector("#g2").onclick = () => {
      d.remove();
      S.mode = "in";
      login();
    };
  }
}
async function rfr() {
  const [a, b] = await Promise.all([sb.from("ratings").select("title_id,user_id,stars"), sb.from("comments").select("*").order("created_at", { ascending: false })]);
  S.RT = a.data || [];
  S.CM = b.data || [];
}
function avg(id) {
  const a = (S.RT || []).filter((x) => x.title_id == id);
  return a.length ? (a.reduce((s, x) => s + x.stars, 0) / a.length).toFixed(1) + " \u2605 (" + a.length + " ratings)" : "No ratings yet";
}
function rc(t) {
  const mine = S.user && (S.RT || []).find((x) => x.title_id == t.id && x.user_id == S.user.id), NR = S.set.noRate || t.allow_rate === false, NC = S.set.noCom || t.allow_comment === false;
  return "<hr><p><b>".concat(avg(t.id), "</b></p>").concat(NR ? "" : "<div>".concat([1, 2, 3, 4, 5].map((n) => '<button class="sb" data-s="'.concat(n, '" aria-label="').concat(n, ' stars">').concat(mine && mine.stars >= n ? "\u2605" : "\u2606", "</button>")).join(""), "</div>")).concat(NC ? "" : '<form class="cf"><input name="b" maxlength="500" placeholder="'.concat(S.user ? "Write a comment" : "Sign in to comment", '" style="flex:1;padding:.5rem"><button class="btn">Post</button></form>'), '<div class="cl">').concat((S.CM || []).filter((c) => c.title_id == t.id).slice(0, 20).map((c) => "<p><b>".concat(esc(c.name), "</b> ").concat(esc(c.body)).concat(S.isAdmin || S.user && c.user_id == S.user.id ? ' <button class="sb" data-dc="'.concat(c.id, '" aria-label="Delete comment">\u2715</button>') : "", "</p>")).join(""), "</div>");
}
function detail(id) {
  const t = S.T.find((x) => x.id == id), has = S.L.includes(id), m = document.createElement("div");
  m.className = "mod sheetp";
  m.setAttribute("role", "dialog");
  m.setAttribute("aria-modal", "true");
  m.innerHTML = '<div class="mbox"><div class="mart" style="background-image:'.concat(artf(t, "head"), ";background-position:").concat(pick(t, "head").pos, '"><button class="x" aria-label="Close">\u2715</button><h3>').concat(esc(t.title), '</h3></div><div class="mbody"><div class="mchips" style="margin:.1rem 0 .9rem">').concat([t.year, t.genre, t.runtime ? Math.floor(t.runtime / 3600) + "h " + Math.round(t.runtime % 3600 / 60) + "m" : ""].filter(Boolean).map((x) => "<em>".concat(esc(x), "</em>")).join(""), "</div>").concat(cdHTML(t, 1), "<p>").concat(esc(t.description), "</p>").concat(t.synopsis ? '<p style="white-space:pre-wrap;opacity:.88;font-size:.92rem">'.concat(esc(t.synopsis), "</p>") : "").concat(t.behind ? '<details style="margin:.4rem 0 .8rem"><summary style="cursor:pointer;font-weight:700">Behind the film</summary><p style="white-space:pre-wrap;opacity:.88;font-size:.92rem">'.concat(esc(t.behind), "</p></details>") : "").concat(houseHTML(t)).concat(crewHTML(t)).concat(pricePanel(t)).concat(fundBox(t), '<div class="acts"><button class="btn" id="pl">').concat(isPaid(t.id) && !access(t.id) && t.status !== "soon" ? "Pay to watch" : "Play", '</button><button class="btn ghost" id="ls">').concat(has ? "Remove from list" : "Add to list", "</button>").concat(t.trailer_url ? '<button class="btn ghost" id="tr">Watch trailer</button>' : "").concat(t.in_production ? "" : donBtn(t), "</div>").concat(rc(t), "</div></div>");
  document.body.appendChild(m);
  const close = () => m.remove();
  fundLoad(t);
  m.onclick = (e) => {
    if (e.target === m) close();
  };
  m.querySelector(".x").onclick = close;
  m.querySelector(".x").focus();
  m.querySelector("#pl").onclick = () => {
    close();
    play(id);
  };
  m.querySelectorAll("[data-hs]").forEach((b) => b.onclick = () => houseSheet(b.dataset.hs));
  crewWire(m, t);
  const bx = m.querySelector("#bx");
  if (bx) bx.onclick = () => {
    close();
    buy(id);
  };
  const arf = m.querySelector("#arf");
  if (arf) arf.onclick = async () => {
    const a = access(id);
    await sb.rpc("set_auto_renew", { p_purchase: a.id, p_on: false });
    await loadPay();
    close();
    detail(id);
  };
  const tb = m.querySelector("#tr");
  if (tb) tb.onclick = () => {
    close();
    play(id, 1);
  };
  const re = async (f) => {
    await f;
    await rfr();
    close();
    detail(id);
  };
  m.querySelectorAll(".sb[data-s]").forEach((b) => b.onclick = () => {
    if (!S.user) return gate("rate films");
    re(sb.from("ratings").upsert({ title_id: id, stars: +b.dataset.s }, { onConflict: "title_id,user_id" }));
  });
  const cf = m.querySelector(".cf");
  if (cf) cf.onsubmit = (e) => {
    e.preventDefault();
    if (!S.user) return gate("comment");
    const b = cf.elements.b.value.trim();
    if (b) re(sb.from("comments").insert({ title_id: id, name: (S.user.email || "user").split("@")[0], body: b }));
  };
  m.querySelectorAll("[data-dc]").forEach((b) => b.onclick = () => re(sb.from("comments").delete().eq("id", b.dataset.dc)));
  m.querySelector("#ls").onclick = async () => {
    if (!S.user) return gate("save films to your list");
    if (has) await sb.from("my_list").delete().eq("sub_id", S.sub.id).eq("title_id", id);
    else await sb.from("my_list").insert({ sub_id: S.sub.id, title_id: id });
    S.L = has ? S.L.filter((x) => x != id) : [...S.L, id];
    close();
    draw();
  };
}
function embedFor(url) {
  const u = (url || "").trim();
  let m;
  if (m = u.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:[^#]*&)?id=)([\w-]+)/)) return { iframe: "https://drive.google.com/file/d/".concat(m[1], "/preview") };
  if (m = u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/))([\w-]{11})/)) return { iframe: "https://www.youtube-nocookie.com/embed/".concat(m[1], "?autoplay=1") };
  if (m = u.match(/vimeo\.com\/(?:video\/)?(\d+)/)) return { iframe: "https://player.vimeo.com/video/".concat(m[1], "?autoplay=1") };
  return { video: u };
}
async function mark(t, pos, dur) {
  if (!S.sub || !S.user || t.id < 0) return;
  const row = { sub_id: S.sub.id, title_id: t.id, watched_at: (/* @__PURE__ */ new Date()).toISOString() };
  if (pos != null && dur > 0) {
    row.position = pos > dur - 15 ? 0 : Math.floor(pos);
    row.duration = Math.floor(dur);
  }
  const h = S.H.find((x) => x.title_id == t.id);
  h ? Object.assign(h, row) : S.H.unshift(__spreadValues({ position: 0, duration: 0 }, row));
  await sb.from("watch_history").upsert(row, { onConflict: "sub_id,title_id" });
}
async function play(id, tr) {
  const t0 = S.T.find((x) => x.id == id);
  if (tr) return _play(id, 1);
  if (!S.user) return gate("watch the full film");
  if (t0.status === "soon") return gate("This film is not out yet. Check back soon.", 1);
  let r;
  try {
    r = await sb.rpc("get_video", { p_title: id });
  } catch (e) {
    r = { error: e };
  }
  if (r.error || !r.data) return _play(id, 0, t0.video_url);
  const d = r.data;
  if (d.ok) {
    let u = d.url;
    if (/^storage:/.test(u || "")) {
      const sg = await sb.storage.from("videos").createSignedUrl(u.slice(8), 21600);
      if (sg.error || !sg.data) return ptoast("Could not open this film. Please try again.");
      u = sg.data.signedUrl;
    }
    return _play(id, 0, u);
  }
  if (d.reason === "pay") return buy(id);
  if (d.reason === "login") return gate("watch the full film");
  return _play(id, 0, null);
}
const IC = { play: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>', pause: '<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>', back: '<svg viewBox="0 0 24 24"><path d="M11 18V6l-8.5 6zM21 18V6l-8.5 6z"/></svg>', fwd: '<svg viewBox="0 0 24 24"><path d="M13 6v12l8.5-6zM3 6v12l8.5-6z"/></svg>', x: '<svg viewBox="0 0 24 24"><path d="M6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12 19 6.4 17.6 5 12 10.6z"/></svg>', vol: '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 4V5L7 9zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4z"/></svg>', mute: '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 4V5L7 9zm13 .6L14.6 11l1.4 1.4-1.4 1.4L16 15.2l1.4-1.4 1.4 1.4 1.4-1.4-1.4-1.4 1.4-1.4-1.4-1.4z"/></svg>', fullx: '<svg viewBox="0 0 24 24"><path d="M7 5h2v5H4V8h3zm8 0h2v3h3v2h-5zM4 14h5v5H7v-3H4zm11 0h5v2h-3v3h-2z"/></svg>', next: '<svg viewBox="0 0 24 24"><path d="M6 6l8.5 6L6 18zM16 6h2v12h-2z"/></svg>', cc: '<svg viewBox="0 0 24 24"><path d="M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm-8 7H9.5v-.5h-2v3h2V13H11v1a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1zm7 0h-1.5v-.5h-2v3h2V13H18v1a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1z"/></svg>', full: '<svg viewBox="0 0 24 24"><path d="M5 5h5v2H7v3H5zm9 0h5v5h-2V7h-3zM5 14h2v3h3v2H5zm12 0h2v5h-5v-2h3z"/></svg>' };
const genreSet = (t) => String(t.genre || "").toLowerCase().split(/[,/|]/).map((x) => x.trim()).filter(Boolean);
function playerUI(p, A, f, isTrailer, closeFn) {
  const q = (s) => p.querySelector(s), bp = q("#pp1"), bb = q("#pb"), bf = q("#pf"), rg = q("#ps"), tm = q("#pt"), td = q("#pd"), bm = q("#pm"), bv = q("#pv"), bz = q("#pz"), pan = q("#ppan");
  const fmt = (n) => {
    n = Math.floor(n || 0);
    const h = Math.floor(n / 3600), m = Math.floor(n % 3600 / 60), s = n % 60;
    return (h ? h + ":" + String(m).padStart(2, "0") : m) + ":" + String(s).padStart(2, "0");
  };
  let hideT = 0, scr = 0, pauseAt = 0, ever = 0, drag = 0, lastP = null, built = 0, muted = false;
  const isOpen = () => pan.classList.contains("open");
  const showUI = () => {
    p.classList.remove("idle");
    clearTimeout(hideT);
    hideT = setTimeout(() => {
      if (A.playing() && !scr && !isOpen()) p.classList.add("idle");
    }, 3200);
  };
  ["pointerdown", "touchstart", "keydown"].forEach((ev) => p.addEventListener(ev, showUI));
  p.addEventListener("pointermove", (e) => {
    if (e.pointerType === "mouse") showUI();
  });
  let wasIdle = false;
  const seek = (d) => {
    const D = A.d() || 1e9;
    A.seek(Math.max(0, Math.min(D - 1, A.t() + d)));
  };
  const toggle = () => A.playing() ? A.pause() : A.play();
  const hold = (b, dir) => {
    let iv = 0, t1 = 0, did = false, down = false;
    const stop = () => {
      if (iv) clearInterval(iv);
      iv = 0;
      scr = 0;
    };
    b.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      down = true;
      t1 = Date.now();
      did = false;
      stop();
      iv = setInterval(() => {
        const h = (Date.now() - t1) / 1e3;
        if (h < 0.4) return;
        did = true;
        scr = 1;
        seek(dir * Math.min(70, 10 + h * 10) * 0.15);
      }, 150);
    });
    const up = () => {
      if (!down) return;
      down = false;
      const was = did;
      stop();
      if (!was) seek(dir * 10);
      showUI();
    };
    b.addEventListener("pointerup", up);
    b.addEventListener("pointercancel", () => {
      down = false;
      stop();
    });
    b.addEventListener("pointerleave", () => {
      if (down) up();
    });
    b.addEventListener("click", (e) => {
      if (e.detail === 0) seek(dir * 10);
    });
  };
  hold(bb, -1);
  hold(bf, 1);
  bp.onclick = toggle;
  rg.oninput = () => {
    drag = 1;
    fill(rg);
    const d = A.d();
    if (d) A.seek(d * rg.value / 1e3);
  };
  rg.onchange = () => {
    drag = 0;
  };
  const iosV = /iPhone|iPad|iPod/.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  let vol = 1;
  const volIco = () => {
    bm.innerHTML = muted || vol === 0 ? IC.mute : IC.vol;
  };
  const fill = (el) => el.style.setProperty("--pv", el.value / el.max * 100 + "%");
  bm.onclick = () => {
    muted = !muted;
    A.mute(muted);
    if (!muted && vol === 0) {
      vol = 0.5;
      bv.value = 50;
      A.vol && A.vol(vol);
      fill(bv);
    }
    volIco();
    if (!muted || vol > 0) {
      bv.value = muted ? 0 : vol * 100;
      fill(bv);
    }
  };
  if (iosV || !A.vol) bv.style.display = "none";
  bv.oninput = () => {
    vol = bv.value / 100;
    A.vol && A.vol(vol);
    if (vol > 0 && muted) {
      muted = false;
      A.mute(false);
    }
    if (vol === 0) {
      muted = true;
      A.mute(true);
    }
    volIco();
    fill(bv);
  };
  fill(bv);
  volIco();
  const nx = (() => {
    if (isTrailer || !f || !f.series_name) return null;
    const ep = S.T.filter((x) => x.series_name && x.series_name.toLowerCase() == f.series_name.toLowerCase() && x.status !== "soon" && (x.episode_no || 0) > (f.episode_no || 0)).sort((a, b) => a.episode_no - b.episode_no);
    return ep[0] || null;
  })();
  const bnx = q("#pnx");
  if (nx && bnx) {
    bnx.style.display = "";
    bnx.onclick = () => {
      closeFn();
      play(nx.id);
    };
  }
  const rq = p.requestFullscreen || p.webkitRequestFullscreen, fsEl = () => document.fullscreenElement || document.webkitFullscreenElement;
  const isFS = () => !!fsEl() || p.classList.contains("rot"), fit = () => setTimeout(() => dispatchEvent(new Event("resize")), 120);
  const lockL = () => {
    try {
      const o = screen.orientation;
      o && o.lock && o.lock("landscape").catch(() => {
      });
    } catch (e) {
    }
  }, unlock = () => {
    try {
      screen.orientation && screen.orientation.unlock && screen.orientation.unlock();
    } catch (e) {
    }
  };
  const ico = () => {
    bz.innerHTML = isFS() ? IC.fullx : IC.full;
    bz.setAttribute("aria-label", isFS() ? "Exit full screen" : "Full screen");
  };
  const goFS = () => {
    if (isFS()) {
      if (fsEl()) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      p.classList.remove("rot");
      unlock();
      ico();
      fit();
      return;
    }
    if (rq) {
      const r = rq.call(p);
      const ok = () => {
        lockL();
        ico();
        fit();
      };
      if (r && r.then) r.then(ok, () => {
        rotFallback();
      });
      else ok();
    } else rotFallback();
  };
  const rotFallback = () => {
    if (innerHeight > innerWidth) p.classList.add("rot");
    ico();
    fit();
  };
  ["fullscreenchange", "webkitfullscreenchange"].forEach((ev) => document.addEventListener(ev, () => {
    if (!p.isConnected) return;
    if (!fsEl()) unlock();
    ico();
    fit();
  }));
  addEventListener("orientationchange", () => {
    if (p.classList.contains("rot") && innerWidth > innerHeight) {
      p.classList.remove("rot");
      ico();
      fit();
    }
  });
  bz.onclick = (e) => {
    e.stopPropagation();
    goFS();
  };
  ico();
  let pt = "touch";
  q(".pm").addEventListener("pointerdown", (e) => {
    pt = e.pointerType || "touch";
    wasIdle = p.classList.contains("idle");
  });
  q(".pm").addEventListener("click", (e) => {
    if (pt === "mouse") {
      wasIdle = false;
      if (isOpen()) {
        pan.classList.remove("open");
        pan.classList.add("peek");
      } else toggle();
      return;
    }
    if (wasIdle) {
      wasIdle = false;
      showUI();
      return;
    }
    if (isOpen()) {
      pan.classList.remove("open");
      pan.classList.add("peek");
      return;
    }
    if (A.playing()) {
      clearTimeout(hideT);
      p.classList.add("idle");
    }
  });
  const closePan = () => {
    pan.classList.remove("peek", "open");
    p.classList.remove("pk");
  };
  const buildPan = () => {
    built = 1;
    const d1 = S.set.ppd !== false, d2 = S.set.ppx !== false;
    if (isTrailer || !f || !d1 && !d2) {
      pan.style.display = "none";
      return;
    }
    const cards = (a, cur) => a.map((x) => '<button class="pcard'.concat(x.id == cur ? " cur" : "", '" data-go="').concat(x.id, '" style="background-image:').concat(artf(x), ";background-position:").concat(pick(x, "poster").pos, '" aria-label="').concat(esc(x.title), '"><em>').concat(esc(x.title)).concat(x.episode_no ? " \xB7 Ep " + x.episode_no : "", "</em></button>")).join("");
    let h = '<div class="pgrip"></div><b>'.concat(esc(f.title), "</b><small>").concat(esc([f.year, f.genre, f.runtime ? Math.round(f.runtime / 60) + " min" : ""].filter(Boolean).join(" \xB7 ")), "</small>");
    if (d1) {
      h += '<p class="pdesc">'.concat(esc(f.description || ""), "</p>");
      const g = genreSet(f), sim = S.T.filter((x) => x.id != f.id && x.status !== "soon" && (x.row_id && x.row_id == f.row_id || genreSet(x).some((y) => g.indexOf(y) > -1))).slice(0, 12);
      if (sim.length) h += '<h4>More like this</h4><div class="prail">'.concat(cards(sim), "</div>");
    }
    if (d2) {
      if (f.series_name) {
        const ep = S.T.filter((x) => x.series_name && x.series_name.toLowerCase() == f.series_name.toLowerCase()).sort((a, b) => (a.episode_no || 0) - (b.episode_no || 0));
        if (ep.length > 1) h += "<h4>".concat(esc(f.series_name), ' \xB7 Episodes</h4><div class="prail">').concat(cards(ep, f.id), "</div>");
      }
      if (f.director) {
        const dd = S.T.filter((x) => x.id != f.id && x.director && x.director.toLowerCase() == f.director.toLowerCase());
        h += '<small style="margin-top:.5rem">Directed by '.concat(esc(f.director), "</small>");
        if (dd.length) h += "<h4>More from ".concat(esc(f.director), '</h4><div class="prail">').concat(cards(dd), "</div>");
      }
    }
    pan.innerHTML = h;
    pan.querySelectorAll("[data-go]").forEach((b) => b.onclick = (e) => {
      e.stopPropagation();
      const id = +b.dataset.go;
      closeFn();
      play(id);
    });
  };
  pan.addEventListener("click", (e) => {
    if (e.target.closest(".pcard")) return;
    pan.classList.toggle("open");
    pan.classList.toggle("peek");
    p.classList.toggle("pk", pan.classList.contains("peek"));
  });
  const paint = () => {
    if (!p.isConnected) {
      clearInterval(pl);
      return;
    }
    const t = A.t(), d = A.d(), on = A.playing();
    if (on) ever = 1;
    if (on !== lastP) {
      lastP = on;
      bp.innerHTML = on ? IC.pause : IC.play;
      bp.setAttribute("aria-label", on ? "Pause" : "Play");
    }
    if (d && !drag) rg.value = Math.round(t / d * 1e3);
    fill(rg);
    if (p.__ya && p.__ya.real && p.__ya.real()) {
      const c = p.querySelector(".ycov");
      c && c.remove();
    }
    tm.textContent = fmt(t);
    td.textContent = d ? fmt(d) : "";
    if (!on && ever) {
      if (!pauseAt) pauseAt = Date.now();
      if (Date.now() - pauseAt > 700 && !scr && !pan.classList.contains("peek") && !isOpen()) {
        if (!built) buildPan();
        if (pan.style.display !== "none") {
          pan.classList.add("peek");
          p.classList.add("pk");
        }
      }
    } else if (on) {
      pauseAt = 0;
      if (pan.classList.contains("peek") || isOpen()) closePan();
    }
  };
  const pl = setInterval(paint, 250);
  bp.innerHTML = IC.play;
  const kd = (e) => {
    if (!p.isConnected) {
      document.removeEventListener("keydown", kd);
      return;
    }
    if (TV || e.target === rg || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    if (e.key === " ") {
      e.preventDefault();
      toggle();
    } else if (e.key === "ArrowLeft") seek(-10);
    else if (e.key === "ArrowRight") seek(10);
    else if (e.key === "f" || e.key === "F") goFS();
    else if (e.key === "m" || e.key === "M") bm.click();
    else if (e.key === "Escape" && p.classList.contains("rot")) {
      p.classList.remove("rot");
      ico();
      fit();
    }
  };
  document.addEventListener("keydown", kd);
  p.__ctl = { key: (d) => {
    if (d[0]) seek(d[0] * 10);
    else if (d[1] < 0) {
      const c = q("#cl");
      c && c.focus();
    } else bp.focus();
    showUI();
  } };
  showUI();
}
function ytInit(p) {
  const w = p.querySelector(".ytw"), f = p.querySelector(".yti"), sh = p.querySelector(".ysh"), pm = p.querySelector(".pm");
  const fit = () => {
    const W = pm.clientWidth || innerWidth, H = pm.clientHeight || innerHeight, ww = Math.max(200, Math.min(W, H * 16 / 9));
    w.style.width = Math.round(ww) + "px";
    w.style.height = Math.round(ww * 9 / 16) + "px";
  };
  fit();
  addEventListener("resize", fit);
  const post = (fn, a) => {
    try {
      f.contentWindow.postMessage(JSON.stringify({ event: "command", func: fn, args: a || [] }), "*");
    } catch (e) {
    }
  };
  const T = { t: 0, d: 0, s: -1 };
  const ok = () => {
    T.r = 1;
    clearTimeout(T.fb);
    p.classList.remove("ytfb");
    const h = p.querySelector(".yhint");
    h && h.remove();
  };
  const onmsg = (e) => {
    if (e.source !== f.contentWindow) return;
    let d;
    try {
      d = JSON.parse(e.data);
    } catch (x) {
      return;
    }
    const i = d && d.info;
    if (d.event === "infoDelivery" && i) {
      if (i.currentTime != null) T.t = i.currentTime;
      if (i.duration) T.d = i.duration;
      if (i.playerState != null) {
        T.s = i.playerState;
        if (T.s === 1) ok();
      }
    } else if (d.event === "onStateChange" && typeof d.info === "number") {
      T.s = d.info;
      if (T.s === 1) ok();
    }
  };
  addEventListener("message", onmsg);
  const listen = () => {
    try {
      f.contentWindow.postMessage(JSON.stringify({ event: "listening", id: 1, channel: "widget" }), "*");
    } catch (e) {
    }
  };
  f.addEventListener("load", () => {
    listen();
    setTimeout(listen, 500);
    setTimeout(listen, 1500);
  });
  p.__yp = () => T.s === 1;
  p.__ya = { t: () => T.t, d: () => T.d, playing: () => T.s === 1, play: () => {
    T.s = 1;
    post("playVideo");
    if (!T.r && !T.fb) T.fb = setTimeout(() => {
      if (T.r) return;
      T.s = -1;
      p.classList.add("ytfb");
      if (!p.querySelector(".yhint")) p.insertAdjacentHTML("beforeend", '<div class="yhint">Tap the red play button to start</div>');
    }, 2600);
  }, pause: () => {
    T.s = 2;
    post("pauseVideo");
  }, seek: (s) => {
    T.t = s;
    post("seekTo", [s, true]);
  }, mute: (m) => post(m ? "mute" : "unMute"), vol: (x) => post("setVolume", [Math.round(x * 100)]), real: () => !!T.r };
  const obs = new MutationObserver(() => {
    if (!document.body.contains(p)) {
      removeEventListener("message", onmsg);
      removeEventListener("resize", fit);
      obs.disconnect();
    }
  });
  obs.observe(document.body, { childList: true });
}
function _play(id, tr, url) {
  const t0 = S.T.find((x) => x.id == id), t = tr ? __spreadProps(__spreadValues({}, t0), { video_url: t0.trailer_url, id: -1 }) : __spreadProps(__spreadValues({}, t0), { video_url: url }), p = document.createElement("div");
  p.className = "player";
  const e = t.video_url ? embedFor(t.video_url) : null, h = S.H.find((x) => x.title_id == id);
  const yt = !!(e && e.iframe && /youtube/.test(e.iframe) && !tr);
  const ctl = '<div class="pc">'.concat(tr ? "" : '<div class="ptitle"><b>'.concat(esc(t0.title), "</b><small>").concat(esc([t0.year, t0.genre].filter(Boolean).join(" \xB7 ")), "</small></div>"), '<div class="pcen"><button class="pbtn sk" id="pb" aria-label="Back 10 seconds. Hold to rewind">').concat(IC.back, '<i>10s</i></button><button class="pbtn" id="pp1" aria-label="Play or pause"></button><button class="pbtn sk" id="pf" aria-label="Forward 10 seconds. Hold to fast forward">').concat(IC.fwd, '<i>10s</i></button></div><div class="pbar"><div class="pr1"><span id="pt">0:00</span><input id="ps" type="range" min="0" max="1000" value="0" aria-label="Seek"><span id="pd"></span></div><div class="pr2"><div class="pg"><button class="pbtn" id="pm" aria-label="Mute"></button><input id="pv" type="range" min="0" max="100" value="100" aria-label="Volume"></div><div class="pg"><button class="pbtn pill" id="pnx" style="display:none" aria-label="Next episode">').concat(IC.next, '<span>Next ep</span></button><button class="pbtn" id="pcc" style="display:none" aria-label="Subtitles">').concat(IC.cc, '</button><button class="pbtn" id="pz" aria-label="Full screen"></button></div></div></div></div><div class="ppan" id="ppan"></div>'), xbtn = '<button class="pbtn pclose" id="cl" aria-label="Close player">'.concat(IC.x, "</button>");
  const media = e ? yt ? '<div class="ytw"><iframe class="yti" src="'.concat(esc(e.iframe.replace("autoplay=1", "autoplay=0")), "&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1&enablejsapi=1&origin=").concat(encodeURIComponent(location.origin), '" allow="autoplay; encrypted-media" title=""></iframe><div class="ysh"></div></div><div class="ycov" style="background-image:').concat(artf(t0, "pc"), '"></div>') : e.iframe ? '<iframe src="'.concat(esc(e.iframe), '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="').concat(esc(t.title), '"></iframe>') : '<video autoplay playsinline src="'.concat(esc(e.video), '"></video>') : '<div class="nov"><div><h3>'.concat(esc(t.title), "</h3><p>No video has been added for this title yet.</p></div></div>");
  const own = !!(e && (yt || e.video));
  p.innerHTML = '<div class="pm">'.concat(media, "</div>") + (own ? ctl + '<div class="ppx"></div>' : "") + xbtn;
  document.body.appendChild(p);
  if (!tr) {
    p.oncontextmenu = (e2) => {
      e2.preventDefault();
      return false;
    };
    p.addEventListener("dragstart", (e2) => e2.preventDefault());
    const vv = p.querySelector("video");
    if (vv) {
      vv.setAttribute("controlsList", "nodownload noremoteplayback");
      vv.disablePictureInPicture = true;
    }
    const sh = document.createElement("div");
    sh.className = "shield";
    p.appendChild(sh);
  }
  const v = p.querySelector("video");
  if (yt) ytInit(p);
  if (!tr && S.user && t.video_url) {
    let sec = 0;
    const ct = setInterval(() => {
      if (!document.body.contains(p)) {
        clearInterval(ct);
        return;
      }
      if (document.hidden) return;
      const on = v ? !v.paused && !v.ended : yt ? p.__yp && p.__yp() : true;
      if (!on) return;
      if (++sec >= 30) {
        clearInterval(ct);
        sb.rpc("count_play", { p_title: id }).then(() => {
        }, () => {
        });
        t0.plays = (t0.plays || 0) + 1;
      }
    }, 1e3);
  }
  if (t.video_url && !tr) mark(t);
  if (v) {
    let last = 0;
    v.onloadedmetadata = () => {
      if (h && h.position > 5 && h.position < v.duration - 15) v.currentTime = h.position;
    };
    v.ontimeupdate = () => {
      if (Date.now() - last > 15e3) {
        last = Date.now();
        mark(t, v.currentTime, v.duration);
      }
    };
    v.onpause = () => mark(t, v.currentTime, v.duration);
  }
  const closeFn = () => {
    if (v) mark(t, v.currentTime, v.duration);
    p.remove();
    body();
  };
  const endCard = () => {
    if (tr || id < 0 || !donOn(t0) || p.querySelector(".donend")) return;
    const c = document.createElement("div");
    c.className = "donend";
    c.innerHTML = "<div><h3>Enjoyed ".concat(esc(t0.title), '?</h3><p>Donate any amount to support the film and the people who made it. It is a gift and does not change your access.</p><button class="don" id="de1">Donate</button><button class="btn ghost" id="de2">Not now</button></div>');
    p.appendChild(c);
    c.querySelector("#de1").onclick = () => {
      closeFn();
      donate(id);
    };
    c.querySelector("#de2").onclick = () => c.remove();
  };
  if (v) v.addEventListener("ended", endCard);
  if (yt && !tr) {
    const yi = setInterval(() => {
      if (!document.body.contains(p)) {
        clearInterval(yi);
        return;
      }
      const a = p.__ya;
      if (a && a.d() > 60 && a.t() >= a.d() - 2) {
        clearInterval(yi);
        endCard();
      }
    }, 1500);
  }
  $("#cl").onclick = closeFn;
  if (own) {
    const A = v ? { t: () => v.currentTime, d: () => v.duration || 0, playing: () => !v.paused && !v.ended, play: () => {
      const r = v.play();
      r && r.catch && r.catch(() => {
      });
    }, pause: () => v.pause(), seek: (x) => {
      v.currentTime = x;
    }, mute: (m) => {
      v.muted = m;
    }, vol: (x) => {
      v.volume = x;
    } } : p.__ya;
    playerUI(p, A, tr ? null : t0, !!tr, closeFn);
    if (v && !tr && t0.subtitles_url) {
      const cb = p.querySelector("#pcc");
      fetch(t0.subtitles_url).then((r) => r.ok ? r.text() : Promise.reject()).then((tx) => {
        if (!/^\s*WEBVTT/.test(tx)) tx = "WEBVTT\n\n" + tx.replace(/\r/g, "").replace(/(\d\d:\d\d:\d\d),(\d{3})/g, "$1.$2");
        const tk = document.createElement("track");
        tk.kind = "subtitles";
        tk.label = "Subtitles";
        tk.srclang = "en";
        tk.src = URL.createObjectURL(new Blob([tx], { type: "text/vtt" }));
        v.appendChild(tk);
        tk.track.mode = "disabled";
        cb.style.display = "";
        cb.onclick = () => {
          const on = tk.track.mode !== "showing";
          tk.track.mode = on ? "showing" : "disabled";
          cb.classList.toggle("on", on);
        };
      }).catch(() => {
      });
    }
    const pp = p.querySelector("#pp1");
    if (pp) pp.focus();
  } else $("#cl").focus();
}
let TV = /Tizen|Web0S|webOS|SMART-TV|SmartTV|AFT|BRAVIA|Android TV|GoogleTV|HbbTV|VIDAA|CrKey/i.test(navigator.userAgent);
try {
  localStorage.removeItem("tv");
  const m = location.search.match(/[?&]tv=([01])/);
  if (m) TV = m[1] === "1";
} catch (e) {
}
if (TV) {
  document.documentElement.classList.add("tv");
  document.body.classList.add("tv");
  const FQ = "button:not([disabled]),input,select,textarea,a[href]", vis = (e) => {
    const r = e.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== "hidden";
  };
  document.addEventListener("keydown", (e) => {
    const k = e.key, a = document.activeElement, typing = a && /INPUT|TEXTAREA|SELECT/.test(a.tagName), top = [...document.querySelectorAll(".player,.mod")].pop();
    if (k === "Escape" || k === "Backspace" && !typing || e.keyCode === 10009 || e.keyCode === 461 || k === "GoBack" || k === "BrowserBack") {
      if (top) {
        e.preventDefault();
        const c = top.querySelector("#cl,.x,#g3");
        c ? c.click() : top.remove();
      }
      return;
    }
    const d = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[k];
    if (!d || typing && d[1] === 0) return;
    const pl = document.querySelector(".player");
    if (pl && pl.__ctl) {
      e.preventDefault();
      pl.__ctl.key(d);
      return;
    }
    const els = [...(top || document).querySelectorAll(FQ)].filter(vis), from = els.includes(a) ? a : null;
    if (!from) {
      if (els[0]) {
        e.preventDefault();
        els[0].focus();
      }
      return;
    }
    const r = from.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    let best = null, bs = 1e9;
    els.forEach((n) => {
      if (n === from) return;
      const q = n.getBoundingClientRect(), x = q.left + q.width / 2 - cx, y = q.top + q.height / 2 - cy, main = d[0] ? x * d[0] : y * d[1], cross = d[0] ? Math.abs(y) : Math.abs(x);
      if (main <= 1) return;
      const s = main + cross * 2.2;
      if (s < bs) {
        bs = s;
        best = n;
      }
    });
    if (best) {
      e.preventDefault();
      best.focus({ preventScroll: true });
      best.scrollIntoView({ block: "center", inline: "center", behavior: "smooth" });
    }
  });
}
function devId() {
  let d;
  try {
    d = localStorage.getItem("atmax_dev");
    if (!d) {
      d = crypto.randomUUID ? crypto.randomUUID() : String(Math.random()).slice(2) + Date.now();
      localStorage.setItem("atmax_dev", d);
    }
  } catch (e) {
    d = "nostorage";
  }
  return d;
}
const openHash = () => {
  const m = location.hash.match(/^#film-(\d+)$/);
  if (m && S.T.find((t) => t.id == +m[1]) && !document.querySelector(".mod,.player")) detail(+m[1]);
};
const _detail = detail;
detail = function(id) {
  history.replaceState(null, "", "#film-" + id);
  _detail(id);
  const ac = document.querySelector(".mod .acts");
  if (ac) {
    const b = document.createElement("button");
    b.className = "btn ghost";
    b.textContent = "Copy link";
    b.onclick = async () => {
      const u = location.origin + location.pathname + "#film-" + id;
      try {
        await navigator.clipboard.writeText(u);
        b.textContent = "Link copied";
      } catch (e) {
        prompt("Copy this link", u);
      }
    };
    ac.appendChild(b);
  }
  const mo = new MutationObserver(() => {
    if (!document.querySelector(".mod")) {
      history.replaceState(null, "", location.pathname + location.search);
      mo.disconnect();
    }
  });
  mo.observe(document.body, { childList: true });
};
const fixHero = () => document.querySelectorAll(".hero[data-bp]").forEach((h) => {
  h.style.backgroundPosition = "center," + h.dataset.bp + ",center";
});
new MutationObserver(fixHero).observe(document.body, { childList: true, subtree: true });
let _lw = innerWidth, _rt = 0;
addEventListener("resize", () => {
  if (innerWidth === _lw) return;
  _lw = innerWidth;
  clearTimeout(_rt);
  _rt = setTimeout(() => {
    const h = document.querySelector(".hero[data-bp]");
    if (h && S.T && S.T.length && S.view === "home" && !S.q) body();
  }, 250);
});
const _browse = browse;
browse = async function() {
  await _browse();
  openHash();
};
addEventListener("hashchange", openHash);
document.addEventListener("click", async (e) => {
  const b = e.target.closest("[data-rd]");
  if (!b || !confirm("Let this account sign in on a new device?")) return;
  const { error } = await sb.rpc("reset_device", { uid: b.dataset.rd });
  b.textContent = error ? "Failed" : "Device reset";
});
function showQR() {
  if (typeof qrcode === "undefined") return alert("QR code could not be created on this device.");
  const url = location.origin + location.pathname, q = qrcode(0, "M");
  q.addData(url);
  q.make();
  const m = document.createElement("div");
  m.className = "mod";
  m.setAttribute("role", "dialog");
  m.setAttribute("aria-modal", "true");
  m.innerHTML = '<div class="qrbox">'.concat(q.createSvgTag({ cellSize: 8, margin: 2, scalable: true }), '<h3 style="margin:.2rem 0">Scan with your phone</h3><p style="margin:.3rem 0 1rem">Point your phone camera at the code to open ').concat(esc(S.set.brand || "ATMAX"), ' on your phone.</p><button class="btn" id="g3">Close</button></div>');
  document.body.appendChild(m);
  const c = () => m.remove();
  m.onclick = (e) => {
    if (e.target === m) c();
  };
  m.querySelector("#g3").onclick = c;
  m.querySelector("#g3").focus();
}
const _draw = draw;
draw = function() {
  _draw();
  if (typeof TV !== "undefined" && TV) {
    const o = document.querySelector("nav #out");
    if (o && !document.querySelector("#qrb")) {
      const b = document.createElement("button");
      b.id = "qrb";
      b.className = "btn ghost";
      b.style.padding = ".4rem .8rem";
      b.textContent = "\u25A6 Scan QR";
      b.onclick = showQR;
      o.before(b);
    }
  }
  if (S.set.ltg) {
    const q = document.querySelector("nav #q");
    if (q && !document.querySelector("#ltb")) {
      const b = document.createElement("button");
      b.id = "ltb";
      b.className = "btn ghost";
      b.style.padding = ".4rem .8rem";
      b.setAttribute("aria-label", "Switch between dark and light");
      b.textContent = lightOn() ? "\u{1F319}" : "\u2600";
      b.onclick = () => {
        try {
          localStorage.setItem("atmax_lt", lightOn() ? "0" : "1");
        } catch (e) {
        }
        theme();
        b.textContent = lightOn() ? "\u{1F319}" : "\u2600";
      };
      q.before(b);
    }
  }
};
window.ATMAX_START = init;
(function() {
  let busy = 0;
  const fix = () => {
    busy = 0;
    try {
      const sh = S.set && S.set.tsh || "", r = sh === "wide" ? 9 / 16 : sh === "sq" ? 1 : 1.5;
      document.querySelectorAll(".tile:not(.ph)").forEach((t) => {
        const w = t.offsetWidth;
        if (w < 20) {
          t.style.width = (TV ? 240 : 180) + "px";
          t.style.minWidth = t.style.width;
        }
        const ww = t.offsetWidth || 180;
        if (t.offsetHeight < ww * r * 0.8) {
          t.style.height = Math.round(ww * r) + "px";
          t.style.minHeight = t.style.height;
        }
      });
      document.querySelectorAll(".tile.ph").forEach((t) => {
        const ww = t.offsetWidth || 180;
        if (t.offsetHeight < ww * 0.8) t.style.height = Math.round(ww * 1.5) + "px";
      });
      document.querySelectorAll(".rail").forEach((x) => {
        x.style.display = "flex";
        x.style.flexWrap = "nowrap";
        x.style.overflowX = "auto";
      });
    } catch (e) {
    }
  };
  const go2 = () => {
    if (!busy) {
      busy = 1;
      setTimeout(fix, 60);
    }
  };
  try {
    new MutationObserver(go2).observe(document.getElementById("app") || document.body, { childList: true, subtree: true });
  } catch (e) {
  }
  window.addEventListener("resize", go2);
  setTimeout(fix, 500);
  setTimeout(fix, 2e3);
})();

window.__ok=2;
