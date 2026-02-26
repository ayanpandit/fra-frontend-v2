import React, { useState, useRef, useCallback, useEffect } from "react";

// ─── Impact Cards Data ────────────────────────────────────────────────────────

const impactCards = [
  {
    id: 1,
    photo: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=700&q=85&fit=crop",
    stat: "12,000+",
    label: "Families",
    story: "Individual Forest Rights titles digitally processed for tribal families across MP, Odisha & Tripura.",
    accent: "#5a8a3c",
  },
  {
    id: 2,
    photo: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=700&q=85&fit=crop",
    stat: "340+",
    label: "Villages",
    story: "Forest-dwelling gram sabhas with CFR rights boundaries mapped and secured on the GIS atlas.",
    accent: "#3e6e5e",
  },
  {
    id: 3,
    photo: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=85&fit=crop",
    stat: "1.2M ha",
    label: "Forest Land",
    story: "Satellite AI has surveyed, classified and validated forest cover, water bodies and cultivable land.",
    accent: "#6a7c3e",
  },
  {
    id: 4,
    photo: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&q=85&fit=crop",
    stat: "₹480 Cr+",
    label: "Benefits Unlocked",
    story: "CSS scheme benefits — PM-KISAN, JJM, MGNREGA — converged directly to verified patta holders via DSS.",
    accent: "#4a6e8a",
  },
];

// ─── Service Icons (FRA-domain) ───────────────────────────────────────────────

const icons = {
  commercial: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4a017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="7" height="9" rx="1" /><rect x="13" y="4" width="7" height="5" rx="1" />
      <rect x="4" y="16" width="4" height="4" rx="1" /><rect x="10" y="11" width="10" height="9" rx="1" />
    </svg>
  ),
  landscape: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4a017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="4" /><line x1="12" y1="13" x2="12" y2="20" />
      <path d="M8 17 Q12 14 16 17" /><path d="M6 20h12" />
    </svg>
  ),
  lawn: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4a017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="14" rx="2" /><line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="3" x2="9" y2="17" /><circle cx="15" cy="13" r="2" />
      <line x1="3" y1="20" x2="21" y2="20" />
    </svg>
  ),
  hardscape: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4a017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 L22 7 L22 17 L12 22 L2 17 L2 7 Z" /><line x1="2" y1="7" x2="22" y2="7" />
      <line x1="12" y1="2" x2="12" y2="22" />
    </svg>
  ),
  garden: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4a017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h18" /><path d="M3 6l4 6-4 6" /><path d="M21 6l-4 6 4 6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  irrigation: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4a017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 Q12 8 8 12 Q4 16 8 20 Q12 24 16 20 Q20 16 16 12 Q12 8 12 2Z" />
    </svg>
  ),
  tree: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4a017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12,2 4,14 20,14" /><polygon points="12,8 5,18 19,18" />
      <line x1="12" y1="18" x2="12" y2="22" />
    </svg>
  ),
  seasonal: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4a017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" /><line x1="3" y1="9" x2="21" y2="9" />
      <line x1="8" y1="2" x2="8" y2="6" /><line x1="16" y1="2" x2="16" y2="6" />
      <line x1="7" y1="14" x2="17" y2="14" /><line x1="7" y1="17" x2="13" y2="17" />
    </svg>
  ),
};

// ─── Data ────────────────────────────────────────────────────────────────────

