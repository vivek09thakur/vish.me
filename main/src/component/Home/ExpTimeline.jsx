import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ExpCard from "../Cards/ExpCard";

const MOBILE_MAX = 680;
// one card per row, occupying half the row, so the path turns after every card
const PER_ROW = 1;
const CELL_WIDTH = "50%";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < MOBILE_MAX);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < MOBILE_MAX);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
};

const ARROW_SHAPES = {
  right: "polygon(0 0, 100% 50%, 0 100%)",
  left: "polygon(100% 0, 0 50%, 100% 100%)",
  down: "polygon(0 0, 100% 0, 50% 100%)",
};

// filled arrowhead sitting on the line, pointing in the direction of travel
const Arrow = ({ dir = "right", className = "" }) => (
  <span
    className={`absolute bg-btn z-10 ${dir === "down" ? "w-3 h-3.5" : "w-3.5 h-3"} ${className}`}
    style={{ clipPath: ARROW_SHAPES[dir] }}
  />
);
Arrow.propTypes = { dir: PropTypes.oneOf(["right", "left", "down"]), className: PropTypes.string };

const ExpTimeline = ({ experiences }) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="relative pl-10">
        <div className="absolute top-3 bottom-3 left-[7px] w-0.5 bg-btn/40" />
        <div className="flex flex-col gap-6">
          {experiences.map((exp, i) => (
            <div key={i} className="relative">
              <Arrow dir="down" className="top-7 -left-[38px]" />
              <ExpCard exp={exp} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const rows = [];
  for (let i = 0; i < experiences.length; i += PER_ROW) {
    rows.push(experiences.slice(i, i + PER_ROW));
  }

  return (
    // horizontal padding reserves room for the U-turn arcs outside the rows
    <div className="w-[80%] mx-auto px-14 pb-3">
      {rows.map((row, r) => {
        const reversed = r % 2 === 1;
        return (
          <div key={r} className={`relative ${r > 0 ? "pt-14" : ""}`}>
            {r > 0 && (
              // arc runs from the previous row's line down to this row's line
              <span
                className={`absolute -top-0.5 bottom-0 w-14 border-2 border-btn/50 ${
                  reversed
                    ? "-right-14 border-l-0 rounded-r-full"
                    : "-left-14 border-r-0 rounded-l-full"
                }`}
              />
            )}
            <div className={`relative flex items-stretch ${reversed ? "flex-row-reverse" : ""}`}>
              <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-btn/50" />
              {row.map((exp, i) => (
                <div
                  key={i}
                  className="relative shrink-0 px-3 pb-5 flex"
                  style={{ width: CELL_WIDTH }}
                >
                  <Arrow dir="left" className="-bottom-[5px] left-1/2 -translate-x-1/2" />
                  <ExpCard exp={exp} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

ExpTimeline.propTypes = {
  experiences: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ExpTimeline;
