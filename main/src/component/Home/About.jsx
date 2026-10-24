import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import Data from "../../Data.json";
import TechStack from "./Techstack";
import GCPBadges from "./GCPBadges";
import ExpTimeline from "./ExpTimeline";

const Cards = lazy(() => import("../Cards/Card"));

const About = () => {
  const { RandomAboutText } = Data;
  const [randomTitle, randomDescription] = RandomAboutText;
  const projectKeys = Object.keys(Data.projects);
  // newest first
  const experiences = Object.values(Data.exp).reverse();

  const MyExp = () => {
    return (
      <div className="max-[680px]:w-full">
        <motion.h2
          className="text-[2.5rem] font-normal mt-[2%] mb-0 mx-0 max-[680px]:mt-[2.2rem] max-[680px]:mb-[2rem] max-[680px]:text-[1.4rem]"
          style={{ textTransform: "capitalize" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          My Experiences
        </motion.h2>
        <div className="mt-6 max-[680px]:mt-8">
          <ExpTimeline experiences={experiences} />
        </div>
      </div>
    );
  };

  const RandomText = () => {
    return (
      <>
        <motion.h1
          className="font-normal pb-[2%] max-[680px]:pb-[7%] max-[680px]:text-[1.5rem] max-[680px]:mb-[10%] max-[680px]:mt-[28%]"
          style={{ textTransform: "capitalize", marginTop: "8%" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {randomTitle}
        </motion.h1>
        <motion.p
          className="w-[70%] pb-[5%] max-[680px]:w-full max-[680px]:mb-[10%]"
          style={{ opacity: "0.7" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.7, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          {randomDescription}
        </motion.p>
      </>
    );
  };

  const Projects = () => {
    return (
      <div className="w-[80%] h-full flex justify-evenly flex-wrap mx-auto max-[680px]:w-full">
        {projectKeys.map((key, item) => (
          <Cards key={item} project={Data.projects[key]} />
        ))}
      </div>
    );
  };

  return (
    <div className="w-[90%] h-full ml-[10%] relative bg-dark1 max-[680px]:w-[80%] max-[680px]:ml-[15%] max-[680px]:pr-[5%]">
      <MyExp />
      <RandomText />
      <Suspense fallback={<div>Loading projects...</div>}>
        <Projects />
      </Suspense>
      <GCPBadges />
      <TechStack />
    </div>
  );
};

export default About;
