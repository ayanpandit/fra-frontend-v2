import React from "react";

// ─── Injected CSS ─────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Georgia&display=swap');

  .blog-section {
    display: grid;
    grid-template-columns: 38% 62%;
    gap: 0;
    padding: 56px 52px;
    max-width: 1460px;
    margin: 0 auto;
    box-sizing: border-box;
    align-items: start;
    background: #ffffff;
  }

  /* ── Left ── */
  .blog-left {
    padding-right: 32px;
    padding-top: 6px;
  }

  /* ── Right grid ── */
  .blog-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 400px 400px;
    gap: 12px;
  }

  /* ── Card base ── */
  .blog-card {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    cursor: pointer;
    background: #111;
  }

  /* Full cover image */
  .blog-card img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: filter 0.5s ease, transform 0.5s ease;
    filter: grayscale(0%);
    transform: scale(1);
  }

  /* Darken overlay always present */
  .blog-card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0,0,0,0.28) 0%,
      rgba(0,0,0,0.08) 40%,
      rgba(0,0,0,0.55) 100%
    );
    z-index: 1;
    transition: background 0.4s ease;
  }

  /* ── Title top-left ── */
  .blog-card-title {
    position: absolute;
    top: 18px;
    left: 18px;
    right: 18px;
    font-family: 'Georgia', serif;
    font-size: 1rem;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.35;
    z-index: 2;
    text-shadow: 0 1px 4px rgba(0,0,0,0.4);
  }

  /* ── Meta bottom-left ── */
  .blog-card-meta {
    position: absolute;
    bottom: 20px;
    left: 18px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .meta-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(30, 40, 20, 0.72);
    backdrop-filter: blur(6px);
    border-radius: 6px;
    padding: 5px 10px;
    width: fit-content;
  }

  .meta-pill span {
    font-family: 'Segoe UI', sans-serif;
    font-size: 0.65rem;
    font-weight: 600;
    color: #ffffff;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .meta-icon {
    width: 13px;
    height: 13px;
    flex-shrink: 0;
  }

  /* ─────────────────────────────────────────
     CUTOUT SYSTEM — bottom-right concave cut
     
     Logic (mirrored from the top-left example):
     A large square div positioned at bottom:-120px right:-120px
     with border-radius:50% acts as a page-colored mask,
     carving a concave quarter-circle from the card corner.
     The green arrow circle sits inside that revealed space.
  ───────────────────────────────────────── */

  /* 
    Concave mask circle — diameter 120px (radius 60px).
    Default: fully hidden outside card (bottom:-120px right:-120px).
    On hover: center lands exactly at card corner (bottom:-60px right:-60px),
    carving a ~60px concave quarter-circle — just enough to cradle the 52px arrow circle.
  */
  .blog-card::after {
    content: "";
    position: absolute;
    bottom: -120px;
    right: -120px;
    width: 120px;
    height: 120px;
    background: #ffffff;
    border-radius: 25px;
    z-index: 4;
    transition: bottom 0.7s cubic-bezier(0.34, 1.56, 0.64, 1),
                right  0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
    pointer-events: none;
  }

  /* Green arrow circle — hidden outside card by default */
  .blog-card-arrow {
    position: absolute;
    bottom: -52px;
    right: -52px;
    width: 50px;
    height: 50px;
    background: #6aaa3a;
    border-radius: 50%;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: bottom 0.7s cubic-bezier(0.34, 1.56, 0.64, 1),
                right  0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
    pointer-events: none;
  }

  /* ── HOVER STATE ── */
  .blog-card:hover img {
    filter: grayscale(100%);
    transform: scale(1.04);
  }

  .blog-card:hover .blog-card-overlay {
    background: linear-gradient(
      to bottom,
      rgba(0,0,0,0.38) 0%,
      rgba(0,0,0,0.15) 40%,
      rgba(0,0,0,0.72) 100%
    );
  }

  /* Mask center moves to corner → carves concave cut */
  .blog-card:hover::after {
    bottom: -60px;
    right: -60px;
  }

  /* Arrow lands inside the carved concave space */
  .blog-card:hover .blog-card-arrow {
    bottom: 6px;
    right: 6px;
  }

  /* ── Read Blogs button ── */
  .read-btn {
    display: inline-flex;
    align-items: center;
    background-color: #6aaa3a;
    border: none;
    border-radius: 999px;
    padding: 0;
    cursor: pointer;
    overflow: hidden;
    margin-top: 32px;
  }

  .read-btn-text {
    font-family: 'Segoe UI', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    color: #ffffff;
    padding: 14px 28px;
    letter-spacing: 0.01em;
  }

  .read-btn-icon {
    width: 46px;
    height: 46px;
    background-color: #5a9830;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 3px;
    flex-shrink: 0;
  }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .blog-section {
      grid-template-columns: 1fr;
      padding: 40px 32px;
    }
    .blog-left {
      padding-right: 0;
      margin-bottom: 36px;
    }
    .blog-grid {
      grid-template-rows: 320px 320px;
    }
  }

  @media (max-width: 640px) {
    .blog-section {
      padding: 32px 16px;
    }
    .blog-grid {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(4, 280px);
    }
  }
