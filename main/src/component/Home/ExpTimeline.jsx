import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import PropTypes from "prop-types";
import ExpCard from "../Cards/ExpCard";
import { bounce, fadeUp, stagger } from "../../motion";

const COLORS = ["#c6f26e", "#9b6bff", "#5b8def", "#ffb454"];

const layoutFor = (w) => {
  if (w < 680) return { mobile: true };
  if (w < 1100) return { mobile: false, perRow: 2, rowH: 300, pad: 190, stem: 80, cardW: 210 };
  return { mobile: false, perRow: 3, rowH: 340, pad: 200, stem: 90, cardW: 250 };
};

const useLayout = () => {
  const [layout, setLayout] = useState(() => layoutFor(window.innerWidth));
  useEffect(() => {
    const onResize = () => setLayout(layoutFor(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return layout;
};

const nodeY = (L, r) => L.pad + r * L.rowH;
const yAt = (L, r, xPct) => {
  const reversed = r % 2 === 1;
  const t = reversed ? 1 - xPct / 100 : xPct / 100;
  return nodeY(L, r) + L.rowH * t;
};

const Row = ({ L, items, rowIndex, offset }) => {
  const reversed = rowIndex % 2 === 1;
  const above = rowIndex % 2 === 0;
  return (
    <m.div
      className="absolute inset-0"
      variants={stagger(0.14, 0.5)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {items.map((exp, i) => {
        const slot = ((i + 0.5) / L.perRow) * 100;
        const x = reversed ? 100 - slot : slot;
        const y = yAt(L, rowIndex, x);
        const color = COLORS[(offset + i) % COLORS.length];
        const stemTop = above ? y - L.stem : y;
        return (
          <div key={i} className="absolute" style={{ left: `${x}%`, top: 0, bottom: 0 }}>
            <m.span
              className="absolute w-0.5 -translate-x-1/2"
              style={{ background: color, top: stemTop, height: L.stem, transformOrigin: above ? "bottom" : "top" }}
              variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: bounce } }}
            />
            <m.span
              className="absolute w-5 h-5 rounded-full -translate-x-1/2 -translate-y-1/2 bg-dark1"
              style={{ top: y, border: `3px solid ${color}` }}
              variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: bounce } }}
            />
            <m.span
              className="absolute w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{ background: color, top: above ? stemTop : y + L.stem }}
              variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: bounce } }}
            />
            <m.div
              className="absolute"
              style={{
                left: 16,
                width: L.cardW,
                ...(above ? { bottom: `calc(100% - ${stemTop - 8}px)` } : { top: y + L.stem + 8 }),
              }}
              variants={fadeUp}
            >
              <ExpCard exp={exp} color={color} compact />
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

const totalHeight = (L, rowCount) => L.pad + rowCount * L.rowH + L.pad;

const Path = ({ L, rowCount }) => {
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
  return (
    <svg ref={ref} className="absolute inset-0 w-full h-full" aria-hidden="true">
      {width > 0 && (
        <>
          <defs>
            <clipPath id="tl-reveal">
              <m.rect
                x="0"
                y="0"
                width="100%"
                initial={{ height: 0 }}
                whileInView={{ height: totalHeight(L, rowCount), transition: { duration: 1.2 * rowCount, ease: "easeInOut" } }}
                viewport={{ once: true, amount: 0.15 }}
              />
            </clipPath>
          </defs>
          <polyline
            points={pts.join(" ")}
            fill="none"
            stroke="rgba(199,207,224,0.35)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            clipPath="url(#tl-reveal)"
          />
        </>
      )}
    </svg>
  );
};
Path.propTypes = { L: PropTypes.object.isRequired, rowCount: PropTypes.number.isRequired };

const ExpTimeline = ({ experiences }) => {
  const L = useLayout();

  if (L.mobile) {
    return (
      <m.div
        className="relative pl-12 pr-2 py-4"
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-font1/30" />
        <div className="flex flex-col gap-16">
          {experiences.map((exp, i) => {
            const color = COLORS[i % COLORS.length];
            return (
              <m.div key={i} className="relative" variants={fadeUp}>
                <span
                  className="absolute top-1 -left-[46px] w-4 h-4 rounded-full bg-dark1"
                  style={{ border: `3px solid ${color}` }}
                />
                <ExpCard exp={exp} color={color} compact />
              </m.div>
            );
          })}
        </div>
      </m.div>
    );
  }

  const rows = [];
  for (let i = 0; i < experiences.length; i += L.perRow) {
    rows.push(experiences.slice(i, i + L.perRow));
  }

  return (
    <div className="relative w-full -mt-8" style={{ height: totalHeight(L, rows.length) }}>
      <Path L={L} rowCount={rows.length} />
      {rows.map((row, r) => (
        <Row key={r} L={L} items={row} rowIndex={r} offset={r * L.perRow} />
      ))}
    </div>
  );
};

ExpTimeline.propTypes = {
  experiences: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ExpTimeline;
