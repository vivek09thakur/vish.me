import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import Data from "../../Data.json";
import MyImage from "../../assets/myimage.jpg";
import { RiDownloadLine } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";

const Typewriter = ({ text }) => {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting && !document.hidden));
    io.observe(el);
    const onVis = () => setActive(!document.hidden && el.getBoundingClientRect().bottom > 0);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useEffect(() => {
    if (!text || !active) return;
    const done = index >= text.length;
    const t = setTimeout(() => setIndex(done ? 0 : index + 1), done ? 1000 : 100);
    return () => clearTimeout(t);
  }, [index, text, active]);

  return (
    <h1
      ref={ref}
      className="relative font-normal text-[5rem] font-archivo leading-[1.1] max-[780px]:text-[4rem] max-[500px]:text-[3.5rem]"
    >
      <span aria-hidden="true" className="invisible">
        {text}
      </span>
      <span className="absolute inset-0">{text.slice(0, index)}</span>
    </h1>
  );
};

Typewriter.propTypes = {
  text: PropTypes.string.isRequired,
};

const SPOT_RADIUS = 90;

const SpotlightImage = ({ src, alt }) => {
  const ref = useRef(null);

  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--x", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--y", `${e.clientY - r.top}px`);
    ref.current.style.setProperty("--r", `${SPOT_RADIUS}px`);
  };
  const leave = () => ref.current.style.setProperty("--r", "0px");

  const imgClass = "w-full h-full object-cover rounded-2xl";
  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className="relative w-full max-w-[400px] aspect-square -rotate-3 rounded-2xl"
      style={{ "--r": "0px" }}
    >
      <img src={src} alt={alt} width="400" height="400" fetchpriority="high" decoding="async" className={imgClass} />
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className={`${imgClass} absolute inset-0 grayscale pointer-events-none`}
        style={{
          clipPath: "circle(var(--r) at var(--x, 50%) var(--y, 50%))",
          willChange: "clip-path",
        }}
      />
    </div>
  );
};

SpotlightImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

const Home = () => (
  <div className="grid-overlay w-[90%] ml-[10%] flex items-center pt-48 pb-10 max-[780px]:w-[85%] max-[780px]:ml-[15%] max-[780px]:py-20 max-[500px]:py-16">
    <div className="relative z-10 w-full flex items-center justify-between gap-10 flex-row-reverse max-[780px]:flex-col-reverse max-[780px]:gap-8">
      <motion.div
        className="w-2/5 flex justify-center shrink-0 max-[780px]:w-[60%] max-[500px]:w-[75%]"
        initial={{ opacity: 0, x: 40, scale: 0.96 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
      >
        <SpotlightImage src={MyImage} alt="Vivek Thakur" />
      </motion.div>
      <div className="w-[55%] max-[780px]:w-full max-[780px]:text-center max-[500px]:text-left">
        <a
          href={Data.myCV}
          className="group no-underline absolute top-5 right-5 z-[1200] inline-flex items-center gap-2 rounded-lg bg-btn px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110 transition max-[780px]:static max-[780px]:mb-6 max-[500px]:mb-4"
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
          <p
            className="mt-6 flex items-center gap-1 max-[780px]:justify-center max-[500px]:justify-start"
            style={{ opacity: 0.6, fontSize: "1.5rem" }}
          >
            <CiLocationOn /> {Data.user.location}
          </p>
        </motion.div>
      </div>
    </div>
  </div>
);

export default Home;
