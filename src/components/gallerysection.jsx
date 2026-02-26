import React, { useEffect, useRef } from "react";

// ─── Scroll‑reveal helper (shared with sibling sections) ─────────────────────
function useScrollReveal(selector = ".sr5") {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("sr5-visible"); }),
      { threshold: 0.12 }
    );
    ref.current?.querySelectorAll(selector).forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [selector]);
  return ref;
}

// ─── Wavy SVG Pattern ────────────────────────────────────────────────────────
const WavyPattern = ({ color = "rgba(255,255,255,0.07)", id }) => (
  <svg
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      borderRadius: "inherit",
      pointerEvents: "none",
    }}
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <pattern id={id} x="0" y="0" width="60" height="18" patternUnits="userSpaceOnUse">
        <path
          d="M0 9 C10 3, 20 3, 30 9 C40 15, 50 15, 60 9"
          fill="none"
          stroke={color}
          strokeWidth="1.8"
        />
        <path
          d="M0 18 C10 12, 20 12, 30 18 C40 24, 50 24, 60 18"
          fill="none"
          stroke={color}
          strokeWidth="1.8"
        />
        <path
          d="M0 0 C10 -6, 20 -6, 30 0 C40 6, 50 6, 60 0"
          fill="none"
          stroke={color}
          strokeWidth="1.8"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
);

