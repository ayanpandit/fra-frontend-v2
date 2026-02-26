import { useState, useEffect, useRef } from "react";

// 9 cards that visually tell the tribal-FRA story left-to-right:
// family → their forest → their village → their rights document →
// land mapped → seen from space → forest surveyed → water rights → digital future
const cardItems = [
  { id: 1, image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=90&fit=crop", caption: "Families" },
  { id: 2, image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=90&fit=crop", caption: "Their Forest" },
  { id: 3, image: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800&q=90&fit=crop", caption: "Their Village" },
  { id: 4, image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=90&fit=crop", caption: "Their Rights" },
  { id: 5, image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=90&fit=crop", caption: "Land Mapped" },
  { id: 6, image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=90&fit=crop", caption: "Seen from Space" },
  { id: 7, image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=90&fit=crop", caption: "Forest Cover" },
  { id: 8, image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&q=90&fit=crop", caption: "Water Rights" },
  { id: 9, image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=90&fit=crop", caption: "Digital Future" },
];

const CARD_WIDTH = 250;
const CARD_HEIGHT = 320;
const STACK_OFFSET = 10;
const FAN_GAP = CARD_WIDTH + 10;


function Hero2() {
  const [btnHover, setBtnHover] = useState(false);
  const [stackHover, setStackHover] = useState(false);
  const total = cardItems.length;
  const sectionRef = useRef(null);

  // Button hover handlers (unchanged logic)
  const handleMouseEnter = (e) => {
    e.currentTarget.querySelector(".arrow-svg").style.transform = "rotate(45deg)";
    e.currentTarget.querySelector(".left-div").style.borderRadius = "20px 0px 0px 20px";
    e.currentTarget.querySelector(".right-wrapper").style.padding = "0px";
    e.currentTarget.querySelector(".right-wrapper").style.marginRight = "-2px";
    e.currentTarget.querySelector(".right-div").style.borderRadius = "0px 20px 20px 0px";
    setBtnHover(true);
  };
  const handleMouseLeave = (e) => {
    e.currentTarget.querySelector(".arrow-svg").style.transform = "rotate(0deg)";
    e.currentTarget.querySelector(".left-div").style.borderRadius = "20px";
    e.currentTarget.querySelector(".right-wrapper").style.padding = "2px 2px 2px 7px";
    e.currentTarget.querySelector(".right-wrapper").style.marginRight = "0px";
    e.currentTarget.querySelector(".right-div").style.borderRadius = "20px";
    setBtnHover(false);
  };

  // Card stack hover handlers
  const handleStackMouseEnter = () => setStackHover(true);
  const handleStackMouseLeave = () => setStackHover(false);

  // Card stack scale (no zoom out)
  const scaleValue = 1;
  const hovered = stackHover;

  return (
    <>
      <style>{`
      .stack-wrapper {
        position: relative;
        width: ${total * FAN_GAP + CARD_WIDTH}px;
        height: ${CARD_HEIGHT + 40}px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .card {
        position: absolute;
        width: ${CARD_WIDTH}px;
        height: ${CARD_HEIGHT}px;
        border-radius: 14px;
        overflow: hidden;
        box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1),
                    left 1.2s cubic-bezier(0.16, 1, 0.3, 1),
                    box-shadow 1s cubic-bezier(0.16, 1, 0.3, 1);
        border: 2px solid rgba(255,255,255,0.08);
        will-change: transform, left;
      }
      .card img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        pointer-events: none;
        transition: transform 0.4s ease;
      }
      .card:hover img {
        transform: scale(1.06);
      }
    `}</style>
      <style>{`
      @media (max-width: 768px) {
        .hero2-section {
          margin-left: 12px !important;
          margin-right: 12px !important;
          height: 500px !important;
          border-radius: 0 0 8% 8% !important;
        }
        .hero2-section .stack-bottom {
          display: none !important;
        }
        .hero2-content {
          padding-top: 6rem !important;
          padding-left: 16px !important;
          padding-right: 16px !important;
        }
        .hero2-heading {
          font-size: clamp(1.6rem, 6vw, 2.4rem) !important;
        }
        .hero2-subtext {
          font-size: 0.95rem !important;
        }
        .hero2-btn {
          width: 190px !important;
          height: 48px !important;
        }
      }
      @media (max-width: 480px) {
        .hero2-section {
          margin-left: 8px !important;
          margin-right: 8px !important;
          height: 420px !important;
        }
        .hero2-content {
          padding-top: 4rem !important;
        }
        .hero2-heading {
          font-size: clamp(1.3rem, 7vw, 1.9rem) !important;
        }
        .hero2-subtext {
          font-size: 0.85rem !important;
        }
      }
    `}</style>
      <div
        className="hero2-section relative mx-5 bg-[#263E27] rounded-b-[5%] h-[750px]"
        ref={sectionRef}
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1800&q=90&fit=crop)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        {/* Hero Content */}
        <div className="hero2-content flex flex-col items-center justify-start h-full text-center px-4 pt-32">

          {/* Heading */}
          <h1
            className="hero2-heading text-white font-extrabold leading-tight"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontFamily: 'IM Fell Great Primer, serif',
              lineHeight: 1.12,
              letterSpacing: "0.03em"
            }}
          >
            Their Forest.<br />
            Their Rights.<br />
            <span className="text-[#8CB45C]">Finally Recognised.</span>
          </h1>

          {/* Subtext */}
          <p
            className="hero2-subtext mt-2 text-gray-300 text-sm max-w-lg"
            style={{
              fontFamily: 'IM Fell Great Primer, serif',
              fontSize: "1.15rem",
              lineHeight: 1.55,
              maxWidth: "560px"
            }}
          >
            Over 4 crore families live in India's forests — farming the same land for generations,
            yet holding no formal title to it. VanMitra maps their rights, verifies their land with
            satellite AI, and connects them to the benefits they have always deserved.
          </p>

          {/* Button */}
          <div
            className="hero2-btn flex items-center cursor-pointer mt-8 overflow-hidden border border-[#8CB45C] bg-transparent"
            style={{ borderRadius: "20px", width: "210px", height: "54px", fontFamily: 'Funnel Display, sans-serif', fontWeight: 500, fontSize: "1.1rem" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Left — Get Template */}
            <div
              className="left-div bg-[#8CB45C] flex items-center justify-center text-white font-semibold text-base flex-shrink-0 h-full"
              style={{
                width: "75%",
                borderRadius: "20px",
                marginLeft: "-1px",
                transition: "border-radius 0.3s ease",
              }}
            >
              FRA Portal
            </div>

            {/* Right — Arrow */}
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

        {/* Bottom Card Stack */}
        <div
          className="stack-bottom absolute left-1/2 -translate-x-1/2"
          style={{ bottom: "-205px" }}
          onMouseEnter={handleStackMouseEnter}
          onMouseLeave={handleStackMouseLeave}
        >
          <div className="stack-wrapper">
            {cardItems.map((item, i) => {
              const stackedLeft = `calc(50% - ${CARD_WIDTH / 2}px - ${(total - 1 - i) * STACK_OFFSET}px`;
              const stackedTranslateY = (total - 1 - i) * -2;
              const fannedLeft = `${i * FAN_GAP}px`;
              const isLast = i === total - 1;

              // Scale (no zoom out)
              const scale = scaleValue;

              // Rotation: tilt in stack, flat when fanned
              const stackRotate = (total - 1 - i) * -1.2;
              const rotate = hovered ? 0 : stackRotate;

              // TranslateY: stacked offset or flat
              const translateY = hovered ? 0 : stackedTranslateY;

              return (
                <div
                  key={item.id}
                  className="card"
                  style={{
                    zIndex: i + 1,
                    left: hovered ? fannedLeft : stackedLeft,
                    transform: `translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
                    boxShadow: hovered
                      ? "0 12px 40px rgba(0,0,0,0.6)"
                      : "0 8px 32px rgba(0,0,0,0.5)",
                  }}
                >
                  <img src={item.image} alt={item.caption || `card-${item.id}`} />
                {/* Caption chip on hover */}
                <div style={{
                  position: "absolute",
                  bottom: 10,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(0,0,0,0.55)",
                  backdropFilter: "blur(6px)",
                  color: "#fff",
                  fontSize: "0.68rem",
                  fontFamily: "'Segoe UI', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "5px 12px",
                  borderRadius: "999px",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                }}>{item.caption}</div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </>
  );
}

export default Hero2;