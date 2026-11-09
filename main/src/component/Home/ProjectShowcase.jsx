import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import PropTypes from "prop-types";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import SourcePreview from "./SourcePreview";
import { Hashtags, ProjectIcon } from "./projectBits";
import { bounce, bounceSoft, fadeUp, pop, squishTap, stagger, viewportOnce } from "../../motion";

const Preview = ({ project }) => {
  let media;
  if (project.image) {
    media = <img src={project.image} alt="" decoding="async" className="w-full h-full object-cover object-top" />;
  } else if (project.repo && !project.live) {
    media = <SourcePreview />;
  } else {
    media = (
      <div className="w-full h-full flex items-center justify-center border border-dashed border-white/15 rounded-xl">
        <ProjectIcon name={project.icon} className="text-[4rem] text-font1 opacity-40" />
      </div>
    );
  }
  return (
    <m.div
      className="relative overflow-hidden rounded-xl bg-dark1 aspect-video"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0, transition: bounceSoft }}
      exit={{ opacity: 0, y: -12, transition: { duration: 0.18 } }}
    >
      {media}
    </m.div>
  );
};
Preview.propTypes = { project: PropTypes.object.isRequired };

const CornerLink = ({ href, primary, children }) => (
  <m.a
    href={href}
    target="_blank"
    rel="noreferrer"
    className={`group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold no-underline transition-colors duration-200 ${
      primary ? "bg-green1 text-dark1 hover:bg-[#d4f78a]" : "bg-dark1/80 text-font1 hover:text-green1"
    }`}
    whileHover={{ y: -2, transition: pop }}
    whileTap={squishTap}
  >
    {children}
  </m.a>
);
CornerLink.propTypes = { href: PropTypes.string.isRequired, primary: PropTypes.bool, children: PropTypes.node };

const ProjectShowcase = ({ projects }) => {
  const [index, setIndex] = useState(0);
  const project = projects[index];

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setIndex((i) => (i + 1) % projects.length);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      setIndex((i) => (i - 1 + projects.length) % projects.length);
    }
  };

  return (
    <m.div
      className="w-[80%] mx-auto grid gap-8 md:grid-cols-[minmax(220px,30%)_1fr] md:gap-10 max-[680px]:w-full"
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      <m.ul
        role="tablist"
        aria-label="Projects"
        onKeyDown={onKeyDown}
        className="flex gap-2 overflow-x-auto pb-2 list-none m-0 p-0 md:flex-col md:overflow-visible md:pb-0"
        variants={fadeUp}
      >
        {projects.map((p, i) => {
          const selected = i === index;
          return (
            <li key={p.id} className="shrink-0 md:shrink">
              <m.button
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setIndex(i)}
                className={`block w-full text-left appearance-none cursor-pointer font-[inherit] px-4 py-3 rounded-xl border outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-green1/60 ${
                  selected
                    ? "bg-green1 border-green1 text-dark1"
                    : "bg-card/40 border-white/10 text-font1/70 hover:bg-card/70 hover:border-white/20 hover:text-font1"
                }`}
                whileHover={{ y: -3, transition: pop }}
                whileTap={squishTap}
              >
                <span className="block text-sm font-semibold leading-tight whitespace-nowrap md:whitespace-normal">
                  {p.name}
                </span>
                <span className={`hidden md:block text-[0.7rem] mt-1 truncate ${selected ? "text-dark1/70" : "opacity-50"}`}>
                  {p.subtitle || p.tags.slice(0, 2).join(" · ")}
                </span>
              </m.button>
            </li>
          );
        })}
      </m.ul>

      <m.div className="min-w-0" variants={fadeUp}>
        <div className="relative">
          <AnimatePresence mode="wait" initial={false}>
            <Preview key={project.id} project={project} />
          </AnimatePresence>
          <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
            {project.repo && (
              <CornerLink href={project.repo} primary={!project.live}>
                Source <FiGithub className="text-base transition-transform duration-300 ease-bounce group-hover:-translate-y-0.5" />
              </CornerLink>
            )}
            {project.live && (
              <CornerLink href={project.live} primary>
                Visit site <FiArrowUpRight className="text-base transition-transform duration-300 ease-bounce group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </CornerLink>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={project.id}
            className="mt-6 flex flex-col gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { ...bounce, delay: 0.05 } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
          >
            <div className="min-w-0">
              <h3 className="text-2xl font-medium leading-tight m-0">{project.name}</h3>
              {project.subtitle && <p className="text-xs opacity-50 mt-1 m-0">{project.subtitle}</p>}
            </div>
            <p className="text-sm opacity-70 leading-relaxed m-0 max-w-2xl">{project.summary}</p>
            <Hashtags tags={project.tags} />
          </m.div>
        </AnimatePresence>
      </m.div>
    </m.div>
  );
};

ProjectShowcase.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProjectShowcase;