// ─── Rotating "VIEW GALLERY" Badge ───────────────────────────────────────────
const ViewGalleryBadge = () => {
  const spinRef = useRef(null);
  const cx = 70, cy = 70, radius = 52;
  const text = "✦ VIEW ATLAS ✦ VIEW ATLAS ✦ VIEW ATLAS ";

  useEffect(() => {
    let angle = 0;
    let raf;
    const spin = () => {
      angle = (angle + 0.35) % 360;
      if (spinRef.current) {
        spinRef.current.setAttribute("transform", `rotate(${angle} ${cx} ${cy})`);
      }
      raf = requestAnimationFrame(spin);
    };
    raf = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg
      width="142"
      height="142"
      viewBox="0 0 140 140"
      style={{ cursor: "pointer", display: "block" }}
    >
      {/* Outer amber ring */}
      <circle cx={cx} cy={cy} r={66} fill="#F5C15A" />
      <circle cx={cx} cy={cy} r={60} fill="#F5C15A" />

      {/* Rotating text ring */}
      <g ref={spinRef}>
        <defs>
          <path
            id="badge-arc"
            d={`M ${cx} ${cy - radius} A ${radius} ${radius} 0 1 1 ${cx - 0.001} ${cy - radius}`}
          />
        </defs>
        <text
          fontFamily="'Segoe UI', sans-serif"
          fontSize="12"
          fontWeight="900"
          fill="#1a2b1b"
          letterSpacing="1"
        >
          <textPath href="#badge-arc" startOffset="0%">
            {text}
          </textPath>
        </text>
      </g>

      {/* Inner dark green circle */}
      <circle cx={cx} cy={cy} r={40} fill="#F3D497" />

      {/* Arrow → (larger) */}
      <path
        d="M46 70 L94 70 M78 54 L94 70 L78 86"
        stroke="#283019"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

// ─── Main Export ─────────────────────────────────────────────────────────────
const GallerySection = () => {
  const sectionRef = useScrollReveal(".sr5");
  return (
    <div
      ref={sectionRef}
      className="gs-wrapper"
      style={{
        fontFamily: "'Segoe UI', sans-serif",
        backgroundColor: "#ffffff",
        padding: "52px 52px 56px 52px",
        maxWidth: "1460px",
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      {/*
        ══════════════════════════════════════════════
        3 COLS × 2 ROWS GRID
        Col widths : [44%] [20%] [36%]
        ══════════════════════════════════════════════
      */}
      <div
        className="gs-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "44% 20% 36%",
          gridTemplateRows: "auto auto",
          columnGap: "14px",
          rowGap: "14px",
        }}
      >
        {/* ════════ ROW 1 ════════ */}

        {/* R1·C1 — Heading text block */}
        <div
          className="gs-text"
          style={{
            gridColumn: "1",
            gridRow: "1",
            paddingRight: "16px",
            alignSelf: "start",
            paddingTop: "4px",
          }}
        >
          {/* SEEN FROM ABOVE pill label */}
          <div
            className="sr5"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              border: "1px solid #dddddd",
              borderRadius: "999px",
              padding: "5px 16px",
              marginBottom: "20px",
            }}
          >
            <div style={{ height: "1px", width: "26px", backgroundColor: "#aaaaaa" }} />
            <span
              style={{
                fontFamily: "'Segoe UI', sans-serif",
                fontSize: "0.68rem",
                letterSpacing: "0.18em",
                color: "#888888",
                textTransform: "uppercase",
                fontWeight: "500",
              }}
            >
              Seen from Above
            </span>
            <div style={{ height: "1px", width: "26px", backgroundColor: "#aaaaaa" }} />
          </div>

          <h2
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "2.1rem",
              fontWeight: "700",
              color: "#111111",
              lineHeight: 1.2,
              margin: "0 0 18px 0",
              letterSpacing: "-0.015em",
            }}
          >
            Every Village. Every Field.
            <br />Every Forest — Now Visible.
          </h2>

          <p
            style={{
              fontFamily: "'Segoe UI', sans-serif",
              fontSize: "0.88rem",
              color: "#666666",
              lineHeight: 1.72,
              margin: 0,
            }}
          >
            Our satellite AI surveys forests from 650 km above the Earth.
            Our field teams verify on the ground. Together, they build
            the most accurate picture of tribal land in India — and turn
            it into legal, actionable rights.
          </p>
        </div>

        {/* R1·C2 — Top center photo: modern house with lush stepped garden + red flowers */}
        <div
          className="gs-photo-center"
          style={{
            gridColumn: "2",
            gridRow: "1",
            borderRadius: "18px",
            overflow: "hidden",
            height: "374px",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=700&q=88&fit=crop"
            alt="Tribal community gathering in a forest village"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* R1·C3 + R2·C3 — Spans both rows in column 3 */}
        <div
          className="gs-col3"
          style={{
            gridColumn: "3",
            gridRow: "1 / 3",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {/* Top: sunset luxury house with stone path (taller) */}
          <div
            className="gs-photo-sunset"
            style={{
              borderRadius: "18px",
              overflow: "hidden",
              height: "520px",
              flexShrink: 0,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=900&q=88&fit=crop"
              alt="Satellite view of Earth — forest and land from orbit"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Bottom: dark badge card with spinning VIEW GALLERY badge (shorter) */}
            <div
              className="gallery-badge-card"
              style={{
                borderRadius: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                boxSizing: "border-box",
              }}
            >
              <ViewGalleryBadge />
            </div>
        </div>

        {/* ════════ ROW 2 ════════ */}

        {/* R2·C1 — Wide bottom-left photo: golden hour panoramic lawn */}
        <div
          className="gs-photo-lawn"
          style={{
            gridColumn: "1",
            gridRow: "2",
            borderRadius: "18px",
            overflow: "hidden",
            height: "366px",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&q=88&fit=crop"
            alt="Topographic map used for tribal land survey"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* R2·C2 — Two stat cards stacked */}
        <div
          className="gs-stats"
          style={{
            gridColumn: "2",
            gridRow: "2",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            height: "366px",
            boxSizing: "border-box",
          }}
        >
          {/* Dark green stat card — 10 Exclusive Albums */}
          <div
            style={{
              position: "relative",
              backgroundColor: "#3a4d20",
              borderRadius: "16px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              boxSizing: "border-box",
            }}
          >
            <WavyPattern color="rgba(255,255,255,0.075)" id="wave-dark" />
            <span
              style={{
                position: "relative",
                zIndex: 1,
                fontFamily: "'Georgia', serif",
                fontSize: "3.8rem",
                fontWeight: "700",
                color: "#d4a017",
                lineHeight: 1,
                marginBottom: "9px",
                letterSpacing: "-2px",
              }}
            >
              4
            </span>
            <span
              style={{
                position: "relative",
                zIndex: 1,
                fontFamily: "'Segoe UI', sans-serif",
                fontSize: "0.78rem",
                color: "rgba(255,255,255,0.85)",
                fontWeight: "400",
                letterSpacing: "0.01em",
              }}
            >
              Focus States
            </span>
          </div>

          {/* Light gray stat card — 200+ Photo Samples */}
          <div
            style={{
              position: "relative",
              backgroundColor: "#eeeeec",
              borderRadius: "16px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              boxSizing: "border-box",
            }}
          >
            <WavyPattern color="rgba(0,0,0,0.055)" id="wave-light" />
            <span
              style={{
                position: "relative",
                zIndex: 1,
                fontFamily: "'Georgia', serif",
                fontSize: "3.8rem",
                fontWeight: "700",
                color: "#1a2b1b",
                lineHeight: 1,
                marginBottom: "9px",
                letterSpacing: "-2px",
              }}
            >
              200+
            </span>
            <span
              style={{
                position: "relative",
                zIndex: 1,
                fontFamily: "'Segoe UI', sans-serif",
                fontSize: "0.78rem",
                color: "#777777",
                fontWeight: "400",
                letterSpacing: "0.01em",
              }}
            >
              GIS Layers
            </span>
          </div>
        </div>
      </div>
      {/* Local hover style for badge card (move to top-level for global effect) */}
      <style>{`
        .sr5 {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.68s ease, transform 0.68s ease;
        }
        .sr5-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .gallery-badge-card {
          background: #2c3b16;
          transition: background 0.9s cubic-bezier(.4,0,.2,1),
                      transform 0.9s cubic-bezier(.4,0,.2,1);
        }
        .gallery-badge-card:hover {
          background: #eeeeec;
          transform: scale(0.89);
        }

        /* ── Tablet (768px – 1023px) ── */
        @media (min-width: 768px) and (max-width: 1023px) {
          .gs-wrapper { padding: 40px 32px 44px 32px !important; }
          .gs-grid {
            grid-template-columns: 50% 50% !important;
            grid-template-rows: auto auto auto auto !important;
          }
          .gs-text  { grid-column: 1 / 3 !important; grid-row: 1 !important; padding-right: 0 !important; }
          .gs-photo-center { grid-column: 1 !important; grid-row: 2 !important; height: 280px !important; }
          .gs-col3  { grid-column: 2 !important; grid-row: 2 / 5 !important; }
          .gs-photo-sunset { height: 360px !important; }
          .gs-col3 .gallery-badge-card { min-height: 180px; }
          .gs-photo-lawn { grid-column: 1 !important; grid-row: 3 !important; height: 210px !important; }
          .gs-stats { grid-column: 1 !important; grid-row: 4 !important; height: auto !important; flex-direction: row !important; min-height: 120px; }
        }

        /* ── Mobile (< 768px) ── */
        @media (max-width: 767px) {
          .gs-wrapper { padding: 28px 18px 32px 18px !important; }
          .gs-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 12px !important;
          }
          .gs-text  { padding-right: 0 !important; }
          .gs-text h2 { font-size: 1.55rem !important; }
          .gs-photo-center { height: 230px !important; }
          .gs-photo-sunset { height: 260px !important; }
          .gs-col3 .gallery-badge-card { flex: none !important; height: 150px !important; }
          .gs-photo-lawn { height: 230px !important; }
          .gs-stats { height: auto !important; flex-direction: row !important; min-height: 120px; }
          .gallery-badge-card:hover { transform: none; }
        }
      `}</style>
    </div>
  );
};

export default GallerySection;