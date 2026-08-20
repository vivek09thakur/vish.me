import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import Data from "../../Data.json";
import MyImage from "../../assets/profile.webp";
import { RiDownloadLine } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";

const Typewriter = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!text) return;
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, index + 1));
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
    const resetTimeout = setTimeout(() => {
      setDisplayedText("");
      setIndex(0);
    }, 1000);
    return () => clearTimeout(resetTimeout);
  }, [index, text]);

  return (
    <h1 className="relative font-normal text-[5rem] font-archivo leading-[1.1] max-[780px]:text-[4rem] max-[500px]:text-[3.5rem]">
      {/* invisible full text reserves the wrapped height so typing never reflows the layout */}
      <span aria-hidden="true" className="invisible">
        {text}
      </span>
      <span className="absolute inset-0">{displayedText}</span>
    </h1>
  );
};

Typewriter.propTypes = {
  text: PropTypes.string.isRequired,
};

const Home = () => (
  <div className="grid-overlay w-[90%] ml-[10%] flex items-center py-16 max-[780px]:w-[85%] max-[780px]:ml-[15%] max-[780px]:py-24 max-[500px]:py-20">
    <div className="relative z-10 w-full flex items-center justify-between gap-10 flex-row-reverse max-[780px]:flex-col-reverse max-[780px]:gap-8">
      <motion.div
        className="w-2/5 flex justify-center shrink-0 max-[780px]:w-[60%] max-[500px]:w-[75%]"
        initial={{ opacity: 0, x: 40, scale: 0.96 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
      >
        <img
          src={MyImage}
          alt="Vivek Thakur"
          width="400"
          height="400"
          fetchpriority="high"
          decoding="async"
          className="w-full max-w-[400px] aspect-square object-cover rounded-2xl shadow-card"
        />
      </motion.div>
      <div className="w-[55%] max-[780px]:w-full max-[780px]:text-center max-[500px]:text-left">
        <a
          href={Data.myCV}
          className="group no-underline absolute top-5 right-5 z-[1200] inline-flex items-center gap-2 rounded-full bg-btn px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-btn/30 ring-1 ring-white/15 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-btn/40 transition-all duration-300 max-[780px]:static max-[780px]:mb-6 max-[500px]:mb-4"
          download="VivekThakurCV.pdf"
        >
          <RiDownloadLine className="text-base transition-transform group-hover:translate-y-0.5" />
          Resume
        </a>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
        >
          <Typewriter text={Data.user.IntroLine} />
          <p className="opacity-80 mt-6 max-w-xl leading-relaxed max-[780px]:mx-auto max-[500px]:mx-0 max-[500px]:text-[90%]">
            {Data.user.About}
          </p>
          <h1
            className="mt-6 flex items-center gap-1 max-[780px]:justify-center max-[500px]:justify-start"
            style={{ opacity: 0.6, fontSize: "1.5rem" }}
          >
            <CiLocationOn /> {Data.user.location}
          </h1>
        </motion.div>
      </div>
    </div>
  </div>
);

export default Home;
