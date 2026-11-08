import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import PropTypes from "prop-types";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { SiNextdotjs, SiGooglecloud, SiPokemon } from "react-icons/si";
import { RiRobot2Line } from "react-icons/ri";
import { LuNetwork } from "react-icons/lu";
import { bounce, bounceSoft, fadeUp, pop, squishHover, squishTap, stagger, viewportOnce } from "../../motion";

const ICONS = {
  nextjs: SiNextdotjs,
  robot: RiRobot2Line,
  gcp: SiGooglecloud,
  pokemon: SiPokemon,
  network: LuNetwork,
};

const isGithub = (url) => /github\.com/.test(url);
const splitName = (name) => name.split("|").map((s) => s.trim());

const Preview = ({ project }) => {
  const Icon = ICONS[project.icon];
  return (
    <m.div
      className="relative overflow-hidden rounded-xl bg-dark1 aspect-video"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0, transition: bounceSoft }}
      exit={{ opacity: 0, y: -12, transition: { duration: 0.18 } }}
    >
      {project.image ? (
        <img
          src={project.image}
          alt=""
          decoding="async"
          className="w-full h-full object-cover object-top"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center border border-dashed border-white/15 rounded-xl">
          {Icon && <Icon className="text-[4rem] text-font1 opacity-40" />}
        </div>
      )}
    </m.div>
  );
};
Preview.propTypes = { project: PropTypes.object.isRequired };

const ProjectShowcase = ({ projects }) => {
  const keys = Object.keys(projects);
  const [active, setActive] = useState(keys[0]);
  const project = projects[active];
  const [title, subtitle] = splitName(project.name);
  const tags = project.tech_stack.split(",").map((t) => t.trim()).filter(Boolean);

  const onKeyDown = (e) => {
    const i = keys.indexOf(active);
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setActive(keys[(i + 1) % keys.length]);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      setActive(keys[(i - 1 + keys.length) % keys.length]);
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
        {keys.map((key) => {
          const p = projects[key];
          const [name, sub] = splitName(p.name);
          const selected = key === active;
          return (
            <li key={key} className="shrink-0 md:shrink">
              <m.button
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(key)}
                className={`block w-full text-left appearance-none cursor-pointer font-[inherit] px-4 py-3 rounded-xl border outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-green1/60 ${
                  selected
                    ? "bg-btn border-btn text-white"
                    : "bg-card/40 border-white/10 text-font1/70 hover:bg-card/70 hover:border-white/20 hover:text-font1"
                }`}
                whileHover={{ y: -3, transition: pop }}
                whileTap={squishTap}
              >
                <span className="block text-sm font-semibold leading-tight whitespace-nowrap md:whitespace-normal">
                  {name}
                </span>
                <span className={`hidden md:block text-[0.7rem] mt-1 truncate ${selected ? "text-white/70" : "opacity-50"}`}>
                  {sub || p.tech_stack.split(",").slice(0, 2).join(" · ")}
                </span>
              </m.button>
            </li>
          );
        })}
      </m.ul>

      <m.div className="min-w-0" variants={fadeUp}>
        <AnimatePresence mode="wait" initial={false}>
          <Preview key={active} project={project} />
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={active}
            className="mt-6 flex flex-col gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { ...bounce, delay: 0.05 } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-2xl font-medium leading-tight m-0">{title}</h3>
                {subtitle && <p className="text-xs opacity-50 mt-1 m-0">{subtitle}</p>}
              </div>
              <m.a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 inline-flex items-center gap-1.5 rounded-md bg-btn px-4 py-2 text-sm font-semibold text-white no-underline"
                whileHover={squishHover}
                whileTap={squishTap}
              >
                {isGithub(project.link) ? (
                  <>
                    Source <FiGithub />
                  </>
                ) : (
                  <>
                    Visit <FiArrowUpRight />
                  </>
                )}
              </m.a>
            </div>
            <p className="text-sm opacity-70 leading-relaxed m-0 max-w-2xl">{project.description}</p>
            <p className="text-xs opacity-40 m-0">{tags.join(" · ")}</p>
          </m.div>
        </AnimatePresence>
      </m.div>
    </m.div>
  );
};

ProjectShowcase.propTypes = {
  projects: PropTypes.object.isRequired,
};

export default ProjectShowcase;
