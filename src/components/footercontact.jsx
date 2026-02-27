import React, { useState } from "react";
const heroBg = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1800&q=80&fit=crop";

const styles = `
  .footer-wrapper {
    background-color: #2d3d18;
    border-radius: 24px;
    margin: 0 40px 40px 40px;
    overflow: hidden;
    position: relative;
    font-family: 'Segoe UI', sans-serif;
  }

  /* Watermark bg image */
  .footer-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 0.06;
    pointer-events: none;
    mix-blend-mode: luminosity;
  }

  .footer-inner {
    position: relative;
    z-index: 1;
    padding: 64px 60px 0 60px;
  }

  /* ── TOP: logo + form ── */
  .footer-top {
    display: grid;
    grid-template-columns: 44% 56%;
    gap: 0;
    margin-bottom: 72px;
    align-items: start;
  }

  /* ── Logo block ── */
  .footer-logo-block {
    padding-top: 8px;
    padding-right: 32px;
  }

  .footer-logo-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 22px;
  }

  .footer-logo-text-wrap {
    display: flex;
    flex-direction: column;
  }

  .footer-logo-name {
    font-family: 'Georgia', serif;
    font-size: 1.55rem;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.1;
    letter-spacing: -0.01em;
  }

  .footer-logo-sub {
    font-family: 'Segoe UI', sans-serif;
    font-size: 0.72rem;
    color: rgba(255,255,255,0.55);
    font-weight: 400;
    margin-top: 2px;
    letter-spacing: 0.02em;
  }

  .footer-logo-desc {
    font-family: 'Segoe UI', sans-serif;
    font-size: 0.85rem;
    color: rgba(255,255,255,0.62);
    line-height: 1.7;
    margin: 0;
    max-width: 320px;
  }

  /* ── Contact form card ── */
  .footer-form-card {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px;
    padding: 32px 32px 28px 32px;
  }

  .form-heading {
    font-family: 'Georgia', serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 10px 0;
    letter-spacing: -0.01em;
  }

  .form-subtext {
    font-family: 'Segoe UI', sans-serif;
    font-size: 0.8rem;
    color: rgba(255,255,255,0.55);
    line-height: 1.6;
    margin: 0 0 22px 0;
  }

  .form-label {
    display: block;
    font-family: 'Segoe UI', sans-serif;
    font-size: 0.68rem;
    font-weight: 600;
    color: rgba(255,255,255,0.55);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 7px;
  }

  .form-field-wrap {
    margin-bottom: 16px;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 16px;
  }

  .form-input, .form-textarea {
    width: 100%;
    background: rgba(255,255,255,0.06);
    border: 1.5px solid rgba(255,255,255,0.14);
    border-radius: 9px;
    padding: 11px 14px;
    font-family: 'Segoe UI', sans-serif;
    font-size: 0.82rem;
    color: rgba(255,255,255,0.85);
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.3s cubic-bezier(.4,0,.2,1);
  }

  .form-input:focus, .form-input:hover, .form-textarea:focus, .form-textarea:hover {
    border-color: #d4a017;
  }

  .form-input::placeholder, .form-textarea::placeholder {
    color: rgba(255,255,255,0.28);
  }

  .form-input:focus, .form-textarea:focus {
    border-color: rgba(255,255,255,0.35);
  }

  .form-textarea {
    resize: vertical;
    min-height: 96px;
    max-height: 200px;
  }

  .form-submit {
    width: 100%;
    background: #d4a017;
    border: none;
    border-radius: 9px;
    padding: 14px;
    font-family: 'Segoe UI', sans-serif;
    font-size: 1.08rem;
    font-weight: 700;
    color: #1a2b0a;
    cursor: pointer;
    margin-top: 4px;
    letter-spacing: 0.01em;
    transition: background 0.25s, color 0.25s;
  }

  .form-submit:hover {
    background: #6aaa3a;
    color: #d4a017;
  }

  /* ── Contact info row ── */
  .footer-contact-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    padding: 36px 0;
    border-top: 1px solid rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.1);
    margin-bottom: 52px;
    background: rgba(0,0,0,0.18);
    border-radius: 20px;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 18px 18px;
    border-radius: 20px;
    transition: background 0.3s, box-shadow 0.3s;
  }

  .contact-icon-wrap {
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .contact-text {
    font-family: 'Segoe UI', sans-serif;
    font-size: 1.08rem;
    color: #6aaa3a;
    font-weight: 700;
    transition: color 0.3s, text-decoration 0.3s;
    text-decoration: none;
    cursor: pointer;
  }
  .contact-item:hover .contact-text {
    color: #d4a017;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .contact-item:hover .contact-icon-wrap svg {
    stroke: #d4a017 !important;
    color: #d4a017 !important;
    fill: none;
  }

  /* ── Bottom columns ── */
  .footer-cols {
    display: grid;
    grid-template-columns: 280px 1fr 1fr 1fr;
    gap: 32px;
    margin-bottom: 56px;
    background: rgba(0,0,0,0.13);
    border-radius: 20px;
    padding: 32px 24px;
  }

  .footer-col-title {
    font-family: 'Segoe UI', sans-serif;
    font-size: 1.08rem;
    font-weight: 700;
    color: #8CB45C;
    letter-spacing: 0.04em;
    margin-bottom: 16px;
  }

  .footer-col-link {
    display: block;
    font-family: 'Segoe UI', sans-serif;
    font-size: 1.02rem;
    color: rgba(255,255,255,0.82);
    text-decoration: none;
    margin-bottom: 13px;
    cursor: pointer;
    transition: color 0.2s, text-decoration 0.2s;
  }

  .footer-col-link:hover {
    text-decoration: underline;
  }

  .footer-col-link:hover {
    color: #ffffff;
  }

  .footer-hours-title {
    font-family: 'Segoe UI', sans-serif;
    font-size: 1.08rem;
    font-weight: 700;
    color: #8CB45C;
    margin-bottom: 12px;
    letter-spacing: 0.02em;
  }

  .footer-hours-line {
    font-family: 'Segoe UI', sans-serif;
    font-size: 1.02rem;
    color: rgba(255,255,255,0.82);
    margin-bottom: 10px;
    line-height: 1.5;
  }

  /* ── Footer bottom ── */
  .footer-bottom {
    border-top: 1px solid rgba(255,255,255,0.1);
    padding: 24px 0 28px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
  }

  .footer-social {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .footer-follow-label {
    font-family: 'Segoe UI', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    color: #d4a017;
    letter-spacing: 0.04em;
  }

  .footer-social-icons {
    display: flex;
    gap: 10px;
  }

  .social-btn {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.2);
    background: rgba(255,255,255,0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s;
  }

  .social-btn:hover {
    background: radial-gradient(circle at 50% 50%, #F5C159 0%, #8CB45C 100%);
    transition: background 0.38s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .footer-newsletter {
    display: flex;
    align-items: center;
    gap: 0;
  }

  .newsletter-input {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    border-right: none;
    border-radius: 10px 0 0 10px;
    padding: 11px 18px;
    font-family: 'Segoe UI', sans-serif;
    font-size: 0.82rem;
    color: rgba(255,255,255,0.8);
    outline: none;
    width: 220px;
  }

  .newsletter-input::placeholder {
    color: rgba(255,255,255,0.3);
  }

  .newsletter-btn {
    background: #6aaa3a;
    border: none;
    border-radius: 0 10px 10px 0;
    padding: 11px 22px;
    font-family: 'Segoe UI', sans-serif;
    font-size: 0.82rem;
    font-weight: 600;
    color: #ffffff;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.2s;
  }

  .newsletter-btn:hover {
    background: #5a9830;
  }

  /* ── Copyright ── */
  .footer-copy-bar {
    background: rgba(0,0,0,0.15);
    padding: 14px 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 24px;
  }

  .footer-copy-text {
    font-family: 'Segoe UI', sans-serif;
    font-size: 0.72rem;
    color: rgba(255,255,255,0.38);
  }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .footer-wrapper { margin: 0 20px 20px 20px; }
    .footer-inner { padding: 48px 36px 0 36px; }
    .footer-top { grid-template-columns: 1fr; }
    .footer-logo-block { margin-bottom: 32px; padding-right: 0; }
    .footer-cols { grid-template-columns: 1fr 1fr; }
    .footer-copy-bar { padding: 14px 36px; }
  }

  @media (max-width: 640px) {
    .footer-wrapper { margin: 0 12px 12px 12px; border-radius: 18px; }
    .footer-inner { padding: 36px 20px 0 20px; }
    .footer-contact-row { grid-template-columns: 1fr; }
    .footer-cols { grid-template-columns: 1fr 1fr; gap: 24px; }
    .footer-bottom { flex-direction: column; align-items: flex-start; }
    .footer-copy-bar { padding: 14px 20px; justify-content: center; }
    .form-row { grid-template-columns: 1fr; }
  }
`;

