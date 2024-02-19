import { FiGithub, FiFolder } from "react-icons/fi";
import PropTypes from "prop-types";
import "./Style.css";

const Cards = ({ project }) => {
  return (
    <div className="project_card">
      <h2>
        <FiFolder className="project_icon" /> {project.name}
      </h2>

      <div className="project_description">
        <p>{project.description}</p>
      </div>
      <a href={project.link} target="_blank" rel="noreferrer">
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
