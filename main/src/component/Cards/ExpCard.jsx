import { HiOutlineBookmarkAlt, HiArrowCircleUp } from "react-icons/hi";
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
      <HiArrowCircleUp id="up" style={{ fontSize: ".5rem" }} />
      <p
        id="duration"
        style={{
          fontWeight: "500",
          textTransform: "capitalize",
        }}
      >
        {exp.start_date} - {displayEndDate}
      </p>
      <div className="heading">
        <HiOutlineBookmarkAlt className="icon" color="var(--btn_color)" />
        <h2
          style={{
            fontWeight: "500",
            textTransform: "uppercase",
          }}
        >
          {exp.company_name}
        </h2>
      </div>
      <h4 style={{ fontWeight: "500" }}>
        <span
          style={{
            textTransform: "uppercase",
            _color: "var(--btn_color)",
            get color() {
              return this._color;
            },
            set color(value) {
              this._color = value;
            },
            paddingRight: "3px",
          }}
        >
          Designation :
        </span>
        {exp.designation}
      </h4>
      <p>
        <span
          style={{
            fontWeight: "500",
            textTransform: "uppercase",
            paddingRight: "3px",
            color: "var(--btn_color)",
          }}
        >
          Roles & Responsibilities :
        </span>
        <span style={{ opacity: ".69" }}>{exp.description}</span>
      </p>
    </div>
  );
};

export default ExpCard;

ExpCard.propTypes = {
  exp: PropTypes.object.isRequired,
  company_name: PropTypes.string,
  start_date: PropTypes.string,
  end_date: PropTypes.string,
};
