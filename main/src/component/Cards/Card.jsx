// import { FiGithub } from "react-icons/fi";
// import { BsTools } from "react-icons/bs";
import { RxExternalLink } from "react-icons/rx";
import { PiTagSimple } from "react-icons/pi";
import PropTypes from "prop-types";
import "./Style.css";

const Cards = ({ project }) => {
  return (
    <div className="project_card">
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: "none", color: "var(--font_color1)" }}
      >
        <h2>
          <RxExternalLink className="project_icon" /> {project.name}
        </h2>
      </a>

      <div className="project_description">
        <p style={{ opacity: ".85" }}>{project.description}</p>
      </div>
      <p className="tech-stack">
        <PiTagSimple style={{ position: "relative", bottom: "-2px" }} />{" "}
        {project.tech_stack}
      </p>
    </div>
  );
};
Cards.propTypes = {
  project: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tech_stack: PropTypes.string.isRequired,
};
export default Cards;
