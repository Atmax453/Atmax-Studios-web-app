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
const TABDIR = { pay: "payments", stats: "analytics", ann: "announcements", rows: "home-layout", look: "look-and-feel", team: "admin-team", pics: "picture-check", site: "site-rules", houses: "production-houses", profit: "film-profit", house: "house-dashboard" };
const ADMIN = (() => {
  const ROOT = window.__ROOT;
  let S = { tab: "films", me: null, set: {}, R: [], T: [], U: [], AE: [], W: {}, edit: null, msg: "" };
  async function load() {
    var _a;
    const [r, t, u, s, ae, sp, wh, po, pu, ff, fi, pa] = await Promise.all([sb.from("rows").select("*").order("position"), sb.from("titles").select("*").order("id", { ascending: false }), sb.from("profiles").select("*").order("created_at"), sb.from("settings").select("data").eq("id", 1).single(), sb.from("admin_emails").select("*").order("email"), sb.from("sub_profiles").select("id,user_id"), sb.from("watch_history").select("sub_id,title_id"), sb.from("price_options").select("*").order("id"), sb.from("purchases").select("*").order("created_at", { ascending: false }), sb.from("film_files").select("*"), sb.from("film_finance").select("*"), sb.from("payouts").select("*").order("created_at", { ascending: false })]);
    S.R = r.data || [];
    S.T = t.data || [];
    S.U = u.data || [];
    S.set = ((_a = s.data) == null ? void 0 : _a.data) || {};
    S.AE = ae.data || [];
    const own = {};
    (sp.data || []).forEach((x) => own[x.id] = x.user_id);
    S.W = {};
    S.V = {};
    (wh.data || []).forEach((x) => {
      S.V[x.title_id] = (S.V[x.title_id] || 0) + 1;
      const k = own[x.sub_id];
      if (k) S.W[k] = (S.W[k] || 0) + 1;
    });
    S.PO = {};
    (po.data || []).forEach((o) => {
      if (o.active) (S.PO[o.title_id] = S.PO[o.title_id] || []).push(o);
    });
    S.PUR = pu.data || [];
    S.FF = !ff.error;
    S.VS = {};
    try {
      const q = await sb.rpc("view_stats");
      S.VS = q.data || {};
    } catch (e) {
    }
    S.FIN = {};
    (fi.data || []).forEach((x) => S.FIN[x.title_id] = x);
    S.POUT = pa.data || [];
    S.FINOK = !fi.error;
    {
      const dn = await sb.from("donations").select("*").order("created_at", { ascending: false });
      S.DON = dn.data || [];
    }
    await loadPeople();
    await loadPriv();
    {
      const b = await sb.from("film_budget").select("title_id,budget");
      S.BUD = {};
      (b.data || []).forEach((x) => S.BUD[x.title_id] = +x.budget);
    }
    const fm = {};
    (ff.data || []).forEach((x) => fm[x.title_id] = x.video_url);
    if (S.FF) S.T.forEach((t2) => {
      if (fm[t2.id] != null) t2.video_url = fm[t2.id];
    });
    shell();
  }
  const T9 = [["films", "Films", "Add, edit and hide films"], ["rows", "Home layout", "Rows and their order"], ["look", "Look & feel", "Name, logo and colors"], ["users", "Users", "Roles and blocking"], ["site", "Site rules", "Maintenance, profiles, previews"], ["ann", "Announcements", "Banner message for viewers"], ["stats", "Analytics", "Most watched titles"], ["team", "Admin team", "Who can open this panel"], ["backup", "Backup", "Download films and users"], ["pay", "Payments", "Revenue, buyers, payouts"], ["house", "House dashboard", "What the site earns"], ["people", "People", "Cast & crew directory: edit, merge duplicates"], ["houses", "Production houses", "Logos and info for production houses"], ["profit", "Film profit", "Budget vs money made, per film (private)"], ["pics", "Picture check", "Tests every saved film picture"]];
  function home() {
    const day = 864e5, now = Date.now(), n = (a, f) => a.filter(f).length;
    const st = [["Films", S.T.length], ["Accounts", S.U.length], ["New this week", n(S.U, (u) => now - new Date(u.created_at) < 7 * day)], ["Active today", n(S.U, (u) => u.last_seen && now - new Date(u.last_seen) < day)], ["Revenue GH\u20B5", Math.round(okP().reduce((s, p) => s + Number(p.amount), 0))]];
    return '<div class="sts">'.concat(st.map((s) => '<div class="st"><b>'.concat(s[1], "</b>").concat(s[0], "</div>")).join(""), '</div><div class="hub">').concat(T9.map((t) => '<button class="ht" data-t="'.concat(t[0], '"><h3>').concat(t[1], "</h3><span>").concat(t[2], "</span></button>")).join(""), "</div>");
  }
  function site() {
    const d = S.set;
    return '<form id="sf" class="panel"><h3>Site rules</h3><label class="chk"><input type="checkbox" name="ph" '.concat(d.ph !== false ? "checked" : "", '> Show "Coming soon" tiles in rows with few films</label><label class="chk"><input type="checkbox" name="maint" ').concat(d.maint ? "checked" : "", '> Maintenance mode (viewers see a "back soon" page, admins still get in)</label><label class="chk"><input type="checkbox" name="norate" ').concat(d.noRate ? "checked" : "", '> Turn off ratings everywhere</label><label class="chk"><input type="checkbox" name="nocr" ').concat(d.noCr ? "checked" : "", '> Turn off rating of cast performances</label><label class="chk"><input type="checkbox" name="nolb" ').concat(d.noLb ? "checked" : "", '> Hide the "Top Performances" board on Home</label><label class="chk"><input type="checkbox" name="nocom" ').concat(d.noCom ? "checked" : "", '> Turn off comments everywhere</label><label class="chk"><input type="checkbox" name="donate" ').concat(d.donate !== false ? "checked" : "", '> Show the green Donate button (turns donations on or off everywhere)</label><label>Smallest donation (GH\u20B5)<input type="number" name="donmin" min="1" max="1000" value="').concat(d.donMin || 5, '"></label><label>Production houses can upload films after they have this many films on the site<input type="number" name="housemin" min="1" max="100" value="').concat(d.houseMin || 3, '"></label><label>Verified badge: films a person must work on<input type="number" name="verfilms" min="1" max="100" value="').concat(d.verFilms || 5, '"></label><label>Verified badge: different production houses they must work with<input type="number" name="verhouses" min="1" max="100" value="').concat(d.verHouses || 5, '"></label><label>Profiles allowed per account<input type="number" name="maxp" min="1" max="10" value="').concat(d.maxp || 5, '"></label><h3 style="margin-top:1.2rem">Emails sent to members</h3><p style="color:var(--mute);font-size:.85rem;margin:0 0 .4rem">Sent from your Gmail. Switch any of them off to stop that email.</p><label class="chk"><input type="checkbox" name="em_purchase" ').concat(d.em_purchase !== false ? "checked" : "", '> Receipt when someone buys a film, donates or becomes an Executive Producer</label><label class="chk"><input type="checkbox" name="em_verified" ').concat(d.em_verified !== false ? "checked" : "", '> "You are verified" card when a person gets the gold badge</label><label class="chk"><input type="checkbox" name="em_credit" ').concat(d.em_credit !== false ? "checked" : "", '> "You have been added to a film" with the poster</label><label class="chk"><input type="checkbox" name="em_profile" ').concat(d.em_profile !== false ? "checked" : "", '> "Your profile was updated" when someone saves their profile</label>\n <div class="acts"><button class="btn">Save site rules</button></div>').concat(note(), '</form><div class="panel" id="elog"><h3>Recent emails</h3><p style="color:var(--mute)">Loading\u2026</p></div>');
  }
  function ann() {
    const d = S.set;
    return '<form id="af" class="panel"><h3>Announcement banner</h3><label>Message shown at the top of the viewer site<input name="announce" maxlength="160" value="'.concat(esc(d.announce), '"></label><label class="chk"><input type="checkbox" name="on" ').concat(d.announceOn ? "checked" : "", '> Show the banner</label><div class="acts"><button class="btn">Save announcement</button></div>').concat(note(), "</form>");
  }
  function stats() {
    const top = [...S.T].sort((a, b) => (S.V[b.id] || 0) - (S.V[a.id] || 0)).slice(0, 10), mx = Math.max(1, ...top.map((t) => S.V[t.id] || 0));
    return '<div class="panel"><h3>Most watched titles</h3>'.concat(top.length ? top.map((t) => '<div class="bw"><span>'.concat(esc(t.title), '</span><i style="width:').concat((S.V[t.id] || 0) / mx * 100, '%"></i><b>').concat(S.V[t.id] || 0, "</b></div>")).join("") : "<p>No films yet.</p>", '<p style="color:var(--mute)">Counts are plays logged by viewers.</p></div>');
  }
  function backup() {
    return '<div class="panel"><h3>Backup</h3><p style="color:var(--mute)">Download your data as spreadsheet files.</p><div class="acts"><button class="btn" data-exp="films">Download films</button><button class="btn ghost" data-exp="users">Download users</button></div></div>';
  }
  async function loadPriv() {
    window.PRIV = {};
    window.CLAIMS = [];
    window.HPRIV = {};
    window.PROG = {};
    window.HCLAIMS = [];
    window.HSUB = [];
    try {
      {
        const hs = await sb.from("film_submissions").select("*").order("created_at", { ascending: false });
        window.HSUB = hs.data || [];
      }
      {
        const hc = await sb.rpc("admin_house_claims");
        window.HCLAIMS = hc.data || [];
      }
      const pg = await sb.rpc("person_progress");
      (pg.data || []).forEach((x) => window.PROG[x.person_id] = x);
      const hp = await sb.rpc("admin_houses_private");
      (hp.data || []).forEach((x) => window.HPRIV[x.id] = x);
      const a = await sb.rpc("admin_people_private");
      (a.data || []).forEach((x) => window.PRIV[x.id] = x);
      const c = await sb.rpc("admin_claims");
      window.CLAIMS = c.data || [];
    } catch (e) {
    }
  }
  function claimsHTML() {
    const l = (window.CLAIMS || []).filter((c) => c.status == "pending");
    if (!l.length) return "";
    return '<div class="panel" style="margin-bottom:.8rem"><h3 style="margin:0 0 .4rem">Claim requests ('.concat(l.length, ')</h3><p style="color:var(--mute);font-size:.85rem;margin:0 0 .5rem">Someone says \u201Cthis profile is me\u201D. Check them (email, social media, a message) before you approve. Approving makes their account a creator account.</p>').concat(l.map((c) => {
      const p = window.PPL[c.person_id];
      return '<div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap;padding:.4rem 0;border-top:1px solid var(--line,#8883)"><span style="flex:1"><b>'.concat(esc(p ? p.name : "(deleted)"), '</b><br><small style="color:var(--mute)">').concat(esc(c.email || ""), " \xB7 ").concat(esc(String(c.created_at || "").slice(0, 10)), '</small></span><button class="btn" data-ca="').concat(c.id, '">Approve</button> <button class="btn del" data-cr="').concat(c.id, '">Reject</button></div>');
    }).join(""), "</div>");
  }
  function peopleTab() {
    const all = Object.values(window.PPL || {}), e = S.pedit, mg = S.pmerge;
    const rolesOf = (pid) => {
      const o = /* @__PURE__ */ new Set();
      S.T.forEach((t) => (Array.isArray(t.credits) ? t.credits : []).forEach((x) => {
        if (x && +x.pid === +pid && x.r) o.add(x.r);
      }));
      return [...o].slice(0, 3).join(" \xB7 ");
    };
    const form = e ? '<div class="fov"><form id="pf" class="panel fwin"><div class="fhd"><h3>'.concat(e.id ? "Edit person" : "Add person", '</h3><button type="button" class="fclose" id="pcx" aria-label="Close">\xD7</button></div>\n <div style="display:flex;align-items:center;margin:.6rem 0"><div class="crp" style="width:90px;height:90px;margin-right:1rem;background-image:').concat(e.photo_url ? "url('".concat(esc(e.photo_url), "')") : "none", '">').concat(e.photo_url ? "" : "+", '<input type="file" name="photo" accept="image/*"></div><small style="color:var(--mute)">Tap the circle to ').concat(e.photo_url ? "replace" : "add", ' the photo. It updates everywhere this person appears.</small></div><div class="fpk" id="fpk"></div>\n <label>Name<input name="name" required value="').concat(esc(e.name), '"></label><label>Label to tell people with the same name apart (optional)<input name="label" value="').concat(esc(e.label), '"></label><label>Creator login email (optional). When this person signs up or signs in with this email they get a creator account<input name="lemail" type="email" value="').concat(esc(e.id && window.PRIV[e.id] ? window.PRIV[e.id].link_email : ""), '"></label><label>About (public bio, optional)<textarea name="bio" rows="4" maxlength="1200">').concat(esc(e.bio || ""), '</textarea></label><div class="acts"><button class="btn">Save</button><button type="button" class="btn ghost" id="pcx2">Cancel</button></div>').concat(note(), "</form></div>") : "";
    const mgf = mg ? '<div class="fov"><div class="panel fwin"><div class="fhd"><h3>Merge \u201C'.concat(esc(mg.name), '\u201D</h3><button type="button" class="fclose" id="pmx" aria-label="Close">\xD7</button></div><p>Pick the person to keep. All of \u201C').concat(esc(mg.name), "\u201D's films and ratings move to them, then \u201C").concat(esc(mg.name), '\u201D is removed. This cannot be undone.</p><label>Keep this person<select id="pmk"><option value="">Choose\u2026</option>').concat(all.filter((p) => p.id != mg.id).map((p) => '<option value="'.concat(p.id, '">').concat(esc(p.name)).concat(p.label ? " (" + esc(p.label) + ")" : "", " \xB7 ").concat(filmsOf(p.id), " films</option>")).join(""), '</select></label><div class="acts"><button class="btn del" id="pmgo">Merge</button><button class="btn ghost" id="pmx2">Cancel</button></div>').concat(note(), "</div></div>") : "";
    return form + mgf + claimsHTML() + '<div class="panel scroll"><div style="display:flex;gap:.6rem;align-items:center;flex-wrap:wrap;margin-bottom:.6rem"><h3 style="margin:0;flex:1">People ('.concat(all.length, ')</h3><button class="btn" id="padd">+ Add person</button></div><p style="color:var(--mute);margin:.2rem 0 .6rem;font-size:.85rem">A person gets the blue verified badge automatically after working on ').concat(S.set.verFilms || 5, " films with ").concat(S.set.verHouses || 5, ' different production houses (change these numbers in Site rules), or you can verify or remove it by hand. Everyone listed in Cast &amp; crew. Each person exists once, so their photo and ratings follow them across all films.</p><input id="pq" type="search" placeholder="Search people\u2026" autocomplete="off"><table id="pt"><tr><th></th><th>Name</th><th>Roles</th><th>Films</th><th></th></tr>').concat(all.map((p) => '<tr data-q="'.concat(esc(pnorm(p.name + " " + (p.label || ""))), '"><td><span class="crp" style="width:38px;height:38px;margin:0;display:inline-flex;font-size:1rem;background-image:').concat(p.photo_url ? "url('".concat(esc(p.photo_url), "')") : "none", '">').concat(p.photo_url ? "" : esc(p.name.charAt(0).toUpperCase()), "</span></td><td>").concat(esc(p.name)).concat(vb(p.id)).concat(p.label ? '<br><small style="color:var(--mute)">'.concat(esc(p.label), "</small>") : "", "</td><td>").concat(esc(rolesOf(p.id)), '<br><small style="color:var(--mute)">').concat(window.VER[p.id] ? window.VER[p.id] == "admin" ? "Verified by admin" : "Verified automatically" : p.unverified ? "Badge removed by admin" : "Not verified", " \xB7 ").concat((window.PROG[p.id] || {}).films || 0, "/").concat(S.set.verFilms || 5, " films \xB7 ").concat((window.PROG[p.id] || {}).houses || 0, "/").concat(S.set.verHouses || 5, " houses</small>").concat(window.PRIV[p.id] && window.PRIV[p.id].user_id ? '<br><small style="color:var(--mute)">Creator \u2713 '.concat(esc(window.PRIV[p.id].user_email || ""), "</small>") : window.PRIV[p.id] && window.PRIV[p.id].link_email ? '<br><small style="color:var(--mute)">Invited: '.concat(esc(window.PRIV[p.id].link_email), "</small>") : "", "</td><td>").concat(filmsOf(p.id), '</td><td><button class="btn ghost" data-pv="').concat(p.id, '">').concat(window.VER[p.id] ? "Remove badge" : "Verify", '</button> <button class="btn ghost" data-pe="').concat(p.id, '">Edit</button> <button class="btn ghost" data-pm="').concat(p.id, '">Merge\u2026</button> <button class="btn del" data-pd="').concat(p.id, '">Delete</button></td></tr>')).join(""), "</table></div>");
  }
  function peopleBind() {
    const go = () => shell();
    {
      const pk = document.getElementById("fpk");
      if (pk && S.pedit) focusPick(pk, S.pedit.photo_url, S.pedit.photo_focus);
    }
    document.querySelectorAll("[data-pv]").forEach((b) => b.onclick = async () => {
      const id = +b.dataset.pv, on = !!window.VER[id], p = window.PPL[id];
      if (!confirm(on ? "Remove the verified badge from \u201C".concat(p.name, "\u201D?") : "Give \u201C".concat(p.name, "\u201D the verified badge?"))) return;
      const r = await sb.from("people").update(on ? { verified: false, unverified: true } : { verified: true, unverified: false }).eq("id", id);
      done(r.error ? r.error.message : on ? "Badge removed." : "Verified.");
    });
    document.querySelectorAll("[data-ca]").forEach((b) => b.onclick = async () => {
      if (!confirm("Approve this claim? This person becomes the owner of the profile and gets a creator account.")) return;
      const r = await sb.rpc("approve_claim", { cid: +b.dataset.ca });
      done(r.error ? r.error.message : "Approved.");
    });
    document.querySelectorAll("[data-cr]").forEach((b) => b.onclick = async () => {
      const r = await sb.from("person_claims").update({ status: "rejected" }).eq("id", +b.dataset.cr);
      done(r.error ? r.error.message : "Rejected.");
    });
    const a = $("#padd");
    if (a) a.onclick = () => {
      S.pedit = {};
      go();
    };
    document.querySelectorAll("[data-pe]").forEach((b) => b.onclick = () => {
      S.pedit = Object.assign({}, window.PPL[b.dataset.pe]);
      go();
    });
    document.querySelectorAll("[data-pm]").forEach((b) => b.onclick = () => {
      S.pmerge = window.PPL[b.dataset.pm];
      go();
    });
    ["#pcx", "#pcx2"].forEach((i) => {
      const c = $(i);
      if (c) c.onclick = () => {
        S.pedit = null;
        go();
      };
    });
    ["#pmx", "#pmx2"].forEach((i) => {
      const c = $(i);
      if (c) c.onclick = () => {
        S.pmerge = null;
        go();
      };
    });
    const q = $("#pq");
    if (q) {
      const ft = () => {
        const v = q.value.trim().toLowerCase();
        document.querySelectorAll("#pt tr[data-q]").forEach((r) => r.style.display = !v || r.dataset.q.includes(v) ? "" : "none");
      };
      q.oninput = ft;
    }
    const pf = $("#pf");
    if (pf) pf.onsubmit = async (ev) => {
      ev.preventDefault();
      const v = Object.fromEntries(new FormData(pf)), ok = pf.querySelector(".ok"), btn = pf.querySelector("button:not([type=button])");
      btn.disabled = true;
      try {
        const n = (v.name || "").trim(), l = (v.label || "").trim() || null;
        if (!n) throw new Error("Enter a name.");
        if (Object.values(window.PPL).some((p) => p.id != S.pedit.id && pnorm(p.name) === pnorm(n) && pnorm(p.label) === pnorm(l))) throw new Error("Another person already has this exact name and label. Change the label, or merge the two.");
        let photo = S.pedit.photo_url || null;
        if (v.photo && v.photo.size) {
          ok.textContent = "Uploading photo\u2026";
          photo = await upload(v.photo, "people");
        }
        const le = (v.lemail || "").trim().toLowerCase() || null, old = S.pedit.id && window.PRIV[S.pedit.id] ? window.PRIV[S.pedit.id].link_email : null, row = { name: n, label: l, photo_url: photo, photo_focus: photo ? v.focus || null : null, bio: (v.bio || "").trim() || null, link_email: le };
        if (S.pedit.id && (le || null) !== (old || null)) row.user_id = null;
        const r = S.pedit.id ? await sb.from("people").update(row).eq("id", S.pedit.id) : await sb.from("people").insert(row);
        if (r.error) throw new Error(r.error.message);
        S.pedit = null;
        done("Saved.");
      } catch (er) {
        ok.textContent = er.message || "Something went wrong.";
        btn.disabled = false;
      }
    };
    document.querySelectorAll("[data-pd]").forEach((b) => b.onclick = async () => {
      const p = window.PPL[b.dataset.pd], n = filmsOf(p.id);
      if (!confirm(n ? "\u201C".concat(p.name, "\u201D is listed in ").concat(n, " film").concat(n == 1 ? "" : "s", ". Deleting removes them from those films and deletes their ratings. Delete anyway?") : "Delete \u201C".concat(p.name, "\u201D? This cannot be undone."))) return;
      if (n) {
        for (const t of S.T.filter((t2) => Array.isArray(t2.credits) && t2.credits.some((x) => x && +x.pid === +p.id))) {
          await sb.from("titles").update({ credits: t.credits.filter((x) => !(x && +x.pid === +p.id)) }).eq("id", t.id);
        }
      }
      const r = await sb.from("people").delete().eq("id", p.id);
      done(r.error ? r.error.message : "Deleted.");
    });
    const mgo = $("#pmgo");
    if (mgo) mgo.onclick = async () => {
      const k = +$("#pmk").value;
      if (!k) return;
      const keep = window.PPL[k];
      if (!confirm("Merge \u201C".concat(S.pmerge.name, "\u201D into \u201C").concat(keep.name, "\u201D? This cannot be undone."))) return;
      mgo.disabled = true;
      const r = await sb.rpc("merge_people", { keep: k, drop_id: S.pmerge.id });
      S.pmerge = null;
      done(r.error ? r.error.message : "Merged.");
    };
  }
  function shell() {
    const cur = T9.find((t) => t[0] == S.tab);
    app.innerHTML = '<div id="adm"><header><b>'.concat(esc(S.set.brand || "Admin"), " admin").concat(cur ? ": " + cur[1] : "", '<small style="font-weight:400;opacity:.6;margin-left:.5rem">v').concat(window.ATMAX_V || "?", "</small></b>").concat(cur ? '<button class="btn ghost" data-t="home">Dashboard</button>' : "", '<button class="btn ghost" id="vs">View site</button><button class="btn ghost" id="out">Sign out</button></header><main id="pane"></main></div>');
    const U = users().split('<div class="panel scroll">'), P = { home, films, rows, pay: payTab, house: houseTab, people: peopleTab, profit: profitTab, houses: housesTab, look, users: () => '<div class="panel scroll">' + U[1], team: () => U[0], site, ann, stats, backup, pics };
    $("#pane").innerHTML = (P[S.tab] || home)();
    document.querySelectorAll("[data-t]").forEach((b) => b.onclick = () => {
      const k = b.dataset.t;
      if (k === S.tab) {
        S.edit = null;
        S.fopen = false;
        S.pedit = null;
        S.pmerge = null;
        S.msg = "";
        return shell();
      }
      navTo(k === "home" ? "/admin/" : "/admin/" + (TABDIR[k] || k) + "/");
    });
    $("#out").onclick = out;
    $("#vs").onclick = () => {
      try {
        sessionStorage.setItem("atmax_prev", "1");
        sessionStorage.removeItem("atmax_sub");
      } catch (e) {
      }
      navTo("/profiles/");
    };
    bind();
  }
  const note = () => '<div class="ok" role="status">'.concat(esc(S.msg), "</div>");
  const PSL = [["poster_url", "Tile poster"], ["banner_pc", "PC banner"], ["banner_phone", "Phone banner"], ["header_img", "Details header"]];
  function pics() {
    return '<div class="panel"><h3>Picture check</h3><p style="color:var(--mute);margin:0 0 .6rem">Loads every picture saved on your films, exactly as viewers\' browsers do, and tells you which ones fail and why.</p><div class="acts"><button class="btn" id="pcheck">Check all pictures</button></div><div id="pcres" style="margin-top:1rem"></div></div>';
  }
  function whyFail(u) {
    if (!/^https?:\/\//i.test(u)) return "Not a web link. It must start with https://";
    if (/^http:\/\//i.test(u)) return "The link starts with http://, which browsers block on a secure site. Use https:// or upload the picture.";
    if (/drive\.google\.com\/drive\/folders/.test(u)) return "This is a folder link. Open the picture file itself, click Share, set General access to Anyone with the link, and paste that.";
    if (/drive\.google\.com|googleusercontent\.com/.test(u)) return "Google refused to show it. Set the file to Anyone with the link, or upload the picture here instead (more reliable).";
    if (/\/object\/public\/films\//.test(u)) return "The file is missing from Supabase storage, or the films storage bucket is not public.";
    if (/(instagram|facebook|pinterest|twitter|x)\.com|imgur\.com\/a\//i.test(u)) return "This is a web page, not the picture file. Upload the picture instead.";
    return "The link is not a direct picture file, or that website blocks other sites from showing it. Upload the picture instead.";
  }
  async function runPicCheck() {
    const out2 = $("#pcres"), jobs = [];
    S.T.forEach((t) => PSL.forEach(([c, l]) => {
      if (t[c]) jobs.push([t, l, t[c]]);
    }));
    [["logo", "Brand logo"], ["icon", "Site icon"], ["bgImage", "Page background"], ["heroImg", "Coming soon banner"]].forEach(([k, l]) => {
      if (S.set[k]) jobs.push([{ title: "Site settings" }, l, S.set[k]]);
    });
    if (!jobs.length) {
      out2.textContent = "No pictures are saved on any film yet.";
      return;
    }
    out2.textContent = "Checking " + jobs.length + " pictures\u2026";
    const res = await Promise.all(jobs.map(([t, l, u]) => new Promise((r) => {
      let d = false;
      const fin = (ok) => {
        if (!d) {
          d = true;
          r([t, l, u, ok]);
        }
      }, im = new Image();
      im.onload = () => fin(true);
      im.onerror = () => fin(false);
      setTimeout(() => fin(false), 12e3);
      im.src = dimg(u);
    })));
    const bad = res.filter((x) => !x[3]);
    out2.innerHTML = "<p><b>".concat(res.length - bad.length, " of ").concat(res.length, "</b> pictures load correctly").concat(bad.length ? '; <b style="color:#c0182f">'.concat(bad.length, " fail</b>") : "", ".</p>") + (bad.length ? '<div class="scroll"><table><tr><th>Film</th><th>Picture</th><th>Why and how to fix</th></tr>'.concat(bad.map(([t, l, u]) => "<tr><td>".concat(esc(t.title), "</td><td>").concat(l, "</td><td>").concat(esc(whyFail(u)), '<br><small style="color:var(--mute);word-break:break-all">').concat(esc(u.slice(0, 90))).concat(u.length > 90 ? "\u2026" : "", "</small></td></tr>")).join(""), "</table></div>") : "<p>If pictures still don't show on the site, the site file is out of date or your browser has an old copy. Reload with Ctrl+Shift+R.</p>");
  }
  const SLOTS = [["poster", "Tile poster", "2:3", "1000\xD71500", "poster_url", "poster_file"], ["pc", "PC banner", "16:9", "1920\xD71080", "banner_pc", "banner_pc_file"], ["phone", "Phone banner", "4:5", "1080\xD71350", "banner_phone", "banner_phone_file"], ["head", "Details header", "16:9", "1280\xD7720", "header_img", "header_file"]];
  function slotInfo(f, k) {
    const d = SLOTS.find((x) => x[0] == k), fl = f.elements[d[5]].files[0], u = f.elements[d[4]].value.trim();
    return { src: fl ? URL.createObjectURL(fl) : dimg(u), pos: (f.elements["fx_" + k].value || "50 50").split(" ").map((n) => n + "%").join(" ") };
  }
  function slotImg(f, k) {
    const ch = { poster: ["poster"], pc: ["pc", "poster"], phone: ["phone", "pc", "poster"], head: ["head", "pc", "poster"] }[k];
    for (const c of ch) {
      const i = slotInfo(f, c);
      if (i.src) return i;
    }
    return { src: "", pos: "center" };
  }
  function initSlots(f, pv) {
    f.querySelectorAll(".fp").forEach((b) => {
      const k = b.dataset.slot, paint = () => {
        const i = slotInfo(f, k), xy = f.elements["fx_" + k].value.split(" ");
        b.style.background = i.src ? "url('".concat(i.src, "') ").concat(i.pos, "/cover") : "#2a2024";
        b.firstChild.style.left = xy[0] + "%";
        b.firstChild.style.top = xy[1] + "%";
      };
      b.onclick = (e) => {
        const r = b.getBoundingClientRect();
        f.elements["fx_" + k].value = Math.round((e.clientX - r.left) / r.width * 100) + " " + Math.round((e.clientY - r.top) / r.height * 100);
        paint();
        pv();
      };
      f.addEventListener("input", paint);
      paint();
    });
  }
  const DAYS = [[7, "1 week"], [14, "2 weeks"], [30, "1 month"], [180, "6 months"], [365, "1 year"]];
  const donPanel = () => {
    const L = (S.DON || []).filter((x) => x.status === "success"), tot = L.reduce((a, x) => a + Number(x.amount), 0), by = {};
    L.forEach((x) => {
      const k = x.title_id || 0;
      (by[k] = by[k] || { n: 0, a: 0 }).n++;
      by[k].a += Number(x.amount);
    });
    return '<div class="panel scroll"><h3>Donations</h3><p>'.concat(gh2(tot), " from ").concat(L.length, " donation").concat(L.length == 1 ? "" : "s", ".</p>").concat(L.length ? "<table><tr><th>Film</th><th>Donations</th><th>Total</th></tr>".concat(Object.keys(by).map((k) => {
      const t = S.T.find((x) => x.id == k);
      return "<tr><td>".concat(esc(t ? t.title : "General (no film)"), "</td><td>").concat(by[k].n, "</td><td>").concat(gh2(by[k].a), "</td></tr>");
    }).join(""), "</table><table><tr><th>When</th><th>Who</th><th>Amount</th></tr>").concat(L.slice(0, 50).map((x) => "<tr><td>".concat(esc(new Date(x.created_at).toLocaleString()), "</td><td>").concat(esc(x.email || ""), "</td><td>").concat(gh2(x.amount), "</td></tr>")).join(""), "</table>") : "<p>No donations yet.</p>", "</div>");
  };
  const gh2 = (n) => "GH\u20B5" + Number(n || 0).toFixed(2);
  const porow = (o) => '<div class="por" data-id="'.concat(o.id || "", '"><select class="pod" aria-label="Access period">').concat(DAYS.map(([d, l]) => '<option value="'.concat(d, '" ').concat(o.days == d ? "selected" : "", ">").concat(l, "</option>")).join(""), '</select><label class="gh">GH\u20B5 <input class="pop" type="number" min="0.1" step="0.01" value="').concat(o.price != null ? o.price : "", '" placeholder="Price" aria-label="Price in cedis"></label><button type="button" class="btn del pox" aria-label="Remove option">\u2715</button></div>');
  const NETS = [["MTN", "MTN MoMo"], ["VOD", "Telecel Cash"], ["ATL", "AirtelTigo Money"]];
  const finEditor = (e) => {
    const f = (S.FIN || {})[e.id] || {}, ty = f.payee_type || "mobile_money";
    return '<fieldset class="slot"><legend>Money: house cut and payout details</legend><p style="color:var(--mute);margin:0 0 .5rem;font-size:.85rem">The house cut is the percentage of every payment that ATMAX STUDIOS keeps. The rest is owed to the film owner and is sent from the Payments tab. These details are private to admins.'.concat(S.FINOK ? "" : " (Run 3_payouts_setup.sql first.)", '</p><label>House cut % of each payment<input name="fin_pct" type="number" min="0" max="100" step="0.5" value="').concat(f.house_pct != null ? f.house_pct : 20, '"></label><label>Owner\'s name (as registered on the account)<input name="fin_name" value="').concat(esc(f.payee_name), '"></label><label>Pay the owner by<select name="fin_type"><option value="mobile_money" ').concat(ty == "mobile_money" ? "selected" : "", '>Mobile Money</option><option value="bank" ').concat(ty == "bank" ? "selected" : "", '>Bank account</option></select></label><label>Mobile Money network (if Mobile Money)<select name="fin_net"><option value="">Choose\u2026</option>').concat(NETS.map(([c, l]) => '<option value="'.concat(c, '" ').concat(f.payee_network == c ? "selected" : "", ">").concat(l, "</option>")).join(""), '</select></label><label>Mobile Money number or bank account number<input name="fin_acct" inputmode="numeric" value="').concat(esc(f.payee_account), '"></label><label>Paystack bank code (bank accounts only)<input name="fin_bank" value="').concat(esc(f.payee_bank_code), '" placeholder="e.g. 030100"></label></fieldset>');
  };
  const crewRow = (c) => '<div class="crw" data-pid="'.concat(c.pid || "", '"><div class="crp" style="background-image:').concat(c.p ? "url('".concat(esc(c.p), "')") : "none", '">').concat(c.p ? "" : "+", '<input type="file" accept="image/*" class="crf" title="Photo"></div><div class="crb"><input class="crn" placeholder="Start typing a name\u2026" autocomplete="off" value="').concat(esc(c.n), '"').concat(c.pid ? " readonly" : "", '><div class="sug" style="display:none"></div><div class="crm"></div><input class="crl" placeholder="Short label to tell them apart (e.g. born 1990, from Kumasi)" style="display:none" value="').concat(esc(c.l), '"><select class="crr"><option value="">Choose a role\u2026</option>').concat(ROLE_OPTS, '<option value="__other">Other (type your own)\u2026</option></select><input class="cro" placeholder="Type the role" style="display:none" value=""><input type="hidden" class="crph" value="').concat(esc(c.p), '"><input type="hidden" class="crrv" value="').concat(esc(c.r), '"></div><button type="button" class="btn del crx" title="Remove">\xD7</button></div>');
  const houseEditor = (e) => {
    const hs = Object.values(window.HS || {}).sort((a, b) => a.name.localeCompare(b.name)), on = new Set(e.id ? window.TH[e.id] || [] : []);
    return '<fieldset class="slot"><legend>Production houses</legend><div class="hint">Tick every production house that worked on this film. Add or edit houses and logos in the \u201CProduction houses\u201D tab.</div>'.concat(hs.length ? hs.map((h) => '<label class="chk"><input type="checkbox" name="hs_'.concat(h.id, '" ').concat(on.has(h.id) ? "checked" : "", '> <span class="crp" style="width:26px;height:26px;margin:0 .4rem 0 0;display:inline-flex;font-size:.8rem;background-image:').concat(h.logo_url ? "url('".concat(esc(h.logo_url), "')") : "none", '">').concat(h.logo_url ? "" : esc(h.name.charAt(0).toUpperCase()), "</span>").concat(esc(h.name), "</label>")).join("") : '<p style="color:var(--mute)">No production houses yet.</p>', "</fieldset>");
  };
  async function saveHouses(tid, v) {
    const ids = Object.keys(v).filter((k) => /^hs_\d+$/.test(k)).map((k) => +k.slice(3));
    const d = await sb.from("title_houses").delete().eq("title_id", tid);
    if (d.error) return d.error.message;
    if (!ids.length) {
      window.TH[tid] = [];
      return null;
    }
    const q = await sb.from("title_houses").insert(ids.map((h, i) => ({ title_id: tid, house_id: h, position: i })));
    if (q.error) return q.error.message;
    window.TH[tid] = ids;
    return null;
  }
  const crewEditor = (e) => '<fieldset class="slot"><legend>Cast &amp; crew</legend><div class="hint">Type a name. If the person already exists you can pick them, so they keep one photo and one rating across all films. A new person gets a photo (optional), a name and a role.</div><div id="crew">'.concat((Array.isArray(e.credits) ? e.credits : []).map((x) => {
    const p = x && x.pid ? pOf(x.pid) : null;
    return p ? crewRow({ pid: p.id, n: p.name, l: p.label || "", p: p.photo_url || "", r: x.r || "" }) : x && x.n ? crewRow({ n: x.n, p: x.p || "", r: x.r || "" }) : "";
  }).join(""), '</div><div class="acts"><button type="button" class="btn ghost" id="cradd">+ Add person</button></div></fieldset>');
  const filmsOf = (pid) => S.T.filter((t) => Array.isArray(t.credits) && t.credits.some((x) => x && +x.pid === +pid)).length;
  function crewBind(f) {
    const box = f.querySelector("#crew");
    if (!box) return;
    const setup = (row) => {
      const sel = row.querySelector(".crr"), oth = row.querySelector(".cro"), rv = row.querySelector(".crrv").value, nm = row.querySelector(".crn"), sg = row.querySelector(".sug"), msg = row.querySelector(".crm"), lab = row.querySelector(".crl"), pp = row.querySelector(".crp"), ph = row.querySelector(".crph"), fi = row.querySelector(".crf");
      if (rv) {
        const has = [...sel.options].some((o) => o.value === rv || o.text === rv);
        if (has) sel.value = rv;
        else {
          sel.value = "__other";
          oth.style.display = "";
          oth.value = rv;
        }
      }
      sel.onchange = () => {
        oth.style.display = sel.value === "__other" ? "" : "none";
      };
      const linked = () => {
        const pid = row.dataset.pid, p = pOf(pid);
        msg.innerHTML = p ? "\u2713 Existing person \xB7 in ".concat(filmsOf(pid), " film").concat(filmsOf(pid) == 1 ? "" : "s", ' \xB7 <a href="#" class="cru">not them? change</a>') : "";
        lab.style.display = "none";
        fi.style.pointerEvents = p && p.photo_url ? "none" : "";
        const a = msg.querySelector(".cru");
        if (a) a.onclick = (ev) => {
          ev.preventDefault();
          row.dataset.pid = "";
          row.dataset.isnew = "";
          nm.readOnly = false;
          nm.value = "";
          ph.value = "";
          pp.style.backgroundImage = "none";
          pp.firstChild.textContent = "+";
          fi.style.pointerEvents = "";
          msg.innerHTML = "";
          nm.focus();
        };
      };
      if (row.dataset.pid) linked();
      const show = () => {
        if (row.dataset.pid || row.dataset.isnew) {
          sg.style.display = "none";
          return;
        }
        const q = pnorm(nm.value);
        if (q.length < 2) {
          sg.style.display = "none";
          return;
        }
        const m = Object.values(window.PPL || {}).filter((p) => pnorm(p.name).includes(q)).sort((a, b) => (pnorm(b.name) === q) - (pnorm(a.name) === q) || pnorm(a.name).localeCompare(pnorm(b.name))).slice(0, 6);
        sg.innerHTML = m.map((p) => '<button type="button" class="sgi" data-p="'.concat(p.id, '"><i style="').concat(p.photo_url ? "background-image:url('".concat(esc(p.photo_url), "')") : "", '">').concat(p.photo_url ? "" : esc(p.name.charAt(0).toUpperCase()), "</i><span><b>").concat(esc(p.name), "</b>").concat(p.label ? " <small>".concat(esc(p.label), "</small>") : "", "<small>in ").concat(filmsOf(p.id), " film").concat(filmsOf(p.id) == 1 ? "" : "s", "</small></span><em>Same person</em></button>")).join("") + '<button type="button" class="sgn"><span>+ Add \u201C'.concat(esc(nm.value.trim()), "\u201D as a new person</span></button>");
        sg.style.display = "";
      };
      nm.oninput = show;
      nm.onfocus = show;
      sg.onclick = (ev) => {
        const b = ev.target.closest("button");
        if (!b) return;
        ev.preventDefault();
        if (b.dataset.p) {
          const p = pOf(b.dataset.p);
          row.dataset.pid = p.id;
          nm.value = p.name;
          nm.readOnly = true;
          ph.value = p.photo_url || "";
          if (p.photo_url) {
            pp.style.backgroundImage = "url('" + p.photo_url + "')";
            pp.firstChild.textContent = "";
          }
          linked();
        } else {
          row.dataset.isnew = "1";
          const dup = Object.values(window.PPL || {}).some((p) => pnorm(p.name) === pnorm(nm.value));
          if (dup) {
            lab.style.display = "";
            msg.textContent = "Someone with this exact name already exists. Add a short label below so people can tell them apart.";
            lab.focus();
          } else msg.textContent = "New person";
        }
        sg.style.display = "none";
      };
      document.addEventListener("click", (ev) => {
        if (!row.contains(ev.target)) sg.style.display = "none";
      });
      fi.onchange = (ev) => {
        const fl = ev.target.files[0];
        if (fl) {
          pp.style.backgroundImage = "url('" + URL.createObjectURL(fl) + "')";
          if (pp.firstChild.nodeType === 3) pp.firstChild.textContent = "";
        }
      };
    };
    box.querySelectorAll(".crw").forEach(setup);
    f.querySelector("#cradd").onclick = () => {
      box.insertAdjacentHTML("beforeend", crewRow({}));
      setup(box.lastElementChild);
    };
    box.onclick = (ev) => {
      const b = ev.target.closest(".crx");
      if (b) b.closest(".crw").remove();
    };
  }
  async function withDirector(f, dir, list) {
    dir = (dir || "").trim();
    if (!dir) return list;
    const same = Object.values(window.PPL || {}).filter((p2) => pnorm(p2.name) === pnorm(dir));
    if (list.some((x) => same.some((p2) => p2.id === x.pid) && /director/i.test(x.r || ""))) return list;
    let p = same.length === 1 ? same[0] : null;
    if (!p && !same.length) {
      const q = await sb.from("people").insert({ name: dir }).select("id,name,label,photo_url").single();
      if (q.error) throw new Error(q.error.message);
      window.PPL[q.data.id] = q.data;
      p = q.data;
    }
    if (!p) return list;
    return list.some((x) => x.pid === p.id) ? list : [{ pid: p.id, r: "Director" }, ...list];
  }
  async function crewCollect(f) {
    const out2 = [], seen = /* @__PURE__ */ new Set();
    for (const row of f.querySelectorAll(".crw")) {
      const n = row.querySelector(".crn").value.trim();
      if (!n) continue;
      const sel = row.querySelector(".crr").value, r = sel === "__other" ? row.querySelector(".cro").value.trim() : sel, fl = row.querySelector(".crf").files[0];
      let pid = +row.dataset.pid || 0;
      if (pid) {
        const p = pOf(pid);
        if (fl && fl.size && p && !p.photo_url) {
          const u = await upload(fl, "people"), q = await sb.from("people").update({ photo_url: u }).eq("id", pid);
          if (q.error) throw new Error(q.error.message);
          p.photo_url = u;
        }
      } else {
        const label = row.querySelector(".crl").value.trim(), dup = Object.values(window.PPL || {}).find((p) => pnorm(p.name) === pnorm(n) && pnorm(p.label) === pnorm(label));
        if (dup && !row.dataset.isnew) throw new Error("\u201C".concat(n, "\u201D already exists. Pick them from the suggestions, or choose \u201CAdd as a new person\u201D and give a short label."));
        if (dup) throw new Error("There is already a person named \u201C".concat(n, "\u201D with ").concat(label ? "the label \u201C".concat(label, "\u201D") : "no label", ". Use a different label, or pick the existing person."));
        if (Object.values(window.PPL || {}).some((p) => pnorm(p.name) === pnorm(n)) && !label) throw new Error("\u201C".concat(n, "\u201D already exists. Add a short label to tell the new person apart, or pick the existing one."));
        let photo = row.querySelector(".crph").value;
        if (fl && fl.size) photo = await upload(fl, "people");
        const q = await sb.from("people").insert({ name: n, label: label || null, photo_url: photo || null }).select("id,name,label,photo_url").single();
        if (q.error) throw new Error(q.error.message);
        window.PPL[q.data.id] = q.data;
        pid = q.data.id;
        row.dataset.pid = pid;
        row.querySelector(".crn").readOnly = true;
      }
      const key = pid + "|" + r;
      if (seen.has(key)) continue;
      seen.add(key);
      out2.push({ pid, r });
    }
    return out2;
  }
  const poEditor = (e) => '<fieldset class="slot"><legend>Price options (pay per view)</legend><p style="color:var(--mute);margin:0 0 .5rem;font-size:.85rem">Leave empty for a free film (viewers only need to sign in). Add one or more options, for example 1 week GH\u20B55 and 1 month GH\u20B510. Viewers choose one when they pay.</p><div id="po">'.concat((S.PO[e.id] || []).map(porow).join(""), '</div><div class="acts" style="margin-top:.4rem"><button type="button" class="btn ghost" id="poadd">+ Add price option</button></div></fieldset>');
  const priceSum = (id) => {
    const o = (S.PO[id] || []).filter((x) => +x.price > 0);
    return o.length ? "from " + gh2(Math.min.apply(null, o.map((x) => +x.price))) + " \xB7 " + o.length + (o.length > 1 ? " options" : " option") : "Free";
  };
  async function savePO(tid) {
    const rows2 = [...document.querySelectorAll("#po .por")].map((x) => ({ id: x.dataset.id ? +x.dataset.id : null, days: +x.querySelector(".pod").value, price: parseFloat(x.querySelector(".pop").value) })).filter((x) => !isNaN(x.price));
    const keep = new Set(rows2.filter((x) => x.id).map((x) => x.id));
    for (const o of S.PO[tid] || []) if (!keep.has(o.id)) {
      const q = await sb.from("price_options").update({ active: false }).eq("id", o.id);
      if (q.error) return q.error.message;
    }
    for (const x of rows2) {
      const lab = (DAYS.find((d) => d[0] == x.days) || [0, x.days + " days"])[1], v = { title_id: tid, days: x.days, price: x.price, label: lab, active: true }, q = x.id ? await sb.from("price_options").update(v).eq("id", x.id) : await sb.from("price_options").insert(v);
      if (q.error) return q.error.message;
    }
    return "";
  }
  function films() {
    const e = S.edit || {}, opts = S.R.map((r) => '<option value="'.concat(r.id, '" ').concat(e.row_id == r.id ? "selected" : "", ">").concat(esc(r.name), "</option>")).join("");
    const form = '<div class="fov"><form id="f" class="panel fwin"><div class="fhd"><h3>'.concat(e.id ? "Edit film" : "Add film", '</h3><button type="button" class="fclose" id="cancel" aria-label="Close">\xD7</button></div>\n <label>Title<input name="title" required value="').concat(esc(e.title), '"></label><label>Year<input name="year" type="number" value="').concat(esc(e.year), '"></label><label>Genre<input name="genre" value="').concat(esc(e.genre), '"></label><label>Series name (optional, same spelling on every episode)<input name="series_name" value="').concat(esc(e.series_name), '"></label><label>Episode number (optional)<input name="episode_no" type="number" min="1" value="').concat(esc(e.episode_no), '"></label><label>Subtitles link (.vtt or .srt, optional; uploaded films only)<input name="subtitles_url" value="').concat(esc(e.subtitles_url), '"></label><label>\u2026or upload a subtitles file<input type="file" name="subtitles_file" accept=".vtt,.srt,text/vtt"></label>\n <fieldset class="slot"><legend>Donations</legend><label class="chk"><input type="checkbox" name="donate_on" ').concat(e.donate_on !== false ? "checked" : "", '> Show the Donate button for this film</label><label class="chk"><input type="checkbox" name="in_production" ').concat(e.in_production ? "checked" : "", '> Still in production (shows a green "Fund this film" button on the tile and poster)</label><label>Funding goal in GH\u20B5 (optional, shows a progress bar)<input type="number" name="fund_goal" min="0" step="1" value="').concat(e.fund_goal || "", '"></label><label>Executive Producer spots people can buy (0 = none)<input type="number" name="ep_slots" min="0" max="100" value="').concat(e.ep_slots || 0, '"></label><label>Price of one Executive Producer spot (GH\u20B5)<input type="number" name="ep_price" min="1" step="1" value="').concat(e.ep_price || "", '"></label></fieldset>\n <label>Description (short, shown on the film card)<textarea name="description" rows="3">').concat(esc(e.description), '</textarea></label><label>Synopsis (longer story summary, helps Google; no spoilers needed)<textarea name="synopsis" rows="5" maxlength="4000">').concat(esc(e.synopsis || ""), '</textarea></label><label>Behind the film (how it was made, locations, languages spoken, awards; helps Google)<textarea name="behind" rows="4" maxlength="4000">').concat(esc(e.behind || ""), "</textarea></label>\n ").concat(SLOTS.map(([k, l, ar, sz, un, fn]) => '<fieldset class="slot"><legend>'.concat(l, " \xB7 ").concat(ar, " (").concat(sz, ')</legend><label>Paste a picture link<input name="').concat(un, '" value="').concat(esc(e[un]), '"></label><label>\u2026or upload a picture file (saved inside your Supabase storage)<input type="file" name="').concat(fn, '" accept="image/*"></label>').concat(/\/object\/public\/films\//.test(e[un] || "") ? '<div class="stored">\u2713 Stored in your Supabase storage. The link above is just this picture\'s address and is kept automatically.</div>' : "", '<input type="hidden" name="fx_').concat(k, '" value="').concat(esc(((e.focus || {})[k] || [50, 50]).join(" ")), '"><div class="fp" data-slot="').concat(k, '" style="aspect-ratio:').concat(ar.replace(":", "/"), ";max-width:").concat(k == "phone" ? "200px" : k == "poster" ? "150px" : "320px", '" title="Click to set the focus point"><i></i></div><small style="color:var(--mute)">Click the picture to choose which part stays in view when it is cropped.</small></fieldset>')).join(""), '<div class="hint">Empty slots fall back to the PC banner, then the tile poster. Google Drive picture links are converted automatically. Links must be open: no password, no sign-in.</div>\n <label class="chk"><input type="radio" name="source" value="link" checked> Video: paste a link</label><label class="chk"><input type="radio" name="source" value="upload"> Video: upload a file</label>\n <label id="vl">Video link (Google Drive, YouTube, Vimeo or .mp4)<input name="video_url" value="').concat(esc(e.video_url), '"></label><label id="vf" style="display:none">Video file<input type="file" name="video_file" accept="video/*"></label>\n <div style="font-size:.82rem;color:var(--mute)">Google Drive: open the file, click Share, set General access to "Anyone with the link", then paste the link. Uploads are limited by your Supabase plan\'s per-file size; use a link for full-length films.</div>\n').concat(houseEditor(e)).concat(crewEditor(e)).concat(poEditor(e)).concat(finEditor(e), '\n <label>Trailer link (open link, no password)<input name="trailer_url" value="').concat(esc(e.trailer_url), '"></label><label>\u2026or upload a trailer<input type="file" name="trailer_file" accept="video/*"></label><label class="chk"><input type="checkbox" name="allow_rate" ').concat(e.allow_rate !== false ? "checked" : "", '> Allow ratings</label><label class="chk"><input type="checkbox" name="allow_comment" ').concat(e.allow_comment !== false ? "checked" : "", '> Allow comments</label><label>Status<select name="status"><option value="published" ').concat(e.status !== "draft" ? "selected" : "", '>Published</option><option value="soon" ').concat(e.status === "soon" ? "selected" : "", '>Coming soon (trailer only)</option><option value="draft" ').concat(e.status === "draft" ? "selected" : "", '>Draft (hidden from viewers)</option></select></label><label>Release date and time (Ghana time, optional). For a "Coming soon" film this shows a live countdown and it opens by itself at that time. For a Published film it stays hidden until then<input type="datetime-local" name="publish_at" value="').concat(e.publish_at ? esc(String(e.publish_at).slice(0, 16)) : "", '"></label><label>Row<select name="row_id"><option value="">None</option>').concat(opts, '</select></label>\n <label class="chk"><input type="checkbox" name="featured" ').concat(e.featured ? "checked" : "", '> Feature in the rotating banner on Home</label>\n <h3>Preview</h3><div class="acts" style="margin-top:0"><button type="button" class="btn ghost" data-pv="pc">PC</button><button type="button" class="btn ghost" data-pv="ph">Phone</button></div><div id="pv"></div><div class="acts"><button class="btn">').concat(e.id ? "Save changes" : "Add film", '</button><button type="button" class="btn ghost" id="cancel2">Cancel</button></div>').concat(note(), "</form></div>");
    return (S.fopen ? form : "") + '<div class="panel scroll"><div style="display:flex;gap:.6rem;align-items:center;flex-wrap:wrap;margin-bottom:.6rem"><h3 style="margin:0;flex:1">All films ('.concat(S.T.length, ')</h3><button class="btn" id="fadd">+ Add film</button></div><input id="fq" type="search" placeholder="Search films by title, genre, year or row\u2026" autocomplete="off"><table id="ft"><tr><th>Title</th><th>Row</th><th>Price</th><th>Plays</th><th></th></tr>').concat(S.T.map((t) => {
      var _a;
      return '<tr data-q="'.concat(esc([t.title, t.genre, t.year, t.director, t.series_name, (S.R.find((r) => r.id == t.row_id) || {}).name].join(" ").toLowerCase()), '"><td>').concat(esc(t.title)).concat(t.featured ? " \u2605" : "").concat(t.status === "draft" ? " (draft)" : "", "</td><td>").concat(esc(((_a = S.R.find((r) => r.id == t.row_id)) == null ? void 0 : _a.name) || "\u2014"), "</td><td>").concat(priceSum(t.id), "</td><td>").concat(t.plays || 0, '</td><td><button class="btn ghost" data-rev="').concat(t.id, '">\u{1F4CA} Dashboard</button> <button class="btn ghost" data-edit="').concat(t.id, '">Edit</button> <button class="btn del" data-del="').concat(t.id, '">Delete</button></td></tr>');
    }).join(""), "</table></div>");
  }
  function rows() {
    return '<div class="panel scroll"><h3>Rows on Home</h3><p style="color:var(--mute);margin:0 0 .6rem">Lower numbers appear higher on the page. Untick Active to hide a row and its films from viewers (nothing is deleted).</p><table><tr><th>Name</th><th>Order</th><th>Active</th><th></th></tr>\n '.concat(S.R.map((r) => '<tr><td><input data-rn="'.concat(r.id, '" value="').concat(esc(r.name), '" aria-label="Row name"></td><td><input data-rp="').concat(r.id, '" type="number" value="').concat(r.position, '" aria-label="Order" style="width:80px"></td><td><input type="checkbox" data-ra="').concat(r.id, '" ').concat(r.active !== false ? "checked" : "", ' aria-label="Row active"></td><td><button class="btn" data-saverow="').concat(r.id, '">Save</button> <button class="btn del" data-delrow="').concat(r.id, '">Delete</button></td></tr>')).join(""), '</table>\n <div class="acts"><input id="newrow" placeholder="New row name" style="max-width:260px"><button class="btn" id="addrow">Add row</button></div>').concat(note(), "</div>");
  }
  const TH = window.TH = { mid: ["Midnight", { accent: "#9b2c4b", dark: "#0e0b0c", pg: "#0a0809", tx: "#f4ecef" }], crim: ["Crimson", { accent: "#c0182f", dark: "#14070a", pg: "#0d0507", tx: "#f7ecee" }], ocean: ["Ocean", { accent: "#1f8fd1", dark: "#07131d", pg: "#050d14", tx: "#e9f3fa" }], gold: ["Gold", { accent: "#c8932b", dark: "#14100a", pg: "#0b0905", tx: "#f6efe2" }], light: ["Light", { accent: "#9b2c4b", dark: "#0e0b0c", pg: "#f6f1f2", tx: "#141012", mu: "#6f6368" }] };
  Object.assign(TH, THX);
  const FN = { clean: "Clean (built-in)", serif: "Classic serif (built-in)", rounded: "Rounded (built-in)", cond: "Condensed (built-in)", poppins: "Poppins", montserrat: "Montserrat", playfair: "Playfair Display", bebas: "Bebas Neue", oswald: "Oswald", lora: "Lora" };
  const CKEYS = CK;
  function initLook(lf) {
    const g = (k) => lf.elements[k] ? lf.elements[k].value : "", cur = () => {
      const o = {};
      CKEYS.forEach((k) => o[k] = g(k));
      return o;
    };
    const L = (h) => {
      h = String(h).replace("#", "");
      if (h.length == 3) h = h.split("").map((c) => c + c).join("");
      const n = [0, 2, 4].map((i) => {
        const v = parseInt(h.substr(i, 2), 16) / 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2];
    }, cr = (a, b) => {
      const x = L(a), y = L(b);
      return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
    };
    const pv = () => {
      const o = cur(), P = $("#lpv");
      if (!P) return;
      const bg = o.pgd == "none" ? o.pg : o.pgd == "radial" ? "radial-gradient(circle at 50% 0%,".concat(o.pg2, ",").concat(o.pg, ")") : "linear-gradient(".concat(o.pgd == "diag" ? "135deg" : "180deg", ",").concat(o.pg, ",").concat(o.pg2, ")");
      P.style.cssText = "--a:".concat(o.accent, ";--a2:").concat(o.ac2, ";--bt:").concat(o.btx, ";--bar:").concat(o.dark, ";--nt:").concat(o.nt, ";--tx:").concat(o.tx, ";--mu:").concat(o.mu, ";--sf:").concat(o.sf, ";--sx:").concat(o.sx, ";--st:").concat(o.star, ";--hov:").concat(rgbaOf(o.dark, (g("ho") === "" ? 100 : g("ho")) / 100), ";background:").concat(bg, ";color:").concat(o.tx);
      const w = [];
      [["Text on the page", o.tx, o.pg, 4.5], ["Secondary text on the page", o.mu, o.pg, 3], ["Button text on the accent color", o.btx, o.accent, 4.5], ["Top bar text on the top bar", o.nt, o.dark, 4.5], ["Pop-up text on the pop-up background", o.sx, o.sf, 4.5]].forEach(([n, f, b, m]) => {
        const r = cr(f, b);
        if (r < m) w.push("".concat(n, " is hard to read (contrast ").concat(r.toFixed(1), "; aim for ").concat(m, " or more)."));
      });
      $("#lpw").innerHTML = w.length ? w.map((x) => "\u26A0 " + esc(x)).join("<br>") : "\u2713 The main text colors are easy to read.";
      lf.querySelectorAll("[data-o]").forEach((s) => s.textContent = g(s.dataset.o));
    };
    const setAll = (t) => {
      const f = fillTheme(t);
      CKEYS.forEach((k) => {
        if (lf.elements[k]) lf.elements[k].value = f[k];
      });
      pv();
    };
    const store = async (l, msg, extra) => {
      const r = await sb.from("settings").update({ data: __spreadProps(__spreadValues(__spreadValues({}, S.set), extra || {}), { cthemes: l }) }).eq("id", 1);
      done(r.error ? r.error.message : msg);
    };
    lf.addEventListener("input", pv);
    lf.querySelectorAll("[data-th]").forEach((b) => b.onclick = () => setAll(TH[b.dataset.th][1]));
    lf.querySelectorAll("[data-ct]").forEach((b) => b.onclick = () => {
      const t = (S.set.cthemes || []).find((x) => x.n === b.dataset.ct);
      if (t) setAll(t.v);
    });
    lf.querySelectorAll("[data-ctd]").forEach((b) => b.onclick = () => {
      if (confirm('Delete the theme "' + b.dataset.ctd + '"?')) store((S.set.cthemes || []).filter((x) => x.n !== b.dataset.ctd), "Theme deleted.");
    });
    $("#ctsave").onclick = () => {
      const n = ($("#ctname").value || "").replace(/[^\w &.-]/g, "").trim().slice(0, 24);
      if (!n) return alert("Give the theme a name first (letters and numbers).");
      store([...(S.set.cthemes || []).filter((x) => x.n !== n), { n, v: cur() }].slice(-12), "Theme saved and applied.", cur());
    };
    $("#ctexp").onclick = async () => {
      const t = JSON.stringify(cur());
      try {
        await navigator.clipboard.writeText(t);
        alert("Theme code copied.");
      } catch (e) {
        prompt("Copy this theme code", t);
      }
    };
    $("#ctimp").onclick = () => {
      const t = prompt("Paste a theme code");
      if (!t) return;
      try {
        const o = JSON.parse(t);
        if (!o || typeof o !== "object") throw 0;
        const c = {};
        CKEYS.forEach((k) => {
          if (typeof o[k] === "string" && (/^#[0-9a-f]{6}$/i.test(o[k]) || k === "pgd")) c[k] = o[k];
        });
        setAll(c);
      } catch (e) {
        alert("That theme code is not valid.");
      }
    };
    $("#ctreset").onclick = () => setAll(TH.mid[1]);
    pv();
  }
  function look() {
    var _a, _b;
    const d = S.set, c = (k, l, df) => "<label>".concat(l, '<input type="color" name="').concat(k, '" value="').concat(esc(d[k] || df), '"></label>'), t = (k, l) => "<label>".concat(l, '<input name="').concat(k, '" value="').concat(esc(d[k]), '"></label>'), up = (k, l) => "<label>".concat(l, ': paste an open image link<input name="').concat(k, '" value="').concat(esc(d[k]), '"></label><label>\u2026or upload a picture<input type="file" name="').concat(k, '_file" accept="image/*"></label>').concat(d[k] ? '<label class="chk"><input type="checkbox" name="rm_'.concat(k, '"> Remove it</label>') : ""), sel = (k, l, o) => "<label>".concat(l, '<select name="').concat(k, '">').concat(o.map((x) => '<option value="'.concat(x[0], '" ').concat((d[k] || o[0][0]) == x[0] ? "selected" : "", ">").concat(x[1], "</option>")).join(""), "</select></label>"), fo = Object.keys(FN).map((k) => [k, FN[k]]), ck = (k, l) => '<label class="chk"><input type="checkbox" name="'.concat(k, '" ').concat(d[k] ? "checked" : "", "> ").concat(l, "</label>"), ckd = (k, l, df) => '<label class="chk"><input type="checkbox" name="'.concat(k, '" ').concat((d[k] === void 0 ? df : d[k]) ? "checked" : "", "> ").concat(l, "</label>");
    return '<form id="lf" class="panel"><h3>Look & feel</h3><label>Quick themes (fills the colors below; press Save to apply)</label><div class="acts" style="margin-top:0">'.concat(Object.keys(TH).map((k) => '<button type="button" class="btn ghost" data-th="'.concat(k, '">').concat(TH[k][0], "</button>")).join(""), '</div>\n <h3 style="margin-top:1rem">My themes</h3><div class="acts" style="margin-top:0">').concat((d.cthemes || []).map((x) => '<span class="chip"><button type="button" class="btn ghost" data-ct="'.concat(esc(x.n), '">').concat(esc(x.n), '</button><button type="button" class="btn del" data-ctd="').concat(esc(x.n), '" aria-label="Delete theme ').concat(esc(x.n), '" style="padding:.35rem .6rem">\u2715</button></span>')).join("") || '<span style="color:var(--mute)">No saved themes yet.</span>', '</div>\n <div class="acts"><input id="ctname" placeholder="Name for this color set" style="max-width:220px" maxlength="24"><button type="button" class="btn" id="ctsave">Save colors as theme</button><button type="button" class="btn ghost" id="ctexp">Copy theme code</button><button type="button" class="btn ghost" id="ctimp">Paste theme code</button><button type="button" class="btn ghost" id="ctreset">Reset colors</button></div>\n <p style="color:var(--mute);font-size:.85rem;margin:.4rem 0 0">Saving a theme also applies the colors on screen now. Use a theme code to move a design to another site.</p>\n <h3 style="margin-top:1rem">Event theme (switches on and off by itself)</h3>').concat(sel("evt", "Theme to use", [["", "Off"], ...Object.keys(TH).map((k) => [k, TH[k][0]]), ...(d.cthemes || []).map((x) => ["c:" + x.n, "My theme: " + x.n])]), '<div class="cgrid"><label>From<input type="date" name="evf" value="').concat(esc(d.evf), '"></label><label>Until (included)<input type="date" name="evu" value="').concat(esc(d.evu), '"></label></div>\n <h3 style="margin-top:1rem">Brand</h3>').concat(t("brand", "Brand name")).concat(up("logo", "Logo"), '<label>Logo height: <span data-o="lh"></span>px<input type="range" name="lh" min="20" max="80" value="').concat(d.lh || 30, '"></label>').concat(up("icon", "Site icon (browser tab and home screen; square, 512\xD7512 is best)"), '\n <div class="lpwrap"><h3 style="margin:0 0 .4rem">Live preview</h3><div id="lpv" class="lpv"><div class="lpn"><b>').concat(esc(d.brand || "ATMAX"), '</b><span>Home</span><span>My list</span></div><div class="lph"><h4>Film title</h4><p>A short description of the film.</p><span class="lpb">Play</span> <span class="lpg">More info</span></div><div class="lpr">Row title<small>secondary text</small></div><div class="lpt"><i></i><i></i><i></i></div><div class="lpc"><b>Pop-up card</b><p>Details and comments look like this.</p><span class="lpb">Button</span><span class="lps">\u2605 4.5</span></div></div><div id="lpw" class="lpw"></div></div>\n <h3 style="margin-top:1rem">Colors</h3><div class="cgrid">').concat(c("accent", "Accent (buttons, highlights, glow)", "#9b2c4b")).concat(c("ac2", "Second accent (button gradient; same as accent = solid)", d.accent || "#9b2c4b")).concat(c("btx", "Button text", "#ffffff")).concat(c("dark", "Top bar and profile screen", "#0e0b0c")).concat(c("nt", "Top bar text", "#ffffff")).concat(c("pg", "Page background", "#0a0809")).concat(c("pg2", "Page background, second color (for a gradient)", d.pg || "#0a0809")).concat(c("tx", "Text", "#f4ecef")).concat(c("mu", "Secondary text (hints, empty messages)", "#a89aa0")).concat(c("sf", "Pop-up and sign-in card background", "#ffffff")).concat(c("sx", "Pop-up and sign-in card text", "#141012")).concat(c("star", "Rating badge text", "#ffffff"), '</div>\n<p style="color:var(--mute);font-size:.85rem;margin:.6rem 0 0">Tip: pick a light page color and the app switches to its light layout by itself. Any text that would be hard to read on its background is corrected automatically, so you can change one color at a time.</p>\n <h3 style="margin-top:1rem">Fine tuning (type a color code like #141012, or leave empty for automatic)</h3><div class="cgrid">').concat(["ht|Banner text", "hb|Banner button color", "hbt|Banner button text", "qb|Search box color", "qt|Search box text", "cb|Cast and creator cards color", "ct|Cast and creator cards text"].map((x) => {
      const [k, l] = x.split("|");
      return "<label>".concat(l, '<input name="').concat(k, '" value="').concat(esc(d[k] || ""), '" placeholder="automatic" maxlength="7" autocapitalize="off" autocomplete="off"></label>');
    }).join(""), "</div>\n ").concat(sel("pgd", "Page background style", [["none", "Solid color"], ["down", "Gradient, top to bottom"], ["diag", "Gradient, diagonal"], ["radial", "Soft glow from the top"]]), '\n <label>Banner darkness on the left: <span data-o="ho"></span>%<input type="range" name="ho" min="0" max="100" value="').concat((_a = d.ho) != null ? _a : 100, '"></label><label>Glow around tiles on hover: <span data-o="glw"></span>%<input type="range" name="glw" min="0" max="100" value="').concat((_b = d.glw) != null ? _b : 55, '"></label>\n ').concat(up("bgImage", "Page background image (optional, overrides the page color and gradient)"), '\n <h3 style="margin-top:1rem">Fonts</h3>').concat(sel("ft", "Titles and banner font", fo)).concat(sel("fb", "Body font", fo)).concat(sel("fs", "Text size", [["m", "Medium"], ["s", "Small"], ["l", "Large"]]), '\n <h3 style="margin-top:1rem">Tiles</h3>').concat(sel("tsh", "Shape", [["port", "Portrait poster (2:3)"], ["wide", "Wide card (16:9)"], ["sq", "Square"]])).concat(sel("ts", "Size", [["m", "Medium"], ["s", "Small"], ["l", "Large"]])).concat(sel("tr", "Corners", [["12", "Rounded"], ["0", "Square"], ["6", "Slightly rounded"], ["24", "Very round"]])).concat(sel("th", "Hover effect", [["zoom", "Zoom up"], ["glow", "Glow only"], ["none", "None"]])).concat(sel("dn", "Spacing between tiles", [["m", "Normal"], ["c", "Compact"], ["r", "Roomy"]])).concat(sel("br", "Button shape", [["m", "Rounded"], ["sq", "Square"], ["pill", "Pill"]]), '\n <h3 style="margin-top:1rem">Banner</h3>').concat(sel("hh", "Height", [["m", "Medium"], ["s", "Short"], ["l", "Almost full screen"]])).concat(t("heroT", "Coming soon banner: title")).concat(t("heroD", "Coming soon banner: description")).concat(up("heroImg", "Coming soon banner picture (16:9, 1920\xD71080, keep faces and text near the middle)"), '\n <h3 style="margin-top:1rem">Studio name under the logo</h3>').concat(t("studio", "Text shown boldly under the logo (default ATMAX STUDIOS)")).concat(ck("nostudio", "Hide the studio name")).concat(ck("nohb", "Hide the logo block at the top of Home"), '\n <h3 style="margin-top:1rem">Top bar and motion</h3>').concat(sel("nb", "Top bar style", [["glass", "Frosted glass"], ["solid", "Solid"], ["clear", "See-through"]])).concat(sel("look", "Site look", [["classic", "Classic"], ["frosted", "Frosted (moving glass over your red)"]])).concat(sel("fpage", "Film page style", [["py", "PY (full-screen, big title)"], ["lite", "Lite (full-screen, fast, no effects)"], ["classic", "Classic (small sheet)"]])).concat(ck("noarr", "Hide the row arrow buttons")).concat(ck("noanim", "Turn off animations")).concat(ck("ltg", "Let viewers switch between dark and light"), '\n<h3 style="margin-top:1rem">Animations</h3><p class="mut" style="margin:.2rem 0 .6rem">Choose each animation\'s speed and sound. Sound on the opening animation only plays after a viewer has tapped once (browser rule). Changes reach viewers on their next visit.</p>\n ').concat([["as", "Opening the website"], ["af", "Before a film"], ["at", "Before a trailer"]].map(([k, l]) => '<div class="panel" style="padding:.7rem;margin:.4rem 0"><b>'.concat(l, "</b>").concat(ckd(k + "On", "Play this animation", 1)).concat(sel(k + "Sp", "Speed", [["1", "Normal"], ["0.7", "Slower (0.7\xD7)"], ["1.5", "Faster (1.5\xD7)"], ["2", "Very fast (2\xD7)"]])).concat(ckd(k + "Sn", "Play sound", k !== "as"), "</div>")).join(""), '\n <h3 style="margin-top:1rem">Pause screen</h3><p class="mut" style="margin:.2rem 0 .6rem">What slides up from the bottom when a viewer pauses a film.</p>').concat(ckd("ppd", "Show film details and \u201CMore like this\u201D", 1)).concat(ckd("ppx", "Show the director's other films and the next episodes of a series (needs director, series name and episode number on the film)", 1), '\n <h3 style="margin-top:1rem">Advanced</h3><label>Custom CSS (applies to the viewer site; leave empty if unsure)<textarea name="ccss" rows="5" spellcheck="false" style="font-family:monospace">').concat(esc(d.ccss), '</textarea></label>\n <div class="acts"><button class="btn">Save look & feel</button></div>').concat(note(), "</form>");
  }
  function users() {
    return '<div class="panel"><h3>Admin emails</h3><p style="color:var(--mute);margin:0 0 .6rem">Anyone who signs in with one of these emails opens the admin panel.</p>'.concat(S.AE.map((a) => '<div style="display:flex;gap:.6rem;align-items:center;padding:.3rem 0">'.concat(esc(a.email)).concat(a.email.toLowerCase() == (S.me.email || "").toLowerCase() ? " (you)" : ' <button class="btn del" data-rmadm="'.concat(esc(a.email), '" style="padding:.25rem .6rem;font-size:.8rem">Remove</button>'), "</div>")).join(""), '<div class="acts"><input id="newadm" type="email" placeholder="email@example.com" aria-label="New admin email" style="max-width:280px"><button class="btn" id="addadm">Add admin</button></div></div><div class="panel scroll"><h3>Accounts (').concat(S.U.length, ")</h3><table><tr><th>Email</th><th>Role</th><th>Blocked</th><th>Last active</th><th>Titles watched</th><th>Device</th></tr>").concat(S.U.map((u) => {
      const me = u.id == S.me.id;
      return "<tr><td>".concat(esc(u.email)).concat(me ? " (you)" : "", '</td><td><select data-role="').concat(u.id, '" ').concat(me ? "disabled" : "", ' aria-label="Role"><option value="viewer" ').concat(u.role == "viewer" ? "selected" : "", '>Viewer</option><option value="admin" ').concat(u.role == "admin" ? "selected" : "", '>Admin</option></select></td><td><input type="checkbox" data-block="').concat(u.id, '" ').concat(u.blocked ? "checked" : "", " ").concat(me ? "disabled" : "", ' aria-label="Blocked"></td><td>').concat(u.last_seen ? new Date(u.last_seen).toLocaleDateString() : "\u2014", "</td><td>").concat(S.W[u.id] || 0, '</td><td><button class="btn ghost" data-rd="').concat(u.id, '">Reset</button></td></tr>');
    }).join(""), "</table>").concat(note(), "</div>");
  }
  const dur = (u) => new Promise((r) => {
    const v = document.createElement("video");
    v.preload = "metadata";
    v.onloadedmetadata = () => r(Math.round(v.duration) || null);
    v.onerror = () => r(null);
    v.src = u;
    setTimeout(() => r(null), 8e3);
  });
  async function upload(file, folder) {
    file = await shrinkImg(file, 2e3);
    const ext = (file.name.split(".").pop() || "bin").toLowerCase(), path = "".concat(folder, "/").concat(Date.now(), "-").concat(Math.random().toString(36).slice(2, 8), ".").concat(ext);
    const { error } = await sb.storage.from("films").upload(path, file, { cacheControl: "3600", contentType: file.type || "text/plain" });
    if (error) throw error;
    return sb.storage.from("films").getPublicUrl(path).data.publicUrl;
  }
  async function uploadPrivate(file) {
    const ext = (file.name.split(".").pop() || "mp4").toLowerCase().replace(/[^a-z0-9]/g, ""), path = "".concat(Date.now(), "-").concat(Math.random().toString(36).slice(2, 10), ".").concat(ext);
    const { error } = await sb.storage.from("videos").upload(path, file, { cacheControl: "3600", contentType: file.type || "text/plain" });
    if (error) throw error;
    return "storage:" + path;
  }
  async function done(m) {
    S.msg = m;
    await load();
  }
  function csvDown(name, rows2) {
    const q = (c) => '"'.concat(String(c == null ? "" : c).replace(/"/g, '""'), '"'), b = new Blob([rows2.map((r) => r.map(q).join(",")).join("\n")], { type: "text/csv" }), a = document.createElement("a");
    a.href = URL.createObjectURL(b);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
  const okP = () => (S.PUR || []).filter((p) => p.status === "success");
  function revDash(id) {
    const t = S.T.find((x) => x.id == id), m = document.createElement("div");
    m.className = "mod revm";
    m.setAttribute("role", "dialog");
    m.setAttribute("aria-modal", "true");
    const paint = () => {
      const f = m.querySelector("#rf") ? m.querySelector("#rf").value : "all", now = Date.now(), mo = /* @__PURE__ */ new Date();
      mo.setDate(1);
      mo.setHours(0, 0, 0, 0);
      const from = f == "7" ? now - 7 * 864e5 : f == "30" ? now - 30 * 864e5 : f == "m" ? mo.getTime() : 0, ps = okP().filter((p) => p.title_id == id && new Date(p.created_at).getTime() >= from), tot = ps.reduce((s, p) => s + Number(p.amount), 0), buyers = new Set(ps.map((p) => p.user_id)).size, act = okP().filter((p) => p.title_id == id && new Date(p.expires_at) > now), actU = new Set(act.map((p) => p.user_id)).size, by = {};
      ps.forEach((p) => {
        const k = p.option_label || p.days + " days";
        by[k] = by[k] || { n: 0, r: 0 };
        by[k].n++;
        by[k].r += Number(p.amount);
      });
      const vf = ((S.VS || {}).films || []).find((x) => x.title_id == id) || { logged: 0, unique: 0 }, vs = { u: vf.unique, re: Math.max(0, vf.logged - vf.unique), un: Math.max(0, (t.plays || 0) - vf.logged) }, top = ((S.VS || {}).top || []).filter((x) => x.title_id == id);
      m.innerHTML = '<div class="mbox"><div class="mbody"><h3>\u{1F4CA} '.concat(esc(t.title), '</h3><label>Period<select id="rf"><option value="all" ').concat(f == "all" ? "selected" : "", '>All time</option><option value="7" ').concat(f == "7" ? "selected" : "", '>Last 7 days</option><option value="30" ').concat(f == "30" ? "selected" : "", '>Last 30 days</option><option value="m" ').concat(f == "m" ? "selected" : "", '>This month</option></select></label>\n  <div class="revg"><div class="st"><b>').concat(gh2(tot), '</b>Revenue</div><div class="st"><b>').concat(ps.length, '</b>Payments</div><div class="st"><b>').concat(buyers, '</b>Paying viewers</div><div class="st"><b>').concat(actU, '</b>Active access now</div><div class="st"><b>').concat(t.plays || 0, '</b>Total views</div><div class="st"><b>').concat(vs.u, '</b>Unique viewers</div><div class="st"><b>').concat(vs.re, '</b>Rewatches</div></div>\n  <p style="color:var(--mute)">A view counts after 30 seconds of watching. Total views include rewatches; unique viewers count each account once.').concat(vs.un ? " " + vs.un + " earlier view" + (vs.un > 1 ? "s" : "") + " cannot be tied to an account, so they are in the total only." : "", "</p>\n  ").concat(top.length ? "<h4>Top rewatchers</h4><table><tr><th>Account</th><th>Views</th></tr>".concat(top.map((x) => "<tr><td>".concat(esc(x.email || "unknown"), "</td><td>").concat(x.n, "</td></tr>")).join(""), "</table>") : "", '\n  <p style="color:var(--mute)">Price: ').concat(esc(priceSum(id))).concat(Object.keys(by).length ? "" : " \xB7 No payments in this period yet.", "</p>\n  ").concat(Object.keys(by).length ? "<table><tr><th>Option</th><th>Sold</th><th>Revenue</th></tr>".concat(Object.keys(by).map((k) => "<tr><td>".concat(esc(k), "</td><td>").concat(by[k].n, "</td><td>").concat(gh2(by[k].r), "</td></tr>")).join(""), "</table>") : "", "\n  ").concat(ps.length ? '<div class="scroll"><table><tr><th>Viewer</th><th>Option</th><th>Paid</th><th>On</th><th>Access ends</th><th>Via</th></tr>'.concat(ps.slice(0, 100).map((p) => "<tr><td>".concat(esc(p.email || ""), "</td><td>").concat(esc(p.option_label || p.days + " days"), "</td><td>").concat(gh2(p.amount), "</td><td>").concat(esc(new Date(p.created_at).toLocaleDateString()), "</td><td>").concat(esc(new Date(p.expires_at).toLocaleDateString())).concat(new Date(p.expires_at) < now ? " (ended)" : "", "</td><td>").concat(esc(p.channel || "")).concat(p.auto_renew ? " \u21BB" : "", "</td></tr>")).join(""), "</table></div>") : "", '\n  <div class="acts"><button class="btn ghost" id="rcsv">Download CSV</button><button class="btn ghost" id="rx">Close</button></div></div></div>');
      m.querySelector("#rf").onchange = paint;
      m.querySelector("#rx").onclick = () => m.remove();
      m.querySelector("#rcsv").onclick = () => csvDown("revenue-" + t.title.replace(/\W+/g, "-") + ".csv", [["email", "option", "amount_ghs", "paid_on", "access_ends", "channel", "reference"]].concat(ps.map((p) => [p.email, p.option_label, p.amount, p.created_at, p.expires_at, p.channel, p.reference])));
    };
    m.onclick = (e) => {
      if (e.target === m) m.remove();
    };
    document.body.appendChild(m);
    paint();
  }
  const finOf = (id) => (S.FIN || {})[id] || { house_pct: 20 };
  const ownOf = (p) => p.owner_amount != null ? +p.owner_amount : +p.amount * (1 - +finOf(p.title_id).house_pct / 100);
  const houseOf = (p) => p.house_amount != null ? +p.house_amount : +p.amount - ownOf(p);
  const sentOf = (id) => (S.POUT || []).filter((x) => x.title_id == id && ["pending", "otp", "success"].indexOf(x.status) > -1).reduce((s, x) => s + +x.amount, 0);
  const earnedOf = (id) => okP().filter((p) => p.title_id == id).reduce((s, p) => s + ownOf(p), 0);
  const owedOf = (id) => Math.round((earnedOf(id) - sentOf(id)) * 100) / 100;
  const openOf = (id) => (S.POUT || []).some((x) => x.title_id == id && (x.status == "pending" || x.status == "otp"));
  const payeeOk = (id) => {
    const f = (S.FIN || {})[id];
    return !!(f && f.payee_name && f.payee_account && (f.payee_type == "bank" ? f.payee_bank_code : f.payee_network));
  };
  const stLabel = { pending: "Sending\u2026", otp: "Needs approval in Paystack", success: "Paid", failed: "Failed", reversed: "Reversed" };
  function confirmPayout(ids, after) {
    const items = ids.map((id) => ({ id, t: S.T.find((x) => x.id == id), f: (S.FIN || {})[id] || {}, amt: owedOf(id) })), ready = items.filter((x) => x.amt >= 1 && payeeOk(x.id) && !openOf(x.id)), skip = items.filter((x) => ready.indexOf(x) < 0), tot = ready.reduce((s, x) => s + x.amt, 0);
    const m = document.createElement("div");
    m.className = "mod revm";
    m.setAttribute("role", "dialog");
    m.setAttribute("aria-modal", "true");
    m.innerHTML = '<div class="mbox"><div class="mbody"><h3>Confirm payout</h3>'.concat(ready.length ? "<table><tr><th>Film</th><th>Pay to</th><th>Amount</th></tr>".concat(ready.map((x) => "<tr><td>".concat(esc(x.t ? x.t.title : ""), "</td><td>").concat(esc(x.f.payee_name), " (").concat(x.f.payee_type == "bank" ? "bank" : esc(x.f.payee_network), " \u2026").concat(esc(String(x.f.payee_account).slice(-4)), ")</td><td>").concat(gh2(x.amt), "</td></tr>")).join(""), "</table><p><b>Total: ").concat(gh2(tot), "</b> will be sent from your Paystack balance. Real money cannot be taken back once sent.</p>") : "<p>Nothing can be paid out right now.</p>").concat(skip.length ? '<p style="color:var(--mute)">Skipped: '.concat(skip.map((x) => esc(x.t ? x.t.title : "") + " (" + (openOf(x.id) ? "a payout is in progress" : !payeeOk(x.id) ? "payee details missing" : "under GH\u20B51 owed") + ")").join("; "), "</p>") : "", '<p id="pom" style="color:var(--mute)"></p><div class="acts">').concat(ready.length ? '<button class="btn" id="pgo">Send ' + gh2(tot) + " now</button>" : "", '<button class="btn ghost" id="pno">Cancel</button></div></div></div>');
    m.onclick = (e) => {
      if (e.target === m) m.remove();
    };
    document.body.appendChild(m);
    m.querySelector("#pno").onclick = () => m.remove();
    const go = m.querySelector("#pgo");
    if (go) go.onclick = async () => {
      go.disabled = true;
      const o = m.querySelector("#pom");
      o.textContent = "Sending\u2026 please wait, do not close this.";
      const d = await payfn({ action: "payout", confirm: true, title_ids: ready.map((x) => x.id) });
      if (d.error) {
        o.textContent = "Not sent: " + d.error;
        go.disabled = false;
        return;
      }
      m.remove();
      after((d.results || []).map((x) => (x.title || "Film") + ": " + (x.ok ? x.status == "otp" ? "sent, but Paystack needs your approval (see your Paystack dashboard)" : x.status == "success" ? "paid " + gh2(x.amount) : "on its way " + gh2(x.amount) : x.error)).join(" \xB7 "));
    };
  }
  function hsubHTML() {
    const l = (window.HSUB || []).filter((c) => c.status == "pending");
    if (!l.length) return "";
    return '<div class="panel" style="margin-bottom:.8rem"><h3 style="margin:0 0 .4rem">Films sent by production houses ('.concat(l.length, ')</h3><p style="color:var(--mute);font-size:.85rem;margin:0 0 .5rem">Check each film (watch the link, make sure they own the rights). Approve creates a draft film in the Films tab with the house attached. Finish the cast, price and details there, then publish.</p>').concat(l.map((c) => {
      const h = window.HS[c.house_id];
      return '<div style="padding:.6rem 0;border-top:1px solid var(--line,#8883)"><b>'.concat(esc(c.title), '</b> <span style="color:var(--mute)">').concat(esc([c.year, c.genre].filter(Boolean).join(" \xB7 ")), " \xB7 from ").concat(esc(h ? h.name : "(deleted house)"), "</span>").concat(c.description ? '<div style="font-size:.85rem;margin:.2rem 0">'.concat(esc(c.description), "</div>") : "", '<div style="font-size:.82rem"><a href="').concat(esc(c.video_link), '" target="_blank" rel="noopener noreferrer nofollow">Film link</a>').concat(c.trailer_link ? ' \xB7 <a href="'.concat(esc(c.trailer_link), '" target="_blank" rel="noopener noreferrer nofollow">Trailer</a>') : "").concat(c.poster_url ? ' \xB7 <a href="'.concat(esc(c.poster_url), '" target="_blank" rel="noopener">Poster</a>') : "", "</div>").concat(c.cast_note ? '<div style="font-size:.82rem;color:var(--mute);white-space:pre-wrap;margin:.2rem 0">Cast and crew: '.concat(esc(c.cast_note), "</div>") : "", '<div class="acts"><button class="btn" data-sa="').concat(c.id, '">Approve (make draft)</button> <button class="btn del" data-sr="').concat(c.id, '">Reject</button></div></div>');
    }).join(""), "</div>");
  }
  function hclaimsHTML() {
    const l = (window.HCLAIMS || []).filter((c) => c.status == "pending");
    if (!l.length) return "";
    return '<div class="panel" style="margin-bottom:.8rem"><h3 style="margin:0 0 .4rem">Production house claim requests ('.concat(l.length, ')</h3><p style="color:var(--mute);font-size:.85rem;margin:0 0 .5rem">Someone says \u201Cthis is our production house\u201D. Check them (email, website, a call) before you approve. Approving gives their account the Production house screen.</p>').concat(l.map((c) => {
      const h = window.HS[c.house_id];
      return '<div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap;padding:.4rem 0;border-top:1px solid var(--line,#8883)"><span style="flex:1"><b>'.concat(esc(h ? h.name : "(deleted)"), '</b><br><small style="color:var(--mute)">').concat(esc(c.email || ""), " \xB7 ").concat(esc(String(c.created_at || "").slice(0, 10)), '</small></span><button class="btn" data-hca="').concat(c.id, '">Approve</button> <button class="btn del" data-hcr="').concat(c.id, '">Reject</button></div>');
    }).join(""), "</div>");
  }
  function housesTab() {
    const all = Object.values(window.HS || {}).sort((a, b) => a.name.localeCompare(b.name)), e = S.hedit, nf = (id) => Object.keys(window.TH).filter((t) => window.TH[t].includes(+id)).length;
    const form = e ? '<div class="fov"><form id="hf" class="panel fwin"><div class="fhd"><h3>'.concat(e.id ? "Edit production house" : "Add production house", '</h3><button type="button" class="fclose" id="hcx" aria-label="Close">\xD7</button></div>\n <div style="display:flex;align-items:center;margin:.6rem 0"><div class="crp" style="width:90px;height:90px;border-radius:18px;margin-right:1rem;background-image:').concat(e.logo_url ? "url('".concat(esc(e.logo_url), "')") : "none", '">').concat(e.logo_url ? "" : "+", '<input type="file" name="logo" accept="image/*"></div><small style="color:var(--mute)">Tap the square to ').concat(e.logo_url ? "replace" : "add", ' the logo. It shows on every film this house worked on.</small></div>\n <label>Name<input name="name" required maxlength="120" value="').concat(esc(e.name), '"></label>\n <label>About (optional)<textarea name="about" rows="4" maxlength="1500">').concat(esc(e.about || ""), '</textarea></label>\n <label>Links, one per line (website, Instagram\u2026)<textarea name="links" rows="3" placeholder="https://">').concat(esc(linksOf(e).join("\n")), '</textarea></label>\n <label class="chk"><input type="checkbox" name="unlocked" ').concat(e.id && window.HPRIV[e.id] && window.HPRIV[e.id].unlocked ? "checked" : "", '> Allow this house to upload films now (skips the film count)</label><label>House login email (optional, used when the house claims its profile)<input name="lemail" type="email" value="').concat(esc(e.id && window.HPRIV[e.id] ? window.HPRIV[e.id].link_email || "" : ""), '"></label>\n <div class="acts"><button class="btn">Save</button><button type="button" class="btn ghost" id="hcx2">Cancel</button></div>').concat(note(), "</form></div>") : "";
    return form + hsubHTML() + hclaimsHTML() + '<div class="panel scroll"><div style="display:flex;gap:.6rem;align-items:center;flex-wrap:wrap;margin-bottom:.6rem"><h3 style="margin:0;flex:1">Production houses ('.concat(all.length, ')</h3><button class="btn" id="hadd">+ Add production house</button></div><p style="color:var(--mute);margin:.2rem 0 .6rem;font-size:.85rem">Companies that made or co-produced films. A film can have more than one. Tick them inside each film\'s form.</p>').concat(all.length ? "<table><tr><th></th><th>Name</th><th>Films</th><th></th></tr>".concat(all.map((h) => '<tr><td><span class="crp" style="width:38px;height:38px;margin:0;border-radius:8px;display:inline-flex;font-size:1rem;background-image:'.concat(h.logo_url ? "url('".concat(esc(h.logo_url), "')") : "none", '">').concat(h.logo_url ? "" : esc(h.name.charAt(0).toUpperCase()), "</span></td><td>").concat(esc(h.name)).concat(window.HPRIV[h.id] && window.HPRIV[h.id].user_id ? '<br><small style="color:var(--mute)">Account linked \u2713 '.concat(esc(window.HPRIV[h.id].user_email || ""), "</small>") : window.HPRIV[h.id] && window.HPRIV[h.id].link_email ? '<br><small style="color:var(--mute)">Invited: '.concat(esc(window.HPRIV[h.id].link_email), "</small>") : "", "</td><td>").concat(nf(h.id), '</td><td><button class="btn ghost" data-he="').concat(h.id, '">Edit</button> <button class="btn del" data-hd="').concat(h.id, '">Delete</button></td></tr>')).join(""), "</table>") : '<p class="empty">No production houses yet. Tap \u201C+ Add production house\u201D.</p>', "</div>");
  }
  function housesBind() {
    const go = () => shell();
    document.querySelectorAll("[data-sa]").forEach((b) => b.onclick = async () => {
      if (!confirm("Approve this film? A draft film is created. It is not public until you publish it.")) return;
      const r = await sb.rpc("approve_submission", { sid: +b.dataset.sa });
      done(r.error ? r.error.message : "Approved. A draft film was created: open the Films tab to finish and publish it.");
    });
    document.querySelectorAll("[data-sr]").forEach((b) => b.onclick = async () => {
      const n = prompt("Reason for the house (optional, they will see it):", "");
      if (n === null) return;
      const r = await sb.from("film_submissions").update({ status: "rejected", admin_note: (n || "").trim() || null }).eq("id", +b.dataset.sr);
      done(r.error ? r.error.message : "Rejected.");
    });
    document.querySelectorAll("[data-hca]").forEach((b) => b.onclick = async () => {
      if (!confirm("Approve this claim? This account becomes the owner of the production house.")) return;
      const r = await sb.rpc("approve_house_claim", { cid: +b.dataset.hca });
      done(r.error ? r.error.message : "Approved.");
    });
    document.querySelectorAll("[data-hcr]").forEach((b) => b.onclick = async () => {
      const r = await sb.from("house_claims").update({ status: "rejected" }).eq("id", +b.dataset.hcr);
      done(r.error ? r.error.message : "Rejected.");
    });
    const a = $("#hadd");
    if (a) a.onclick = () => {
      S.hedit = {};
      go();
    };
    document.querySelectorAll("[data-he]").forEach((b) => b.onclick = () => {
      S.hedit = Object.assign({}, window.HS[b.dataset.he]);
      go();
    });
    ["#hcx", "#hcx2"].forEach((i) => {
      const c = $(i);
      if (c) c.onclick = () => {
        S.hedit = null;
        go();
      };
    });
    const hf = $("#hf");
    if (hf) hf.onsubmit = async (ev) => {
      ev.preventDefault();
      const v = Object.fromEntries(new FormData(hf)), ok = hf.querySelector(".ok"), btn = hf.querySelector("button:not([type=button])");
      btn.disabled = true;
      try {
        const n = (v.name || "").trim();
        if (!n) throw new Error("Enter a name.");
        if (Object.values(window.HS).some((h) => h.id != S.hedit.id && h.name.trim().toLowerCase() == n.toLowerCase())) throw new Error("A production house with this name already exists.");
        const ls = (v.links || "").split(/\n+/).map((x) => x.trim()).filter(Boolean);
        if (ls.some((u) => !/^https?:\/\/[^\s]+$/i.test(u))) throw new Error("Each link must start with https://");
        let logo = S.hedit.logo_url || null;
        if (v.logo && v.logo.size) {
          ok.textContent = "Uploading logo\u2026";
          logo = await upload(v.logo, "houses");
        }
        const le = (v.lemail || "").trim().toLowerCase() || null, old = S.hedit.id && window.HPRIV[S.hedit.id] ? window.HPRIV[S.hedit.id].link_email : null, row = { name: n, logo_url: logo, about: (v.about || "").trim() || null, links: ls.length ? ls.slice(0, 5).map((u) => ({ u })) : null, link_email: le, unlocked: !!v.unlocked };
        if (S.hedit.id && (le || null) !== (old || null)) row.user_id = null;
        const r = S.hedit.id ? await sb.from("houses").update(row).eq("id", S.hedit.id) : await sb.from("houses").insert(row);
        if (r.error) throw new Error(r.error.message);
        S.hedit = null;
        done("Saved.");
      } catch (er) {
        ok.textContent = er.message || "Something went wrong.";
        btn.disabled = false;
      }
    };
    document.querySelectorAll("[data-hd]").forEach((b) => b.onclick = async () => {
      const h = window.HS[b.dataset.hd];
      if (!confirm("Delete \u201C".concat(h.name, "\u201D? It is removed from all its films. This cannot be undone."))) return;
      const r = await sb.from("houses").delete().eq("id", h.id);
      done(r.error ? r.error.message : "Deleted.");
    });
  }
  function profitTab() {
    const bud = S.BUD || {}, rows2 = S.T.map((t) => {
      const g = okP().filter((p) => p.title_id == t.id).reduce((a, p) => a + +p.amount, 0), b = bud[t.id] || 0;
      return { t, g, b, n: g - b };
    }), tg = rows2.reduce((a, r) => a + r.g, 0), tb = rows2.reduce((a, r) => a + r.b, 0);
    return '<div class="panel scroll"><h3 style="margin:0 0 .3rem">Film profit</h3><p style="color:var(--mute);font-size:.85rem;margin:.2rem 0 .8rem">Private to admins. Money made is the total paid by viewers for each film (before the house cut and payment fees). Enter each film\'s budget to see profit or loss.</p>\n <table><tr><th>Film</th><th>Budget (GH\u20B5)</th><th>Money made</th><th>Profit / loss</th><th>Budget recovered</th><th></th></tr>'.concat(rows2.map(({ t, g, b, n }) => "<tr><td>".concat(esc(t.title), '</td><td><input type="number" min="0" step="0.01" value="').concat(b || "", '" placeholder="0" data-bud="').concat(t.id, '" style="width:110px"></td><td>').concat(GH(g), '</td><td style="font-weight:700;color:').concat(!b ? "inherit" : n >= 0 ? "#2e9e5b" : "#d64545", '">').concat(b ? (n >= 0 ? "+" : "\u2212") + GH(Math.abs(n)) : "\u2013", "</td><td>").concat(b ? Math.round(g / b * 100) + "%" : "\u2013", "</td><td>").concat(b ? n >= 0 ? "In profit" : "Not recovered yet" : "No budget set", "</td></tr>")).join(""), "<tr><td><b>All films</b></td><td><b>").concat(GH(tb), "</b></td><td><b>").concat(GH(tg), "</b></td><td><b>").concat(tb ? (tg - tb >= 0 ? "+" : "\u2212") + GH(Math.abs(tg - tb)) : "\u2013", "</b></td><td>").concat(tb ? Math.round(tg / tb * 100) + "%" : "\u2013", '</td><td></td></tr></table><div class="acts"><button class="btn" id="budsave">Save budgets</button></div>').concat(note(), "</div>");
  }
  function houseTab() {
    const ok = okP(), now = /* @__PURE__ */ new Date(), mo = /* @__PURE__ */ new Date();
    mo.setDate(1);
    mo.setHours(0, 0, 0, 0);
    const hs = (a) => a.reduce((s, p) => s + houseOf(p), 0), all = hs(ok), mon = hs(ok.filter((p) => new Date(p.created_at) >= mo)), gross = ok.reduce((s, p) => s + +p.amount, 0), paid = (S.POUT || []).filter((x) => x.status == "success").reduce((s, x) => s + +x.amount, 0), owe = S.T.reduce((s, t) => s + Math.max(0, owedOf(t.id)), 0);
    const per = S.T.map((t) => {
      const ps = ok.filter((p) => p.title_id == t.id);
      return { t, g: ps.reduce((s, p) => s + +p.amount, 0), h: hs(ps), pct: finOf(t.id).house_pct };
    }).filter((x) => x.g > 0).sort((a, b) => b.h - a.h);
    const mm = {};
    ok.forEach((p) => {
      const k = String(p.created_at).slice(0, 7);
      mm[k] = (mm[k] || 0) + houseOf(p);
    });
    return '<div class="panel"><h3>House dashboard</h3><div class="revg"><div class="st"><b>'.concat(gh2(all), '</b>House earnings (all time)</div><div class="st"><b>').concat(gh2(mon), '</b>This month</div><div class="st"><b>').concat(gh2(gross), '</b>Total paid by viewers</div><div class="st"><b>').concat(gh2(paid), '</b>Paid out to owners</div><div class="st"><b>').concat(gh2(owe), '</b>Still owed to owners</div></div><p style="color:var(--mute)">House earnings are the house cut of every payment. Paystack\'s own fees are taken from your Paystack balance separately.</p><div class="acts"><button class="btn ghost" id="hcsv">Download CSV</button></div></div>\n <div class="panel scroll"><h3>By film</h3>').concat(per.length ? "<table><tr><th>Film</th><th>Viewers paid</th><th>House %</th><th>House earns</th></tr>".concat(per.map((x) => "<tr><td>".concat(esc(x.t.title), "</td><td>").concat(gh2(x.g), "</td><td>").concat(x.pct, "%</td><td>").concat(gh2(x.h), "</td></tr>")).join(""), "</table>") : "<p>No payments yet.</p>", '</div>\n <div class="panel scroll"><h3>By month</h3>').concat(Object.keys(mm).length ? "<table><tr><th>Month</th><th>House earns</th></tr>".concat(Object.keys(mm).sort().reverse().map((k) => "<tr><td>".concat(esc(k), "</td><td>").concat(gh2(mm[k]), "</td></tr>")).join(""), "</table>") : "<p>No payments yet.</p>", "</div>");
  }
  function payTab() {
    const ok = okP(), now = Date.now(), mo = /* @__PURE__ */ new Date();
    mo.setDate(1);
    mo.setHours(0, 0, 0, 0);
    const tot = ok.reduce((s, p) => s + Number(p.amount), 0), mtot = ok.filter((p) => new Date(p.created_at) >= mo).reduce((s, p) => s + Number(p.amount), 0), act = new Set(ok.filter((p) => new Date(p.expires_at) > now).map((p) => p.user_id)).size;
    const per = S.T.map((t) => {
      const ps = ok.filter((p) => p.title_id == t.id);
      return { t, n: ps.length, r: ps.reduce((s, p) => s + Number(p.amount), 0) };
    }).sort((a, b) => b.r - a.r);
    return '<div class="panel"><h3>Payments</h3><div class="revg"><div class="st"><b>'.concat(gh2(tot), '</b>Total revenue</div><div class="st"><b>').concat(gh2(mtot), '</b>This month</div><div class="st"><b>').concat(ok.length, '</b>Payments</div><div class="st"><b>').concat(act, '</b>Viewers with active access</div></div>\n <div class="acts"><button class="btn" id="pping">Check Paystack connection</button><button class="btn ghost" data-pexp="1">Download all payments (CSV)</button></div><p id="pout" style="color:var(--mute)">').concat(S.FF ? "" : "The video protection step has not been run yet (run 1_pay_setup.sql). ", "Set the price of each film in Films \u2192 Edit.</p></div>\n ").concat(donPanel(), '\n <div class="panel scroll"><h3>Revenue by film</h3><table><tr><th>Film</th><th>Price</th><th>Plays</th><th>Payments</th><th>Revenue</th><th>Owner owed</th><th></th></tr>').concat(per.map((x) => "<tr><td>".concat(esc(x.t.title), "</td><td>").concat(esc(priceSum(x.t.id)), "</td><td>").concat(x.t.plays || 0, "</td><td>").concat(x.n, "</td><td>").concat(gh2(x.r), "</td><td>").concat(gh2(Math.max(0, owedOf(x.t.id))), '</td><td><button class="btn ghost" data-rev="').concat(x.t.id, '">\u{1F4CA}</button> <button class="btn" data-pay="').concat(x.t.id, '" ').concat(owedOf(x.t.id) >= 1 && payeeOk(x.t.id) && !openOf(x.t.id) ? "" : "disabled", ' title="').concat(payeeOk(x.t.id) ? "" : "Add payee details in Films \u2192 Edit", '">Payout</button></td></tr>')).join(""), '</table><div class="acts" style="margin-top:.6rem"><button class="btn" id="payall">Pay out all films</button><button class="btn ghost" id="pbal">Check Paystack balance</button></div><p id="pbo" style="color:var(--mute)">Payouts go from your Paystack balance to the payee saved on each film. You will be asked to confirm before any money is sent.</p></div>\n <div class="panel scroll"><h3>Payout history</h3>').concat((S.POUT || []).length ? "<table><tr><th>When</th><th>Film</th><th>To</th><th>Amount</th><th>Status</th></tr>".concat(S.POUT.slice(0, 30).map((x) => "<tr><td>".concat(esc(new Date(x.created_at).toLocaleString()), "</td><td>").concat(esc(x.title_name || ""), "</td><td>").concat(esc(x.payee_name || ""), " ").concat(esc(x.payee_hint || ""), "</td><td>").concat(gh2(x.amount), "</td><td>").concat(esc(stLabel[x.status] || x.status)).concat(x.failure ? " \xB7 " + esc(x.failure) : "", "</td></tr>")).join(""), "</table>") : "<p>No payouts yet.</p>", '</div>\n <div class="panel scroll"><h3>Latest payments</h3>').concat(ok.length ? "<table><tr><th>When</th><th>Viewer</th><th>Film</th><th>Option</th><th>Paid</th></tr>".concat(ok.slice(0, 20).map((p) => "<tr><td>".concat(esc(new Date(p.created_at).toLocaleString()), "</td><td>").concat(esc(p.email || ""), "</td><td>").concat(esc((S.T.find((t) => t.id == p.title_id) || {}).title || ""), "</td><td>").concat(esc(p.option_label || p.days + " days"), "</td><td>").concat(gh2(p.amount), "</td></tr>")).join(""), "</table>") : "<p>No payments yet.</p>", "</div>");
  }
  function bindPay() {
    document.querySelectorAll("[data-pay]").forEach((b) => b.onclick = () => confirmPayout([+b.dataset.pay], (m) => done(m)));
    const pa = $("#payall");
    if (pa) pa.onclick = () => confirmPayout(S.T.map((t) => t.id), (m) => done(m));
    const pb = $("#pbal");
    if (pb) pb.onclick = async () => {
      const o = $("#pbo");
      o.textContent = "Checking\u2026";
      const d = await payfn({ action: "balance" });
      o.textContent = d.error ? "Could not read the balance: " + d.error : "Paystack balance available: " + gh2(d.balance);
    };
    const hc = $("#hcsv");
    if (hc) hc.onclick = () => csvDown("house-earnings.csv", [["when", "film", "viewer_paid_ghs", "house_pct", "house_ghs", "owner_ghs", "reference"]].concat(okP().map((p) => [p.created_at, (S.T.find((t) => t.id == p.title_id) || {}).title, p.amount, p.house_pct != null ? p.house_pct : finOf(p.title_id).house_pct, houseOf(p).toFixed(2), ownOf(p).toFixed(2), p.reference])));
    document.querySelectorAll("[data-rev]").forEach((b) => b.onclick = () => revDash(+b.dataset.rev));
    const pp = $("#pping");
    if (pp) pp.onclick = async () => {
      const o = $("#pout");
      o.textContent = "Checking\u2026";
      const d = await payfn({ action: "ping" });
      o.textContent = d.error ? "Not working yet: " + d.error : d.key === "missing" ? "The function is running but PAYSTACK_SECRET_KEY is not set in Supabase secrets." : "Connected. Paystack " + d.key.toUpperCase() + " key found. Automatic renewals: " + (d.cron ? "switched on" : "CRON_KEY not set (renewals off)") + ".";
    };
    const px = document.querySelector("[data-pexp]");
    if (px) px.onclick = () => csvDown("payments.csv", [["when", "email", "film", "option", "amount_ghs", "channel", "starts", "ends", "reference"]].concat(okP().map((p) => [p.created_at, p.email, (S.T.find((t) => t.id == p.title_id) || {}).title, p.option_label, p.amount, p.channel, p.started_at, p.expires_at, p.reference])));
  }
  function bind() {
    bindPay();
    housesBind();
    {
      const bs = $("#budsave");
      if (bs) bs.onclick = async () => {
        bs.disabled = true;
        const rowsx = [...document.querySelectorAll("[data-bud]")].map((i) => ({ title_id: +i.dataset.bud, budget: Math.max(0, parseFloat(i.value) || 0), updated_at: (/* @__PURE__ */ new Date()).toISOString() })), r = await sb.from("film_budget").upsert(rowsx, { onConflict: "title_id" });
        done(r.error ? r.error.message : "Budgets saved.");
      };
    }
    const pcb = $("#pcheck");
    if (pcb) pcb.onclick = runPicCheck;
    const f = $("#f");
    if (f) f.onsubmit = async (e) => {
      e.preventDefault();
      const btn = f.querySelector("button:not([type=button])"), ok = $(".ok"), v = Object.fromEntries(new FormData(f));
      btn.disabled = true;
      let r;
      try {
        let video = (v.video_url || "").trim(), poster = (v.poster_url || "").trim();
        if (v.source === "upload") {
          if (!v.video_file || !v.video_file.size) throw new Error("Choose a video file to upload.");
          ok.textContent = "Uploading the video. Keep this page open\u2026";
          video = await uploadPrivate(v.video_file);
        } else if (/drive\.google\.com\/drive\/folders/.test(video)) throw new Error("That is a folder link. Open the film file itself, click Share and copy that link.");
        const imgs = {};
        for (const [k, l, , , un, fn] of SLOTS) {
          let u = dimg(v[un] || "");
          const fl = v[fn];
          if (fl && fl.size) {
            ok.textContent = "Uploading " + l.toLowerCase() + "\u2026";
            u = await upload(fl, "posters");
          }
          imgs[k] = u || null;
        }
        poster = imgs.poster || "";
        const focus = {};
        SLOTS.forEach(([k]) => focus[k] = (v["fx_" + k] || "50 50").split(" ").map(Number));
        let subs = (v.subtitles_url || "").trim();
        if (v.subtitles_file && v.subtitles_file.size) {
          ok.textContent = "Uploading subtitles\u2026";
          subs = await upload(v.subtitles_file, "subs");
        }
        let trailer = (v.trailer_url || "").trim();
        if (v.trailer_file && v.trailer_file.size) {
          ok.textContent = "Uploading the trailer\u2026";
          trailer = await upload(v.trailer_file, "trailers");
        }
        let rt = S.edit && S.edit.video_url === video ? S.edit.runtime : null;
        if (v.source === "upload" && v.video_file && v.video_file.size) rt = await dur(URL.createObjectURL(v.video_file));
        else if (/\.(mp4|webm|mov|m4v)(\?|$)/i.test(video)) rt = await dur(video);
        const cr = await crewCollect(f);
        const dp = cr.find((x) => /^director$/i.test(x.r || ""));
        const row = { donate_on: !!v.donate_on, in_production: !!v.in_production, fund_goal: v.fund_goal ? +v.fund_goal : null, ep_slots: Math.max(0, Math.min(100, +v.ep_slots || 0)), ep_price: v.ep_price ? +v.ep_price : null, trailer_url: trailer || null, allow_rate: !!v.allow_rate, allow_comment: !!v.allow_comment, runtime: rt, title: v.title.trim(), year: v.year ? +v.year : null, genre: v.genre || null, director: dp && window.PPL[dp.pid] ? window.PPL[dp.pid].name : null, series_name: (v.series_name || "").trim() || null, episode_no: v.episode_no ? +v.episode_no : null, subtitles_url: subs || null, credits: cr, description: v.description || null, synopsis: (v.synopsis || "").trim() || null, behind: (v.behind || "").trim() || null, poster_url: poster || null, video_url: S.FF ? null : video || null, row_id: v.row_id ? +v.row_id : null, featured: !!v.featured, status: v.status || "published", banner_pc: imgs.pc, banner_phone: imgs.phone, header_img: imgs.head, focus, publish_at: v.publish_at ? (/* @__PURE__ */ new Date(v.publish_at + ":00Z")).toISOString() : null };
        let tid;
        if (S.edit) {
          r = await sb.from("titles").update(row).eq("id", S.edit.id);
          tid = S.edit.id;
        } else {
          r = await sb.from("titles").insert(row).select("id").single();
          tid = r.data && r.data.id;
        }
        if (!r.error && tid) {
          {
            const hq = await saveHouses(tid, v);
            if (hq) r = { error: { message: hq } };
          }
          if (S.FF) {
            const q = await sb.from("film_files").upsert({ title_id: tid, video_url: video || null }, { onConflict: "title_id" });
            if (q.error) r = q;
          }
          const q2 = await savePO(tid);
          if (q2) r = { error: { message: q2 } };
          else if (S.FINOK) {
            const old = S.FIN[tid] || {}, pct = Math.min(100, Math.max(0, parseFloat(v.fin_pct)));
            const nf = { title_id: tid, house_pct: isNaN(pct) ? 20 : pct, payee_name: (v.fin_name || "").trim() || null, payee_type: v.fin_type || "mobile_money", payee_network: v.fin_net || null, payee_account: (v.fin_acct || "").replace(/\s+/g, "") || null, payee_bank_code: (v.fin_bank || "").trim() || null, updated_at: (/* @__PURE__ */ new Date()).toISOString() };
            if (old.payee_account !== nf.payee_account || old.payee_type !== nf.payee_type || old.payee_network !== nf.payee_network || old.payee_bank_code !== nf.payee_bank_code || old.payee_name !== nf.payee_name) nf.recipient_code = null;
            const q3 = await sb.from("film_finance").upsert(nf, { onConflict: "title_id" });
            if (q3.error) r = q3;
          }
        }
      } catch (err) {
        ok.textContent = err.message || "Something went wrong.";
        btn.disabled = false;
        return;
      }
      S.edit = null;
      S.fopen = false;
      done(r.error ? r.error.message : "Saved.");
    };
    if (f) {
      let mode = "pc";
      const pv = () => {
        const g = (n) => f.elements[n].value, pc = mode == "pc", si = slotImg(f, pc ? "pc" : "phone"), img = si.src;
        $("#pv").innerHTML = '<div style="margin:.6rem auto;width:'.concat(pc ? "100%" : "230px", ";max-width:100%;aspect-ratio:").concat(pc ? "16/9" : "4/5", ";border-radius:10px;color:#fff;padding:1rem;display:flex;flex-direction:column;justify-content:flex-end;background:linear-gradient(100deg,#0a0809 5%,transparent 90%),").concat(img ? "url('".concat(esc(img), "') ").concat(si.pos, "/cover,") : "", 'linear-gradient(100deg,#0e0b0c,#9b2c4b)"><b style="font-size:').concat(pc ? "1.8rem" : "1.2rem", '">').concat(esc(g("title") || "Film title"), '</b><span style="font-size:.85rem;max-height:3.6em;overflow:hidden">').concat(esc(g("description")), '</span><span><i style="background:#fff;color:#141012;border-radius:6px;padding:.3rem .8rem;font-style:normal;font-weight:600;display:inline-block;margin-top:.5rem">Play</i></span></div>');
      };
      f.addEventListener("input", pv);
      initSlots(f, pv);
      f.querySelectorAll("[data-pv]").forEach((b) => b.onclick = () => {
        mode = b.dataset.pv;
        pv();
      });
      pv();
    }
    if (f) f.querySelectorAll("[name=source]").forEach((r) => r.onchange = () => {
      const up = f.elements.source.value === "upload";
      $("#vl").style.display = up ? "none" : "";
      $("#vf").style.display = up ? "" : "none";
    });
    if (f) {
      const pa = $("#poadd");
      if (pa) pa.onclick = () => $("#po").insertAdjacentHTML("beforeend", porow({ days: 30 }));
      const pw = $("#po");
      if (pw) pw.onclick = (e) => {
        const b = e.target.closest(".pox");
        if (b) b.parentNode.remove();
      };
    }
    const shut = () => {
      S.edit = null;
      S.fopen = false;
      shell();
    };
    ["#cancel", "#cancel2"].forEach((i) => {
      const c = $(i);
      if (c) c.onclick = shut;
    });
    const fa = $("#fadd");
    if (fa) fa.onclick = () => {
      S.edit = null;
      S.fopen = true;
      shell();
      scrollTo(0, 0);
    };
    const fq = $("#fq");
    if (fq) {
      fq.value = S.fq || "";
      const ft = () => {
        S.fq = fq.value;
        const q = fq.value.trim().toLowerCase();
        document.querySelectorAll("#ft tr[data-q]").forEach((r) => r.style.display = !q || r.dataset.q.includes(q) ? "" : "none");
      };
      fq.oninput = ft;
      ft();
    }
    if (f) crewBind(f);
    peopleBind();
    document.querySelectorAll("[data-edit]").forEach((b) => b.onclick = () => {
      S.edit = S.T.find((t) => t.id == b.dataset.edit);
      S.fopen = true;
      shell();
      scrollTo(0, 0);
    });
    document.querySelectorAll("[data-del]").forEach((b) => b.onclick = async () => {
      if (confirm("Delete this film? This cannot be undone.")) {
        const t = S.T.find((x) => x.id == b.dataset.del), paths = [t == null ? void 0 : t.video_url, t == null ? void 0 : t.poster_url].map((u) => (u || "").split("/object/public/films/")[1]).filter(Boolean).map(decodeURIComponent);
        if (paths.length) await sb.storage.from("films").remove(paths);
        if (t && /^storage:/.test(t.video_url || "")) await sb.storage.from("videos").remove([t.video_url.slice(8)]);
        await sb.from("titles").delete().eq("id", b.dataset.del);
        done("Film deleted.");
      }
    });
    const a = $("#addrow");
    if (a) a.onclick = async () => {
      const n = $("#newrow").value.trim();
      if (!n) return;
      await sb.from("rows").insert({ name: n, position: S.R.length + 1 });
      done("Row added.");
    };
    document.querySelectorAll("[data-saverow]").forEach((b) => b.onclick = async () => {
      const id = b.dataset.saverow;
      await sb.from("rows").update({ name: $('[data-rn="'.concat(id, '"]')).value.trim(), position: +$('[data-rp="'.concat(id, '"]')).value }).eq("id", id);
      done("Row saved.");
    });
    document.querySelectorAll("[data-delrow]").forEach((b) => b.onclick = async () => {
      if (confirm("Delete this row? Its films stay and move to More to watch.")) {
        await sb.from("rows").delete().eq("id", b.dataset.delrow);
        done("Row deleted.");
      }
    });
    const lf = $("#lf");
    if (lf) {
      initLook(lf);
      lf.onsubmit = async (e) => {
        e.preventDefault();
        const v = Object.fromEntries(new FormData(lf)), ok = $(".ok");
        try {
          for (const k of ["logo", "bgImage", "icon", "heroImg"]) {
            const f2 = v[k + "_file"];
            delete v[k + "_file"];
            if (f2 && f2.size) {
              ok.textContent = "Uploading\u2026";
              v[k] = await upload(f2, "brand");
            }
            if (v["rm_" + k]) v[k] = "";
            delete v["rm_" + k];
          }
        } catch (err) {
          ok.textContent = err.message || "Upload failed.";
          return;
        }
        ["ht", "hb", "hbt", "qb", "qt", "cb", "ct"].forEach((k) => {
          v[k] = /^#[0-9a-f]{6}$/i.test((v[k] || "").trim()) ? v[k].trim() : "";
        });
        v.noarr = !!v.noarr;
        v.noanim = !!v.noanim;
        v.ltg = !!v.ltg;
        v.nostudio = !!v.nostudio;
        v.nohb = !!v.nohb;
        ["asOn", "afOn", "atOn", "asSn", "afSn", "atSn", "ppd", "ppx"].forEach((k) => v[k] = !!v[k]);
        const r = await sb.from("settings").update({ data: __spreadValues(__spreadValues({}, S.set), v) }).eq("id", 1);
        if (!r.error) {
          S.set = __spreadValues(__spreadValues({}, S.set), v);
          applyAnim(S.set);
        }
        done(r.error ? r.error.message : "Saved. Open the site in a new tab to see the opening animation; films and trailers use it straight away.");
      };
    }
    document.querySelectorAll("[data-role]").forEach((s) => s.onchange = async () => {
      await sb.from("profiles").update({ role: s.value }).eq("id", s.dataset.role);
      done("Role updated.");
    });
    document.querySelectorAll("[data-block]").forEach((s) => s.onchange = async () => {
      await sb.from("profiles").update({ blocked: s.checked }).eq("id", s.dataset.block);
      done(s.checked ? "Account blocked." : "Account unblocked.");
    });
    const aa = $("#addadm");
    if (aa) aa.onclick = async () => {
      const em = $("#newadm").value.trim().toLowerCase();
      if (!em) return;
      const r = await sb.from("admin_emails").insert({ email: em });
      done(r.error ? r.error.message : "Admin added.");
    };
    document.querySelectorAll("[data-rmadm]").forEach((b) => b.onclick = async () => {
      if (confirm("Remove admin access for " + b.dataset.rmadm + "?")) {
        await sb.from("admin_emails").delete().eq("email", b.dataset.rmadm);
        done("Admin removed.");
      }
    });
    const sv = (f2, fn, m) => {
      const x = $(f2);
      if (x) x.onsubmit = async (e) => {
        e.preventDefault();
        const v = new FormData(x), r = await sb.from("settings").update({ data: __spreadValues(__spreadValues({}, S.set), fn(v)) }).eq("id", 1);
        done(r.error ? r.error.message : m);
      };
    };
    sv("#sf", (v) => ({ ph: !!v.get("ph"), maint: !!v.get("maint"), maxp: Math.min(10, Math.max(1, +v.get("maxp") || 5)), noRate: !!v.get("norate"), noCr: !!v.get("nocr"), noLb: !!v.get("nolb"), noCom: !!v.get("nocom"), donate: !!v.get("donate"), donMin: Math.min(1e3, Math.max(1, +v.get("donmin") || 5)), verFilms: Math.min(100, Math.max(1, +v.get("verfilms") || 5)), verHouses: Math.min(100, Math.max(1, +v.get("verhouses") || 5)), houseMin: Math.min(100, Math.max(1, +v.get("housemin") || 3)), em_purchase: !!v.get("em_purchase"), em_verified: !!v.get("em_verified"), em_credit: !!v.get("em_credit"), em_profile: !!v.get("em_profile") }), "Saved.");
    {
      const el = $("#elog");
      if (el) sb.from("email_queue").select("kind,to_email,status,error,created_at").order("id", { ascending: false }).limit(12).then((r) => {
        const l = r.data || [];
        const K = { purchase: "Receipt", donation: "Donation thanks", verified: "Verified", credit: "Added to film", profile: "Profile updated" };
        el.innerHTML = "<h3>Recent emails</h3>".concat(l.length ? '<table class="tb" style="width:100%;font-size:.85rem"><tr><th align="left">When</th><th align="left">Email</th><th align="left">To</th><th align="left">Status</th></tr>'.concat(l.map((x) => "<tr><td>".concat(esc(new Date(x.created_at).toLocaleString()), "</td><td>").concat(esc(K[x.kind] || x.kind), "</td><td>").concat(esc(x.to_email), '</td><td title="').concat(esc(x.error || ""), '">').concat(x.status == "sent" ? "\u2713 sent" : x.status == "failed" ? "\u2717 failed: " + esc((x.error || "").slice(0, 60)) : x.status == "skipped" ? "skipped (switched off)" : "waiting", "</td></tr>")).join(""), "</table>") : '<p style="color:var(--mute)">No emails yet. They appear here when members buy films, get verified, are added to films or save their profile.</p>');
      });
    }
    sv("#af", (v) => ({ announce: v.get("announce") || "", announceOn: !!v.get("on") }), "Saved.");
    document.querySelectorAll("[data-exp]").forEach((b) => b.onclick = () => {
      const k = b.dataset.exp, rows2 = k == "films" ? S.T.map((t) => [t.title, t.year, t.genre, t.status, t.video_url]) : S.U.map((u) => [u.email, u.role, u.blocked, u.created_at]), head = k == "films" ? ["title", "year", "genre", "status", "video"] : ["email", "role", "blocked", "joined"], q = (c) => '"'.concat(String(c != null ? c : "").replace(/"/g, '""'), '"'), a2 = document.createElement("a");
      a2.href = URL.createObjectURL(new Blob([[head, ...rows2].map((r) => r.map(q).join(",")).join("\n")], { type: "text/csv" }));
      a2.download = k + ".csv";
      a2.click();
    });
  }
  document.addEventListener("change", async (e) => {
    const c = e.target.closest("[data-ra]");
    if (!c) return;
    await sb.from("rows").update({ active: c.checked }).eq("id", c.dataset.ra);
    done(c.checked ? "Row is visible again." : "Row hidden from viewers.");
  });
  function start() {
    document.body.classList.remove("dk");
    S.me = ROOT.user;
    S.tab = window.ATMAX_TAB || "home";
    S.edit = null;
    S.msg = "";
    load();
  }
  return { start };
})();
