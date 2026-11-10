import PropTypes from "prop-types";

const MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };

const toMonths = (label) => {
  if (!label) {
    const d = new Date();
    return d.getFullYear() * 12 + d.getMonth();
  }
  const [mon, year] = label.split(" ");
  return Number(year) * 12 + (MONTHS[mon] ?? 0);
};

const durationOf = (start, end) => {
  const total = Math.max(1, toMonths(end) - toMonths(start));
  const y = Math.floor(total / 12);
  const mo = total % 12;
  const parts = [];
  if (y) parts.push(`${y} yr`);
  if (mo) parts.push(`${mo} mo`);
  return parts.join(" ");
};

const ExpCard = ({ exp, color, current = false }) => (
  <article className="w-full text-center max-[680px]:text-left">
    <p className="m-0 text-[0.8rem] font-semibold leading-tight" style={{ color }}>
      {exp.start} – {exp.end ?? "Present"}
      <span className="ml-2 font-normal text-font1 opacity-50">{durationOf(exp.start, exp.end)}</span>
    </p>
    <h3 className={`m-0 mt-2 text-[1rem] leading-snug text-font1 max-[680px]:text-[1.05rem] ${current ? "font-bold" : "font-semibold"}`}>
      {exp.role}
    </h3>
    <p className="m-0 mt-0.5 text-[0.85rem] opacity-60">{exp.company}</p>
    <p className="m-0 mt-3 line-clamp-5 text-[0.8rem] leading-relaxed opacity-70 max-[680px]:line-clamp-none max-[680px]:text-[0.85rem] max-[680px]:leading-[1.8]">
      {exp.summary}
    </p>
  </article>
);

ExpCard.propTypes = {
  exp: PropTypes.shape({
    company: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    start: PropTypes.string.isRequired,
    end: PropTypes.string,
    summary: PropTypes.string.isRequired,
  }).isRequired,
  color: PropTypes.string,
  current: PropTypes.bool,
};

export default ExpCard;