`;

// ─── Meta pill icons (SVG inline) ─────────────────────────────────────────────
const StarIcon = () => (
  <svg className="meta-icon" viewBox="0 0 16 16" fill="#6aaa3a">
    <path d="M8 1.5l1.6 3.3 3.6.5-2.6 2.5.6 3.6L8 9.7l-3.2 1.7.6-3.6L2.8 5.3l3.6-.5L8 1.5z" />
  </svg>
);

const CalIcon = () => (
  <svg className="meta-icon" viewBox="0 0 16 16" fill="none" stroke="#6aaa3a" strokeWidth="1.4">
    <rect x="1" y="2" width="14" height="13" rx="2" />
    <path d="M1 6h14" />
    <path d="M5 1v3M11 1v3" />
  </svg>
);

const TagIcon = () => (
  <svg className="meta-icon" viewBox="0 0 16 16" fill="none" stroke="#6aaa3a" strokeWidth="1.4">
    <rect x="1" y="1" width="14" height="14" rx="2" />
    <path d="M4 5h8M4 8h5" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 13L13 3M13 3H6M13 3V10"
      stroke="white"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Blog card data ───────────────────────────────────────────────────────────
const blogs = [
  {
    title: "From Forest to Deed: FRA Patta Distribution in Madhya Pradesh",
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=88&fit=crop",
    date: "JAN 20, 2025",
    category: "FIELD REPORT",
  },
  {
    title: "Gram Sabha to Map: How Communities Draw Their Own Boundaries",
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=88&fit=crop",
    date: "NOV 12, 2024",
    category: "COMMUNITY STORY",
  },
  {
    title: "AI Eyes in the Sky: Satellite Imagery Validates Every Claim",
    img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=88&fit=crop",
    date: "OCT 5, 2024",
    category: "TECHNOLOGY",
  },
  {
    title: "Recognition to Resources: CSS Schemes Reach Patta Holders via DSS",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=88&fit=crop",
    date: "SEP 1, 2024",
    category: "POLICY & SCHEMES",
  },
];

// ─── Single Blog Card ─────────────────────────────────────────────────────────
const BlogCard = ({ title, img, date, category }) => (
  <div className="blog-card">
    {/* Photo */}
    <img src={img} alt={title} />

    {/* Dark gradient overlay */}
    <div className="blog-card-overlay" />

    {/* Title — top left */}
    <div className="blog-card-title">{title}</div>

    {/* Meta pills — bottom left */}
    <div className="blog-card-meta">
      <div className="meta-pill">
        <StarIcon />
        <span>Featured</span>
      </div>
      <div className="meta-pill">
        <CalIcon />
        <span>{date}</span>
      </div>
      <div className="meta-pill">
        <TagIcon />
        <span>{category}</span>
      </div>
    </div>

    {/* Arrow circle — animates in on hover from bottom-right */}
    <div className="blog-card-arrow">
      <ArrowIcon />
    </div>

    {/* Note: the concave cutout mask is created via CSS ::after pseudo-element */}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const BlogSection = () => (
  <>
    <style>{styles}</style>

    <div className="blog-section">
      {/* ── Left panel ── */}
      <div className="blog-left">
        {/* BLOGS pill label */}
        <div
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
            Voices from the Ground
          </span>
          <div style={{ height: "1px", width: "26px", backgroundColor: "#aaaaaa" }} />
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "2.2rem",
            fontWeight: "700",
            color: "#111111",
            lineHeight: 1.2,
            margin: "0 0 18px 0",
            letterSpacing: "-0.015em",
            maxWidth: "460px",
          }}
        >
          Families First.
          Stories That Can't Wait.
        </h2>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Segoe UI', sans-serif",
            fontSize: "0.9rem",
            color: "#666666",
            lineHeight: 1.7,
            margin: 0,
            maxWidth: "460px",
          }}
        >
          Every grant of a forest title is a story. Here are four of them —
          from the gram sabha meeting where it began, to the satellite scan
          that proved the land was theirs, to the day the patta was signed.
        </p>

        {/* Read Blogs button (copied from hero2.jsx) */}
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
            margin-top: 32px;
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
          <div className="left-div">Read Insights</div>
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

      {/* ── Right 2×2 grid ── */}
      <div className="blog-grid">
        {blogs.map((b) => (
          <BlogCard key={b.title} {...b} />
        ))}
      </div>
    </div>
  </>
);

export default BlogSection;