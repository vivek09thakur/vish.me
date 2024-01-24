import { AiOutlineFolder, AiOutlineGithub } from "react-icons/ai";
import PropTypes from "prop-types";
import "./Style.css";

const Cards = ({ project }) => {
  return (
    <div className="project_card">
      <h2>
        <AiOutlineFolder className="project_icon" /> {project.name}
      </h2>

      <div className="project_description">
        <p>{project.description}</p>
      </div>
      <a href={project.link} target="_blank" rel="noreferrer">
        <AiOutlineGithub /> View Project
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
