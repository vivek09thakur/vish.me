import React, { Suspense, lazy } from "react";
import { m } from "framer-motion";
import PropTypes from "prop-types";
import Data from "../../Data.json";
import TechStack from "./Techstack";
import GCPBadges from "./GCPBadges";
import ExpTimeline from "./ExpTimeline";
import { fadeUp, viewportOnce } from "../../motion";

const ProjectShowcase = lazy(() => import("./ProjectShowcase"));
const WeekendProjects = lazy(() => import("./WeekendProjects"));

const About = () => {
  const { RandomAboutText, weekendIntro } = Data;
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

  const SectionIntro = ({ title, text }) => {
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
          {title}
        </m.h2>
        <m.p
          className="w-[70%] pb-[5%] opacity-70 max-[680px]:w-full max-[680px]:mb-[10%]"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {text}
        </m.p>
      </>
    );
  };
  SectionIntro.propTypes = { title: PropTypes.string.isRequired, text: PropTypes.string.isRequired };

  return (
    <div className="w-[90%] h-full ml-[10%] relative bg-dark1 max-[680px]:w-[80%] max-[680px]:ml-[15%] max-[680px]:pr-[5%]">
      <MyExp />
      <SectionIntro title={RandomAboutText[0]} text={RandomAboutText[1]} />
      <Suspense fallback={<div>Loading projects...</div>}>
        <ProjectShowcase projects={Data.projects} />
      </Suspense>
      <SectionIntro title={weekendIntro[0]} text={weekendIntro[1]} />
      <Suspense fallback={null}>
        <WeekendProjects projects={Data.weekendProjects} />
      </Suspense>
      <TechStack />
      <GCPBadges />
    </div>
  );
};

export default About;
