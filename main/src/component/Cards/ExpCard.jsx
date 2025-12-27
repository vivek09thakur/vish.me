import { HiOutlineBookmarkAlt } from "react-icons/hi";
import PropTypes from "prop-types";
import "./Style.css";

const ExpCard = ({ exp }) => {
  const currentDate = new Date().toISOString().split("T")[0];
  const endDate = exp.end_date || "Present";

  return (
    <div className="expCard">
      <span className="dot"></span>

      <p id="duration">
        {exp.start_date} - {endDate}
      </p>

      <div className="heading">
        <HiOutlineBookmarkAlt className="icon" color="var(--btn_color)" />
        <h2>{exp.company_name}</h2>
      </div>

      <h4 style={{ fontWeight: "500" }}>
        <span style={{ textTransform: "uppercase" }}>Designation :</span>{" "}
        <span style={{ opacity: 0.7 }}>{exp.designation}</span>
      </h4>

      <p>
        <span style={{ fontWeight: "500", textTransform: "uppercase" }}>
          Roles & Responsibilities :
        </span>{" "}
        <span style={{ opacity: 0.7 }}>{exp.description}</span>
      </p>
    </div>
  );
};

ExpCard.propTypes = {
  exp: PropTypes.object.isRequired,
};

export default ExpCard;
