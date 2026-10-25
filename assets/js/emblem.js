/*
  Sidebar emblem: a side view of a grand piano drawn in dots.
  The dots drift away from the cursor and spring back. Decorative only.
*/
(function () {
  const cv = document.querySelector(".emblem");
  if (!cv) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const c = cv.getContext("2d");
  const probe = document.createElement("canvas").getContext("2d");

  // piano parts in a 64 × 80 box: [shape, edge darkness, fill density]
  const parts = [
    [new Path2D("M14 40 L58 40 L50 12 Z"), .55, .5],                       // raised lid
    [new Path2D("M40 40 L44 22 L45 22 L41 40 Z"), .9, .9],                 // lid prop
    [new Path2D("M6 40 L60 40 Q63 40 63 44 L63 50 L6 50 Z"), .95, .55],    // case
    [new Path2D("M1 42 L8 42 L8 46 L1 46 Z"), 1, .9],                      // keyboard
    [new Path2D("M9 50 L12 50 L11.5 70 L9.5 70 Z M55 50 L58 50 L57.5 70 L55.5 70 Z M33 50 L35 50 L34.6 63 L33.4 63 Z M31 63 L37 63 L36.5 66 L31.5 66 Z"), 1, .9] // legs + pedals
  ];
  const pts = [];
  for (let i = 0; i < 9000 && pts.length < 760; i++) {
    const x = Math.random() * 64, y = Math.random() * 80;
    for (const [p, edgeA, fill] of parts) {
      if (!probe.isPointInPath(p, x, y)) continue;
      const edge = [[1.6, 0], [-1.6, 0], [0, 1.6], [0, -1.6]].some(([a, b]) => !probe.isPointInPath(p, x + a, y + b));
      if (edge || Math.random() < fill * .45) pts.push({ hx: x, hy: y, x, y, vx: 0, vy: 0, r: edge ? .95 : .7, a: edge ? edgeA : .55 });
      break;
    }
  }

  let W = 0, H = 0, d = 1, mx = -1e3, my = -1e3, running = false;
  const fit = () => { d = Math.min(devicePixelRatio || 1, 2); W = cv.width = Math.round(cv.clientWidth * d); H = cv.height = Math.round(cv.clientHeight * d); };
  const draw = () => {
    c.clearRect(0, 0, W, H); c.fillStyle = "#141414";
    const s = W / 64;
    for (const p of pts) { c.globalAlpha = p.a; c.beginPath(); c.arc(p.x * s, p.y * s, p.r * s * .5 + .4 * d, 0, 7); c.fill(); }
    c.globalAlpha = 1;
  };
  const step = () => {
    let moving = false;
    for (const p of pts) {
      const dx = p.x - mx, dy = p.y - my, dist = Math.hypot(dx, dy) || 1;
      if (dist < 22) { const f = (22 - dist) / 22 * 1.6; p.vx += dx / dist * f; p.vy += dy / dist * f; }
      p.vx = (p.vx + (p.hx - p.x) * .06) * .82; p.vy = (p.vy + (p.hy - p.y) * .06) * .82;
      p.x += p.vx; p.y += p.vy;
      if (Math.abs(p.vx) + Math.abs(p.vy) > .01) moving = true;
    }
    draw();
    // animate only while dots are moving, so the emblem is idle (and costs nothing) otherwise
    if (moving || (mx > -50 && mx < 114 && my > -50 && my < 130)) requestAnimationFrame(step); else running = false;
  };
  const wake = () => { if (!running && !reduce) { running = true; requestAnimationFrame(step); } };

  const start = () => {
    if (!cv.clientWidth) return requestAnimationFrame(start);
    fit(); draw();
    addEventListener("resize", () => { fit(); draw(); });
    addEventListener("pointermove", e => {
      const r = cv.getBoundingClientRect();
      mx = (e.clientX - r.left) * 64 / r.width; my = (e.clientY - r.top) * 80 / r.height;
      if (mx > -40 && mx < 104 && my > -40 && my < 120) wake();
    });
  };
  start();
})();
