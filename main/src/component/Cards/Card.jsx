// import { FiGithub } from "react-icons/fi";
// import { BsTools } from "react-icons/bs";
import { motion } from "framer-motion";
import { RxExternalLink } from "react-icons/rx";
import { PiTagSimple } from "react-icons/pi";
import PropTypes from "prop-types";

const Cards = ({ project }) => {
  return (
    <motion.div
      className="w-full h-[20rem] my-[2%] mx-auto flex gap-2 items-stretch rounded-[.2rem] box-border brightness-90 even:flex-row-reverse max-[680px]:my-[5%] max-[680px]:flex-col! max-[680px]:h-[30rem]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 0.97 }}
    >
      <div className="flex-[0_0_40%] w-full h-full rounded-[.2rem] block overflow-hidden shrink-0">
        <img
          src={project.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out rounded-[.8rem]"
          style={{ zoom: 1.1 }}
        />
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
