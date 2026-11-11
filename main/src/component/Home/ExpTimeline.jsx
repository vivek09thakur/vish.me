import { useEffect, useRef, useState } from "react";
import { m, useReducedMotion, useScroll, useSpring } from "framer-motion";
import PropTypes from "prop-types";
import ExpCard from "../Cards/ExpCard";
import { bounce, fadeUp, stagger } from "../../motion";

const COLORS = ["#c6f26e", "#9b6bff", "#5b8def", "#ffb454"];

const BREAKPOINTS = [
  { query: "(max-width: 679px)", layout: { mobile: true } },
  { query: "(max-width: 1099px)", layout: { mobile: false, perRow: 2, rowH: 340, pad: 265, stem: 84, cardW: 270 } },
  { query: "all", layout: { mobile: false, perRow: 3, rowH: 380, pad: 285, stem: 90, cardW: 280 } },
];

const layoutFor = () => BREAKPOINTS.find((b) => window.matchMedia(b.query).matches).layout;

// Only re-renders when the breakpoint changes, not on every resize pixel.
const useLayout = () => {
  const [layout, setLayout] = useState(layoutFor);
  useEffect(() => {
    const lists = BREAKPOINTS.map((b) => window.matchMedia(b.query));
    const onChange = () => setLayout(layoutFor());
    lists.forEach((l) => l.addEventListener("change", onChange));
    return () => lists.forEach((l) => l.removeEventListener("change", onChange));
  }, []);
  return layout;
};

const nodeY = (L, r) => L.pad + r * L.rowH;
const yAt = (L, r, xPct) => {
  const reversed = r % 2 === 1;
  const t = reversed ? 1 - xPct / 100 : xPct / 100;
  return nodeY(L, r) + L.rowH * t;
};
const totalHeight = (L, rowCount) => L.pad + rowCount * L.rowH + L.pad;

const Pulse = ({ color }) => {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <m.span
      className="absolute w-5 h-5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ border: `2px solid ${color}` }}
      animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
    />
  );
};
Pulse.propTypes = { color: PropTypes.string.isRequired };

const Row = ({ L, items, rowIndex, offset }) => {
  const reversed = rowIndex % 2 === 1;
  const above = rowIndex % 2 === 0;
  return (
    <m.div
      className="absolute inset-0"
      variants={stagger(0.14, 0.3)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {items.map((exp, i) => {
        const index = offset + i;
        const current = index === 0 && !exp.end;
        const slot = ((i + 0.5) / L.perRow) * 100;
        const x = reversed ? 100 - slot : slot;
        const y = yAt(L, rowIndex, x);
        const color = COLORS[index % COLORS.length];
        const stemTop = above ? y - L.stem : y;
        return (
          <div key={index} className="absolute" style={{ left: `${x}%`, top: 0, bottom: 0 }}>
            <m.span
              className="absolute w-0.5 -translate-x-1/2"
              style={{
                top: stemTop,
                height: L.stem,
                transformOrigin: above ? "bottom" : "top",
                background: above
                  ? `linear-gradient(to top, ${color}, ${color}55)`
                  : `linear-gradient(to bottom, ${color}, ${color}55)`,
              }}
              variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: bounce } }}
            />
            <m.span
              className="absolute w-5 h-5 rounded-full -translate-x-1/2 -translate-y-1/2 bg-dark1"
              style={{ top: y, border: `3px solid ${color}`, boxShadow: `0 0 0 4px var(--dark1)` }}
              variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: bounce } }}
            >
              {current && <span className="absolute inset-[3px] rounded-full" style={{ background: color }} />}
            </m.span>
            {current && <span className="absolute -translate-x-1/2 -translate-y-1/2" style={{ top: y }}><Pulse color={color} /></span>}
            <m.div
              className="absolute -translate-x-1/2"
              style={{
                left: 0,
                width: L.cardW,
                ...(above ? { bottom: `calc(100% - ${stemTop - 10}px)` } : { top: y + L.stem + 10 }),
              }}
              variants={fadeUp}
            >
              <ExpCard exp={exp} color={color} current={current} />
            </m.div>
          </div>
        );
      })}
    </m.div>
  );
};

