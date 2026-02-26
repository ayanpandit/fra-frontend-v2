import React, { useRef } from "react";
const heroBg = "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1800&q=80&fit=crop";

// ─── Star Rating ─────────────────────────────────────────────────────────────
const Stars = ({ count = 5 }) => (
  <div style={{ display: "flex", gap: "3px" }}>
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#d4a017">
        <path d="M8 1.5l1.6 3.3 3.6.5-2.6 2.5.6 3.6L8 9.7l-3.2 1.7.6-3.6L2.8 5.3l3.6-.5L8 1.5z" />
      </svg>
    ))}
  </div>
);

// ─── Avatar placeholder ───────────────────────────────────────────────────────
const Avatar = ({ seed, size = 52 }) => (
  <img
    src={`https://i.pravatar.cc/${size * 2}?img=${seed}`}
    alt="reviewer"
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      objectFit: "cover",
      flexShrink: 0,
      border: "2px solid rgba(255,255,255,0.15)",
    }}
  />
);

// ─── Google G icon ────────────────────────────────────────────────────────────
const GoogleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// ─── Facebook F icon ─────────────────────────────────────────────────────────
const FacebookIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.255h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
);

// ─── Testimonial Card ─────────────────────────────────────────────────────────
const TestimonialCard = ({ name, location, text, platform, avatarSeed }) => (
  <div
    style={{
      backgroundColor: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "16px",
      padding: "28px 28px 22px 28px",
      marginBottom: "16px",
      flexShrink: 0,
    }}
  >
    {/* Reviewer info */}
    <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
      <Avatar seed={avatarSeed} size={52} />
      <div>
        <div
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "1.05rem",
            fontWeight: "700",
            color: "#ffffff",
            marginBottom: "3px",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: "'Segoe UI', sans-serif",
            fontSize: "0.68rem",
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: "500",
          }}
        >
          {location}
        </div>
      </div>
    </div>

    {/* Review text */}
    <p
      style={{
        fontFamily: "'Segoe UI', sans-serif",
        fontSize: "0.95rem",
        color: "rgba(255,255,255,0.88)",
        lineHeight: 1.7,
        margin: "0 0 20px 0",
      }}
    >
      {text}
    </p>

    {/* Platform + stars row */}
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span
        style={{
          fontFamily: "'Segoe UI', sans-serif",
          fontSize: "0.68rem",
          color: "rgba(255,255,255,0.45)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: "500",
        }}
      >
        {platform}
      </span>
      <Stars count={5} />
    </div>
  </div>
);

// ─── Testimonial data ─────────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Rajesh Kumar Patel",
    location: "District Collector, Balaghat, MP",
    text: "VanMitra has transformed how we manage FRA claims in Balaghat district. The real-time atlas makes it effortless to track IFR and CFR titles, and the DSS automatically suggests relevant CSS schemes for each patta holder.",
    platform: "STATE GOVT FEEDBACK",
    avatarSeed: 10,
  },
  {
    name: "Sunita Bai Korram",
    location: "Gram Sabha Leader, Koraput, Odisha",
    text: "Our community finally has a voice. The FRA Atlas clearly shows where our forest boundaries lie. We can verify our rights on the map and ensure no encroachment happens. VanMitra empowers us to protect what belongs to us.",
    platform: "COMMUNITY FEEDBACK",
    avatarSeed: 33,
  },
  {
    name: "Dr. Anil Gogoi",
    location: "Ministry of Tribal Affairs, New Delhi",
    text: "The AI-powered asset mapping from satellite imagery gives us unprecedented accuracy in verifying forest rights claims. Integration with PM-KISAN and Jal Jeevan Mission data through the DSS ensures no eligible beneficiary is missed.",
    platform: "MINISTRY REVIEW",
    avatarSeed: 52,
  },
  {
    name: "Lakshmi Devi Nayak",
    location: "Block Officer, West Tripura",
    text: "Legacy records were impossible to manage before VanMitra. Now thousands of paper-based CFR records have been digitized into the system. Workflow automation has reduced our title processing time from weeks to just days.",
    platform: "STATE GOVT FEEDBACK",
    avatarSeed: 47,
  },
  {
    name: "Mohammed Iqbal Khan",
    location: "District Forest Officer, Adilabad, Telangana",
    text: "The satellite-based asset mapping is incredibly accurate. We identified cultivable forest land, water bodies and seasonal streams with precision, which strengthened several IFR title validations across our division.",
    platform: "FOREST DEPT REVIEW",
    avatarSeed: 68,
  },
  {
    name: "Priya Gond",
    location: "Van Adhikar Samiti, Chhindwara, MP",
    text: "VanMitra bridges the gap between tribal communities and government schemes. The DSS ensures PM-KISAN and MGNREGA benefits automatically reach the right patta holders. This is the future of tribal welfare administration.",
    platform: "COMMUNITY FEEDBACK",
    avatarSeed: 25,
  },
];

