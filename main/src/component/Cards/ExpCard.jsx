import { CgToolbox } from "react-icons/cg";
import PropTypes from "prop-types";
import "./Style.css";

const ExpCard = ({ exp }) => {
  const CurrentDate = new Date();
  const endDate = exp.end_date
    ? exp.end_date
    : CurrentDate.toISOString().split("T")[0];
  const displayEndDate = exp.end_date ? endDate : "Present";
  return (
    <div className="expCard">
      <p id="duration">
        {exp.start_date} - {displayEndDate}
      </p>
      <div className="heading">
        <CgToolbox className="icon" />
        <h2>{exp.company_name}</h2>
      </div>
      <h4>
        <span
          style={{ color: "var(--blue1)", fontFamily: "var(--robotic_font)" }}
        >
          Designation :{" "}
        </span>{" "}
        {exp.designation}
      </h4>
      <p>
        <span
          style={{ color: "var(--blue1)", fontFamily: "var(--robotic_font)" }}
        >
          Roles & Responsibilities :{" "}
        </span>{" "}
        {exp.description}
      </p>
    </div>
  );
};

export default ExpCard;

ExpCard.propTypes = {
  exp: PropTypes.object.isRequired,
  company_name: PropTypes.string.isRequired,
  start_date: PropTypes.string.isRequired,
  end_date: PropTypes.string.isRequired,
};