const services = [
  {
    icon: icons.commercial,
    title: "IFR Title Digitization",
    desc: "Scan, digitize and securely store Individual Forest Rights records, replacing legacy paper systems with a structured digital repository accessible to all officials.",
  },
  {
    icon: icons.landscape,
    title: "CFR Claims Mapping",
    desc: "Map Community Forest Resource rights and grievance claims on the WebGIS atlas, enabling transparent visualization of community boundaries and rights status.",
  },
  {
    icon: icons.lawn,
    title: "FRA Atlas (WebGIS)",
    desc: "A centralized, real-time visual repository of all FRA claims and granted titles on an interactive WebGIS portal, providing geographic insights for stakeholders.",
  },
  {
    icon: icons.hardscape,
    title: "Satellite Asset Mapping",
    desc: "AI-powered Computer Vision models analyze satellite imagery to precisely map forest cover, water bodies, cultivable land and barren areas, validating IFR/CFR claims.",
  },
  {
    icon: icons.garden,
    title: "DSS for CSS Schemes",
    desc: "Decision Support System automatically matches FRA patta holders with Central Sector Schemes — PM-KISAN, Jal Jeevan Mission, MGNREGA and DAJGUA — for targeted benefits.",
  },
  {
    icon: icons.irrigation,
    title: "Legacy Data Integration",
    desc: "Import and reconcile historical paper-based FRA records with the digital platform, enabling continuity of legacy IFR, CR and CFR data across all focus states.",
  },
  {
    icon: icons.tree,
    title: "Real-time Monitoring",
    desc: "Track claim status, approval workflows, officer escalations and implementation progress across Madhya Pradesh, Tripura, Odisha and Telangana in real-time.",
  },
  {
    icon: icons.seasonal,
    title: "Multi-Ministry Dashboard",
    desc: "Unified DAJGUA dashboard spanning Agriculture, Tribal Affairs and Jal Shakti ministries, providing inter-departmental convergence for holistic FRA implementation.",
  },
];

// ─── Main Component ──────────────────────────────────────────────────────────