// ─── CSS injected ─────────────────────────────────────────────────────────────
const styles = `
  @keyframes scrollUp {
    0%   { transform: translateY(0); }
    100% { transform: translateY(-50%); }
  }

  .testimonials-section {
    position: relative;
    background-color: #2a3b18;
    border-radius: 24px;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 400px;
    height: 640px;
    margin: 0 48px;
    max-width: 1460px;
  }

  .testimonials-left {
    position: relative;
    z-index: 1;
    padding: 44px 44px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }

  .testimonials-right {
    position: relative;
    z-index: 1;
    overflow: hidden;
    height: 640px;
    border-left: 1px solid rgba(255,255,255,0.06);
  }

  .review-buttons-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  /* ── Tablet ── */
  @media (max-width: 900px) {
    .testimonials-section {
      grid-template-columns: 1fr;
      height: auto;
      margin: 0 24px;
    }
    .testimonials-left {
      height: auto;
      padding: 40px 32px 32px 32px;
    }
    .testimonials-right {
      height: 420px;
      border-left: none;
      border-top: 1px solid rgba(255,255,255,0.06);
    }
  }

  /* ── Mobile ── */
  @media (max-width: 600px) {
    .testimonials-section {
      border-radius: 18px;
      margin: 0 16px;
    }
    .testimonials-left {
      padding: 32px 22px 28px 22px;
    }
    .testimonials-right {
      height: 380px;
    }
    .review-buttons-row {
      flex-direction: column;
    }
  }
`;

