import React, { useRef, useEffect, useCallback, useLayoutEffect, useMemo } from "react";
import Lenis from "lenis";

// ─── Placeholder project thumbnail colors (simulating real photos) ───────────
const avatarColors = [
  { bg: "linear-gradient(135deg, #a8d8a8 0%, #4a7c3f 100%)", label: "P1" },
  { bg: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)", label: "P2" },
  { bg: "linear-gradient(135deg, #2c3e50 0%, #4a6741 100%)", label: "P3" },
];

// ─── Small SVG icons for the pills ──────────────────────────────────────────
const HomeIcon = () => (
  <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1L1 7h2v7h4v-4h2v4h4V7h2L8 1z" />
  </svg>
);
const PinIcon = () => (
  <svg width="10" height="11" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0C5.24 0 3 2.24 3 5c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5zm0 7.5C6.62 7.5 5.5 6.38 5.5 5S6.62 2.5 8 2.5 10.5 3.62 10.5 5 9.38 7.5 8 7.5z" />
  </svg>
);
const LeafIcon = () => (
  <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
    <path d="M2 14s1-1 4-1c2 0 3.5-1 4.5-2.5S12 6 15 2c-4 0-7 1-9 3.5S2 11 2 14z" />
  </svg>
);
const CaseStudyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round">
    <rect x="2" y="3" width="12" height="10" rx="1.5" />
    <path d="M5 7h6M5 10h4" />
  </svg>
);

// ─── Animated Arrow Button ───────────────────────────────────────────────────
const ViewProjectButton = () => {
  return (
    <div className="vp-btn-wrap" style={{ position: "relative", width: "100%", height: "56px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.3)", backgroundColor: "rgba(255,255,255,0.06)", overflow: "hidden", cursor: "pointer" }}>
      {/* Label text */}
      <span style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        fontFamily: "'Segoe UI', sans-serif",
        fontSize: "0.78rem",
        fontWeight: "600",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.85)",
        zIndex: 1,
        pointerEvents: "none",
        whiteSpace: "nowrap",
      }}>
        View Project
      </span>

      {/* Sliding green circle with arrow + tail */}
      <div className="vp-arrow-track" style={{ position: "absolute", top: "3px", bottom: "3px", left: "3px", right: "3px", width: "auto", height: "auto", zIndex: 2, pointerEvents: "none" }}>
        <div className="vp-arrow-circle" style={{
          width: "50px",
          height: "100%",
          borderRadius: "50%",
          backgroundColor: "#8CB45C",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          left: 0,
        }}>
          {/* Gradient tail trailing behind the circle */}
          <div style={{
            position: "absolute",
            right: "50%",
            top: "0",
            width: "140px",
            height: "100%",
            borderRadius: "25px 0 0 25px",
            background: "linear-gradient(to right, rgba(140,180,92,0), rgba(140,180,92,0.4) 40%, rgba(140,180,92,0.75))",
            pointerEvents: "none",
            zIndex: -1,
          }} />
          <svg width="18" height="18" viewBox="0 0 14 14" fill="none" style={{ position: "relative", zIndex: 1 }}>
            <path d="M2 7h10M9 4l3 3-3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// ─── Showcase Card (reusable) ────────────────────────────────────────────────
