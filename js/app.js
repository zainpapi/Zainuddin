/* ============================================================
   ZAIN UDDIN — portfolio engine
   GSAP + ScrollTrigger + Lenis + hand-rolled verlet physics
   Light "Cadet Zain" comic mode + dark "Phantom Ops" mode
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

const isTouch = window.matchMedia("(hover: none)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------
   DEVICE DETECTION — auto-optimize the UI for mobile vs desktop.
------------------------------------------------------------ */
const uaIsMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(navigator.userAgent || "");
function detectDevice() {
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.matchMedia("(max-width: 860px)").matches;
  const mobile = uaIsMobile || (coarse && narrow);
  document.body.classList.toggle("is-mobile", mobile);
  document.body.classList.toggle("is-desktop", !mobile);
  return mobile;
}
const isMobile = detectDevice();

let deviceRAF;
window.addEventListener("resize", () => {
  cancelAnimationFrame(deviceRAF);
  deviceRAF = requestAnimationFrame(detectDevice);
});

/* ------------------------------------------------------------
   SMOOTH SCROLL (Lenis driven by GSAP ticker)
------------------------------------------------------------ */
const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1.05 });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
lenis.stop(); // locked until preloader finishes

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: 0, duration: 1.6 });
  });
});

/* ------------------------------------------------------------
   PRELOADER — ghost drops in, counter, BOOM, rip open
------------------------------------------------------------ */
(function preloader() {
  const count = { v: 0 };
  const countEl = document.getElementById("preCount");
  const tl = gsap.timeline({
    onComplete() {
      document.getElementById("preloader").remove();
      lenis.start();
      heroIntro();
    },
  });

  tl.to(".preloader__thread line", { strokeDashoffset: 0, duration: 0.9, ease: "power2.in" })
    .to("#preSpider", { scale: 1, duration: 0.45, ease: "back.out(2.5)" }, "-=0.25")
    .to(count, {
      v: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => (countEl.textContent = Math.round(count.v)),
    }, "-=0.3")
    .to("#preSpider", { y: -80, scale: 0.6, duration: 0.3, ease: "power2.in" })
    .set(["#preCount", ".preloader__thread"], { opacity: 0 })
    .to("#preThwip", { scale: 1, opacity: 1, rotation: -6, duration: 0.32, ease: "back.out(3)" })
    .to("#preThwip", { scale: 1.12, duration: 0.18 })
    .to("#preloader", {
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      duration: 0.7,
      ease: "power4.inOut",
    }, "+=0.15");

  gsap.set("#preloader", { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" });
})();

/* ------------------------------------------------------------
   HERO ENTRANCE
------------------------------------------------------------ */
function heroIntro() {
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
  tl.from(".hero__word", { yPercent: 110, duration: 1.1, stagger: 0.12 })
    .from(".hero__kicker", { opacity: 0, y: 18, duration: 0.6 }, "-=0.6")
    .from(".hero__sub", { opacity: 0, y: 22, duration: 0.6 }, "-=0.45")
    .from(".hero__sticker", {
      scale: 0,
      rotation: () => gsap.utils.random(-50, 50),
      duration: 0.7,
      ease: "elastic.out(1, 0.45)",
      stagger: 0.1,
    }, "-=0.5")
    .from(".hero__scrollhint", { opacity: 0, duration: 0.5 }, "-=0.3")
    .from(".header", { y: -70, opacity: 0, duration: 0.7 }, "-=0.8");
}

/* ------------------------------------------------------------
   CUSTOM CURSOR + SPLAT ON CLICK
------------------------------------------------------------ */
if (!isTouch) {
  const cursor = document.getElementById("cursor");
  const label = document.getElementById("cursorLabel");
  const pos = { x: innerWidth / 2, y: innerHeight / 2 };
  const mouse = { x: pos.x, y: pos.y };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  gsap.ticker.add(() => {
    pos.x += (mouse.x - pos.x) * 0.18;
    pos.y += (mouse.y - pos.y) * 0.18;
    cursor.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
  });

  document.querySelectorAll("[data-cursor], a, button, .skill-card, .scrap").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("is-hover");
      label.textContent = el.dataset.cursor || "";
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("is-hover");
      label.textContent = "";
    });
  });

  // splat sticks where you click — web in comic mode, sonar rings in phantom
  window.addEventListener("click", (e) => {
    const splat = document.createElement("div");
    splat.className = "websplat";
    splat.style.left = e.clientX + "px";
    splat.style.top = e.clientY + "px";
    splat.innerHTML = document.body.classList.contains("phantom")
      ? `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round">
          <circle cx="50" cy="50" r="44" opacity="0.5"/>
          <circle cx="50" cy="50" r="30" opacity="0.75"/>
          <circle cx="50" cy="50" r="16"/>
          <circle cx="50" cy="50" r="5" fill="currentColor"/>
        </svg>`
      : `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round">
          ${Array.from({ length: 8 }, (_, i) => {
            const a = (i * Math.PI) / 4;
            return `<line x1="50" y1="50" x2="${50 + Math.cos(a) * 46}" y2="${50 + Math.sin(a) * 46}"/>`;
          }).join("")}
          <polygon points="50,18 73,27 82,50 73,73 50,82 27,73 18,50 27,27" />
          <polygon points="50,33 62,38 67,50 62,62 50,67 38,62 33,50 38,38" />
        </svg>`;
    document.body.appendChild(splat);
    gsap.fromTo(splat,
      { scale: 0, rotation: gsap.utils.random(-40, 40) },
      { scale: 1, rotation: 0, duration: 0.35, ease: "back.out(2.5)" });
    gsap.to(splat, { opacity: 0, duration: 0.5, delay: 0.8, onComplete: () => splat.remove() });
  });
}

