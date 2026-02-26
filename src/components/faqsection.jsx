import React, { useState } from "react";

const styles = `
  .faq-section {
    display: grid;
    grid-template-columns: 38% 62%;
    gap: 0;
    padding: 64px 52px;
    max-width: 1460px;
    margin: 0 auto;
    box-sizing: border-box;
    align-items: start;
    background: #ffffff;
  }

  /* ── Left ── */
  .faq-left {
    padding-right: 40px;
    padding-top: 8px;
  }

  .faq-label-pill {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #dddddd;
    border-radius: 999px;
    padding: 5px 16px;
    margin-bottom: 22px;
  }

  .faq-label-line {
    height: 1px;
    width: 26px;
    background-color: #aaaaaa;
  }

  .faq-label-text {
    font-family: 'Segoe UI', sans-serif;
    font-size: 0.66rem;
    letter-spacing: 0.18em;
    color: #888888;
    text-transform: uppercase;
    font-weight: 500;
  }

  .faq-heading {
    font-family: 'Georgia', serif;
    font-size: 2.15rem;
    font-weight: 700;
    color: #111111;
    line-height: 1.2;
    margin: 0 0 18px 0;
    letter-spacing: -0.015em;
  }

  .faq-desc {
    font-family: 'Segoe UI', sans-serif;
    font-size: 0.88rem;
    color: #666666;
    line-height: 1.7;
    margin: 0;
    max-width: 360px;
  }

  /* ── Right accordion list ── */
  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  /* ── FAQ Item card ── */
  .faq-item {
    background: #ffffff;
    border: 1px solid #e8e8e8;
    border-radius: 14px;
    overflow: hidden;
    transition: box-shadow 0.2s ease;
  }

  .faq-item:hover {
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }

  /* ── Question row ── */
  .faq-question-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 22px 18px 22px;
    cursor: pointer;
    gap: 16px;
    user-select: none;
  }
  .faq-question-row:hover .faq-q-text {
    color: #d4a017;
    transition: color 0.3s cubic-bezier(.4,0,.2,1);
  }

  /* "Question" small label above the text */
  .faq-q-label {
    font-family: 'Segoe UI', sans-serif;
    font-size: 0.7rem;
    color: #aaaaaa;
    font-weight: 400;
    letter-spacing: 0.02em;
    padding: 14px 22px 6px 22px;
    display: block;
  }

  .faq-q-text {
    font-family: 'Georgia', serif;
    font-size: 1.02rem;
    font-weight: 600;
    color: #111111;
    line-height: 1.35;
    flex: 1;
  }

  /* Plus / Minus toggle */
  .faq-toggle {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333333;
    transition: transform 0.3s ease;
  }

  .faq-toggle.open {
    transform: rotate(45deg);
  }

  /* ── Answer ── */
  .faq-answer {
    overflow: hidden;
    max-height: 0;
    transition: max-height 1.2s cubic-bezier(.4,0,.2,1), padding 1.2s cubic-bezier(.4,0,.2,1);
  }

  .faq-answer.open {
    max-height: 300px;
  }

  .faq-answer-inner {
    padding: 0 22px 20px 22px;
    font-family: 'Segoe UI', sans-serif;
    font-size: 0.875rem;
    color: #666666;
    line-height: 1.7;
    border-top: 1px solid #f0f0f0;
    padding-top: 14px;
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .faq-section {
      grid-template-columns: 1fr;
      padding: 40px 28px;
    }
    .faq-left {
      padding-right: 0;
      margin-bottom: 36px;
    }
    .faq-desc {
      max-width: 100%;
    }
  }

  @media (max-width: 480px) {
    .faq-section {
      padding: 32px 16px;
    }
    .faq-heading {
      font-size: 1.75rem;
    }
  }
`;

