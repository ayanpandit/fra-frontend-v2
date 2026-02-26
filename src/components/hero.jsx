import { useEffect, useRef, useState } from "react";

// ─── Placeholder landscape images (gradient-based, no external deps) ───────────
const CARD_IMAGES = [
  {
    id: 1,
    bg: "linear-gradient(135deg,#2d5a27 0%,#4a8c3f 40%,#a8c97f 100%)",
    label: "Modern Garden Retreat",
  },
  {
    id: 2,
    bg: "linear-gradient(135deg,#1a3a1a 0%,#3b7a3b 50%,#85b85a 100%)",
    label: "Sculptural Landscape",
  },
  {
    id: 3,
    bg: "linear-gradient(135deg,#0d2b0d 0%,#2e6b2e 45%,#6da84a 100%)",
    label: "Terraced Paradise",
  },
  {
    id: 4,
    bg: "linear-gradient(135deg,#1e4020 0%,#3d8040 50%,#7cc455 100%)",
    label: "Tropical Oasis",
  },
  {
    id: 5,
    bg: "linear-gradient(135deg,#152e15 0%,#336633 50%,#78be50 100%)",
    label: "Stone & Greenery",
  },
  {
    id: 6,
    bg: "linear-gradient(135deg,#243d12 0%,#4a7a1e 50%,#94c940 100%)",
    label: "Evening Escape",
  },
];

