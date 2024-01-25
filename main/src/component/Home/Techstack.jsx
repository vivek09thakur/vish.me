import {
  FaHtml5,
  FaCss3,
  FaJsSquare,
  FaBootstrap,
  FaReact,
  FaNodeJs,
  FaGit,
  FaGithub,
  FaPython,
} from "react-icons/fa";

import {
  SiNumpy,
  SiPandas,
  SiJupyter,
  SiTensorflow,
  SiPytorch,
  SiDjango,
  SiFlask,
  SiPycharm
} from "react-icons/si";
import { DiAndroid } from "react-icons/di";
import "./Styles/Techstack.css";

const TechStack = () => {
  const STACK = [
    FaHtml5,
    FaCss3,
    FaJsSquare,
    FaBootstrap,
    FaReact,
    FaNodeJs,
    FaGit,
    FaGithub,
    FaPython,
    SiJupyter,
    SiNumpy,
    SiPandas,
    SiTensorflow,
    SiPytorch,
    SiDjango,SiFlask,SiPycharm,
    DiAndroid
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
