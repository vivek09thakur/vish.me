// import { CgToolbox } from "react-icons/cg";
import { HiOutlineBookmarkAlt } from "react-icons/hi";
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
      <p id="duration" color="var(--btn_color)">
        {exp.start_date} - {displayEndDate}
      </p>
      <div className="heading">
        <HiOutlineBookmarkAlt className="icon" color="var(--btn_color)" />
        <h2>{exp.company_name}</h2>
      </div>
      <h4>
        <span
          style={{
            fontFamily: "var(--robotic_font)",
          }}
        >
          Designation :{" "}
        </span>{" "}
        {exp.designation}
      </h4>
      <p>Roles & Responsibilities : {exp.description}</p>
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
