import { m } from "framer-motion";
import PropTypes from "prop-types";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { Hashtags, ProjectIcon } from "./projectBits";
import { fadeUp, pop, squishTap, stagger, viewportOnce } from "../../motion";

const IconLink = ({ href, label, hover, children }) => (
  <m.a
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={label}
    className={`inline-flex items-center justify-center w-8 h-8 rounded-md text-font1/60 hover:bg-white/5 transition-colors ${hover}`}
    whileTap={squishTap}
  >
    {children}
  </m.a>
);
IconLink.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  hover: PropTypes.string,
  children: PropTypes.node,
};

const WeekendProjects = ({ projects }) => (
  <m.div
    className="w-[80%] mx-auto grid gap-5 sm:grid-cols-2 lg:grid-cols-4 max-[680px]:w-full"
    variants={stagger(0.08)}
    initial="hidden"
    whileInView="show"
    viewport={viewportOnce}
  >
    {projects.map((p) => (
      <m.article
        key={p.id}
        className="flex flex-col gap-3 rounded-xl border border-white/10 bg-card/30 p-5 hover:border-white/20 transition-colors duration-300"
        variants={fadeUp}
        whileHover={{ y: -6, transition: pop }}
      >
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-dark1 text-green1 text-xl">
            <ProjectIcon name={p.icon} />
          </span>
          <div className="flex items-center gap-1">
            {p.repo && (
              <IconLink href={p.repo} label={`${p.name} source on GitHub`} hover="hover:text-font1">
                <FiGithub />
              </IconLink>
            )}
            {p.live && (
              <IconLink href={p.live} label={`${p.name} live demo`} hover="hover:text-green1">
                <FiArrowUpRight />
              </IconLink>
            )}
          </div>
        </div>

        <h3 className="text-base font-semibold leading-tight m-0">{p.name}</h3>
        {p.subtitle && <p className="text-xs opacity-50 -mt-2 m-0">{p.subtitle}</p>}
        <p className="text-sm opacity-65 leading-relaxed m-0 flex-1">{p.summary}</p>
        <Hashtags tags={p.tags} />
      </m.article>
    ))}
  </m.div>
);

WeekendProjects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default WeekendProjects;
