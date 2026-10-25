import { motion } from "framer-motion";
import { RxExternalLink } from "react-icons/rx";
import { PiTagSimple } from "react-icons/pi";
import { SiNextdotjs, SiGooglecloud, SiPokemon } from "react-icons/si";
import { RiRobot2Line } from "react-icons/ri";
import { LuNetwork } from "react-icons/lu";
import PropTypes from "prop-types";

// placeholder thumbnails keyed by Data.json `icon` until real screenshots are added
const ICONS = {
  nextjs: SiNextdotjs,
  robot: RiRobot2Line,
  gcp: SiGooglecloud,
  pokemon: SiPokemon,
  network: LuNetwork,
};

const mediaClass =
  "max-w-full max-h-full object-contain rounded-[.8rem] max-[680px]:w-full";

const Thumbnail = ({ project }) => {
  if (project.video) {
    return (
      <video
        src={project.video}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className={mediaClass}
      />
    );
  }
  const Icon = ICONS[project.icon];
  if (!Icon) {
    return (
      <img src={project.image} alt="" loading="lazy" decoding="async" className={mediaClass} />
    );
  }
  return (
    <div className="w-full aspect-video max-h-full flex items-center justify-center rounded-[.8rem] border-2 border-dashed border-white/20">
      <Icon className="text-[6rem] text-font1 opacity-60" />
    </div>
  );
};
Thumbnail.propTypes = { project: PropTypes.object.isRequired };

const Cards = ({ project }) => {
  return (
    <motion.div
      className="w-full h-[20rem] my-16 mx-auto flex gap-2 items-stretch rounded-[.2rem] box-border brightness-90 even:flex-row-reverse max-[680px]:my-[12%] max-[680px]:flex-col! max-[680px]:h-[30rem]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 0.97 }}
    >
      <div className="flex-[0_0_55%] min-[1280px]:flex-[0_0_64%] w-full h-full flex items-center justify-center rounded-[.2rem] overflow-hidden shrink-0 max-[680px]:flex-none max-[680px]:h-auto">
        <Thumbnail project={project} />
      </div>

      <div className="flex flex-col justify-between items-start px-4 py-2 max-[680px]:w-full! max-[680px]:px-0! max-[680px]:py-[.02rem]!">
        <h2 className="uppercase font-normal text-[1.1rem] py-2 m-0">
          <RxExternalLink
            className="relative top-[2px]"
            style={{ transform: "rotateY(-180deg)" }}
          />{" "}
          {project.name}
        </h2>
        <div className="my-auto mx-0 max-[680px]:w-full! max-[680px]:px-0! max-[680px]:py-[.02rem]!">
          <p
            className="text-[.8rem] pt-0 px-2 pb-2 m-0 max-w-[90%] leading-[1.3]"
            style={{ opacity: ".85" }}
          >
            {project.description}
          </p>
        </div>
        <p className="inline-block no-underline text-font1 rounded-[.2rem] text-[.75rem] font-medium p-[.3rem] mt-0 mx-2 mb-2">
          <PiTagSimple
            style={{
              position: "relative",
              bottom: "-2px",
              paddingRight: "5px",
            }}
          />
          {project.tech_stack}
        </p>
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="mx-2 mb-2 inline-flex items-center gap-1.5 rounded-md bg-btn px-3 py-1.5 text-xs font-semibold text-white no-underline shadow-sm ring-1 ring-white/10 hover:brightness-110 transition"
        >
          Open Project <RxExternalLink />
        </a>
      </div>
    </motion.div>
  );
};
Cards.propTypes = {
  project: PropTypes.object.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  tech_stack: PropTypes.string,
  image: PropTypes.string,
};
export default Cards;
