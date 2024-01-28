import {
  FaHtml5,
  FaCss3,
  FaBootstrap,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaPython,
} from "react-icons/fa";

import {
  SiJavascript,
  SiNumpy,
  SiPandas,
  SiJupyter,
  SiTensorflow,
  SiPytorch,
  SiDjango,
  SiFlask,
  SiPycharm,
} from "react-icons/si";
import { DiAndroid } from "react-icons/di";
import "./Styles/Techstack.css";

const TechStack = () => {
  const STACK = [
    FaHtml5,
    FaCss3,
    SiJavascript,
    FaBootstrap,
    FaReact,
    FaNodeJs,
    FaGitAlt,
    FaGithub,
    FaPython,
    SiJupyter,
    SiNumpy,
    SiPandas,
    SiTensorflow,
    SiPytorch,
    SiDjango,
    SiFlask,
    SiPycharm,
    DiAndroid,
  ];
  return (
    <div className="techstack">
      <div className="heading">
        <h2>TechStack⚡</h2>
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
