/*
  Chladni plate. Each grain jitters in proportion to how much the plate
  moves where it sits, so grains drift off the moving parts and collect on
  the nodal lines (where the plate stays still). Uses the classic
  square-plate approximation, tiled across the wide panel:
      f(x, y) = cos(nπx)·cos(mπy) − cos(mπx)·cos(nπy)
*/
(function () {
  const cv = document.getElementById("plate-canvas");
  if (!cv) return;
  const notesEl = document.getElementById("plate-notes"), status = document.getElementById("plate-status"), pauseBtn = document.getElementById("plate-pause");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const c = cv.getContext("2d");

  // note name, frequency (Hz), and the plate mode (n, m) it excites
  const NOTES = [["C", 261.63, 1, 2], ["D", 293.66, 1, 3], ["E", 329.63, 2, 3], ["F", 349.23, 1, 4], ["G", 392.0, 2, 5], ["A", 440.0, 3, 4], ["B", 493.88, 3, 5], ["C′", 523.25, 4, 5]];
  let n = 1, m = 3, energy = 1, W = 0, H = 0, d = 1, AR = 4, N = 0, P = null;
  let mx = -9, my = -9, paused = false, visible = true, running = false;

  const fit = () => {
    d = Math.min(devicePixelRatio || 1, 2);
    W = cv.width = Math.round(cv.clientWidth * d); H = cv.height = Math.round(cv.clientHeight * d); AR = W / H;
    const want = Math.round(cv.clientWidth * cv.clientHeight * .018);
    if (!P || want !== N) { const old = P, oldN = N; N = want; P = new Float32Array(N * 2);
      for (let i = 0; i < N; i++) { if (old && i < oldN) { P[2 * i] = old[2 * i]; P[2 * i + 1] = old[2 * i + 1]; } else { P[2 * i] = Math.random(); P[2 * i + 1] = Math.random(); } } }
  };
  const amp = (x, y) => { const X = x * AR; return Math.cos(n * Math.PI * X) * Math.cos(m * Math.PI * y) - Math.cos(m * Math.PI * X) * Math.cos(n * Math.PI * y); };
  const step = (k = .035) => {
    energy = Math.max(.5, energy * .996);
    for (let i = 0; i < N; i++) {
      let x = P[2 * i], y = P[2 * i + 1];
      const s = k * Math.abs(amp(x, y)) * energy;
      x += (Math.random() - .5) * s; y += (Math.random() - .5) * s;
      const dx = (x - mx) * AR, dy = y - my;                  // the cursor stirs nearby sand
      if (dx * dx + dy * dy < .02) { x += (Math.random() - .5) * .03; y += (Math.random() - .5) * .06; }
      P[2 * i] = x < 0 ? 0 : x > 1 ? 1 : x; P[2 * i + 1] = y < 0 ? 0 : y > 1 ? 1 : y;
    }
  };
  const draw = () => { c.clearRect(0, 0, W, H); c.fillStyle = "rgba(20,20,20,.55)"; const s = 1.15 * d; for (let i = 0; i < N; i++) c.fillRect(P[2 * i] * W, P[2 * i + 1] * H, s, s); };
  const loop = () => { if (paused || !visible || reduce) { running = false; return; } step(); draw(); requestAnimationFrame(loop); };
  const run = () => { if (!running && !paused && visible && !reduce) { running = true; requestAnimationFrame(loop); } };
  // reduced motion: jump straight to the settled pattern instead of animating
  const settle = () => { for (let k = 0; k < 260; k++) step(.05); draw(); };

  /* ---------- sound ---------- */
  let actx = null;
  const tone = f => {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    if (actx.state === "suspended") actx.resume();
    const t = actx.currentTime, g = actx.createGain();
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.08, t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + 2.2); g.connect(actx.destination);
    [1, .5, .3, .15].forEach((a, k) => { const o = actx.createOscillator(), gg = actx.createGain(); o.frequency.value = f * (k + 1); gg.gain.value = a / (1 + k * .4); o.connect(gg); gg.connect(g); o.start(t); o.stop(t + 2.2); });
  };

  /* ---------- controls ---------- */
  notesEl.innerHTML = NOTES.map(([k, f], i) => `<button type="button" data-i="${i}" aria-pressed="false" aria-label="Play ${k.replace("′", " high")}, ${Math.round(f)} hertz">${k}</button>`).join("");
  notesEl.querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
    const [k, f, a, bb] = NOTES[b.dataset.i];
    n = a; m = bb; energy = 1; tone(f);
    notesEl.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    status.textContent = `${k} · ${Math.round(f)} Hz · plate mode (${n}, ${m})`;
    cv.setAttribute("aria-label", `Sand grains on a vibrating plate, settling into the pattern for plate mode ${n}, ${m}, excited by the note ${k}.`);
    if (reduce) settle(); else if (paused) { paused = false; pauseBtn.setAttribute("aria-pressed", "false"); pauseBtn.textContent = "Pause"; run(); }
  }));
  if (reduce) pauseBtn.hidden = true;
  pauseBtn.addEventListener("click", () => {
    paused = !paused; pauseBtn.setAttribute("aria-pressed", String(paused)); pauseBtn.textContent = paused ? "Resume" : "Pause"; run();
  });
  cv.addEventListener("pointermove", e => { const r = cv.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width; my = (e.clientY - r.top) / r.height; });
  cv.addEventListener("pointerleave", () => { mx = my = -9; });

  /* ---------- start once laid out; stop while scrolled out of view ---------- */
  const start = () => {
    if (!cv.clientWidth) return requestAnimationFrame(start);
    fit();
    if (reduce) settle(); else run();
    addEventListener("resize", () => { fit(); draw(); });
    if ("IntersectionObserver" in window) new IntersectionObserver(([en]) => { visible = en.isIntersecting; run(); }).observe(cv);
  };
  start();
})();
