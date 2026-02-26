import React, { useRef, useEffect } from "react";

const SplitScreen = () => {
  const revealRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("sr-visible"); }),
      { threshold: 0.12 }
    );
    revealRef.current?.querySelectorAll(".sr").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  // ── Stats ──────────────────────────────────────────────────────────────────
  const statsWrapperStyle = {
    width: "100%",
    backgroundColor: "#ffffffff",
    paddingTop: "32px",
    paddingBottom: "32px",
    marginTop: "180px",
    marginBottom: "50px",
  };

  const statsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
  };

  const statCardStyle = {
    backgroundColor: "#f3f3f3",
    borderRadius: "12px",
    padding: "10px 32px",
    minWidth: "170px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    border: "1px solid #efefef",
  };

  const statNumberStyle = {
    fontFamily: "'Georgia', serif",
    fontSize: "3rem",
    fontWeight: "700",
    color: "#263E27",
    lineHeight: 1,
    marginBottom: "8px",
    letterSpacing: "-1px",
  };

  const statLabelStyle = {
    fontFamily: "'Segoe UI', sans-serif",
    fontSize: "0.82rem",
    color: "#888888",
    fontWeight: "400",
    letterSpacing: "0.02em",
    textAlign: "center",
  };

  // ── Layout ─────────────────────────────────────────────────────────────────
  const containerStyle = {
    display: "flex",
    minHeight: "100vh",
    width: "100%",
  };

  const leftStyle = {
    width: "50%",
    backgroundColor: "#ffffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "20px",
    minHeight: "90vh",
  };

  const rightStyle = {
    width: "50%",
    backgroundColor: "#ffffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: "20px",
    paddingTop: "38px",
  };

  // ── Right panel internals ──────────────────────────────────────────────────
  const rightContentStyle = {
    maxWidth: "520px",
    width: "100%",
  };

  const aboutLabelRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0px",
    marginBottom: "22px",
    marginTop: "12px",
    backgroundColor: "#f5f5f5",
    borderRadius: "999px",
    padding: "10px 20px",
    width: "fit-content",
  };

  const aboutLineStyle = {
    height: "1px",
    width: "36px",
    backgroundColor: "#aaaaaa",
  };

  const aboutLabelStyle = {
    fontFamily: "'Segoe UI', sans-serif",
    fontSize: "0.78rem",
    letterSpacing: "0.18em",
    color: "#666666",
    textTransform: "uppercase",
    fontWeight: "500",
    margin: "0 14px",
  };

  const headingStyle = {
    fontFamily: "'Georgia', serif",
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#1a2b1b",
    lineHeight: 1.25,
    marginBottom: "20px",
  };

  const descStyle = {
    fontFamily: "'Segoe UI', sans-serif",
    fontSize: "0.78rem",
    color: "#666666",
    lineHeight: 1.7,
    marginBottom: "36px",
  };

  const valueRowStyle = {
    display: "grid",
    gridTemplateColumns: "200px 1fr",
    alignItems: "flex-start",
    padding: "18px 0",
    borderBottom: "1px solid #e5e5e5",
    gap: "24px",
  };

  const valueLabelGroupStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  };

  const valueIconStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "background-color 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
    cursor: "pointer",
  };

  const valueLabelStyle = {
    fontFamily: "'Segoe UI', sans-serif",
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "#263E27",
  };

  const valueDescStyle = {
    fontFamily: "'Segoe UI', sans-serif",
    fontSize: "0.82rem",
    color: "#777777",
    lineHeight: 1.65,
  };

  const btnRowStyle = {
    display: "flex",
    alignItems: "center",
    marginTop: "36px",
  };

  const btnStyle = {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#4a7c3f",
    borderRadius: "999px",
    overflow: "hidden",
    cursor: "pointer",
    border: "none",
    padding: "0",
  };

  const btnTextStyle = {
    fontFamily: "'Segoe UI', sans-serif",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#ffffff",
    padding: "14px 26px",
    letterSpacing: "0.02em",
  };

  const btnArrowStyle = {
    width: "44px",
    height: "44px",
    backgroundColor: "#6aaa54",
    borderRadius: "999px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "2px",
    flexShrink: 0,
  };

  const values = [
    {
      icon: "bulb",
      label: "A Map Built on Truth",
      desc: "Our real-time FRA Atlas — built on a live WebGIS platform — is a transparent, geographic record of every claim filed, every title granted, every boundary drawn. No paper trail lost. Nothing invisible.",
    },
    {
      icon: "star",
      label: "Land Seen from the Sky",
      desc: "Our AI models scan satellite imagery to recognise forest cover, cultivable patches, water bodies and barren land — building the most accurate picture of tribal territory ever made. Ground truth from orbit.",
    },
    {
      icon: "thumb",
      label: "Rights into Resources",
      desc: "Once rights are recognised, our Decision Support System matches patta holders directly to PM-KISAN, Jal Jeevan Mission, MGNREGA and DAJGUA. Recognition is only the beginning — development follows.",
    },
  ];

  return (
    <div ref={revealRef}>
      <div style={statsWrapperStyle} className="stats-wrapper">
        <div style={statsGridStyle} className="stats-grid sr">
          {[
            { num: "4 Cr+", label: "People in Forest Villages" },
            { num: "50K+", label: "FRA Claims Processed" },
            { num: "3",    label: "Ministries Converged" },
            { num: "100+", label: "Communities Now Mapped" },
          ].map((s) => (
            <div key={s.label} style={statCardStyle}>
              <div style={statNumberStyle}>{s.num}</div>
              <div style={statLabelStyle}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Split Layout ── */}
      <div style={containerStyle} className="split-container">
        {/* Left — image placeholder, user fills in later */}
        <div style={leftStyle} className="split-left">
          {/* Everything from indd.html */}
          <div className="image-container">
            <div className="cutout-circle">
              {/* Rotating text */}
              <svg className="rotating-text" viewBox="0 0 105 105" width="105" height="105">
                <defs>
                  <path id="circlePath" d="M52.5,52.5 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                </defs>
                <text fill="#263E27" fontSize="10" fontWeight="700" letterSpacing="3" style={{ fontFamily: 'sans-serif' }}>
                  <textPath href="#circlePath">KNOW THEIR STORY ✦ THEIR LAND ✦ THEIR RIGHTS ✦</textPath>
                </text>
              </svg>
              {/* Play icon center */}
              <div className="play-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#263E27">
                  <polygon points="8,5 19,12 8,19" />
                </svg>
              </div>
            </div>
            <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=88&fit=crop" alt="Tribal community children" />
          </div>
        </div>

        {/* Right — About Us */}
        <div style={rightStyle} className="split-right">
          <div style={rightContentStyle}>
            {/* About Us label */}
            <div style={aboutLabelRowStyle} className="sr" style2={{transitionDelay:"40ms"}}>
              <div style={aboutLineStyle} />
              <div style={aboutLineStyle} />
              <span style={aboutLabelStyle}>About Us</span>
            </div>

            {/* Heading */}
            <h2 style={headingStyle}>At the Heart of It: The People the Map Forgot</h2>

            {/* Description */}
            <p style={descStyle}>
              For generations, millions of Adivasi and forest-dwelling families have farmed the same
              land, protected the same trees, drawn water from the same rivers — with no formal proof
              that any of it is theirs. VanMitra exists to change that, one title at a time.
            </p>

            {/* Values list */}
            <div style={{ borderTop: "1px solid #e5e5e5" }}>
              {values.map((v) => {
                const iconSvg = {
                  bulb: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8CB45C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" /></svg>,
                  star: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8CB45C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
                  thumb: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8CB45C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>,
                  leaf: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8CB45C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1.19-2.97" /><path d="M20.59 6.41a2 2 0 0 0 0-2.83L18.76 1.76a2 2 0 0 0-2.83 0L2 15.59V22h6.41z" /><path d="M6 14l3 3" /><path d="M12 8l4 4" /></svg>,
                };
                return (
                  <div key={v.label} style={valueRowStyle} className="value-row">
                    <div style={valueLabelGroupStyle}>
                      <div style={valueIconStyle} className="value-icon">
                        {iconSvg[v.icon]}
                      </div>
                      <span style={valueLabelStyle}>{v.label}</span>
                    </div>
                    <p style={valueDescStyle}>{v.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div style={btnRowStyle}>
              <div
                className="flex items-center cursor-pointer overflow-hidden border border-[#8CB45C] bg-transparent"
                style={{ borderRadius: "20px", width: "210px", height: "54px", fontFamily: 'Funnel Display, sans-serif', fontWeight: 500, fontSize: "1.1rem" }}
                onMouseEnter={e => {
                  e.currentTarget.querySelector('.arrow-svg').style.transform = 'rotate(45deg)';
                  e.currentTarget.querySelector('.left-div').style.borderRadius = '20px 0px 0px 20px';
                  e.currentTarget.querySelector('.right-wrapper').style.padding = '0px';
                  e.currentTarget.querySelector('.right-wrapper').style.marginRight = '-2px';
                  e.currentTarget.querySelector('.right-div').style.borderRadius = '0px 20px 20px 0px';
                }}
                onMouseLeave={e => {
                  e.currentTarget.querySelector('.arrow-svg').style.transform = 'rotate(0deg)';
                  e.currentTarget.querySelector('.left-div').style.borderRadius = '20px';
                  e.currentTarget.querySelector('.right-wrapper').style.padding = '2px 2px 2px 7px';
                  e.currentTarget.querySelector('.right-wrapper').style.marginRight = '0px';
                  e.currentTarget.querySelector('.right-div').style.borderRadius = '20px';
                }}
              >
                <div
                  className="left-div bg-[#8CB45C] flex items-center justify-center text-white font-semibold text-base flex-shrink-0 h-full"
                  style={{
                    width: "75%",
                    borderRadius: "20px",
                    marginLeft: "-1px",
                    transition: "border-radius 0.3s ease",
                  }}
                >
                  More About Us
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
          </div>
        </div>
      </div>

      {/* Add styles from indd.html */}
      <style>
        {`
        .sr {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.72s ease, transform 0.72s ease;
        }
        .sr-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .image-container {
          aspect-ratio: 15 / 19;
          height: 95vh;
          overflow: hidden;
          border-radius: 32px;
          position: relative;
          margin-left: 32px;
          max-width: 650px;
        }
        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .image-container::before {
          content: "";
          position: absolute;
          top: -160px;
          left: -160px;
          width: 320px;
          height: 320px;
          background: #ffffffff;
          border-radius: 25%;
          z-index: 2;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
        }
        .image-container .cutout-circle {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 145px;
          height: 145px;
          background: #F5C159;
          border-radius: 50%;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cutout-circle .rotating-text {
          position: absolute;
          top: 0;
          left: 0;
          width: 145px;
          height: 145px;
          animation: spinText 12s linear infinite;
        }
        .cutout-circle .play-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 75px;
          height: 75px;
          background: #f3d496;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 0 4px #e2c97e;
        }
        .cutout-circle .play-icon svg {
          width: 54px;
          height: 54px;
        }
        @keyframes spinText {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .value-icon {
          transition: background-color 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .value-row {
          cursor: pointer;
        }
        .value-row:hover .value-icon {
          background-color: #8CB45C !important;
        }
        .value-row:hover .value-icon svg {
          stroke: #ffffff !important;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .image-container {
            height: 60vh;
            margin-left: 20px;
          }
        }

        @media (max-width: 768px) {
          .image-container {
            height: 50vh;
            margin-left: 0;
          }
          .image-container::before {
            top: -80px;
            left: -80px;
            width: 160px;
            height: 160px;
          }
          .image-container .cutout-circle {
            width: 75px;
            height: 75px;
          }
          .cutout-circle .rotating-text {
            width: 75px;
            height: 75px;
          }
          .cutout-circle .play-icon {
            width: 40px;
            height: 40px;
          }
          .cutout-circle .play-icon svg {
            width: 32px;
            height: 32px;
          }
        }

        @media (max-width: 480px) {
          .image-container {
            height: 45vh;
          }
          .image-container::before {
            top: -60px;
            left: -60px;
            width: 120px;
            height: 120px;
          }
          .image-container .cutout-circle {
            width: 55px;
            height: 55px;
          }
          .cutout-circle .rotating-text {
            width: 55px;
            height: 55px;
          }
          .cutout-circle .play-icon {
            width: 30px;
            height: 30px;
          }
          .cutout-circle .play-icon svg {
            width: 22px;
            height: 22px;
          }
        }

        /* Stats responsive */
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          .stats-wrapper {
            margin-top: 40px !important;
            margin-bottom: 30px !important;
          }
        }
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }
          .stats-wrapper {
            margin-top: 20px !important;
            margin-bottom: 20px !important;
          }
        }

        /* Split layout responsive */
        @media (max-width: 768px) {
          .split-container {
            flex-direction: column !important;
            min-height: auto !important;
          }
          .split-left {
            width: 100% !important;
            padding: 24px !important;
            justify-content: center !important;
          }
          .split-right {
            width: 100% !important;
            padding: 24px !important;
            padding-top: 0 !important;
          }
          .value-row {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }
        }
        `}
      </style>
    </div>
  );
};

export default SplitScreen;


