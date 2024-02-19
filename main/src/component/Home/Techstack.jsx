import {
  SiJavascript,
  SiNumpy,
  SiPandas,
  SiJupyter,
  SiTensorflow,
  SiPytorch,
  SiDjango,
  SiFlask,
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiReact,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiPython,
  SiVisualstudiocode,
  SiGooglecolab,
  SiAngularjs,
  SiNextdotjs,
  SiSvelte,
  SiAstro,
  SiVercel,
  SiGitpod,
} from "react-icons/si";
import "./Styles/Techstack.css";

const TechStack = () => {
  const STACK = [
    SiHtml5,
    SiCss3,
    SiJavascript,
    SiBootstrap,
    SiNodedotjs,
    SiGit,
    SiGithub,
    SiReact,
    SiAngularjs,
    SiNextdotjs,
    SiSvelte,
    SiAstro,
    SiPython,
    SiJupyter,
    SiNumpy,
    SiPandas,
    SiTensorflow,
    SiPytorch,
    SiFlask,
    SiDjango,
    SiGooglecolab,
    SiVisualstudiocode,
    SiVercel,
    SiGitpod,
  ];
  return (
    <div className="techstack">
      <div className="heading">
        <h2 style={{ textTransform: "capitalize" }}>Languages and Tools⚡ </h2>
      </div>
      <div className="icon-box">
        {STACK.map((Icon, index) => (
          <Icon key={index} className="icon" />
        ))}
      </div>
    </div>
  );
};

export default TechStack;