const faqs = [
  {
    q: "What is the VanMitra FRA Atlas?",
    a: "The FRA Atlas is a centralized WebGIS-based visual repository that maps all Individual Forest Rights (IFR), Community Rights (CR) and Community Forest Resource (CFR) claims and granted titles in real-time, allowing officials and communities to view and monitor forest rights geographically.",
  },
  {
    q: "Which states does VanMitra currently support?",
    a: "VanMitra is currently focused on four key states: Madhya Pradesh, Tripura, Odisha and Telangana — states with significant forest-dwelling tribal populations and active FRA implementation programs.",
  },
  {
    q: "What are Individual Forest Rights (IFR) and Community Forest Resource (CFR) rights?",
    a: "Under the Forest Rights Act 2006, IFR recognizes the right of individual forest-dwelling families to occupy and cultivate forest land. CFR rights recognize the rights of gram sabhas over entire forest areas they have traditionally used for livelihood, conservation and management.",
  },
  {
    q: "How does AI-powered satellite mapping work in VanMitra?",
    a: "VanMitra uses deep learning Computer Vision models trained on high-resolution satellite imagery to automatically identify and map natural and land resources — including forest cover, water bodies, cultivable land and barren areas — providing an accurate land inventory that supports IFR and CFR claim verification.",
  },
  {
    q: "What is the Decision Support System (DSS)?",
    a: "The DSS is an intelligent layer that uses rule-based logic combined with AI to automatically match FRA patta holders with relevant Central Sector Schemes (CSS) such as PM-KISAN, Jal Jeevan Mission, MGNREGA and DAJGUA benefits, ensuring targeted and layered development for each beneficiary.",
  },
  {
    q: "Which Central Sector Schemes are integrated into the DSS?",
    a: "The DSS currently integrates PM-KISAN (farm income support), Jal Jeevan Mission (drinking water), MGNREGA (rural employment) and DAJGUA — a convergence initiative spanning Agriculture, Tribal Affairs and Jal Shakti ministries.",
  },
  {
    q: "How is legacy FRA data integrated into the platform?",
    a: "VanMitra provides a structured legacy data ingestion pipeline that digitizes, validates and reconciles historical paper-based IFR, CR and CFR records through document scanning, OCR and geo-tagging workflows, making all past records searchable and verifiable on the digital atlas.",
  },
  {
    q: "Who can access the VanMitra platform?",
    a: "VanMitra provides role-based access to multiple stakeholders: district collectors, forest department officers, gram sabha members, state nodal officers and ministry officials. Community members can view their own rights records through a simplified portal interface.",
  },
];

// ─── Single FAQ Item ──────────────────────────────────────────────────────────
const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="faq-item">
      <span className="faq-q-label">Question</span>
      <div className="faq-question-row" onClick={() => setOpen(!open)}>
        <span className="faq-q-text">{q}</span>
        <div className={`faq-toggle${open ? " open" : ""}`}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <line x1="9" y1="1" x2="9" y2="17" stroke="#222" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="1" y1="9" x2="17" y2="9" stroke="#222" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <div className={`faq-answer${open ? " open" : ""}`}>
        <div className="faq-answer-inner">{a}</div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const FAQSection = () => (
  <>
    <style>{styles}</style>

    <div className="faq-section">
      {/* ── Left ── */}
      <div className="faq-left">
        {/* Label pill */}
        <div className="faq-label-pill">
          <div className="faq-label-line" />
          <span className="faq-label-text">Frequently Asked Questions</span>
          <div className="faq-label-line" />
        </div>

        {/* Heading */}
        <h2 className="faq-heading">
          Your FRA Platform Queries Answered!
        </h2>

        {/* Description */}
        <p className="faq-desc">
          Answers to common questions about the VanMitra FRA Atlas, WebGIS, AI asset mapping,
          and Decision Support System.
        </p>
      </div>

      {/* ── Right — accordion list ── */}
      <div className="faq-list">
        {faqs.map((item) => (
          <FaqItem key={item.q} q={item.q} a={item.a} />
        ))}
      </div>
    </div>
  </>
);

export default FAQSection;