import { m } from "framer-motion";
import PropTypes from "prop-types";
import { fadeUp, viewportOnce } from "../../motion";

const ExpCard = ({ exp, color, compact = false }) => {
  const isCurrent = !exp.end_date || exp.end_date === "Present";
  const endDate = isCurrent ? "Present" : exp.end_date;

  if (compact) {
    return (
      <div className="w-full">
        <p className="text-sm font-semibold m-0 leading-tight" style={{ color }}>
          {exp.start_date} – {endDate}
        </p>
        <h3 className="text-[0.95rem] font-semibold mt-2 m-0 text-font1 leading-snug max-[680px]:text-base">
          {exp.company_name}
          <span className="font-normal opacity-60"> · {exp.designation}</span>
        </h3>
        <p className="text-xs opacity-65 mt-3 m-0 leading-relaxed line-clamp-4 max-[680px]:text-[0.85rem] max-[680px]:leading-[1.8] max-[680px]:line-clamp-none">{exp.description}</p>
      </div>
    );
  }

  return (
    <m.div
      className="w-full px-1 pb-4"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      <p className="text-xs font-medium opacity-60 mb-2">
        {exp.start_date} -{" "}
        <span className={isCurrent ? "text-green1 opacity-100" : ""}>{endDate}</span>
      </p>

      <h2 className="text-base font-semibold m-0 text-font1">{exp.company_name}</h2>

      <h4 className="text-sm font-medium mt-2">
        <span className="uppercase">Designation :</span>{" "}
        <span className="opacity-70">{exp.designation}</span>
      </h4>

      <p className="text-sm mt-2">
        <span className="font-medium uppercase">Roles &amp; Responsibilities :</span>{" "}
        <span className="opacity-70">{exp.description}</span>
      </p>
    </m.div>
  );
};

ExpCard.propTypes = {
  exp: PropTypes.object.isRequired,
  color: PropTypes.string,
  compact: PropTypes.bool,
};

export default ExpCard;
