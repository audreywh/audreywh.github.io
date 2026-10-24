/*
  Home-page Bloch sphere: a qubit precessing about z, with a live state panel.
  Click (or press Enter/Space on) the sphere to apply a π/2 pulse about x.
*/
(function () {
  const stage = document.getElementById("bloch");
  if (!stage) return;
  const ACC = getComputedStyle(document.documentElement).getPropertyValue("--acc").trim() || "#C0412F";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  stage.innerHTML = `
    <div class="split">
      <div><div class="float"><canvas tabindex="0" role="button" aria-label="Bloch sphere. Activate to apply a pi over 2 pulse."></canvas></div><div class="shadow"></div></div>
      <div class="panel" aria-hidden="true">
        <section><h2>State vector</h2>
          <div class="ketsym">|ψ⟩ <span class="s">=</span> α|0⟩ <span class="s">+</span> β|1⟩</div>
          <div class="ketnum" data-k="kn"></div></section>
        <section><h2>Probabilities</h2>
          <div class="bar"><span>P(0)</span><span class="tr"><i data-k="p0"></i></span><span class="v" data-k="p0v"></span></div>
          <div class="bar"><span>P(1)</span><span class="tr"><i data-k="p1" style="background:${ACC}"></i></span><span class="v" data-k="p1v"></span></div></section>
        <section><h2>Bloch vector</h2>
          ${["X", "Y", "Z"].map(a => `<div class="bar"><span>⟨${a}⟩</span><span class="tr c"><i data-k="e${a}"></i></span><span class="v" data-k="e${a}v"></span></div>`).join("")}</section>
        <section class="phase">
          <svg width="40" height="40" viewBox="-21 -21 42 42" aria-hidden="true"><circle r="18" fill="none" stroke="#e1ddd5"/><line x1="-18" y1="0" x2="18" y2="0" stroke="#efebe5"/><line data-k="dial" x1="0" y1="0" x2="16" y2="0" stroke="${ACC}" stroke-width="2" stroke-linecap="round"/><circle r="2" fill="#141414"/></svg>
          <div><h2>Phase φ</h2><div data-k="ph"></div></div></section>
      </div>
    </div>
    <div class="cap">click the sphere to apply a <b>π/2</b> pulse</div>`;

  const cv = stage.querySelector("canvas"), c = cv.getContext("2d");
  const el = k => stage.querySelector(`[data-k="${k}"]`);

  // Size the canvas for crisp lines on high-DPI screens.
  let Wd = 0;
  const fit = () => { const dpr = Math.min(window.devicePixelRatio || 1, 2); Wd = Math.round(cv.clientWidth * dpr); cv.width = cv.height = Wd; };
  fit(); addEventListener("resize", fit);

  // Rotation of point p about unit axis k by angle a (Rodrigues).
  const rot = (p, k, a) => {
    const [x, y, z] = p, [u, w, s] = k, cs = Math.cos(a), sn = Math.sin(a), d = u * x + w * y + s * z;
    return [x * cs + (w * z - s * y) * sn + u * d * (1 - cs), y * cs + (s * x - u * z) * sn + w * d * (1 - cs), z * cs + (u * y - w * x) * sn + s * d * (1 - cs)];
  };

  function draw(v, trail) {
    const cx = Wd / 2, cy = Wd / 2, R = Wd * 0.34, yaw = -0.62, p = 0.32, S = Wd / 560, T = 2 * Math.PI;
    const P = ([x, y, z]) => {
      const x1 = x * Math.cos(yaw) - y * Math.sin(yaw), y1 = x * Math.sin(yaw) + y * Math.cos(yaw);
      return [cx + R * x1, cy - R * (y1 * Math.sin(p) + z * Math.cos(p)), z * Math.sin(p) - y1 * Math.cos(p)];
    };
    const path = (f, n, col, w) => {
      let pr = null; c.lineWidth = w;
      for (let i = 0; i <= n; i++) {
        const q = P(f(i / n));
        if (pr) { c.globalAlpha = (q[2] + pr[2]) < 0 ? 0.4 : 1; c.strokeStyle = col; c.beginPath(); c.moveTo(pr[0], pr[1]); c.lineTo(q[0], q[1]); c.stroke(); }
        pr = q;
      }
      c.globalAlpha = 1;
    };
    const label = (t, q, dy = 0) => { c.fillStyle = "#9a968f"; c.font = `${26 * S}px 'IBM Plex Mono', monospace`; c.textAlign = "center"; c.fillText(t, q[0], q[1] + dy * S); };

    c.clearRect(0, 0, Wd, Wd);
    c.lineWidth = 2 * S; c.strokeStyle = "#dcd9d3"; c.beginPath(); c.arc(cx, cy, R, 0, T); c.stroke();
    path(t => [Math.cos(t * T), Math.sin(t * T), 0], 96, "#dedad3", 1.6 * S);
    path(t => [Math.cos(t * T), 0, Math.sin(t * T)], 96, "#ebe8e3", 1.4 * S);
    path(t => [0, Math.cos(t * T), Math.sin(t * T)], 96, "#ebe8e3", 1.4 * S);
    path(t => [0, 0, 1 - 2 * t], 2, "#e2dfd9", 1.4 * S);
    label("|0⟩", P([0, 0, 1.16])); label("|1⟩", P([0, 0, -1.16]), 26);
    if (trail.length > 1) {
      c.strokeStyle = "rgba(192,65,47,.2)"; c.lineWidth = 3 * S; c.beginPath();
      trail.forEach((q, i) => { const s = P(q); i ? c.lineTo(s[0], s[1]) : c.moveTo(s[0], s[1]); }); c.stroke();
    }
    const o = P([0, 0, 0]), e = P(v);
    c.strokeStyle = ACC; c.lineWidth = 5 * S; c.lineCap = "round"; c.beginPath(); c.moveTo(o[0], o[1]); c.lineTo(e[0], e[1]); c.stroke();
    c.fillStyle = ACC; c.beginPath(); c.arc(e[0], e[1], 10 * S, 0, T); c.fill();
    c.fillStyle = "#fff"; c.beginPath(); c.arc(e[0], e[1], 4 * S, 0, T); c.fill();
    c.fillStyle = "#141414"; c.beginPath(); c.arc(o[0], o[1], 3 * S, 0, T); c.fill();
  }

  function readout(v) {
    const th = Math.acos(Math.max(-1, Math.min(1, v[2])));
    let ph = Math.atan2(v[1], v[0]); if (ph < 0) ph += 2 * Math.PI;
    const a = Math.cos(th / 2), b = Math.sin(th / 2), p0 = a * a, p1 = b * b;
    el("kn").innerHTML = `<span class="s">=</span> ${a.toFixed(3)}|0⟩ <span class="s">+</span> e<sup>i·${(ph / Math.PI).toFixed(2)}π</sup>${b.toFixed(3)}|1⟩`;
    el("p0").style.width = p0 * 100 + "%"; el("p1").style.width = p1 * 100 + "%";
    el("p0v").textContent = p0.toFixed(2); el("p1v").textContent = p1.toFixed(2);
    ["X", "Y", "Z"].forEach((k, i) => {
      const x = v[i], bar = el("e" + k);
      bar.style.left = (x < 0 ? 50 + x * 50 : 50) + "%"; bar.style.width = Math.abs(x) * 50 + "%";
      bar.style.background = i < 2 ? ACC : "#141414";
      el("e" + k + "v").textContent = (x >= 0 ? "+" : "−") + Math.abs(x).toFixed(2);
    });
    el("ph").textContent = (ph * 180 / Math.PI).toFixed(1) + "°";
  }

  let v = [Math.sin(0.95), 0, Math.cos(0.95)], pulse = 0, frame = 0;
  const trail = [];
  const kick = () => { pulse += 40; };
  cv.addEventListener("click", kick);
  cv.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); kick(); } });

  (function loop() {
    if (pulse > 0) { pulse--; v = rot(v, [1, 0, 0], Math.PI / 80); }
    else if (!reduce) v = rot(v, [0, 0, 1], 0.012);
    trail.push(v.slice()); if (trail.length > 130) trail.shift();
    draw(v, trail);
    const ph = Math.atan2(v[1], v[0]), d = el("dial");
    d.setAttribute("x2", (16 * Math.cos(ph)).toFixed(2)); d.setAttribute("y2", (-16 * Math.sin(ph)).toFixed(2));
    if (frame++ % 6 === 0) readout(v);
    requestAnimationFrame(loop);
  })();
})();
