import { m } from "framer-motion";
import PropTypes from "prop-types";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { LuBrainCircuit, LuImage, LuGamepad2 } from "react-icons/lu";
import { fadeUp, pop, squishTap, stagger, viewportOnce } from "../../motion";

const ICONS = {
  hiro: LuBrainCircuit,
  imageclf: LuImage,
  tictactoe: LuGamepad2,
};

const WeekendProjects = ({ projects }) => {
  const keys = Object.keys(projects);
  return (
    <m.div
      className="w-[80%] mx-auto grid gap-5 md:grid-cols-3 max-[680px]:w-full"
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {keys.map((key) => {
        const p = projects[key];
        const Icon = ICONS[key] ?? LuBrainCircuit;
        const tags = p.tech_stack.split(",").map((t) => t.trim()).filter(Boolean);
        return (
          <m.article
            key={key}
            className="flex flex-col gap-3 rounded-xl border border-white/10 bg-card/30 p-5 hover:border-white/20 transition-colors duration-300"
            variants={fadeUp}
            whileHover={{ y: -6, transition: pop }}
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-dark1 text-green1 text-xl">
                <Icon />
              </span>
              <div className="flex items-center gap-1">
                <m.a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${p.name} source on GitHub`}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-md text-font1/60 hover:text-font1 hover:bg-white/5 transition-colors"
                  whileTap={squishTap}
                >
                  <FiGithub />
                </m.a>
                <m.a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${p.name} live demo`}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-md text-font1/60 hover:text-green1 hover:bg-white/5 transition-colors"
                  whileTap={squishTap}
                >
                  <FiArrowUpRight />
                </m.a>
              </div>
            </div>

            <h3 className="text-base font-semibold leading-tight m-0">{p.name}</h3>
            <p className="text-sm opacity-65 leading-relaxed m-0 flex-1">{p.description}</p>
            <p className="text-xs text-[#5b8def] m-0 flex flex-wrap gap-x-3 gap-y-1">
              {tags.map((t) => (
                <span key={t}>#{t.replace(/\s+/g, "")}</span>
              ))}
            </p>
          </m.article>
        );
      })}
    </m.div>
  );
};

WeekendProjects.propTypes = {
  projects: PropTypes.object.isRequired,
};

export default WeekendProjects;
