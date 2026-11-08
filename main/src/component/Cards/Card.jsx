import { m } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { SiNextdotjs, SiGooglecloud, SiPokemon } from "react-icons/si";
import { RiRobot2Line } from "react-icons/ri";
import { LuNetwork } from "react-icons/lu";
import PropTypes from "prop-types";
import { fadeUp, pop } from "../../motion";

const ICONS = {
  nextjs: SiNextdotjs,
  robot: RiRobot2Line,
  gcp: SiGooglecloud,
  pokemon: SiPokemon,
  network: LuNetwork,
};

const Cover = ({ project }) => {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt=""
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.06]"
      />
    );
  }
  const Icon = ICONS[project.icon];
  return (
    <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-white/15">
      {Icon && <Icon className="text-[4.5rem] text-font1 opacity-50" />}
    </div>
  );
};
Cover.propTypes = { project: PropTypes.object.isRequired };

const isGithub = (url) => /github\.com/.test(url);

const Cards = ({ project, featured = false }) => {
  const tags = project.tech_stack.split(",").map((t) => t.trim()).filter(Boolean);
  const [title, subtitle] = project.name.split("|").map((s) => s.trim());

  return (
    <m.a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className={`group no-underline text-font1 flex flex-col rounded-2xl border border-white/10 bg-card/40 overflow-hidden hover:border-white/25 transition-colors duration-300 ${
        featured ? "md:col-span-2 md:flex-row" : ""
      }`}
      variants={fadeUp}
      whileHover={{ y: -8, scale: 1.02, transition: pop }}
      whileTap={{ scaleX: 1.03, scaleY: 0.96, transition: pop }}
    >
      <div
        className={`relative overflow-hidden bg-dark1 shrink-0 ${
          featured ? "aspect-video md:aspect-auto md:w-[58%]" : "aspect-video"
        }`}
      >
        <Cover project={project} />
      </div>

      <div className="flex flex-col gap-3 p-5 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className={`font-semibold leading-tight m-0 ${featured ? "text-xl" : "text-base"}`}>
              {title}
            </h3>
            {subtitle && <p className="text-xs opacity-50 mt-1">{subtitle}</p>}
          </div>
          <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/10 text-font1 opacity-70 group-hover:opacity-100 group-hover:bg-btn group-hover:border-btn group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-12 group-hover:scale-110 transition-[color,background-color,border-color,transform] duration-300">
            {isGithub(project.link) ? <FiGithub /> : <FiArrowUpRight />}
          </span>
        </div>

        <p className={`text-sm opacity-70 leading-relaxed m-0 ${featured ? "" : "line-clamp-3"}`}>
          {project.description}
        </p>

        <ul className="flex flex-wrap gap-1.5 mt-auto pt-2 list-none p-0 m-0">
          {tags.slice(0, featured ? 8 : 5).map((t) => (
            <li
              key={t}
              className="text-[0.7rem] px-2 py-0.5 rounded-md border border-white/10 opacity-70"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </m.a>
  );
};

Cards.propTypes = {
  project: PropTypes.object.isRequired,
  featured: PropTypes.bool,
};

export default Cards;