/* ------------------------------------------------------------
   SCROLL PROGRESS GHOST (rides a thread down the right edge)
------------------------------------------------------------ */
(function scrollGhost() {
  const thread = document.getElementById("spiderThread");
  const bug = document.getElementById("spiderBug");
  ScrollTrigger.create({
    start: 0,
    end: () => document.documentElement.scrollHeight - innerHeight,
    onUpdate(self) {
      const h = self.progress * (innerHeight - 90) + 50;
      thread.style.height = h + "px";
      bug.style.top = h + "px";
      gsap.to(bug, {
        rotation: gsap.utils.clamp(-26, 26, self.getVelocity() / 90),
        duration: 0.3,
        overwrite: "auto",
      });
    },
  });
})();

/* ------------------------------------------------------------
   HERO CANVAS — verlet rope + swinging ghost (the hard part)
------------------------------------------------------------ */
(function physicsGhost() {
  if (reduceMotion) return;
  const canvas = document.getElementById("heroCanvas");
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2);
  let W, H;

  function resize() {
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  const SEGMENTS = isMobile ? 14 : 22;
  const ropeLen = () => H * 0.42;
  const anchor = { x: W * 0.78, tx: W * 0.78 };
  const pts = Array.from({ length: SEGMENTS }, (_, i) => ({
    x: W * 0.78,
    y: (ropeLen() / (SEGMENTS - 1)) * i,
    px: W * 0.78 + (i ? Math.random() * 8 - 4 : 0),
    py: (ropeLen() / (SEGMENTS - 1)) * i,
  }));

  const mouse = { x: W / 2, y: H / 2, inHero: false };
  window.addEventListener("mousemove", (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
    mouse.inHero = e.clientY < r.bottom && e.clientY > r.top;
  });
  // a click in the hero kicks the ghost — BOOM (or bursts the drone — PEW)
  window.addEventListener("click", (e) => {
    const r = canvas.getBoundingClientRect();
    if (e.clientY > r.bottom || e.clientY < r.top) return;
    if (document.body.classList.contains("phantom")) {
      for (let i = 0; i < 26; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = gsap.utils.random(2, 7);
        drone.parts.push({ x: drone.x, y: drone.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1 });
      }
    } else {
      const tip = pts[SEGMENTS - 1];
      tip.px = tip.x + gsap.utils.random(-70, 70);
      tip.py = tip.y + gsap.utils.random(20, 60);
    }
  });

  let bobPhase = 0;
  let rotorPhase = 0;

  /* pause the whole simulation while the hero is off-screen (battery + perf) */
  let heroInView = true;
  let rafRunning = true;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      heroInView = entries[0].isIntersecting;
      if (heroInView && !rafRunning) { rafRunning = true; step(); }
    }, { threshold: 0 }).observe(canvas);
  }

  /* ---- PHANTOM MODE: surveillance drone that hunts the cursor ---- */
  const drone = { x: 0, y: 0, vx: 0, vy: 0, parts: [] };
  let droneInit = false;

  function stepDrone() {
    if (!droneInit) { drone.x = W * 0.78; drone.y = H * 0.3; droneInit = true; }
    const tx = mouse.inHero ? mouse.x : W * 0.78;
    const ty = mouse.inHero ? mouse.y : H * 0.3 + Math.sin(performance.now() / 600) * 16;
    drone.vx = (drone.vx + (tx - drone.x) * 0.012) * 0.92;
    drone.vy = (drone.vy + (ty - drone.y) * 0.012) * 0.92;
    drone.x += drone.vx;
    drone.y += drone.vy;

    const n = isMobile ? 1 : 2;
    for (let i = 0; i < n; i++) {
      drone.parts.push({
        x: drone.x, y: drone.y,
        vx: -drone.vx * 0.3 + gsap.utils.random(-0.7, 0.7),
        vy: -drone.vy * 0.3 + gsap.utils.random(-0.4, 0.9),
        life: 1,
      });
    }
    for (let i = drone.parts.length - 1; i >= 0; i--) {
      const pt = drone.parts[i];
      pt.x += pt.vx; pt.y += pt.vy;
      pt.life -= 0.025;
      if (pt.life <= 0) drone.parts.splice(i, 1);
    }
  }

  function drawDrone() {
    ctx.clearRect(0, 0, W, H);
    const ink = getComputedStyle(document.body).getPropertyValue("--ink").trim() || "#3ef0a2";
    const red = getComputedStyle(document.body).getPropertyValue("--red").trim() || "#3ef0a2";
    rotorPhase += 0.32;

    // exhaust trail
    for (const pt of drone.parts) {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 1.5 + 3.5 * pt.life, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(62, 240, 162, ${pt.life * 0.5})`;
      ctx.fill();
    }

    ctx.save();
    ctx.translate(drone.x, drone.y);
    if (!isMobile) {
      ctx.shadowColor = "rgba(62, 240, 162, 0.7)";
      ctx.shadowBlur = 18;
    }

    // rotating dashed gyro ring
    ctx.save();
    ctx.rotate(rotorPhase * 0.4);
    ctx.strokeStyle = ink;
    ctx.lineWidth = 2.5;
    ctx.setLineDash([15, 10]);
    ctx.beginPath();
    ctx.arc(0, 0, 34, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // orbiting ticks (like a spinning code load spinner)
    ctx.strokeStyle = ink;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    for (let i = 0; i < 4; i++) {
      const a = rotorPhase + (i * Math.PI) / 2;
      const x0 = Math.cos(a) * 24, y0 = Math.sin(a) * 24;
      const x1 = Math.cos(a) * 34, y1 = Math.sin(a) * 34;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
    }

    // rounded code badge
    ctx.fillStyle = red;
    ctx.beginPath();
    ctx.roundRect(-30, -22, 60, 44, 12);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = ink;
    ctx.lineWidth = 3;
    ctx.stroke();

    // the </> glyph inside the badge
    ctx.strokeStyle = ink;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(-8, -8); ctx.lineTo(-18, 0); ctx.lineTo(-8, 8);
    ctx.moveTo(8, -8);  ctx.lineTo(18, 0);  ctx.lineTo(8, 8);
    ctx.moveTo(7, -9);  ctx.lineTo(-7, 9);
    ctx.stroke();

    ctx.restore();
  }

  function step() {
    if (!heroInView) { rafRunning = false; return; } // sleep until hero scrolls back
    if (document.body.classList.contains("phantom")) {
      stepDrone();
      drawDrone();
      requestAnimationFrame(step);
      return;
    }
    // anchor eases toward mouse x (the ghost "follows" you)
    anchor.tx = mouse.inHero ? gsap.utils.clamp(W * 0.12, W * 0.88, mouse.x) : W * 0.78;
    anchor.x += (anchor.tx - anchor.x) * 0.035;

    const seg = ropeLen() / (SEGMENTS - 1);

    // verlet integration
    for (let i = 1; i < SEGMENTS; i++) {
      const p = pts[i];
      const vx = (p.x - p.px) * 0.985;
      const vy = (p.y - p.py) * 0.985;
      p.px = p.x; p.py = p.y;
      p.x += vx;
      p.y += vy + 0.55; // gravity
    }
    pts[0].x = anchor.x;
    pts[0].y = 0;

    // distance constraints (fewer relaxation passes on mobile)
    for (let k = 0; k < (isMobile ? 4 : 6); k++) {
      for (let i = 0; i < SEGMENTS - 1; i++) {
        const a = pts[i], b = pts[i + 1];
        const dx = b.x - a.x, dy = b.y - a.y;
        const d = Math.hypot(dx, dy) || 0.0001;
        const diff = ((d - seg) / d) * 0.5;
        const ox = dx * diff, oy = dy * diff;
        if (i === 0) { b.x -= ox * 2; b.y -= oy * 2; }
        else { a.x += ox; a.y += oy; b.x -= ox; b.y -= oy; }
      }
    }

    draw();
    requestAnimationFrame(step);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const ink = getComputedStyle(document.body).getPropertyValue("--ink").trim();
    const red = getComputedStyle(document.body).getPropertyValue("--red").trim();

    // rope
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < SEGMENTS; i++) {
      const prev = pts[i - 1], p = pts[i];
      ctx.quadraticCurveTo(prev.x, prev.y, (prev.x + p.x) / 2, (prev.y + p.y) / 2);
    }
    ctx.strokeStyle = ink;
    ctx.lineWidth = 1.6;
    ctx.stroke();

    // the code glyph at the tip — a swinging </> that bobs and sways
    const tip = pts[SEGMENTS - 1];
    const prev = pts[SEGMENTS - 2];
    const ang = Math.atan2(tip.y - prev.y, tip.x - prev.x) - Math.PI / 2;
    const speed = Math.hypot(tip.x - tip.px, tip.y - tip.py);
    bobPhase += 0.06 + speed * 0.03;

    ctx.save();
    ctx.translate(tip.x, tip.y);
    ctx.rotate(Math.sin(bobPhase) * 0.14 + (ang - Math.PI / 2) * 0.2);
    const s = Math.min(W, H) / 15;

    // rounded code badge behind the glyph
    ctx.fillStyle = red;
    ctx.beginPath();
    ctx.roundRect(-s * 0.62, -s * 0.5, s * 1.24, s * 1.0, s * 0.22);
    ctx.fill();
    ctx.lineWidth = Math.max(1.5, s * 0.05);
    ctx.strokeStyle = ink;
    ctx.stroke();

    // the </> glyph
    ctx.strokeStyle = ink;
    ctx.lineWidth = s * 0.14;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    // left <
    ctx.beginPath();
    ctx.moveTo(-s * 0.12, -s * 0.28);
    ctx.lineTo(-s * 0.4, 0);
    ctx.lineTo(-s * 0.12, s * 0.28);
    ctx.stroke();
    // right >
    ctx.beginPath();
    ctx.moveTo(s * 0.12, -s * 0.28);
    ctx.lineTo(s * 0.4, 0);
    ctx.lineTo(s * 0.12, s * 0.28);
    ctx.stroke();
    // slash /
    ctx.beginPath();
    ctx.moveTo(s * 0.12, -s * 0.34);
    ctx.lineTo(-s * 0.12, s * 0.34);
    ctx.stroke();

    ctx.restore();
  }

  step();
})();

/* ------------------------------------------------------------
   HERO SCROLL — parallax stickers, text fill pan, fade out
------------------------------------------------------------ */
gsap.utils.toArray(".hero__sticker").forEach((el) => {
  gsap.to(el, {
    y: () => -120 * (parseFloat(el.dataset.speed) || 1),
    ease: "none",
    scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true },
  });
});
gsap.to(".hero__word--fill", {
  backgroundPosition: "50% 80%",
  ease: "none",
  scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true },
});
gsap.to(".hero__content", {
  yPercent: -18,
  opacity: 0.25,
  ease: "none",
  scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom 30%", scrub: true },
});

/* hero code symbols — gentle drift + a couple that bob more, all parallaxing */
gsap.utils.toArray(".hero__sym").forEach((el, i) => {
  const depth = parseFloat(el.style.getPropertyValue("--sd")) || 0.5;
  gsap.to(el, {
    y: () => -70 * depth,
    x: () => (i % 2 ? 40 * depth : -40 * depth),
    ease: "none",
    scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true },
  });
  // idle float so they don't sit frozen
  gsap.to(el, {
    y: "+=18",
    duration: gsap.utils.random(2.4, 3.6),
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    delay: i * 0.3,
  });
});

/* ------------------------------------------------------------
   MARQUEES — infinite loop, speed & direction react to scroll
------------------------------------------------------------ */
function marquee(sel, dir) {
  const track = document.querySelector(sel + " .marquee__track");
  const tween = gsap.to(track, { xPercent: -50 * dir, duration: 18, ease: "none", repeat: -1 });
  if (dir < 0) gsap.set(track, { xPercent: -50 });

  ScrollTrigger.create({
    trigger: sel,
    start: "top bottom",
    end: "bottom top",
    onUpdate(self) {
      const v = self.getVelocity() / 1000;
      tween.timeScale(gsap.utils.clamp(-4, 4, dir * (dir + v)) || dir * 0.2);
    },
  });
}
marquee("#marquee1", 1);
marquee("#marquee2", -1);

/* ------------------------------------------------------------
   ORIGIN — pinned comic pages with iris wipes + camera zoom
------------------------------------------------------------ */
(function origin() {
  const scenes = gsap.utils.toArray(".origin__scene");
  const num = document.getElementById("originNum");

  // scroll-expand: the comic panel grows + straightens as it enters the viewport
  gsap.fromTo(".origin__frame",
    { scale: 0.72, rotation: -6, opacity: 0.4 },
    {
      scale: 1,
      rotation: 0,
      opacity: 1,
      ease: "none",
      scrollTrigger: { trigger: "#origin", start: "top 90%", end: "top 28%", scrub: 0.5 },
    });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#origin",
      start: "top top",
      end: "+=" + scenes.length * 90 + "%",
      pin: "#originPin",
      scrub: 0.6,
      onUpdate(self) {
        const i = Math.min(scenes.length - 1, Math.floor(self.progress * scenes.length));
        num.textContent = String(i + 1).padStart(2, "0");
      },
    },
  });

  scenes.forEach((scene, i) => {
    const img = scene.querySelector("img");
    const cap = scene.querySelector(".origin__caption");

    tl.to(img, { scale: 1, duration: 1, ease: "none" }, i);
    if (i === 0) {
      tl.from(cap, { y: 40, opacity: 0, duration: 0.3 }, 0.05);
    }
    if (i < scenes.length - 1) {
      const next = scenes[i + 1];
      tl.set(next, { visibility: "visible" }, i + 0.55)
        .fromTo(next,
          { clipPath: "circle(0% at 50% 50%)" },
          { clipPath: "circle(150% at 50% 50%)", duration: 0.45, ease: "power2.inOut" },
          i + 0.55)
        .from(next.querySelector(".origin__caption"),
          { y: 40, opacity: 0, duration: 0.25 }, i + 0.85);
    }
  });
})();

/* ------------------------------------------------------------
   MANIFESTO — char-by-char scrub reveal (rebuildable per theme)
------------------------------------------------------------ */
let manifestoTweens = [];
function buildManifesto(text, highlightWords) {
  manifestoTweens.forEach((t) => {
    if (t.scrollTrigger) t.scrollTrigger.kill();
    t.kill();
  });
  manifestoTweens = [];

  const el = document.getElementById("manifestoText");
  el.innerHTML = text.trim().split(" ").map((w) =>
    `<span class="word">${[...w].map((c) => `<span class="char">${c}</span>`).join("")}</span>`
  ).join(" ");

  manifestoTweens.push(gsap.fromTo(el.querySelectorAll(".char"),
    { opacity: 0.12, y: 36, rotateX: -75 },
    {
      opacity: 1, y: 0, rotateX: 0,
      stagger: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#manifesto",
        start: "top 75%",
        end: "center 45%",
        scrub: 0.5,
      },
    }));

  const sel = highlightWords.map((n) => `.word:nth-child(${n}) .char`).join(", ");
  manifestoTweens.push(gsap.to(el.querySelectorAll(sel), {
    color: "var(--red)",
    stagger: 0.4,
    scrollTrigger: { trigger: "#manifesto", start: "top 45%", end: "center 40%", scrub: true },
  }));
}
buildManifesto("WITH GREAT CODE COMES GREAT SITES", [3, 6]);

/* ------------------------------------------------------------
   SKILLS — pinned horizontal scroll + velocity skew + parallax
------------------------------------------------------------ */
(function skills() {
  const track = document.getElementById("skillsTrack");
  const getDist = () => track.scrollWidth - innerWidth;

  const scrollTween = gsap.to(track, {
    x: () => -getDist(),
    ease: "none",
    scrollTrigger: {
      trigger: "#skills",
      start: "top top",
      end: () => "+=" + getDist(),
      pin: true,
      scrub: 0.7,
      invalidateOnRefresh: true,
      onUpdate(self) {
        const skew = gsap.utils.clamp(-8, 8, self.getVelocity() / -300);
        gsap.to(".skill-card", { skewX: skew, duration: 0.4, overwrite: "auto", ease: "power2.out" });
      },
    },
  });

  gsap.utils.toArray(".skill-card__img img").forEach((img) => {
    gsap.fromTo(img, { yPercent: -12 }, {
      yPercent: 0,
      ease: "none",
      scrollTrigger: {
        trigger: img,
        containerAnimation: scrollTween,
        start: "left right",
        end: "right left",
        scrub: true,
      },
    });
  });

  /* fade the whole track out as the section un-pins — otherwise the last
     cards clip half-scrolled at the exit frame, which reads as a glitch */
  gsap.fromTo(track,
    { opacity: 1 },
    {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: "#skills",
        start: "bottom 82%",
        end: "bottom 45%",
        scrub: true,
      },
    });
  gsap.fromTo(track,
    { opacity: 0 },
    {
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "#skills",
        start: "top 15%",
        end: "top top",
        scrub: true,
      },
    });

  if (!isTouch) {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -7;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 9;
        gsap.to(card, { rotateX: rx, rotateY: ry, transformPerspective: 700, duration: 0.4 });
      });
      card.addEventListener("mouseleave", () =>
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" }));
    });
  }
})();

/* ------------------------------------------------------------
   MISSIONS — comic cards slam in on scroll
------------------------------------------------------------ */
(function missions() {
  gsap.from(".missions__head", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: { trigger: "#missions", start: "top 75%" },
  });
  gsap.utils.toArray(".mission").forEach((card, i) => {
    gsap.from(card, {
      y: 110,
      opacity: 0,
      scale: 0.92,
      duration: 0.85,
      delay: (i % 2) * 0.12,
      ease: "back.out(1.6)",
      clearProps: "all",
      scrollTrigger: { trigger: card, start: "top 92%", once: true },
    });
  });
})();

/* ------------------------------------------------------------
   SCRAPBOOK — depth parallax on scroll + mouse drift
------------------------------------------------------------ */
(function scrapbook() {
  const items = gsap.utils.toArray("#scrapbook [data-depth]");

  items.forEach((el) => {
    const depth = parseFloat(el.dataset.depth);
    if (!isMobile) {
      gsap.fromTo(el, { y: 90 * depth }, {
        y: -130 * depth,
        ease: "none",
        scrollTrigger: { trigger: "#scrapbook", start: "top bottom", end: "bottom top", scrub: true },
      });
    }
    gsap.from(el, {
      opacity: 0,
      scale: 0.85,
      rotation: () => gsap.utils.random(-14, 14),
      duration: 0.8,
      ease: "back.out(1.8)",
      scrollTrigger: { trigger: el, start: "top 92%" },
    });
  });

  if (!isTouch) {
    window.addEventListener("mousemove", (e) => {
      const nx = e.clientX / innerWidth - 0.5;
      items.forEach((el) => {
        const depth = parseFloat(el.dataset.depth);
        gsap.to(el, { x: nx * 34 * depth, duration: 1.2, ease: "power2.out", overwrite: "auto" });
      });
    });
  }

  gsap.from(".scrapbook__title", {
    scale: 0.7,
    rotation: -4,
    opacity: 0,
    duration: 0.7,
    ease: "back.out(2)",
    scrollTrigger: { trigger: ".scrapbook__title", start: "top 85%" },
  });
})();

/* ------------------------------------------------------------
   CONTACT — title reveal + magnetic button
------------------------------------------------------------ */
(function contact() {
  gsap.from(".contact__title-line", {
    yPercent: 110,
    duration: 1,
    stagger: 0.12,
    ease: "power4.out",
    clearProps: "transform",
    scrollTrigger: { trigger: "#contact", start: "top 75%", once: true },
  });
  gsap.from([".contact__kicker", ".contact__btn", ".contact__links", ".term", ".stats", ".footer"], {
    opacity: 0,
    y: 26,
    duration: 0.7,
    stagger: 0.1,
    clearProps: "all",
    scrollTrigger: { trigger: "#contact", start: "top 70%", once: true },
  });

  /* live terminal — types itself the first time it scrolls into view */
  const term = document.getElementById("termBody");
  if (term) {
    const ROWS = [
      { prompt: true, text: "zain --status" },
      { key: "mode", val: "front-end & playful engineering", quote: true },
      { key: "location", val: "Quetta, PK [UTC+5]" },
      { key: "stack", val: "HTML · CSS · JS · TS · GSAP" },
      { key: "uptime", val: "shipping since 2023" },
      { key: "missions", val: "5 shipped · 0 templates" },
      { key: "open_to", val: "freelance + internships" },
      { key: "contact", val: "github.com/zainpapi — say salaam", good: true },
      { prompt: true, caret: true },
    ];
    const esc2 = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    let started = false;
    const typeAll = () => {
      if (started || !term.isConnected) return;
      started = true;
      let i = 0;
      const next = () => {
        if (i >= ROWS.length) return;
        const r = ROWS[i++];
        const row = document.createElement("span");
        row.style.display = "block";
        if (r.prompt) {
          row.innerHTML = `<span class="t-key">&gt; ${esc2(r.text || "")}</span>`
            + (r.caret ? ' <span class="t-caret"></span>' : "");
        } else {
          const val = r.quote ? `"${r.val}"` : r.val;
          row.innerHTML = `  <span class="t-dim">${r.key}</span>  `
            + `<span class="${r.good ? "t-ok" : r.quote ? "t-key" : ""}">${esc2(val)}</span>`;
        }
        term.appendChild(row);
        setTimeout(next, 160);
      };
      next();
    };
    ScrollTrigger.create({ trigger: "#termCard", start: "top 85%", once: true, onEnter: typeAll });
    setTimeout(typeAll, 6000); // safety: even if triggers die, it types
  }

  /* comic stat counters */
  document.querySelectorAll(".stats__num").forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = target >= 1200 ? "+" : "";
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => gsap.to(obj, {
        v: target, duration: 1.6, ease: "power2.out",
        onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; },
      }),
    });
  });

  /* tech stack bars animation */
  document.querySelectorAll(".tech-stack__fill").forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0";
    ScrollTrigger.create({
      trigger: bar,
      start: "top 90%",
      once: true,
      onEnter: () => gsap.to(bar, {
        width: width,
        duration: 1.2,
        ease: "power2.out"
      })
    });
  });

  /* code bombs floating animation */
  const codeBombs = document.querySelectorAll(".code-bomb");
  ScrollTrigger.create({
    trigger: ".code-bombs",
    start: "top 80%",
    once: true,
    onEnter: () => {
      codeBombs.forEach((bomb, index) => {
        setTimeout(() => {
          bomb.classList.add("visible");
        }, index * 200);
      });
    }
  });

  const btn = document.getElementById("magnetBtn");
  if (!isTouch) {
    window.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = e.clientX - cx, dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < 200) {
        const pull = 1 - dist / 200;
        gsap.to(btn, { x: dx * pull * 0.45, y: dy * pull * 0.45, duration: 0.4 });
        gsap.to(".contact__btn-text", { x: dx * pull * 0.15, y: dy * pull * 0.15, duration: 0.4 });
      } else {
        gsap.to([btn, ".contact__btn-text"], { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
      }
    });
  }
})();

/* ------------------------------------------------------------
   PHANTOM OPS FINALE — end-of-page CTA with a one-time nudge
------------------------------------------------------------ */
(function finale() {
  const wrap = document.getElementById("finale");
  const btn = document.getElementById("themeToggle");
  if (!wrap || !btn) return;

  gsap.from(wrap.children, {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.12,
    ease: "power3.out",
    scrollTrigger: { trigger: wrap, start: "top 88%" },
  });

  ScrollTrigger.create({
    trigger: wrap,
    start: "top 68%",
    once: true,
    onEnter: () => {
      gsap.timeline()
        .to(btn, { scale: 1.12, duration: 0.22, ease: "back.out(3)" })
        .to(btn, { rotation: -3.5, duration: 0.07, repeat: 5, yoyo: true, ease: "none" })
        .to(btn, { rotation: 0, scale: 1, duration: 0.35, ease: "elastic.out(1, 0.4)" });
    },
  });
})();

/* ------------------------------------------------------------
   ADAPTIVE HEADER — branding turns light over dark sections
------------------------------------------------------------ */
(function adaptiveHeader() {
  const header = document.querySelector(".header");
  let overDark = 0;
  const sync = () => header.classList.toggle("is-over-dark", overDark > 0);

  ["#origin", "#marquee2", "#contact"].forEach((sel) => {
    ScrollTrigger.create({
      trigger: sel,
      start: "top 52px",
      end: "bottom 20px",
      onEnter: () => { overDark++; sync(); },
      onEnterBack: () => { overDark++; sync(); },
      onLeave: () => { overDark--; sync(); },
      onLeaveBack: () => { overDark--; sync(); },
    });
  });
})();

/* ------------------------------------------------------------
   NIGHT SHIFT — full dark alter-ego theme (press / or tap the switch)
   Swaps every image, every line of copy, the physics toy,
   the cursor splat, and the whole palette. Two sites in one.
------------------------------------------------------------ */
const IMG_SWAPS = [
  ['.origin__scene[data-scene="0"] img', "assets/dark/origin-1.svg"],
  ['.origin__scene[data-scene="1"] img', "assets/dark/origin-2.svg"],
  ['.origin__scene[data-scene="2"] img', "assets/dark/origin-3.svg"],
  ['.origin__scene[data-scene="3"] img', "assets/dark/origin-4.svg"],
];

const TEXT_SWAPS = [
  [".header__logo", "<span class=\"header__logo-mark\">🟢</span> NIGHT.SHIFT"],
  [".hero__kicker", "<span>NIGHT SHIFT</span> · THE MIDNIGHT DEVELOPER · EST. QUETTA"],
  [".hero__sub", "They scroll by day. <em>I ship by night.</em><br/>Welcome to the night shift."],
  [".hero__sticker--1 span", "I AM<br/>NIGHT"],
  [".hero__sticker--2 span", "PEW!"],
  [".hero__scrollhint span", "SCROLL OR FLY"],
  ["#marquee1 .marquee__track span:nth-child(1)", "NIGHT SHIFT ✦ DARK MODE ✦ SHIP WHILE THEY SLEEP ✦ DISCORD BOTS ✦ AUTOMATION ✦ BUILDING NON-STOP ✦&nbsp;"],
  ["#marquee1 .marquee__track span:nth-child(2)", "NIGHT SHIFT ✦ DARK MODE ✦ SHIP WHILE THEY SLEEP ✦ DISCORD BOTS ✦ AUTOMATION ✦ BUILDING NON-STOP ✦&nbsp;"],
  ['.origin__scene[data-scene="0"] .origin__caption p', "Every hero has a night shift…"],
  ['.origin__scene[data-scene="1"] .origin__caption p', "…when the city sleeps, <b>the terminal glows</b>."],
  ['.origin__scene[data-scene="2"] .origin__caption p', "Every commit is a footprint in the dark."],
  ['.origin__scene[data-scene="3"] .origin__caption p', "Quetta sleeps. The code ships."],
  [".manifesto__small", "— night protocol —"],
  [".manifesto__sign", "— someone with 14 tabs open"],
  [".skills__intro p", "← the night shift<br/>scrolls right"],
  ['.scrap[data-depth="0.4"] figcaption', "shipping in the dark"],
  ['.scrap[data-depth="0.9"] figcaption', "night shift protocol"],
  ['.scrap[data-depth="0.6"] figcaption', "city of winds, city of commits"],
  ['.scrap[data-depth="1.2"] figcaption', "no sleep till deploy"],
  ['.scrap-sticker:not(.scrap-sticker--burst)', "100 commits ✓<br/>before sunrise"],
  [".scrap-sticker--burst", "PEW!"],
  ["#marquee2 .marquee__track span:nth-child(1)", "PEW ✦ PEW ✦ I AM NIGHT ✦ SOMETIMES YOU GOTTA RUN BEFORE YOU CAN WALK ✦&nbsp;"],
  ["#marquee2 .marquee__track span:nth-child(2)", "PEW ✦ PEW ✦ I AM NIGHT ✦ SOMETIMES YOU GOTTA RUN BEFORE YOU CAN WALK ✦&nbsp;"],
  [".contact__kicker", "THE NIGHT SHIFT TAKES COMMISSIONS."],
  [".contact__title-line:nth-child(1)", "GO"],
  [".contact__title-line:nth-child(2)", "DARK"],
  [".contact__btn-text", "SUMMON THE NIGHT"],
  [".finale__label", "RETURN TO <strong>DAYLIGHT</strong> ☀️"],
  [".finale__hint", "— had enough of the dark? —"],
];

const themeCache = new Map();

function applyTheme(phantom) {
  document.body.classList.toggle("phantom", phantom);

  IMG_SWAPS.forEach(([sel, darkSrc]) => {
    const el = document.querySelector(sel);
    if (!el) return;
    if (!themeCache.has(sel)) themeCache.set(sel, el.getAttribute("src"));
    el.setAttribute("src", phantom ? darkSrc : themeCache.get(sel));
  });

  TEXT_SWAPS.forEach(([sel, phantomHTML]) => {
    const el = document.querySelector(sel);
    if (!el) return;
    if (!themeCache.has(sel)) themeCache.set(sel, el.innerHTML);
    el.innerHTML = phantom ? phantomHTML : themeCache.get(sel);
  });

  buildManifesto(
    phantom ? "SOMETIMES YOU GOTTA SHIP BEFORE YOU SLEEP" : "WITH GREAT CODE COMES GREAT SITES",
    phantom ? [4, 7] : [3, 6]
  );

  try { localStorage.setItem("theme", phantom ? "phantom" : "cadet"); } catch (e) {}

  /* NOTE: no transform/scale animation on <main> here. Any transform on an
     ancestor turns it into the containing block for ScrollTrigger's pins —
     pinned sections lose their spacing and neighbouring sections slide
     OVER them (the overlap bug). The palette + image swap is dramatic
     enough on its own. */
}

function toggleTheme() {
  applyTheme(!document.body.classList.contains("phantom"));
}

document.getElementById("themeToggle").addEventListener("click", toggleTheme);

window.addEventListener("keydown", (e) => {
  const k = e.key.toLowerCase();
  if ((k !== "/" && k !== "p") || e.metaKey || e.ctrlKey || e.altKey) return;
  if (/input|textarea/i.test(document.activeElement.tagName)) return;
  e.preventDefault();
  toggleTheme();
});

// remember the mode you left in
try {
  if (localStorage.getItem("theme") === "phantom") applyTheme(true);
} catch (e) {}

/* refresh triggers once everything (fonts/images) settles */
window.addEventListener("load", () => ScrollTrigger.refresh());

/* ------------------------------------------------------------
   INTRO GUARD — content must never stay invisible.
   Background tabs / busy CPUs can stall the intro timeline after
   it has applied its "from" state (opacity 0), leaving the hero
   blank forever. A 1s interval survives throttling where rAF and
   long timeouts may not: if the intro hasn't completed within 12s
   of load, kill the frozen tweens and force the end state.
------------------------------------------------------------ */
(function introGuard() {
  let tries = 0;
  const iv = setInterval(() => {
    tries++;
    const kicker = document.querySelector(".hero__kicker");
    if (!kicker) { clearInterval(iv); return; }
    const visible = parseFloat(getComputedStyle(kicker).opacity) >= 0.5;
    if (visible) { clearInterval(iv); return; }
    if (tries >= 12) {
      const sel = [".hero__kicker", ".hero__sub", ".hero__scrollhint", ".header", ".hero__sticker", ".hero__word"];
      gsap.killTweensOf(sel);
      gsap.set(sel, { clearProps: "all", opacity: 1 });
      clearInterval(iv);
    }
  }, 1000);
})();

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) ScrollTrigger.refresh();
});
