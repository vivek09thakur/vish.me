import { FiGithub } from "react-icons/fi";
import { RxExternalLink } from "react-icons/rx";
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
        <p>{project.description}</p>
      </div>
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="code-link"
      >
        <FiGithub /> View Project
      </a>
    </div>
  );
};
Cards.propTypes = {
  project: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
export default Cards;
