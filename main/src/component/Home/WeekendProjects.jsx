import { m } from "framer-motion";
import PropTypes from "prop-types";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { Hashtags, ProjectIcon } from "./projectBits";
import { fadeUp, pop, squishTap, stagger, viewportOnce } from "../../motion";

const NOTES = [
  { tilt: -2.5, tape: "bg-green1/80", ink: "text-green1" },
  { tilt: 1.5, tape: "bg-btn/80", ink: "text-btn" },
  { tilt: -1.5, tape: "bg-[#5b8def]/80", ink: "text-[#5b8def]" },
  { tilt: 2.5, tape: "bg-green1/80", ink: "text-green1" },
];

const NoteLink = ({ href, children }) => (
  <m.a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="group/link inline-flex items-center gap-1.5 text-xs font-semibold text-font1/60 no-underline transition-colors hover:text-font1"
    whileTap={squishTap}
  >
    {children}
  </m.a>
);
NoteLink.propTypes = { href: PropTypes.string.isRequired, children: PropTypes.node };

const Note = ({ project, index }) => {
  const { tilt, tape, ink } = NOTES[index % NOTES.length];
  return (
    <m.article
      className="relative flex h-full flex-col gap-3 rounded-sm bg-card px-6 pb-6 pt-9 max-[680px]:px-5"
      style={{ rotate: tilt }}
      variants={fadeUp}
      whileHover={{ rotate: 0, y: -8, transition: pop }}
    >
      <span
        aria-hidden="true"
        className={`absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-2 ${tape}`}
      />
      <ProjectIcon name={project.icon} className={`text-[2.75rem] ${ink}`} />
      <div>
        <h3 className="m-0 text-lg font-semibold leading-tight">{project.name}</h3>
        {project.subtitle && <p className="m-0 mt-1 text-xs opacity-50">{project.subtitle}</p>}
      </div>
      <p className="m-0 flex-1 text-sm leading-relaxed opacity-65">{project.summary}</p>
      <Hashtags tags={project.tags} />
      <div className="mt-2 flex items-center gap-5">
        {project.repo && (
          <NoteLink href={project.repo}>
            <FiGithub className="text-sm" /> Source
          </NoteLink>
        )}
        {project.live && (
          <NoteLink href={project.live}>
            Visit site <FiArrowUpRight className="text-sm transition-transform duration-500 ease-bounce group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
          </NoteLink>
        )}
      </div>
    </m.article>
  );
};
Note.propTypes = { project: PropTypes.object.isRequired, index: PropTypes.number.isRequired };

const WeekendProjects = ({ projects }) => (
  <m.div
    className="mx-auto grid w-[86%] max-w-[1100px] gap-8 sm:grid-cols-2 lg:grid-cols-4 max-[680px]:w-full max-[680px]:gap-9"
    variants={stagger(0.1)}
    initial="hidden"
    whileInView="show"
    viewport={viewportOnce}
  >
    {projects.map((p, i) => (
      <Note key={p.id} project={p} index={i} />
    ))}
  </m.div>
);

WeekendProjects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default WeekendProjects;