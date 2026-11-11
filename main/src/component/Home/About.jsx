import { Suspense, lazy } from "react";
import { m } from "framer-motion";
import PropTypes from "prop-types";
import { experience, sections, majorProjects, weekendProjects } from "../../data";
import TechStack from "./Techstack";
import GCPBadges from "./GCPBadges";
import ExpTimeline from "./ExpTimeline";
import SectionHeading from "../ui/SectionHeading";
import StatusText from "../ui/StatusText";
import { fadeUp, viewportOnce } from "../../motion";

const ProjectShowcase = lazy(() => import("./ProjectShowcase"));
const WeekendProjects = lazy(() => import("./WeekendProjects"));

const SectionIntro = ({ title, text }) => (
  <div className="mt-28 mb-12 max-[680px]:mt-20 max-[680px]:mb-8">
    <SectionHeading>{title}</SectionHeading>
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
SectionIntro.propTypes = { title: PropTypes.string.isRequired, text: PropTypes.string.isRequired };

const About = () => (
  <div className="with-rail h-full relative bg-dark1 max-[680px]:pr-4">
    <div className="px-4 sm:px-6 pt-10 pb-10 md:px-10 md:pt-24 md:pb-14">
      <SectionHeading align="center" className="mb-10 max-[680px]:mb-6">
        {sections.experience.title}
      </SectionHeading>
      <div className="max-[680px]:mt-8">
        <ExpTimeline experiences={experience} />
      </div>
    </div>
    <SectionIntro title={sections.projects.title} text={sections.projects.intro} />
    <Suspense fallback={<StatusText>Loading projects&hellip;</StatusText>}>
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

export default About;
