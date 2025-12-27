import React, { Suspense, lazy } from "react";
import Data from "../../Data.json";
import TechStack from "./Techstack";
import ExpCard from "../Cards/ExpCard";
import { AiOutlineThunderbolt } from "react-icons/ai";
import "./Styles/About.css";

const Cards = lazy(() => import("../Cards/Card"));

const About = () => {
  const { RandomAboutText } = Data;
  const [randomTitle, randomDescription] = RandomAboutText;
  const projectKeys = Object.keys(Data.projects);
  const ExpKeys = Object.keys(Data.exp);

  const MyExp = () => {
    return (
      <div className="experiences">
        <h2 className="title" style={{ textTransform: "capitalize" }}>
          My Experiences <AiOutlineThunderbolt style={{ marginBottom: '-7px' }} />
        </h2>
        <div className="exp-container">
          {ExpKeys.map((key, item) => (
            <ExpCard key={item} exp={Data.exp[key]} />
          ))}
        </div>
      </div>
    );
  };

  const RandomText = () => {
    return (
      <>
        <h1 className="h1" style={{ textTransform: "capitalize", marginTop: "8%" }}>
          {randomTitle}
        </h1>
        <p className="p" style={{ opacity: "0.7" }}>
          {randomDescription}
        </p>
      </>
    );
  };

  const Projects = () => {
    return (
      <div className="project_container">
        {projectKeys.map((key, item) => (
          <Cards key={item} project={Data.projects[key]} />
        ))}
      </div>
    );
  };

  return (
    <div className="about">
      <MyExp />
      <RandomText />
      <Suspense fallback={<div>Loading projects...</div>}>
        <Projects />
      </Suspense>
      <TechStack />
    </div>
  );
};

export default About;
