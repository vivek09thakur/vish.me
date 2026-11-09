import PropTypes from "prop-types";

const ExpCard = ({ exp, color }) => (
  <div className="w-full">
    <p className="text-sm font-semibold m-0 leading-tight" style={{ color }}>
      {exp.start} – {exp.end ?? "Present"}
    </p>
    <h3 className="text-[0.95rem] font-semibold mt-2 m-0 text-font1 leading-snug max-[680px]:text-base">
      {exp.company}
      <span className="font-normal opacity-60"> · {exp.role}</span>
    </h3>
    <p className="text-xs opacity-65 mt-3 m-0 leading-relaxed line-clamp-4 max-[680px]:text-[0.85rem] max-[680px]:leading-[1.8] max-[680px]:line-clamp-none">
      {exp.summary}
    </p>
  </div>
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
};

export default ExpCard;