Row.propTypes = {
  L: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
};

const Path = ({ L, rowCount, progress }) => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pts = [];
  for (let r = 0; r < rowCount; r++) {
    const reversed = r % 2 === 1;
    const [xa, xb] = reversed ? [100, 0] : [0, 100];
    if (r === 0) pts.push(`${(xa / 100) * width},${yAt(L, r, xa)}`);
    pts.push(`${(xb / 100) * width},${yAt(L, r, xb)}`);
  }
  const points = pts.join(" ");
  const total = totalHeight(L, rowCount);

  return (
    <svg ref={ref} className="absolute inset-0 w-full h-full overflow-visible" aria-hidden="true">
      {width > 0 && (
        <>
          <defs>
            <linearGradient id="trail" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={total}>
              <stop offset="0" stopColor="#c6f26e" />
              <stop offset="0.45" stopColor="#9b6bff" />
              <stop offset="1" stopColor="#c7cfe0" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <polyline
            points={points}
            fill="none"
            stroke="rgba(199,207,224,0.14)"
            strokeWidth="2"
            strokeDasharray="4 8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <m.polyline
            points={points}
            fill="none"
            stroke="url(#trail)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength: progress }}
          />
        </>
      )}
    </svg>
  );
};
Path.propTypes = {
  L: PropTypes.object.isRequired,
  rowCount: PropTypes.number.isRequired,
  progress: PropTypes.object.isRequired,
};

const useTrailProgress = (ref) => {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 70%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.6 });
  const full = useSpring(1, { stiffness: 1000, damping: 100 });
  return reduce ? full : smooth;
};

const Mobile = ({ experiences }) => {
  const ref = useRef(null);
  const progress = useTrailProgress(ref);
  return (
    <m.div
      ref={ref}
      className="relative pl-10 pr-1 py-4"
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-font1/15" />
      <m.div
        className="absolute top-2 bottom-2 left-[7px] w-0.5 origin-top"
        style={{ scaleY: progress, background: "linear-gradient(to bottom, #c6f26e, #9b6bff 45%, rgba(199,207,224,.35))" }}
      />
      <div className="flex flex-col gap-14">
        {experiences.map((exp, i) => {
          const color = COLORS[i % COLORS.length];
          const current = i === 0 && !exp.end;
          return (
            <m.div key={i} className="relative" variants={fadeUp}>
              <span
                className="absolute top-1 -left-[38px] w-4 h-4 rounded-full bg-dark1"
                style={{ border: `3px solid ${color}` }}
              >
                {current && <span className="absolute inset-[2px] rounded-full" style={{ background: color }} />}
              </span>
              <ExpCard exp={exp} color={color} current={current} />
            </m.div>
          );
        })}
      </div>
    </m.div>
  );
};
Mobile.propTypes = { experiences: PropTypes.array.isRequired };

const Desktop = ({ experiences, L }) => {
  const ref = useRef(null);
  const progress = useTrailProgress(ref);
  const rows = [];
  for (let i = 0; i < experiences.length; i += L.perRow) {
    rows.push(experiences.slice(i, i + L.perRow));
  }
  return (
    <div ref={ref} className="relative mx-auto w-[86%] max-w-[1180px] -mt-6" style={{ height: totalHeight(L, rows.length) }}>
      <Path L={L} rowCount={rows.length} progress={progress} />
      {rows.map((row, r) => (
        <Row key={r} L={L} items={row} rowIndex={r} offset={r * L.perRow} />
      ))}
    </div>
  );
};
Desktop.propTypes = { experiences: PropTypes.array.isRequired, L: PropTypes.object.isRequired };

const ExpTimeline = ({ experiences }) => {
  const L = useLayout();
  return L.mobile ? <Mobile experiences={experiences} /> : <Desktop experiences={experiences} L={L} />;
};

ExpTimeline.propTypes = {
  experiences: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ExpTimeline;
