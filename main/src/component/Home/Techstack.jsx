import {
  SiJavascript,
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
  SiExpress,
  SiFigma,
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
    SiExpress,
    SiVercel,
    SiPython,
    SiJupyter,
    SiTensorflow,
    SiPytorch,
    SiFlask,
    SiDjango,
    SiGooglecolab,
    SiGitpod,
    SiVisualstudiocode,
    SiFigma,
  ];
  return (
    <div className="techstack">
      <div className="heading">
        <h2 style={{ textTransform: "capitalize" }}>
          Languages <span style={{ color: "var(--btn_color)" }}> and </span>
          Tools⚡{" "}
        </h2>
      </div>
      <div className="icon-box">
        {STACK.map((Icon, index) => (
          <Icon
            key={index}
            className="icon"
            style={{
              background: "var(--card_backgroud)",
              padding: ".8rem",
              borderRadius: ".8rem",
              border:"var(--border1)"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TechStack;