const AwardsServices = () => {
  const cursorRef = useRef(null);
  const sectionRef = useRef(null);

  // Scroll-reveal for impact cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("gs-reveal-visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    const items = sectionRef.current?.querySelectorAll(".gs-reveal");
    items?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleServiceMouseMove = useCallback((e) => {
    if (cursorRef.current) {
      cursorRef.current.style.left = e.clientX + 'px';
      cursorRef.current.style.top = e.clientY + 'px';
    }
  }, []);
  const handleServiceMouseEnter = useCallback(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  }, []);
  const handleServiceMouseLeave = useCallback(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = 'translate(-50%, -50%) scale(0)';
    }
  }, []);

  const handleMouseEnter = (e) => {
    const arrow = e.currentTarget.querySelector(".arrow-svg");
    if (arrow) arrow.style.transform = "rotate(45deg)";
    const left = e.currentTarget.querySelector(".left-div");
    if (left) left.style.borderRadius = "20px 0px 0px 20px";
    const rightWrapper = e.currentTarget.querySelector(".right-wrapper");
    if (rightWrapper) {
      rightWrapper.style.padding = "0px";
      rightWrapper.style.marginRight = "-2px";
    }
    const rightDiv = e.currentTarget.querySelector(".right-div");
    if (rightDiv) rightDiv.style.borderRadius = "0px 20px 20px 0px";
  };

  const handleMouseLeave = (e) => {
    const arrow = e.currentTarget.querySelector(".arrow-svg");
    if (arrow) arrow.style.transform = "rotate(0deg)";
    const left = e.currentTarget.querySelector(".left-div");
    if (left) left.style.borderRadius = "20px";
    const rightWrapper = e.currentTarget.querySelector(".right-wrapper");
    if (rightWrapper) {
      rightWrapper.style.padding = "2px 2px 2px 7px";
      rightWrapper.style.marginRight = "0px";
    }
    const rightDiv = e.currentTarget.querySelector(".right-div");
    if (rightDiv) rightDiv.style.borderRadius = "20px";
  };
  return (
    <div
      ref={sectionRef}
      className="gs-wrapper"
      style={{
        fontFamily: "'Segoe UI', sans-serif",
        backgroundColor: "#ffffff",
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "0 40px",
      }}
    >
      {/* ── Custom Cursor ── */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#8CB45C",
          transform: "translate(-50%, -50%) scale(0)",
          transition: "transform 0.32s ease",
          pointerEvents: "none",
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 18px rgba(140,180,92,0.35)",
          willChange: "transform, left, top",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <line x1="5" y1="11" x2="17" y2="11" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
          <polyline points="12,6 17,11 12,16" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <style>{`
        @keyframes gsRevealUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .gs-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .gs-reveal-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .gs-reveal:nth-child(1) { transition-delay: 0ms; }
        .gs-reveal:nth-child(2) { transition-delay: 120ms; }
        .gs-reveal:nth-child(3) { transition-delay: 240ms; }
        .gs-reveal:nth-child(4) { transition-delay: 360ms; }
        .gs-impact-card:hover .gs-impact-photo {
          transform: scale(1.04);
        }
        .gs-impact-card:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.12);
          transform: translateY(-4px);
        }
        @media (max-width: 900px) {
          .gs-wrapper { padding-left: 20px; padding-right: 20px; }
          .gs-awards-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 14px !important; }
          .gs-services-section { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
        @media (max-width: 600px) {
          .gs-wrapper { padding-left: 16px !important; padding-right: 16px !important; }
          .gs-awards-section { padding-top: 40px !important; padding-bottom: 40px !important; }
          .gs-awards-heading { font-size: 1.4rem !important; margin-bottom: 24px !important; }
          .gs-awards-grid { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
          .gs-services-section { padding-bottom: 48px !important; gap: 24px !important; }
          .gs-services-heading { font-size: 1.3rem !important; }
          .gs-services-grid { grid-template-columns: 1fr !important; }
          .gs-cta-btn { width: 190px !important; }
        }
        @media (max-width: 420px) {
          .gs-awards-grid { grid-template-columns: 1fr !important; }
          .gs-awards-heading { font-size: 1.2rem !important; }
          .gs-services-heading { font-size: 1.1rem !important; }
        }
      `}</style>
      {/* ══ AWARDS SECTION ══════════════════════════════════════════════════ */}
      <section className="gs-awards-section" style={{ paddingTop: "80px", paddingBottom: "80px", textAlign: "center" }}>
        {/* Label */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "22px",
            backgroundColor: "#f3f3f3",
            borderRadius: "999px",
            padding: "7px 18px 7px 14px",
          }}
        >
          <div style={{ height: "1px", width: "36px", backgroundColor: "#aaaaaa" }} />
          <span
            style={{
              fontFamily: "'Segoe UI', sans-serif",
              fontSize: "0.8rem",
              letterSpacing: "0.16em",
              color: "#888888",
              textTransform: "uppercase",
              fontWeight: "500",
            }}
          >
            Impact in Numbers
          </span>
          <div style={{ height: "1px", width: "36px", backgroundColor: "#aaaaaa" }} />
        </div>

        {/* Heading */}
        <h2
          className="gs-awards-heading"
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#1a2b1b",
            margin: "0 0 14px 0",
            letterSpacing: "-0.01em",
          }}
        >
          Real Lives.&nbsp; Real Change.
        </h2>
        <p style={{ fontFamily: "'Segoe UI', sans-serif", fontSize: "1rem", color: "#777", maxWidth: "560px", margin: "0 auto 48px", lineHeight: 1.7 }}>
          Behind every data point is a tribal family whose forest rights have been recognised, mapped and linked to government benefits for the first time.
        </p>

        {/* Impact Photo Cards Grid */}
        <div
          className="gs-awards-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
          }}
        >
          {impactCards.map((card) => (
            <div
              key={card.id}
              className="gs-impact-card gs-reveal"
              style={{
                backgroundColor: "#f7f7f4",
                borderRadius: "20px",
                overflow: "hidden",
                cursor: "default",
                transition: "box-shadow 0.35s ease, transform 0.35s ease",
              }}
            >
              {/* Photo */}
              <div style={{ width: "100%", height: "180px", overflow: "hidden", position: "relative" }}>
                <img
                  src={card.photo}
                  alt={card.label}
                  className="gs-impact-photo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.55s ease",
                    display: "block",
                  }}
                />
                {/* Colour tint overlay */}
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(160deg, ${card.accent}33 0%, transparent 60%)` }} />
              </div>
              {/* Text body */}
              <div style={{ padding: "24px 20px 26px" }}>
                {/* Stat + label row */}
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "10px" }}>
                  <span style={{ fontFamily: "'Georgia', serif", fontSize: "2.1rem", fontWeight: "700", color: card.accent, lineHeight: 1 }}>
                    {card.stat}
                  </span>
                  <span style={{ fontFamily: "'Segoe UI', sans-serif", fontSize: "0.78rem", fontWeight: "600", color: "#999", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    {card.label}
                  </span>
                </div>
                {/* Divider */}
                <div style={{ height: "1px", backgroundColor: "#e8e8e4", marginBottom: "12px" }} />
                {/* Story text */}
                <p style={{ fontFamily: "'Segoe UI', sans-serif", fontSize: "0.88rem", color: "#666", lineHeight: 1.65, margin: 0 }}>
                  {card.story}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SERVICES SECTION ════════════════════════════════════════════════ */}
      <section
        className="gs-services-section"
        style={{
          paddingBottom: "88px",
          display: "grid",
          gridTemplateColumns: "380px 1fr",
          gap: "64px",
          alignItems: "flex-start",
        }}
      >
        {/* Left — heading + CTA */}
        <div style={{ paddingTop: "4px" }}>
          {/* Label */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "22px",
              backgroundColor: "#f3f3f3",
              borderRadius: "999px",
              padding: "7px 18px 7px 14px",
            }}
          >
            <div style={{ height: "1px", width: "36px", backgroundColor: "#aaaaaa" }} />
            <span
              style={{
                fontFamily: "'Segoe UI', sans-serif",
                fontSize: "0.8rem",
                letterSpacing: "0.16em",
                color: "#888888",
                textTransform: "uppercase",
                fontWeight: "500",
              }}
            >
              Services
            </span>
            <div style={{ height: "1px", width: "36px", backgroundColor: "#aaaaaa" }} />
          </div>

          {/* Heading */}
          <h2
            className="gs-services-heading"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "2.1rem",
              fontWeight: "700",
              color: "#1a2b1b",
              lineHeight: 1.25,
              margin: "0 0 20px 0",
            }}
          >
            Core Features of the FRA Atlas & DSS Platform
          </h2>

          {/* Description */}
          <p
            style={{
              fontFamily: "'Segoe UI', sans-serif",
              fontSize: "0.95rem",
              color: "#777777",
              lineHeight: 1.7,
              margin: "0 0 40px 0",
            }}
          >
            Explore a comprehensive suite of intelligent tools designed to digitize forest rights,
            map tribal assets with satellite AI, and drive data-powered development for forest-dwelling communities.
          </p>

          {/* CTA Button (replaced with hero2 style + hover behavior) */}
          <div
            className="gs-cta-btn flex items-center cursor-pointer mt-8 overflow-hidden"
            style={{ borderRadius: "22px", width: "240px", height: "58px", fontFamily: "Funnel Display, sans-serif", fontWeight: 500, fontSize: "1.08rem", border: "1px solid #8CB45C", backgroundColor: "transparent" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="left-div bg-[#8CB45C] flex items-center justify-center text-white font-semibold text-base flex-shrink-0 h-full"
              style={{
                width: "75%",
                borderRadius: "20px",
                marginLeft: "-1px",
                transition: "border-radius 0.3s ease",
                padding: "0 22px",
                fontSize: "0.95rem",
              }}
            >
              Explore Features
            </div>

            <div
              className="right-wrapper flex items-center justify-center flex-shrink-0 h-full"
              style={{
                width: "25%",
                padding: "2px 2px 2px 7px",
                transition: "padding 0.3s ease, margin 0.3s ease",
              }}
            >
              <div
                  className="right-div bg-[#8CB45C] flex items-center justify-center w-full h-full"
                style={{
                  borderRadius: "20px",
                  transition: "border-radius 0.3s ease",
                }}
              >
                <svg
                  className="arrow-svg"
                  width="18"
                  height="18"
                  viewBox="0 0 14 14"
                  fill="none"
                  style={{ transition: "transform 0.3s ease" }}
                >
                  <path
                    d="M2 12L12 2M12 2H5M12 2V9"
                    stroke="#fff"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Services Grid */}
        <div
          className="gs-services-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
          onMouseMove={handleServiceMouseMove}
          onMouseEnter={handleServiceMouseEnter}
          onMouseLeave={handleServiceMouseLeave}
        >
          {services.map((service) => (
            <div
              key={service.title}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #eeeeee",
                borderRadius: "16px",
                padding: "28px 26px",
                boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
                cursor: "none",
              }}
            >
              {/* Icon box + Title row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "#263E27",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {service.icon}
                </div>
                <span
                  style={{
                    fontFamily: "'Segoe UI', sans-serif",
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "#1a2b1b",
                    lineHeight: 1.3,
                  }}
                >
                  {service.title}
                </span>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  backgroundColor: "#eeeeee",
                  marginBottom: "16px",
                }}
              />

              {/* Description */}
              <p
                style={{
                  fontFamily: "'Segoe UI', sans-serif",
                  fontSize: "0.9rem",
                  color: "#777777",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AwardsServices;