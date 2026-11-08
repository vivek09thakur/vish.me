import React, { Suspense, lazy } from "react";
import { m } from "framer-motion";
import Data from "../../Data.json";
import TechStack from "./Techstack";
import GCPBadges from "./GCPBadges";
import ExpTimeline from "./ExpTimeline";
import { fadeUp, stagger, viewportOnce } from "../../motion";

const Cards = lazy(() => import("../Cards/Card"));

const About = () => {
  const { RandomAboutText } = Data;
  const [randomTitle, randomDescription] = RandomAboutText;
  const projectKeys = Object.keys(Data.projects);
  const experiences = Object.values(Data.exp).reverse();

  const MyExp = () => {
    return (
      <div className="max-[680px]:w-full">
        <m.h2
          className="text-[2.5rem] font-normal mt-[2%] mb-0 mx-0 max-[680px]:mt-[2.2rem] max-[680px]:mb-[2rem] max-[680px]:text-[1.4rem]"
          style={{ textTransform: "capitalize" }}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          My Experiences
        </m.h2>
        <div className="mt-6 max-[680px]:mt-8">
          <ExpTimeline experiences={experiences} />
        </div>
      </div>
    );
  };

  const RandomText = () => {
    return (
      <>
        <m.h2
          className="font-normal text-[2em] pb-[2%] max-[680px]:pb-[7%] max-[680px]:text-[1.5rem] max-[680px]:mb-[10%] max-[680px]:mt-[28%]"
          style={{ textTransform: "capitalize", marginTop: "8%" }}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {randomTitle}
        </m.h2>
        <m.p
          className="w-[70%] pb-[5%] opacity-70 max-[680px]:w-full max-[680px]:mb-[10%]"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {randomDescription}
        </m.p>
      </>
    );
  };

  const Projects = () => {
    return (
      <m.div
        className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 max-[680px]:w-full"
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
      >
        {projectKeys.map((key, i) => (
          <Cards key={key} project={Data.projects[key]} featured={i === 0} />
        ))}
      </m.div>
    );
  };

  return (
    <div className="w-[90%] h-full ml-[10%] relative bg-dark1 max-[680px]:w-[80%] max-[680px]:ml-[15%] max-[680px]:pr-[5%]">
      <MyExp />
      <RandomText />
      <Suspense fallback={<div>Loading projects...</div>}>
        <Projects />
      </Suspense>
      <TechStack />
      <GCPBadges />
    </div>
  );
};

export default About;
