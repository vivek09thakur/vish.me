// import { FiGithub } from "react-icons/fi";
// import { BsTools } from "react-icons/bs";
import { RxExternalLink } from "react-icons/rx";
import { PiTagSimple } from "react-icons/pi";
import PropTypes from "prop-types";
import demo_image from "/demo-project.png";
import "./Style.css";

const Cards = ({ project }) => {
  return (
    <div className="project_card">
      <div className="project-image">
        <img src={demo_image} alt="" sizes="" srcset="" />
      </div>
      <div className="project-content">
        <h2>
          <RxExternalLink className="project_icon" /> {project.name}
        </h2>
        <div className="project_description">
          <p style={{ opacity: ".85" }}>{project.description}</p>
          <p className="tech-stack">
            <PiTagSimple
              style={{
                position: "relative",
                bottom: "-2px",
                paddingRight: "5px",
              }}
            />
            {project.tech_stack}
          </p>
        </div>
      </div>
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: "none", color: "var(--font_color1)" }}
      ></a>
    </div>
  );
};
Cards.propTypes = {
  project: PropTypes.object.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  tech_stack: PropTypes.string,
};
export default Cards;
