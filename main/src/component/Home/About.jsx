import React, { Suspense, lazy } from "react";
import { m } from "framer-motion";
import PropTypes from "prop-types";
import { experience, sections, majorProjects, weekendProjects } from "../../data";
import TechStack from "./Techstack";
import GCPBadges from "./GCPBadges";
import ExpTimeline from "./ExpTimeline";
import { fadeUp, viewportOnce } from "../../motion";

const ProjectShowcase = lazy(() => import("./ProjectShowcase"));
const WeekendProjects = lazy(() => import("./WeekendProjects"));

const About = () => {
  const MyExp = () => {
    return (
      <div className="max-[680px]:w-full px-6 pt-4 pb-10 md:px-10 md:pt-6 md:pb-14">
        <m.h2
          className="text-[2.5rem] font-normal mt-0 mb-10 mx-0 text-center max-[680px]:text-left max-[680px]:text-[1.6rem] max-[680px]:mb-6"
          style={{ textTransform: "capitalize" }}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {sections.experience.title}
        </m.h2>
        <div className="max-[680px]:mt-8">
          <ExpTimeline experiences={experience} />
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
      <SectionIntro title={sections.projects.title} text={sections.projects.intro} />
      <Suspense fallback={<div>Loading projects...</div>}>
        <ProjectShowcase projects={majorProjects} />
      </Suspense>
      <SectionIntro title={sections.sideProjects.title} text={sections.sideProjects.intro} />
      <Suspense fallback={null}>
        <WeekendProjects projects={weekendProjects} />
      </Suspense>
      <TechStack />
      <GCPBadges />
    </div>
  );
};

export default About;
