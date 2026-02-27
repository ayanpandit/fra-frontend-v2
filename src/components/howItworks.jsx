import React, { useRef, useEffect } from "react";

const steps = [
  {
    num: "01",
    accent: "#8CB45C",
    label: "Community",
    title: "A Family Raises Their Hand",
    body: "Every journey starts in a Gram Sabha. A family describes the land they live on. A trained field officer records the claim — boundaries, land use, encumbrances — on a geo-enabled tablet. The data is encrypted, timestamped, and uploaded the moment connectivity returns.",
    detail: "Gram Sabha-driven · Offline-first field app · Geo-tagged boundaries",
    image: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1100&q=90&fit=crop",
    imageCaption: "Filed at the village level",
  },
  {
    num: "02",
    accent: "#6fa8dc",
    label: "Technology",
    title: "Satellites Read the Land",
    body: "The claim triggers an automated satellite analysis pipeline. Multi-spectral imagery, terrain models, and 20+ years of NDVI time-series data are processed by ML models trained on verified FRA cases. The system distinguishes a family farm from a seasonal encroachment — in minutes.",
    detail: "Sentinel-2 · Cartosat-3 · NDVI time-series · ML classification",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1100&q=90&fit=crop",
    imageCaption: "AI + Earth Observation",
  },
  {
    num: "03",
    accent: "#d4a017",
    label: "Rights & Benefits",
    title: "Title Unlocks a Life",
    body: "Once verified and approved, the system generates the official patta document. Simultaneously, it links the beneficiary to 14+ government welfare schemes — PM Awas, crop insurance, forest produce MSP, scholarships — converting a piece of paper into a pipeline of opportunity.",
    detail: "Auto-generated patta · 14+ scheme linkages · PM Awas · Direct Benefit Transfer",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1100&q=90&fit=crop",
    imageCaption: "Rights become resources",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("hiw-vis")),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".hiw-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "#ffffff",
        padding: "120px 0 140px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        .hiw-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.78s cubic-bezier(.25,.8,.25,1), transform 0.78s cubic-bezier(.25,.8,.25,1);
        }
        .hiw-reveal.hiw-delay-1 { transition-delay: 0.1s; }
        .hiw-reveal.hiw-delay-2 { transition-delay: 0.2s; }
        .hiw-reveal.hiw-delay-3 { transition-delay: 0.3s; }
        .hiw-vis {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .hiw-step-img {
          transition: transform 0.7s cubic-bezier(.25,.8,.25,1);
        }
        .hiw-step:hover .hiw-step-img {
          transform: scale(1.03);
        }
        .hiw-chip-tag {
          transition: background 0.2s;
        }
        .hiw-detail-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          background: rgba(0,0,0,0.05);
          border-radius: 999px;
          font-size: 0.72rem;
          font-family: 'Segoe UI', sans-serif;
          color: #555;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }
        @media (max-width: 900px) {
          .hiw-step-inner { flex-direction: column !important; }
          .hiw-step-img-col { width: 100% !important; height: 320px !important; }
        }
      `}</style>

      {/* Faint decorative circles */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          right: "-120px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          border: "1px solid rgba(140,180,92,0.1)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-80px",
          left: "-80px",
          width: "340px",
          height: "340px",
          borderRadius: "50%",
          border: "1px solid rgba(140,180,92,0.08)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 48px" }}>
        {/* Header */}
        <div
          className="hiw-reveal"
          style={{ maxWidth: "680px", marginBottom: "80px" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor: "#f3f3f3",
              borderRadius: "999px",
              padding: "7px 18px 7px 14px",
              marginBottom: "24px",
            }}
          >
            <div style={{ height: "1px", width: "36px", backgroundColor: "#aaaaaa" }} />
            <span
              style={{
                fontSize: "0.8rem",
                letterSpacing: "0.16em",
                color: "#888888",
                textTransform: "uppercase",
                fontWeight: "500",
                fontFamily: "'Segoe UI', sans-serif",
              }}
            >
              How It Works
            </span>
            <div style={{ height: "1px", width: "36px", backgroundColor: "#aaaaaa" }} />
          </div>

          <h2
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
              fontWeight: "700",
              color: "#1a2b1b",
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            Three Steps from Claim
            <br />
            to Certainty.
          </h2>

          <p
            style={{
              fontFamily: "'Segoe UI', sans-serif",
              fontSize: "1rem",
              color: "#666",
              lineHeight: 1.75,
            }}
          >
            VanMitra is built for the last mile — where connectivity is patchy, literacy varies, and trust must be earned. A seamless pipeline from field to satellite to title deed.
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {steps.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={i}
                className={`hiw-step hiw-reveal hiw-delay-${i + 1}`}
                style={{
                  borderRadius: "24px",
                  overflow: "hidden",
                  backgroundColor: "#f9f8f4",
                  boxShadow: "0 4px 32px rgba(0,0,0,0.07)",
                }}
              >
                <div
                  className="hiw-step-inner"
                  style={{
                    display: "flex",
                    flexDirection: isEven ? "row" : "row-reverse",
                    minHeight: "420px",
                  }}
                >
                  {/* Image column */}
                  <div
                    className="hiw-step-img-col"
                    style={{
                      width: "48%",
                      position: "relative",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={step.image}
                      alt={step.title}
                      className="hiw-step-img"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    {/* Caption chip */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "24px",
                        [isEven ? "left" : "right"]: "24px",
                        backgroundColor: "rgba(0,0,0,0.55)",
                        backdropFilter: "blur(8px)",
                        color: "#fff",
                        fontSize: "0.72rem",
                        fontFamily: "'Segoe UI', sans-serif",
                        fontWeight: "600",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "6px 16px",
                        borderRadius: "999px",
                      }}
                    >
                      {step.imageCaption}
                    </div>
                  </div>

                  {/* Text column */}
                  <div
                    style={{
                      flex: 1,
                      padding: "56px 60px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    {/* Watermark number */}
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "28px",
                        fontFamily: "'Georgia', serif",
                        fontSize: "8rem",
                        fontWeight: "700",
                        color: "rgba(0,0,0,0.04)",
                        lineHeight: 1,
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                    >
                      {step.num}
                    </div>

                    {/* Label */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          backgroundColor: step.accent,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.68rem",
                            fontWeight: "700",
                            color: "#fff",
                            fontFamily: "'Segoe UI', sans-serif",
                          }}
                        >
                          {step.num}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: step.accent,
                          fontFamily: "'Segoe UI', sans-serif",
                          fontWeight: "600",
                        }}
                      >
                        {step.label}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: "'Georgia', serif",
                        fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)",
                        fontWeight: "700",
                        color: "#1a2b1b",
                        lineHeight: 1.25,
                        marginBottom: "18px",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {step.title}
                    </h3>

                    <p
                      style={{
                        fontFamily: "'Segoe UI', sans-serif",
                        fontSize: "0.97rem",
                        color: "#555",
                        lineHeight: 1.8,
                        marginBottom: "28px",
                        maxWidth: "440px",
                      }}
                    >
                      {step.body}
                    </p>

                    {/* Tech detail pills */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {step.detail.split(" · ").map((d, j) => (
                        <span key={j} className="hiw-detail-item">
                          <span
                            style={{
                              width: "5px",
                              height: "5px",
                              borderRadius: "50%",
                              backgroundColor: step.accent,
                              display: "inline-block",
                              flexShrink: 0,
                            }}
                          />
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
// --- IGNORE ---