// ─── Main Component ───────────────────────────────────────────────────────────
const TestimonialsSection = () => {
  const doubled = [...testimonials, ...testimonials]; // duplicate for seamless loop

  return (
    <>
      <style>{styles}</style>

      <section className="testimonials-section">
        {/* ── Background watermark image ── */}
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.07,
            pointerEvents: "none",
            mixBlendMode: "luminosity",
          }}
        />

        {/* ════════════════════════════════
            LEFT PANEL
        ════════════════════════════════ */}
        <div className="testimonials-left">
          {/* Top content */}
          <div>
            {/* TESTIMONIALS label */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "22px",
              }}
            >
              <div style={{ height: "1px", width: "30px", backgroundColor: "rgba(255,255,255,0.35)" }} />
              <span
                style={{
                  fontFamily: "'Segoe UI', sans-serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.55)",
                  textTransform: "uppercase",
                  fontWeight: "500",
                }}
              >
                Testimonials
              </span>
              <div style={{ height: "1px", width: "30px", backgroundColor: "rgba(255,255,255,0.35)" }} />
            </div>

            {/* Heading */}
            <h2
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "2.6rem",
                fontWeight: "700",
                color: "#ffffff",
                lineHeight: 1.18,
                margin: "0 0 36px 0",
                letterSpacing: "-0.02em",
                maxWidth: "520px",
              }}
            >
              What Stakeholders Say About VanMitra
            </h2>

            {/* View Reviews button (copied from hero2.jsx) */}
            <style>{`
              .hero2-btn {
                display: flex;
                align-items: center;
                cursor: pointer;
                overflow: hidden;
                border: 1.5px solid #8CB45C;
                background: transparent;
                border-radius: 20px;
                width: 210px;
                height: 54px;
                font-family: 'Funnel Display', sans-serif;
                font-weight: 500;
                font-size: 1.1rem;
                transition: box-shadow 0.25s cubic-bezier(.4,0,.2,1);
                box-shadow: 0 2px 12px 0 rgba(140,180,92,0.08);
              }
              .hero2-btn:hover {
                box-shadow: 0 4px 24px 0 rgba(140,180,92,0.18);
              }
              .hero2-btn .left-div {
                background: #8CB45C;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                font-size: 1.05rem;
                height: 100%;
                width: 75%;
                border-radius: 20px;
                margin-left: -1px;
                transition: border-radius 0.3s cubic-bezier(.4,0,.2,1);
              }
              .hero2-btn .right-wrapper {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                width: 25%;
                padding: 2px 2px 2px 7px;
                transition: padding 0.3s cubic-bezier(.4,0,.2,1), margin 0.3s cubic-bezier(.4,0,.2,1);
              }
              .hero2-btn .right-div {
                background: #8CB45C;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                border-radius: 20px;
                transition: border-radius 0.3s cubic-bezier(.4,0,.2,1);
              }
              .hero2-btn .arrow-svg {
                transition: transform 0.3s cubic-bezier(.4,0,.2,1);
              }
              .hero2-btn:hover .arrow-svg {
                transform: rotate(45deg);
              }
              .hero2-btn:hover .left-div {
                border-radius: 20px 0px 0px 20px;
              }
              .hero2-btn:hover .right-wrapper {
                padding: 0px;
                margin-right: -2px;
              }
              .hero2-btn:hover .right-div {
                border-radius: 0px 20px 20px 0px;
              }
            `}</style>
            <div
              className="hero2-btn"
              tabIndex={0}
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
              <div className="left-div">View Testimonials</div>
              <div className="right-wrapper">
                <div className="right-div">
                  <svg className="arrow-svg" width="18" height="18" viewBox="0 0 14 14" fill="none">
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

          {/* Bottom — CHECK MORE REVIEWS */}
          <div>
            <p
              style={{
                fontFamily: "'Segoe UI', sans-serif",
                fontSize: "0.72rem",
                letterSpacing: "0.14em",
                color: "rgba(255,255,255,0.45)",
                textTransform: "uppercase",
                fontWeight: "500",
                marginBottom: "14px",
              }}
            >
              Check More Reviews:
            </p>

            <div className="review-buttons-row">
              {/* Google Reviews */}
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  backgroundColor: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "12px",
                  padding: "14px 22px",
                  cursor: "pointer",
                  color: "#ffffff",
                }}
              >
                <GoogleIcon />
                <div style={{ textAlign: "left" }}>
                  <div
                    style={{
                      fontFamily: "'Segoe UI', sans-serif",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      color: "#ffffff",
                      marginBottom: "2px",
                    }}
                  >
                    Google Reviews
                  </div>
                  <div
                    style={{
                      fontFamily: "'Segoe UI', sans-serif",
                      fontSize: "0.7rem",
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    400+ Five Star Reviews
                  </div>
                </div>
              </button>

              {/* Facebook Reviews */}
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  backgroundColor: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: "12px",
                  padding: "14px 22px",
                  cursor: "pointer",
                  color: "#ffffff",
                }}
              >
                <FacebookIcon />
                <div style={{ textAlign: "left" }}>
                  <div
                    style={{
                      fontFamily: "'Segoe UI', sans-serif",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      color: "#ffffff",
                      marginBottom: "2px",
                    }}
                  >
                    Facebook Reviews
                  </div>
                  <div
                    style={{
                      fontFamily: "'Segoe UI', sans-serif",
                      fontSize: "0.7rem",
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    300+ Recommendations
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════
            RIGHT PANEL — scrolling cards
        ════════════════════════════════ */}
        <div className="testimonials-right">
          {/* Top fade */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "80px",
              background: "linear-gradient(to bottom, #2a3b18 0%, transparent 100%)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />

          {/* Bottom fade */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "80px",
              background: "linear-gradient(to top, #2a3b18 0%, transparent 100%)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />

          {/* Scrolling track */}
          <div
            style={{
              animation: "scrollUp 32s linear infinite",
              willChange: "transform",
              padding: "32px 24px 0 24px",
            }}
          >
            {doubled.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;