const ShowcaseCard = ({ bgImage, year = "2024", location = "INDIA", category = "FRA PROJECT", description = "" }) => (
  <div
    className="ps-card"
    style={{
      position: "relative",
      borderRadius: "20px",
      overflow: "hidden",
      height: "600px",
      cursor: "pointer",
    }}
  >
    {/* Background image */}
    <div
      className="ps-card-bg"
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />

    {/* Glassmorphism card */}
    <div
      className="ps-glass"
      style={{
        position: "absolute",
        top: "50%",
        right: "0",
        transform: "translateY(-50%)",
        width: "43%",
        height: "88%",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        backgroundColor: "rgba(255,255,255,0.08)",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "28px 30px",
        border: "2px solid rgba(180,180,180,0.4)",
        marginRight: "22px",
      }}
    >
      <div>
        {/* Case study label */}
        <div className="ps-case-label" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <CaseStudyIcon />
          <div className="ps-case-line" style={{ flex: 1, height: "1px", backgroundColor: "rgba(255,255,255,0.25)" }} />
          <span className="ps-case-text" style={{
            fontFamily: "'Segoe UI', sans-serif",
            fontSize: "0.68rem",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.75)",
            textTransform: "uppercase",
            fontWeight: "500",
          }}>Case Study</span>
        </div>

        {/* Pill tags */}
        <div className="ps-tags" style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
          {[
            { icon: <HomeIcon />, label: year },
            { icon: <PinIcon />, label: location },
            { icon: <LeafIcon />, label: category },
          ].map((tag) => (
            <div
              key={tag.label}
              className="ps-tag-pill"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "5px 12px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.3)",
                backgroundColor: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.9)",
                fontSize: "0.65rem",
                fontWeight: "500",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontFamily: "'Segoe UI', sans-serif",
              }}
            >
              <span style={{ opacity: 0.85 }}>{tag.icon}</span>
              {tag.label}
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="ps-desc" style={{
          fontFamily: "'Segoe UI', sans-serif",
          fontSize: "0.9rem",
          color: "rgba(255,255,255,0.92)",
          lineHeight: 1.75,
          margin: 0,
        }}>
          {description || "Pench Forest Division in Madhya Pradesh completed a large-scale IFR digitization drive, processing over 12,000 individual forest rights claims. The FRA Atlas platform enabled district-level officers to verify satellite asset maps, approve titles and trigger automatic CSS scheme matching for patta holders via the integrated DSS."}
        </p>
      </div>

      {/* Animated View Project button */}
      <ViewProjectButton />
    </div>
  </div>
);

// ─── ScrollStackItem (inline) ────────────────────────────────────────────────
function ScrollStackItem({ children, style, className = "", ...rest }) {
  return (
    <div className={`scroll-stack-card ${className}`} style={style} {...rest}>
      {children}
    </div>
  );
}