// ── SVG leaf/tree shapes for subtle bg texture ────────────────────────────────
function TreeSVG() {
  return (
    <svg
      viewBox="0 0 200 300"
      style={{ width: "100%", height: "100%", opacity: 0.07 }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="100" cy="120" rx="70" ry="90" fill="#7ec850" />
      <ellipse cx="100" cy="80" rx="55" ry="75" fill="#5da832" />
      <ellipse cx="100" cy="45" rx="40" ry="55" fill="#4a9a26" />
      <rect x="90" y="200" width="20" height="80" fill="#7a5c3a" />
    </svg>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .hero-root {
    --olive: #2a3d14;
    --dark-green: #1e2e0e;
    --accent: #7ec850;
    --accent-dark: #5da832;
    --text: #f5f0e8;
    --muted: rgba(245,240,232,0.62);
    font-family: 'DM Sans', sans-serif;
    background: var(--dark-green);
    color: var(--text);
    overflow-x: hidden;
  }

  /* ── Hero section ────────────────── */
  .hero-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 10vh;
    overflow: hidden;
  }

  /* background tree pattern */
  .hero-bg {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(3, 1fr);
    pointer-events: none;
    z-index: 0;
  }
  .hero-bg-tree {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* gradient overlay */
  .hero-section::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 20%, transparent 30%, var(--dark-green) 80%);
    z-index: 1;
    pointer-events: none;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 780px;
    padding: 0 2rem;
  }

  .hero-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.8rem, 6vw, 5.5rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--text);
    margin-bottom: 1.2rem;
  }
  .hero-title span {
    color: var(--accent);
  }

  .hero-subtitle {
    font-size: clamp(0.95rem, 1.5vw, 1.1rem);
    color: var(--muted);
    line-height: 1.7;
    margin-bottom: 2.4rem;
    max-width: 520px;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-cta {
    display: inline-flex;
    align-items: center;
    background: var(--accent);
    border-radius: 100px;
    overflow: hidden;
    cursor: pointer;
    border: none;
    padding: 0;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .hero-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(126,200,80,0.35);
  }
  .hero-cta-text {
    padding: 0.85rem 1.8rem;
    font-size: 1rem;
    font-weight: 500;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
  }
  .hero-cta-icon {
    width: 48px;
    height: 48px;
    background: var(--accent-dark);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 4px;
    flex-shrink: 0;
  }
  .hero-cta-icon svg {
    width: 18px;
    height: 18px;
    color: #fff;
    fill: none;
    stroke: currentColor;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* ── Cards container ─────────────── */
  .cards-stage {
    position: relative;
    z-index: 2;
    width: 100%;
    margin-top: 4vh;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    /* height enough to show cards peeking */
    height: 340px;
  }

  /* Stack wrapper — transforms applied via JS */
  .cards-stack {
    position: relative;
    width: 520px;
    height: 320px;
    transform-origin: center bottom;
    will-change: transform;
  }

  .stack-card {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 24px 60px rgba(0,0,0,0.55);
    transform-origin: center bottom;
    will-change: transform;
  }
  .stack-card-inner {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: flex-end;
  }
  .stack-card-label {
    position: absolute;
    bottom: 1.2rem;
    left: 1.4rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: rgba(255,255,255,0.88);
    background: rgba(0,0,0,0.3);
    backdrop-filter: blur(6px);
    padding: 0.35rem 0.8rem;
    border-radius: 100px;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── Scroll section ──────────────── */
  .scroll-section {
    position: relative;
    height: 400vh; /* sticky scroll distance */
  }

  .scroll-sticky {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Horizontal card row (shown after zoom-out transition) */
  .cards-row {
    display: flex;
    gap: 20px;
    align-items: center;
    will-change: transform;
  }

  .row-card {
    flex-shrink: 0;
    width: 400px;
    height: 280px;
    border-radius: 22px;
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    will-change: transform, opacity;
    transition: box-shadow 0.3s ease;
  }
  .row-card:hover {
    box-shadow: 0 28px 64px rgba(0,0,0,0.65);
  }
  .row-card-inner {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .row-card-label {
    position: absolute;
    bottom: 1rem;
    left: 1.1rem;
    font-size: 0.85rem;
    font-weight: 500;
    color: rgba(255,255,255,0.9);
    background: rgba(0,0,0,0.3);
    backdrop-filter: blur(6px);
    padding: 0.3rem 0.7rem;
    border-radius: 100px;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── Footer space ────────────────── */
  .after-scroll {
    background: var(--dark-green);
    height: 30vh;
  }

  /* Scrollbar hide */
  html { scroll-behavior: smooth; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--accent-dark); border-radius: 3px; }
`;

// ── Helper: clamp ─────────────────────────────────────────────────────────────
function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

// ── Easing ────────────────────────────────────────────────────────────────────
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function HeroSection() {
  const scrollRef = useRef(null);
  const stackRef = useRef(null);
  const rowRef = useRef(null);
  const rafRef = useRef(null);
  const scrollYRef = useRef(0);
  const [phase, setPhase] = useState("stack"); // "stack" | "transition" | "row"
  const phaseRef = useRef("stack");
  const tiltAngleRef = useRef(0); // continuous tilt angle
  const tiltDirRef = useRef(1);
  const lastTimeRef = useRef(null);

  // ── Animate tilt (pendulum) ───────────────────────────────────────────────
  useEffect(() => {
    let animId;
    const TILT_MAX = 6; // degrees
    const TILT_SPEED = 0.6; // degrees/frame @60fps

    function tick(timestamp) {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = Math.min((timestamp - lastTimeRef.current) / 16.67, 3); // normalize to 60fps
      lastTimeRef.current = timestamp;

      if (phaseRef.current === "stack") {
        tiltAngleRef.current += TILT_SPEED * tiltDirRef.current * dt;
        if (tiltAngleRef.current >= TILT_MAX) {
          tiltAngleRef.current = TILT_MAX;
          tiltDirRef.current = -1;
        } else if (tiltAngleRef.current <= -TILT_MAX) {
          tiltAngleRef.current = -TILT_MAX;
          tiltDirRef.current = 1;
        }
        applyStackTransform(tiltAngleRef.current, 1, 0);
      }
      animId = requestAnimationFrame(tick);
    }
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // ── Apply transforms to stacked cards ────────────────────────────────────
  function applyStackTransform(tiltDeg, scale, rowProgress) {
    if (!stackRef.current) return;
    const cards = stackRef.current.querySelectorAll(".stack-card");
    const offsets = [0, -14, -28, -42, -56, -70]; // vertical stacking offsets
    const scaleOffsets = [1, 0.97, 0.94, 0.91, 0.88, 0.85];

    cards.forEach((card, i) => {
      const cardTilt = tiltDeg * (1 - i * 0.12); // each card tilts slightly less
      const yOff = offsets[i] ?? -i * 14;
      const sc = (scaleOffsets[i] ?? 1) * scale;
      const opacity = rowProgress > 0.3 ? Math.max(0, 1 - (rowProgress - 0.3) / 0.4) : 1;
      card.style.transform = `translateY(${yOff}px) scale(${sc}) rotate(${cardTilt}deg)`;
      card.style.opacity = opacity;
    });

    // also scale the whole stack wrapper
    stackRef.current.style.transform = `scale(${scale})`;
  }

  // ── Apply transforms to row cards ────────────────────────────────────────
  function applyRowTransform(progress) {
    if (!rowRef.current) return;
    // Map progress (0→1) to horizontal shift
    // Total row width approx cards * (400+20) = ~2520px, visible ~window.innerWidth
    const totalWidth = CARD_IMAGES.length * 420;
    const maxShift = totalWidth - window.innerWidth + 200;
    const shift = progress * maxShift;

    const rowScale = 0.82 + progress * 0.18; // zoom in as we scroll
    rowRef.current.style.transform = `translateX(-${shift}px) scale(${rowScale})`;

    const cards = rowRef.current.querySelectorAll(".row-card");
    cards.forEach((card, i) => {
      const delay = i * 0.06;
      const p = clamp(progress * 1.5 - delay, 0, 1);
      card.style.opacity = p;
      card.style.transform = `translateY(${(1 - p) * 40}px)`;
    });
  }

  // ── Scroll handler ────────────────────────────────────────────────────────
  useEffect(() => {
    function onScroll() {
      if (!scrollRef.current) return;
      const rect = scrollRef.current.getBoundingClientRect();
      const scrollHeight = scrollRef.current.offsetHeight - window.innerHeight;
      const scrolled = clamp(-rect.top, 0, scrollHeight);
      const progress = scrolled / scrollHeight; // 0 → 1

      scrollYRef.current = progress;

      // Phase 1: 0 → 0.25 — zoom out the stack
      // Phase 2: 0.25 → 0.55 — transition from stack to row
      // Phase 3: 0.55 → 1.0 — horizontal row scroll

      if (progress < 0.25) {
        const p = progress / 0.25;
        const scale = 1 - easeInOut(p) * 0.22;
        applyStackTransform(tiltAngleRef.current, scale, 0);
        if (stackRef.current) stackRef.current.style.opacity = "1";
        if (rowRef.current) rowRef.current.style.opacity = "0";
        phaseRef.current = "stack";
        setPhase("stack");
      } else if (progress < 0.55) {
        const p = (progress - 0.25) / 0.3;
        const ease = easeInOut(p);
        // stack fades out
        applyStackTransform(tiltAngleRef.current, 1 - ease * 0.2, ease);
        if (stackRef.current) stackRef.current.style.opacity = `${1 - ease}`;
        // row fades in
        if (rowRef.current) {
          rowRef.current.style.opacity = `${ease}`;
          applyRowTransform(0);
        }
        phaseRef.current = "transition";
        setPhase("transition");
      } else {
        const p = (progress - 0.55) / 0.45;
        if (stackRef.current) stackRef.current.style.opacity = "0";
        if (rowRef.current) rowRef.current.style.opacity = "1";
        applyRowTransform(easeInOut(p));
        phaseRef.current = "row";
        setPhase("row");
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="hero-root">
        {/* ── Hero section (above scroll) ──────────────── */}
        <section className="hero-section">
          {/* Background trees */}
          <div className="hero-bg" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="hero-bg-tree">
                <TreeSVG />
              </div>
            ))}
          </div>

          {/* Hero text */}
          <div className="hero-content">
            <h1 className="hero-title">
              Transforming Your<br />
              Outdoor Space into<br />
              a <span>Paradise</span>
            </h1>
            <p className="hero-subtitle">
              We believe in combining innovative design, sustainable practices, and
              exceptional craftsmanship to bring your vision to life.
            </p>
            <button className="hero-cta">
              <span className="hero-cta-text">Get Started</span>
              <span className="hero-cta-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </span>
            </button>
          </div>

          {/* Stacked cards (pre-scroll) */}
          <div className="cards-stage">
            <div className="cards-stack" ref={stackRef}>
              {[...CARD_IMAGES].reverse().map((card, i) => (
                <div
                  key={card.id}
                  className="stack-card"
                  style={{ zIndex: CARD_IMAGES.length - i }}
                >
                  <div
                    className="stack-card-inner"
                    style={{ background: card.bg }}
                  >
                    {/* Decorative landscape silhouette */}
                    <svg
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "60%",
                        opacity: 0.35,
                      }}
                      viewBox="0 0 520 200"
                      preserveAspectRatio="none"
                      fill="none"
                    >
                      <path
                        d="M0 200 L0 120 Q60 60 130 100 Q180 130 220 80 Q280 20 340 70 Q390 110 440 60 Q480 20 520 80 L520 200 Z"
                        fill="rgba(0,0,0,0.4)"
                      />
                      <circle cx="80" cy="90" r="30" fill="rgba(0,80,0,0.5)" />
                      <circle cx="340" cy="55" r="22" fill="rgba(0,60,0,0.5)" />
                      <rect x="75" y="110" width="8" height="30" fill="rgba(80,50,20,0.6)" />
                      <rect x="335" y="68" width="6" height="22" fill="rgba(80,50,20,0.6)" />
                    </svg>
                    <span className="stack-card-label">{card.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Scroll-driven section ────────────────────── */}
        <div className="scroll-section" ref={scrollRef}>
          <div className="scroll-sticky">
            {/* Row of cards (shown during/after transition) */}
            <div
              ref={rowRef}
              className="cards-row"
              style={{ opacity: 0, transition: "none" }}
            >
              {CARD_IMAGES.map((card) => (
                <div
                  key={card.id}
                  className="row-card"
                  style={{ opacity: 0, transform: "translateY(40px)" }}
                >
                  <div
                    className="row-card-inner"
                    style={{ background: card.bg }}
                  >
                    <svg
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "60%",
                        opacity: 0.35,
                      }}
                      viewBox="0 0 400 200"
                      preserveAspectRatio="none"
                      fill="none"
                    >
                      <path
                        d="M0 200 L0 120 Q50 60 100 90 Q150 120 200 70 Q260 20 310 65 Q360 105 400 60 L400 200 Z"
                        fill="rgba(0,0,0,0.4)"
                      />
                      <circle cx="60" cy="85" r="25" fill="rgba(0,80,0,0.5)" />
                      <rect x="56" y="102" width="7" height="25" fill="rgba(80,50,20,0.6)" />
                    </svg>
                    <span className="row-card-label">{card.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="after-scroll" />
      </div>
    </>
  );
}