import { useState, useRef, useEffect } from "react";

const cardItems = [
  { id: 1, image: "https://picsum.photos/seed/nature/400/300" },
  { id: 2, image: "https://picsum.photos/seed/mountain/400/300" },
  { id: 3, image: "https://picsum.photos/seed/beach/400/300" },
  { id: 4, image: "https://picsum.photos/seed/forest/400/300" },
  { id: 5, image: "https://picsum.photos/seed/city/400/300" },
  { id: 6, image: "https://picsum.photos/seed/snow/400/300" },
  { id: 7, image: "https://picsum.photos/seed/desert/400/300" },
  { id: 8, image: "https://picsum.photos/seed/river/400/300" },
  { id: 9, image: "https://picsum.photos/seed/lake/400/300" },
];

const CARD_WIDTH = 250;
const CARD_HEIGHT = 320;
const STACK_OFFSET = 10; // px each card peeks out from under the previous
const FAN_GAP = CARD_WIDTH + 10; // spacing when fanned out


export default function Hero2() {
  const [hovered, setHovered] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef(null);
  const total = cardItems.length;

  // Carousel effect when hovered
  useEffect(() => {
    let interval;
    if (hovered) {
      interval = setInterval(() => {
        setCarouselIndex((prev) => (prev + 1) % total);
      }, 1800);
    } else {
      setCarouselIndex(0);
    }
    return () => clearInterval(interval);
  }, [hovered, total]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&display=swap');

        body { margin: 0; }

        .scene {
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          font-family: 'Playfair Display', serif;
        }

        .title {
          color: #e2c97e;
          font-size: 2rem;
          letter-spacing: 0.08em;
          margin-bottom: 60px;
          text-shadow: 0 2px 20px rgba(226,201,126,0.3);
        }

        .stack-wrapper {
          position: relative;
          /* enough width to accommodate fanned state */
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
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
                      left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.4s ease;
          border: 2px solid rgba(255,255,255,0.08);
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

        .hint {
          margin-top: 32px;
          color: rgba(226,201,126,0.5);
          font-size: 0.85rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          transition: opacity 0.4s;
        }
      `}</style>

      <div className="scene">
        <h1 className="title">Gallery</h1>

        <div
          className="stack-wrapper"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {cardItems.map((item, i) => {
            // Stacked: all cards centered, slight offset so back cards peek
            // The card at index 0 is the bottom (lowest z), index n-1 is top
            const stackedLeft = `calc(50% - ${CARD_WIDTH / 2}px - ${(total - 1 - i) * STACK_OFFSET}px)`;
            const stackedTranslateY = (total - 1 - i) * -2; // slight vertical lift

            // Fanned: evenly spaced, but carousel scrolls
            let fannedLeft = `${i * FAN_GAP}px`;
            if (hovered) {
              // Move the cards in a carousel fashion
              const offset = ((i - carouselIndex + total) % total) * FAN_GAP;
              fannedLeft = `${offset}px`;
            }

            // Tilt the last card (rightmost) to the right ONLY when NOT hovered
            const isLast = i === total - 1;
            const fannedRotate = (isLast && !hovered) ? 12 : 0; // degrees

            return (
              <div
                key={item.id}
                className="card"
                style={{
                  zIndex: i + 1,
                  left: hovered ? fannedLeft : stackedLeft,
                  transform: hovered
                    ? `translateY(0px) rotate(0deg)`
                    : `translateY(${stackedTranslateY}px) rotate(${(total - 1 - i) * -1.2 + (isLast ? 12 : 0)}deg)`,
                  boxShadow: hovered
                    ? "0 12px 40px rgba(0,0,0,0.6)"
                    : "0 8px 32px rgba(0,0,0,0.5)",
                }}
              >
                <img src={item.image} alt={`card-${item.id}`} />
              </div>
            );
          })}
        </div>

        <p className="hint" style={{ opacity: hovered ? 0 : 1 }}>
          Hover to reveal
        </p>
      </div>
    </>
  );
}