// ─── ScrollStack (inline) ────────────────────────────────────────────────────
function ScrollStack({
  children,
  itemDistance = 100,
  stackPosition = "20%",
  baseScale = 0.85,
  enableRotation = false,
  rotationRange = 2,
  enableBlur = false,
  blurRange = 4,
  className = "",
  style = {},
  lenisOptions = {},
}) {
  const innerRef = useRef(null);
  const lenisRef = useRef(null);
  const rafRef = useRef(null);
  const isMobileRef = useRef(window.innerWidth <= 680);

  const parseToPx = useCallback((value, containerHeight) => {
    if (typeof value === "number") return value;
    const str = String(value).trim();
    if (str.endsWith("%")) return (parseFloat(str) / 100) * containerHeight;
    if (str.endsWith("vh")) return (parseFloat(str) / 100) * window.innerHeight;
    if (str.endsWith("px")) return parseFloat(str);
    return parseFloat(str) || 0;
  }, []);

  const updateCards = useCallback(() => {
    const inner = innerRef.current;
    if (!inner) return;

    const wrappers = Array.from(
      inner.querySelectorAll(":scope > .scroll-stack-card-wrapper")
    );
    const cards = wrappers.map((w) => w.querySelector(".scroll-stack-card"));
    if (!cards.length || cards.some((c) => !c)) return;

    // On mobile, reset all inline styles and let CSS handle layout
    if (isMobileRef.current) {
      cards.forEach((card) => {
        card.style.position = "";
        card.style.top = "";
        card.style.left = "";
        card.style.width = "";
        card.style.transform = "";
        card.style.opacity = "";
        card.style.filter = "";
        card.style.zIndex = "";
        card.style.pointerEvents = "";
      });
      return;
    }

    const containerHeight = window.innerHeight;
    const stackPos = parseToPx(stackPosition, containerHeight);
    const totalCards = cards.length;
    const innerRect = inner.getBoundingClientRect();

    cards.forEach((card, i) => {
      const wrapper = wrappers[i];
      const wrapperRect = wrapper.getBoundingClientRect();
      const remainingCards = totalCards - i - 1;
      const isLast = i === totalCards - 1;
      const shouldPin = wrapperRect.top <= stackPos;
      let progress = 0;

      // Check if this card's section has fully scrolled past
      // (wrapper bottom is above the stack position = card is done)
      const wrapperDone = wrapperRect.bottom <= stackPos;

      if (!shouldPin) {
        // ── BEFORE: card hasn't reached pin point, scrolls normally ──
        card.style.position = "relative";
        card.style.top = "";
        card.style.left = "";
        card.style.width = "";
        card.style.transform = "";
        card.style.opacity = "1";
        card.style.filter = "";
        card.style.pointerEvents = "";
      } else if (wrapperDone) {
        // ── AFTER: card's wrapper has scrolled past — unpin it ──
        // Place it at the bottom of its wrapper so it scrolls away naturally
        card.style.position = "absolute";
        card.style.bottom = "0";
        card.style.top = "auto";
        card.style.left = "0";
        card.style.width = "100%";
        card.style.transform = `scale(${baseScale})`;
        card.style.opacity = "0";
        card.style.filter = "";
        card.style.pointerEvents = "none";
      } else {
        // ── PINNED: card is fixed at stackPos ──
        card.style.position = "fixed";
        card.style.top = `${stackPos}px`;
        card.style.left = `${wrapperRect.left}px`;
        card.style.width = `${wrapperRect.width}px`;
        card.style.bottom = "";

        if (remainingCards > 0 && wrappers[i + 1]) {
          const nextTop = wrappers[i + 1].getBoundingClientRect().top;
          const travelDist = containerHeight - stackPos;
          if (travelDist > 0) {
            progress = Math.max(0, Math.min(1, 1 - (nextTop - stackPos) / travelDist));
          }
        }

        // For the last card: unfix when scroll-stack-inner ends
        if (isLast) {
          const cardHeight = card.offsetHeight;
          const cardBottom = stackPos + cardHeight;
          if (innerRect.bottom < cardBottom) {
            const shift = innerRect.bottom - cardBottom;
            card.style.top = `${stackPos + shift}px`;
          }
        }

        const easedProgress = progress * progress;
        const scale = 1 - easedProgress * (1 - baseScale);
        const opacity = Math.max(0.05, 1 - easedProgress * 0.95);

        let transformStr = `scale(${scale})`;
        if (enableRotation && progress > 0) {
          const rot = easedProgress * rotationRange * (i % 2 === 0 ? 1 : -1);
          transformStr += ` rotate(${rot}deg)`;
        }

        card.style.transform = transformStr;
        card.style.opacity = String(opacity);
        card.style.pointerEvents = progress >= 1 ? "none" : "";

        if (enableBlur && progress > 0) {
          card.style.filter = `blur(${easedProgress * blurRange}px)`;
        } else {
          card.style.filter = "";
        }
      }

      card.style.zIndex = String(i + 1);
    });

  }, [stackPosition, baseScale, enableRotation, rotationRange, enableBlur, blurRange, parseToPx]);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      ...lenisOptions,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      updateCards();
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);
    updateCards();

    return () => {
      lenis.destroy();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateCards, lenisOptions]);

  useEffect(() => {
    const handleResize = () => {
      isMobileRef.current = window.innerWidth <= 680;
      updateCards();
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [updateCards]);

  const childArray = useMemo(() => React.Children.toArray(children), [children]);

  return (
    <div ref={innerRef} className={`scroll-stack-inner ${className}`} style={style}>
      {childArray.map((child, i) => (
        <div key={i} className="scroll-stack-card-wrapper" style={{ minHeight: `${itemDistance}vh` }}>
          {child}
        </div>
      ))}
      <div className="scroll-stack-end" />
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
const ProjectsShowcase = () => {
  return (
    <div
      className="ps-wrapper"
      style={{
        fontFamily: "'Segoe UI', sans-serif",
        backgroundColor: "#ffffff",
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "48px 52px 0 52px",
        overflow: "hidden",
      }}
    >
      {/* ── Responsive + Arrow animation styles ── */}
      <style>{`
        /* ── ScrollStack base styles ── */
        .scroll-stack-inner {
          position: relative;
          width: 100%;
        }
        .scroll-stack-card-wrapper {
          position: relative;
        }
        .scroll-stack-card {
          transform-origin: top center;
          will-change: transform, filter, opacity;
          width: 100%;
          box-sizing: border-box;
        }
        .scroll-stack-end {
          width: 100%;
          height: 10px;
        }

        /* Arrow sliding animation */
        @keyframes slideArrow {
          0% {
            left: 0;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            left: calc(100% - 50px);
            opacity: 0;
          }
        }

        .vp-arrow-circle {
          animation: slideArrow 2s cubic-bezier(0.25, 0.1, 0.25, 1) infinite;
        }

        .vp-btn-wrap:hover .vp-arrow-circle {
          animation-duration: 1.4s;
        }

        /* ── ScrollStack overrides for our cards ── */
        .ps-scroll-stack .scroll-stack-card {
          background: transparent;
        }
        .ps-scroll-stack .scroll-stack-card-wrapper {
          min-height: 80vh;
        }
        .ps-scroll-stack .scroll-stack-end {
          height: 10px;
        }

        /* ── 900px breakpoint ── */
        @media (max-width: 900px) {
          .ps-wrapper {
            padding: 36px 28px 0px 28px !important;
          }
          .ps-card {
            height: 500px !important;
          }
          .ps-glass {
            width: 50% !important;
            height: 90% !important;
            padding: 22px 22px !important;
            margin-right: 14px !important;
          }
          .ps-desc {
            font-size: 0.82rem !important;
          }
        }

        /* ── 680px breakpoint ── */
        @media (max-width: 680px) {
          .ps-wrapper {
            padding: 28px 16px 0px 16px !important;
          }
          .ps-wrapper h2 {
            font-size: 1.5rem !important;
          }
          .ps-card {
            height: auto !important;
            min-height: auto !important;
            display: flex !important;
            flex-direction: column !important;
            border-radius: 20px !important;
            overflow: hidden !important;
          }
          .ps-card-bg {
            position: relative !important;
            height: 220px !important;
            width: 100% !important;
            flex-shrink: 0 !important;
            border-radius: 20px 20px 0 0 !important;
          }
          .ps-glass {
            position: relative !important;
            width: 100% !important;
            height: auto !important;
            top: auto !important;
            right: auto !important;
            transform: none !important;
            margin: 0 !important;
            border-radius: 0 0 16px 16px !important;
            padding: 24px 20px !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            background-color: #1a2e1a !important;
            border: none !important;
            border-top: 2px solid rgba(180,180,180,0.25) !important;
          }
          .ps-case-line {
            background-color: rgba(255,255,255,0.2) !important;
          }
          .ps-tags {
            gap: 6px !important;
            margin-bottom: 18px !important;
          }
          .ps-desc {
            font-size: 0.8rem !important;
            line-height: 1.6 !important;
          }
          .vp-btn-wrap {
            height: 50px !important;
          }
          .vp-arrow-track {
            height: auto !important;
          }
          .vp-arrow-circle {
            width: 40px !important;
          }
          @keyframes slideArrow {
            0% { left: 0; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { left: calc(100% - 40px); opacity: 0; }
          }

          /* Disable scroll stack on mobile */
          .ps-scroll-stack .scroll-stack-card-wrapper {
            min-height: auto !important;
          }
          .ps-scroll-stack .scroll-stack-card {
            position: relative !important;
            transform: none !important;
            top: auto !important;
            left: auto !important;
            width: 100% !important;
            opacity: 1 !important;
            filter: none !important;
            margin-bottom: 32px !important;
          }
          .ps-scroll-stack .scroll-stack-end {
            height: 1px !important;
          }
          .ps-caption {
            margin: 10px 0 24px 4px !important;
          }
        }

        /* ── 420px breakpoint ── */
        @media (max-width: 420px) {
          .ps-wrapper {
            padding: 20px 10px 0px 10px !important;
          }
          .ps-wrapper h2 {
            font-size: 1.25rem !important;
            margin-bottom: 16px !important;
          }
          .ps-card-bg {
            height: 180px !important;
          }
          .ps-glass {
            padding: 18px 14px !important;
          }
          .ps-tag-pill {
            padding: 4px 8px !important;
            font-size: 0.55rem !important;
          }
          .ps-desc {
            font-size: 0.72rem !important;
          }
          .vp-btn-wrap {
            height: 44px !important;
            border-radius: 10px !important;
          }
          .vp-btn-wrap span {
            font-size: 0.68rem !important;
          }
          .vp-arrow-circle {
            width: 36px !important;
          }
          @keyframes slideArrow {
            0% { left: 0; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { left: calc(100% - 36px); opacity: 0; }
          }
        }
      `}</style>

      {/* ── Heading ── */}
      <h2
        style={{
          fontFamily: "'Georgia', serif",
          fontSize: "2rem",
          fontWeight: "700",
          color: "#111111",
          textAlign: "center",
          margin: "0 0 22px 0",
          letterSpacing: "-0.01em",
        }}
      >
        Explore FRA Implementation Across Focus States
      </h2>

      {/* ── Avatar cluster ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "36px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {avatarColors.map((av, i) => (
            <div
              key={i}
              style={{
                width: "54px",
                height: "54px",
                borderRadius: "50%",
                background: av.bg,
                border: "3px solid #ffffff",
                marginLeft: i === 0 ? "0" : "-14px",
                zIndex: i + 1,
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {i === 0 && (
                <>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "rgba(74,124,63,0.8)" }} />
                  <div style={{ position: "absolute", top: "10%", left: "20%", width: "20px", height: "20px", borderRadius: "50%", background: "rgba(255,255,255,0.7)" }} />
                </>
              )}
              {i === 1 && (
                <>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", background: "rgba(74,124,63,0.9)" }} />
                  <div style={{ position: "absolute", top: "8%", right: "10%", width: "16px", height: "16px", borderRadius: "50%", background: "rgba(253,160,133,0.8)" }} />
                </>
              )}
              {i === 2 && (
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,#2c3e50 40%,#4a6741 100%)" }} />
              )}
            </div>
          ))}

          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "#263E27",
              border: "3px solid #ffffff",
              marginLeft: "-14px",
              zIndex: 5,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                fontFamily: "'Segoe UI', sans-serif",
                fontSize: "0.6rem",
                fontWeight: "600",
                color: "#ffffff",
                textAlign: "center",
                lineHeight: 1.2,
                letterSpacing: "0.02em",
                textTransform: "none",
              }}
            >
              All<br />Projects
            </span>
          </div>
        </div>
      </div>

      {/* ── Showcase Cards with ScrollStack ── */}
      <ScrollStack
        className="ps-scroll-stack"
        itemDistance={80}
        stackPosition="20%"
        baseScale={0.85}
      >
        <ScrollStackItem>
          <ShowcaseCard
            bgImage="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=90&fit=crop"
            year="2024"
            location="MADHYA PRADESH"
            category="IFR TITLE MAPPING"
            description="Pench Forest Division completed a large-scale IFR digitization drive, processing over 12,000 individual forest rights claims. Officers verified satellite asset maps and triggered automatic CSS scheme matching via the integrated DSS."
          />
          <p className="ps-caption" style={{ fontFamily: "'Segoe UI', sans-serif", fontSize: "0.9rem", color: "#222222", fontWeight: "400", margin: "14px 0 0 4px" }}>
            MP — IFR Pilot Implementation
          </p>
        </ScrollStackItem>

        <ScrollStackItem>
          <ShowcaseCard
            bgImage="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=90&fit=crop"
            year="2024"
            location="TRIPURA"
            category="CFR COMMUNITY MAPPING"
            description="West Tripura district mapped 340 gram sabha CFR boundaries using the VanMitra WebGIS platform. AI-derived satellite land cover analysis confirmed forest extents, enabling community rights to be formally recognized and updated in the FRA Atlas."
          />
          <p className="ps-caption" style={{ fontFamily: "'Segoe UI', sans-serif", fontSize: "0.9rem", color: "#222222", fontWeight: "400", margin: "14px 0 0 4px" }}>
            Tripura — CFR Community Mapping
          </p>
        </ScrollStackItem>

        <ScrollStackItem>
          <ShowcaseCard
            bgImage="https://images.unsplash.com/photo-1511497584788-876760111969?w=1200&q=90&fit=crop"
            year="2025"
            location="ODISHA"
            category="LEGACY DATA DIGITIZATION"
            description="Koraput district successfully digitized over 28,000 legacy paper-based FRA records spanning 15 years of IFR, CR and CFR documentation. Geo-tagged titles were cross-referenced with satellite imagery, enabling end-to-end DSS scheme eligibility computation."
          />
          <p className="ps-caption" style={{ fontFamily: "'Segoe UI', sans-serif", fontSize: "0.9rem", color: "#222222", fontWeight: "400", margin: "14px 0 0 4px" }}>
            Odisha — Legacy Record Digitization
          </p>
        </ScrollStackItem>
      </ScrollStack>
    </div>
  );
};

export default ProjectsShowcase;
