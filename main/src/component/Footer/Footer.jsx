import { m } from "framer-motion";
import { site, socials, socialLinks } from "../../data";
import { fadeUp, viewportOnce } from "../../motion";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <m.div
      className="w-[90%] h-[15vh] pt-[5%] ml-[10%] bg-dark1 max-[680px]:pt-[3rem]"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      <div className="flex justify-center items-center">
        <div className="w-[40%] h-[2px] bg-line max-[680px]:w-[10%]"></div>
        <div className="w-[60%] max-[680px]:w-[90%]">
          <a href={`mailto:${site.email}`} className="no-underline text-font1 ml-4 font-mono">
            {site.email}
          </a>
        </div>
      </div>
      <div className="w-full text-center my-[2%]">
        <p className="text-[.95rem] opacity-30 font-light">
          All Rights Reserved © {year} |{" "}
          <a href={socialLinks.github} target="_blank" rel="noreferrer">
            {socials.github}
          </a>
        </p>
      </div>
    </m.div>
  );
};

export default Footer;