// ─── Leaf Logo SVG ────────────────────────────────────────────────────────────
const LeafLogo = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 38 C8 38 14 22 28 14 C36 10 40 12 40 12 C40 12 38 22 28 30 C18 38 8 38 8 38Z" fill="#6aaa3a"/>
    <path d="M14 34 C14 34 18 26 26 20" stroke="#4a8820" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 38 C12 32 16 30 22 28" stroke="#4a8820" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M28 14 C24 20 18 26 8 38" stroke="#3d7018" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2"/>
  </svg>
);

// ─── Contact icons ─────────────────────────────────────────────────────────────
const EmailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4a017" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M2 7l10 7 10-7"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4a017" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>
  </svg>
);

const PinIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4a017" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
    <circle cx="12" cy="9" r="2.5"/>
  </svg>
);

// ─── Social icons ──────────────────────────────────────────────────────────────
const FbIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.75)">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);

const TwIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.75)">
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
  </svg>
);

const LiIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.75)">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const IgIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="rgba(255,255,255,0.75)"/>
  </svg>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const FooterContact = () => {
  const [email, setEmail] = useState("");

  return (
    <>
      <style>{styles}</style>

      <footer className="footer-wrapper">
        {/* Background watermark */}
        <img src={heroBg} alt="" className="footer-bg" aria-hidden="true" />

        <div className="footer-inner">

          {/* ═══════════════════════════════
              TOP — Logo + Form
          ═══════════════════════════════ */}
          <div className="footer-top">

            {/* Logo + Tagline */}
            <div className="footer-logo-block">
              <div className="footer-logo-row">
                <LeafLogo />
                <div className="footer-logo-text-wrap">
                  <span className="footer-logo-name">VanMitra</span>
                  <span className="footer-logo-sub">FRA Atlas &amp; DSS Platform</span>
                </div>
              </div>
              <p className="footer-logo-desc">
                VanMitra is India's AI-powered FRA Atlas and WebGIS-based Decision Support System,
                digitizing forest rights and empowering tribal communities across Madhya Pradesh,
                Tripura, Odisha and Telangana.
              </p>
            </div>

            {/* Contact Form */}
            <div className="footer-form-card">
              <h2 className="form-heading">Request Platform Access</h2>
              <p className="form-subtext">
                Contact us to request access to the VanMitra FRA Atlas portal, schedule a demo,
                or inquire about integrating the platform with your state’s FRA data systems.
              </p>

              {/* NAME */}
              <div className="form-field-wrap">
                <label className="form-label">Name</label>
                <input className="form-input" type="text" placeholder="Enter your name" />
              </div>

              {/* EMAIL + PHONE */}
              <div className="form-row">
                <div>
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" placeholder="Enter your email" />
                </div>
                <div>
                  <label className="form-label">Phone</label>
                  <input className="form-input" type="tel" placeholder="Enter phone number" />
                </div>
              </div>

              {/* MESSAGE */}
              <div className="form-field-wrap">
                <label className="form-label">Mesage</label>
                <textarea className="form-textarea" placeholder="Enter your message" />
              </div>

              <button className="form-submit">Submit</button>
            </div>
          </div>

          {/* ═══════════════════════════════
              CONTACT INFO ROW
          ═══════════════════════════════ */}
          <div className="footer-contact-row">
            <div className="contact-item">
              <div className="contact-icon-wrap"><EmailIcon /></div>
              <span className="contact-text">vanmitra@tribal.gov.in</span>
            </div>
            <div className="contact-item">
              <div className="contact-icon-wrap"><PhoneIcon /></div>
              <span className="contact-text">+91 11 2301 5600</span>
            </div>
            <div className="contact-item">
              <div className="contact-icon-wrap"><PinIcon /></div>
              <span className="contact-text">Ministry of Tribal Affairs, New Delhi 110001</span>
            </div>
          </div>

          {/* ═══════════════════════════════
              FOOTER COLUMNS
          ═══════════════════════════════ */}
          <div className="footer-cols">

            {/* Col 1 — Hours */}
            <div>
              <p className="footer-hours-title">Opening Hours:</p>
              <p className="footer-hours-line">Mon to Fri: 9:00am - 5:30pm</p>
              <p className="footer-hours-line">Sat: 10:00am - 2:00pm</p>
              <p className="footer-hours-line">Sun: Closed</p>
            </div>

            {/* Col 2 — Menu */}
            <div>
              <p className="footer-col-title">Menu</p>
              {["Home","About","FRA Atlas","Features","Data Gallery","Insights","Testimonials","FAQ","Contact"].map(l => (
                <a key={l} className="footer-col-link">{l}</a>
              ))}
            </div>

            {/* Col 3 — Services */}
            <div>
              <p className="footer-col-title">Services</p>
              {["IFR Title Digitization","CFR Claims Mapping","FRA Atlas (WebGIS)","Satellite Asset Mapping","DSS for CSS Schemes","Legacy Data Integration","Real-time Monitoring","Multi-Ministry Dashboard"].map(l => (
                <a key={l} className="footer-col-link">{l}</a>
              ))}
            </div>

            {/* Col 4 — Menu + Legal */}
            <div>
              <p className="footer-col-title">Menu</p>
              {["Style Guide","404"].map(l => (
                <a key={l} className="footer-col-link">{l}</a>
              ))}
              <p className="footer-col-title" style={{ marginTop: "20px" }}>Legal</p>
              {["Privacy Policy","Terms"].map(l => (
                <a key={l} className="footer-col-link">{l}</a>
              ))}
            </div>
          </div>

          {/* ═══════════════════════════════
              BOTTOM — Social + Newsletter
          ═══════════════════════════════ */}
          <div className="footer-bottom">
            <div className="footer-social">
              <span className="footer-follow-label">Follow us:</span>
              <div className="footer-social-icons">
                {[<FbIcon/>,<TwIcon/>,<LiIcon/>,<IgIcon/>].map((icon, i) => (
                  <button key={i} className="social-btn">{icon}</button>
                ))}
              </div>
            </div>

            <div className="footer-newsletter">
              <input
                className="newsletter-input"
                type="email"
                placeholder="name@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button className="newsletter-btn">Subscribe for newsletter</button>
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="footer-copy-bar">
          <span className="footer-copy-text">© VanMitra 2025 — Ministry of Tribal Affairs, Govt. of India</span>
          <span className="footer-copy-text">Powered by WebGIS &amp; AI</span>
        </div>
      </footer>
    </>
  );
};

export default FooterContact;
// Note: The above code is a React component for the footer section of the VanMitra website. It includes a contact form, contact information, navigation links, social media icons, and a newsletter subscription form, all styled with CSS-in-JS.