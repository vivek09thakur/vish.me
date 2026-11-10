import { Suspense, lazy } from "react";
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
      <div className="max-[680px]:w-full px-6 pt-10 pb-10 md:px-10 md:pt-24 md:pb-14">
        <m.h2
          className="section-title mb-10 text-center max-[680px]:text-left max-[680px]:mb-6"
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
      <div className="mt-28 mb-12 max-[680px]:mt-20 max-[680px]:mb-8">
        <m.h2
          className="section-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {title}
        </m.h2>
        <m.p
          className="mt-4 max-w-2xl opacity-70 leading-relaxed"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {text}
        </m.p>
      </div>
    );
  };
  SectionIntro.propTypes = { title: PropTypes.string.isRequired, text: PropTypes.string.isRequired };

  return (
    <div className="w-[90%] h-full ml-[10%] relative bg-dark1 max-[680px]:w-[80%] max-[680px]:ml-[15%] max-[680px]:pr-[5%]">
      <MyExp />
      <SectionIntro title={sections.projects.title} text={sections.projects.intro} />
      <Suspense fallback={<p className="opacity-60">Loading projects&hellip;</p>}>
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
