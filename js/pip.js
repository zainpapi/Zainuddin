/* ============================================================
   PIP — the guide bot, front end.

   No API key lives here. This file only ever talks to /api/pip,
   a same-origin serverless function that holds the key server-side.
   Open devtools all you like — there is nothing to steal.

   The guiding trick: the model can end a reply with [GO:section]
   or [DARK]. We strip those tags out of the visible text and act
   on them, so Pip literally walks the visitor to what it just
   talked about.
   ============================================================ */
(() => {
  const fab = document.getElementById("pipFab");
  const panel = document.getElementById("pip");
  const closeBtn = document.getElementById("pipClose");
  const log = document.getElementById("pipLog");
  const form = document.getElementById("pipForm");
  const input = document.getElementById("pipInput");
  const sendBtn = form.querySelector(".pip__send");
  const chips = document.getElementById("pipChips");
  const hello = document.getElementById("pipHello");

  if (!fab || !panel) return;

  /* ---------------------------------------------------------
     HELLO BUBBLE — introduces itself before you have to guess
     what the ghost button does.
  --------------------------------------------------------- */
  let helloTimer;
  function showHello(ms) {
    if (!hello || open) return;
    clearTimeout(helloTimer);
    hello.classList.add("is-on");
    if (ms) helloTimer = setTimeout(() => hello.classList.remove("is-on"), ms);
  }
  function hideHello() {
    if (!hello) return;
    clearTimeout(helloTimer);
    hello.classList.remove("is-on");
  }

  fab.addEventListener("mouseenter", () => showHello(0));
  fab.addEventListener("mouseleave", () => hideHello());

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* app.js declares `lenis` as a top-level const in a classic script,
     which lands in global lexical scope — reachable, but guard anyway. */
  const scroller = typeof lenis !== "undefined" ? lenis : null;

  const history = [];
  let busy = false;
  let open = false;

  /* ---------------------------------------------------------
     OPEN / CLOSE
  --------------------------------------------------------- */
  function openPanel() {
    if (open) return;
    open = true;
    hideHello();
    panel.hidden = false;
    fab.classList.add("is-open", "is-pinging");
    setTimeout(() => fab.classList.remove("is-pinging"), 700);

    if (!reduce && window.gsap) {
      gsap.fromTo(
        panel,
        { scale: 0.7, opacity: 0, y: 26, rotate: -3 },
        { scale: 1, opacity: 1, y: 0, rotate: 0, duration: 0.45, ease: "back.out(1.6)" }
      );
    }
    if (!isCoarse()) input.focus();
  }

  function closePanel() {
    if (!open) return;
    open = false;
    fab.classList.remove("is-open");

    /* Clear the stuck label immediately, then re-evaluate only AFTER the
       panel is really hidden — while it is still fading out it would
       otherwise hit-test the close button again and re-stick "SHUT IT". */
    const cur = document.getElementById("cursor");
    const curLabel = document.getElementById("cursorLabel");
    if (cur) cur.classList.remove("is-hover");
    if (curLabel) curLabel.textContent = "";

    if (!reduce && window.gsap) {
      gsap.to(panel, {
        scale: 0.75,
        opacity: 0,
        y: 22,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          panel.hidden = true;
          gsap.set(panel, { clearProps: "all" });
          releaseCursor();
        },
      });
    } else {
      panel.hidden = true;
      releaseCursor();
    }
  }

  const isCoarse = () => window.matchMedia("(pointer: coarse)").matches;

  /* ---------------------------------------------------------
     CURSOR RESET — anything here that hides a hovered element
     has to hand the cursor back manually.
  --------------------------------------------------------- */
  const ptr = { x: -1, y: -1 };
  window.addEventListener("mousemove", (e) => { ptr.x = e.clientX; ptr.y = e.clientY; }, { passive: true });

  function releaseCursor() {
    const c = document.getElementById("cursor");
    const l = document.getElementById("cursorLabel");
    if (!c || !l) return;

    let hovered = null;
    if (ptr.x >= 0) {
      const el = document.elementFromPoint(ptr.x, ptr.y);
      hovered = el && el.closest("[data-cursor], a, button, .skill-card, .scrap");
    }

    if (hovered) {
      c.classList.add("is-hover");
      l.textContent = hovered.dataset.cursor || "";
    } else {
      c.classList.remove("is-hover");
      l.textContent = "";
    }
  }

  fab.addEventListener("click", () => (open ? closePanel() : openPanel()));
  closeBtn.addEventListener("click", closePanel);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && open) closePanel();
  });

  /* the site uses "/" for the Phantom toggle — don't hijack it while typing */
  input.addEventListener("keydown", (e) => e.stopPropagation());

  /* ---------------------------------------------------------
     MESSAGES
  --------------------------------------------------------- */
  function bubble(text, kind) {
    const el = document.createElement("div");
    el.className = `pip__msg pip__msg--${kind}`;
    // textContent per paragraph — never innerHTML, model output is untrusted
    text.split(/\n{2,}/).forEach((para) => {
      const p = document.createElement("p");
      p.textContent = para.trim();
      el.appendChild(p);
    });
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;

    if (!reduce && window.gsap) {
      gsap.from(el, { scale: 0.85, opacity: 0, duration: 0.3, ease: "back.out(2)" });
    }
    return el;
  }

  function showTyping() {
    const el = document.createElement("div");
    el.className = "pip__msg pip__msg--bot pip__typing";
    el.innerHTML =
      '<em class="pip__thinking">thinking</em><span></span><span></span><span></span>';
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el;
  }

  /* ---------------------------------------------------------
     THE GUIDE TAGS
  --------------------------------------------------------- */
  const SECTIONS = {
    top: "#hero",
    origin: "#origin",
    skills: "#skills",
    scrapbook: "#scrapbook",
    missions: "#missions",
    contact: "#contact",
  };

  function runTags(raw) {
    let text = raw;
    let target = null;
    let dark = false;

    text = text.replace(/\[GO:\s*([a-z]+)\s*\]/gi, (_, name) => {
      const sel = SECTIONS[name.toLowerCase()];
      if (sel) target = sel;
      return "";
    });

    text = text.replace(/\[DARK\]/gi, () => { dark = true; return ""; });

    return { text: text.trim(), target, dark };
  }

  function guideTo(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    setTimeout(() => {
      if (scroller && typeof scroller.scrollTo === "function") {
        scroller.scrollTo(el, { offset: 0, duration: 1.6 });
      } else {
        el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      }
    }, 550);
  }

  function goDark() {
    setTimeout(() => {
      if (typeof toggleTheme === "function" && !document.body.classList.contains("phantom")) {
        toggleTheme();
      }
    }, 550);
  }

  /* ---------------------------------------------------------
     LOCAL BRAIN — canned fallback for when /api/pip is unreachable
     (local static server demo). Production uses the serverless one.
  --------------------------------------------------------- */
  const CANNED = [
    {
      re: /(built|project|mission|work|portfolio|pakphantom|zeetable)/i,
      reply: "He built PakPhantom — a Discord bot site for every server — and Zeetable, a next-gen productivity app. Both are one click away on the missions board.\n[GO:missions]",
    },
    {
      re: /(skill|good at|best at|can he do|stack|tech)/i,
      reply: "HTML, CSS, JavaScript, TypeScript, responsive UI, Discord bots and a bit of Python. He animates pixels for fun. Walking you to his powers now.\n[GO:skills]",
    },
    {
      re: /(hire|contact|email|reach|freelance|job|work with)/i,
      reply: "Ghost-sense says you have a project in mind. Zain takes commissions through GitHub — find him at github.com/zainpapi. Swinging you to the contact zone.\n[GO:contact]",
    },
    {
      re: /(dark|phantom|night|secret|cool|easter|surprise)/i,
      reply: "You found the whisper… this site has a hidden night shift. Activating PHANTOM OPS. Don't tell the daylight version.\n[DARK]",
    },
    {
      re: /(who|zain|about|story)/i,
      reply: "Zain Uddin — Cadet Zain — a front-end developer from Quetta, Pakistan. Ordinary classroom, radioactive idea called code, now he ships worlds. The comic explains it better.\n[GO:origin]",
    },
    {
      re: /(origin repo|source|open.?source|this site|github repo)/i,
      reply: "This very site is open source — github.com/zainpapi/Zainuddin. A hand-coded comic book with canvas physics and a ghost in it. Me, basically.\n[GO:missions]",
    },
  ];

  function localBrain(q) {
    for (const c of CANNED) if (c.re.test(q)) return c.reply;
    return "Boo! I only know this site by heart — try asking about Zain's missions, skills, or how to hire him.\n[GO:missions]";
  }

  /* ---------------------------------------------------------
     ASK
  --------------------------------------------------------- */
  async function ask(question) {
    if (busy || !question.trim()) return;
    busy = true;
    sendBtn.disabled = true;
    chips.hidden = true;

    releaseCursor();
    bubble(question, "user");
    history.push({ role: "user", content: question });
    input.value = "";

    const typing = showTyping();

    try {
      const res = await fetch("/api/pip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-10) }),
      });

      const data = await res.json().catch(() => ({}));
      typing.remove();

      if (!res.ok || data.error) {
        // no serverless function (e.g. plain static server locally)?
        // fall back to the built-in canned brain so Pip still works.
        const fallback = localBrain(question);
        const { text, target, dark } = runTags(fallback);
        bubble(text, "bot");
        if (dark) goDark();
        if (target) guideTo(target);
      } else {
        const { text, target, dark } = runTags(data.reply || "");
        bubble(text || "…no words. ask me again?", "bot");
        history.push({ role: "assistant", content: data.reply });
        if (dark) goDark();
        if (target) guideTo(target);
      }
    } catch (err) {
      typing.remove();
      const fallback = localBrain(question);
      const { text, target, dark } = runTags(fallback);
      bubble(text, "bot");
      if (dark) goDark();
      if (target) guideTo(target);
    } finally {
      busy = false;
      sendBtn.disabled = false;
      log.scrollTop = log.scrollHeight;
      if (!isCoarse()) input.focus();
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    ask(input.value);
  });

  chips.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-q]");
    if (btn) ask(btn.dataset.q);
  });

  /* one nudge on first arrival, then never again */
  try {
    if (!sessionStorage.getItem("pipSeen")) {
      setTimeout(() => {
        if (!open) {
          fab.classList.add("is-pinging");
          setTimeout(() => fab.classList.remove("is-pinging"), 700);
          showHello(6000);
        }
      }, 6000);
      sessionStorage.setItem("pipSeen", "1");
    }
  } catch (e) {}
})();
