import { useCallback, useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import PropTypes from "prop-types";
import { site } from "../../data";
import MyImage from "../../assets/myimage.jpg";
import { RiDownloadLine } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import ExternalButton from "../ui/ExternalButton";
import { bounceSoft, fadeUp, stagger } from "../../motion";

const TYPE_MS = 100;
const HOLD_MS = 1000;

const Typewriter = ({ text }) => {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(true);
  const ref = useRef(null);

  // Pause the loop when the heading is off-screen or the tab is hidden.
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
    if (!text || !active) return undefined;
    const done = index >= text.length;
    const t = setTimeout(() => setIndex(done ? 0 : index + 1), done ? HOLD_MS : TYPE_MS);
    return () => clearTimeout(t);
  }, [index, text, active]);

  return (
    <h1
      ref={ref}
      className="relative font-normal text-[5rem] font-archivo leading-[1.05] max-[1000px]:text-[4.25rem] max-[780px]:text-[4rem] max-[500px]:text-[3.25rem]"
    >
      <span aria-hidden="true" className="invisible">
        {text}
      </span>
      <span className="absolute inset-0">
        {text.slice(0, index)}
        <span aria-hidden="true" className="caret ml-1 inline-block w-[0.12em] h-[0.85em] align-[-0.08em] bg-green1 rounded-sm" />
      </span>
    </h1>
  );
};

Typewriter.propTypes = {
  text: PropTypes.string.isRequired,
};

const SPOT_RADIUS = 90;

const SpotlightImage = ({ src, alt }) => {
  const ref = useRef(null);
  const frame = useRef(0);
  const pos = useRef({ x: 0, y: 0 });

  const apply = useCallback(() => {
    frame.current = 0;
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--x", `${pos.current.x}px`);
    el.style.setProperty("--y", `${pos.current.y}px`);
    el.style.setProperty("--r", `${SPOT_RADIUS}px`);
  }, []);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    pos.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    if (!frame.current) frame.current = requestAnimationFrame(apply);
  };
  const leave = () => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    ref.current.style.setProperty("--r", "0px");
  };

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const imgClass = "w-full h-full object-cover rounded-[2px]";
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave} className="relative w-full aspect-square" style={{ "--r": "0px" }}>
      <img src={src} alt={alt} width="400" height="400" decoding="async" className={imgClass} />
      <img
        src={src}
        alt=""
        aria-hidden="true"
        width="400"
        height="400"
        decoding="async"
        className={`${imgClass} absolute inset-0 grayscale pointer-events-none`}
        style={{
          clipPath: "circle(var(--r) at var(--x, 50%) var(--y, 50%))",
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
};

SpotlightImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

const Polaroid = ({ src, alt, caption }) => (
  <m.figure
    className="relative m-0 w-full bg-[#eef0f5] p-3 pb-3 text-dark1 rounded-[3px] cursor-grab active:cursor-grabbing"
    initial={{ rotate: 3 }}
    whileHover={{ rotate: -1.5, y: -10, scale: 1.03 }}
    whileTap={{ rotate: 2, scale: 0.96 }}
    transition={{ type: "spring", stiffness: 220, damping: 10 }}
  >
    <span
      aria-hidden="true"
      className="absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 -rotate-3 bg-green1/80 mix-blend-multiply"
      style={{ clipPath: "polygon(2% 0, 100% 4%, 98% 100%, 0 96%)" }}
    />
    <SpotlightImage src={src} alt={alt} />
    <figcaption className="mt-2 flex items-center justify-center gap-1 whitespace-nowrap font-hand text-[1.45rem] font-semibold leading-none text-dark1/80 max-[500px]:text-[1.2rem]">
      <CiLocationOn className="text-xl" /> {caption}
    </figcaption>
  </m.figure>
);

Polaroid.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};

const Home = ({ ready = true }) => (
  <div className="grid-overlay with-rail pt-60 pb-12 max-[780px]:pt-24 max-[780px]:pb-8 max-[500px]:pt-20">
    <m.div
      className="relative z-10 mx-auto w-full max-w-[1140px] flow-root max-[780px]:flex max-[780px]:flex-col max-[780px]:items-center max-[780px]:text-center max-[500px]:items-start max-[500px]:text-left"
      variants={stagger(0.08, 0.1)}
      initial="hidden"
      animate={ready ? "show" : "hidden"}
    >

      <m.div
        className="float-right ml-14 mb-4 -mt-6 w-[340px] max-[1000px]:w-[270px] max-[780px]:float-none max-[780px]:mx-auto max-[780px]:mt-0 max-[780px]:mb-10 max-[780px]:w-[62%] max-[500px]:w-[78%] max-[500px]:mx-0 max-[500px]:ml-0"
        variants={{
          hidden: { opacity: 0, y: -24, rotate: 8 },
          show: { opacity: 1, y: 0, rotate: 0, transition: bounceSoft },
        }}
      >
        <div className="relative">
          <m.span
            aria-hidden="true"
            className="absolute -left-40 bottom-14 flex items-end gap-1 font-hand text-[1.6rem] font-semibold text-green1 max-[1000px]:hidden"
            variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { delay: 0.9, duration: 0.5 } } }}
          >
            <span className="-rotate-6 -translate-y-6">that&apos;s me</span>
            <svg width="78" height="54" viewBox="0 0 78 54" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 44c20 4 42-2 58-20 4-5 8-10 11-17" />
              <path d="M62 10l10-3 1 10" />
            </svg>
          </m.span>
          <Polaroid src={MyImage} alt="Vivek Thakur" caption={site.location} />
        </div>
      </m.div>

      <m.div variants={fadeUp}>
        <Typewriter text={site.introLine} />
      </m.div>
      <m.p className="opacity-80 mt-6 max-w-[38rem] text-[1.05rem] leading-relaxed max-[500px]:text-[90%]" variants={fadeUp}>
        {site.about}
      </m.p>
      <ExternalButton
        href={site.resume}
        className="group mt-8"
        download="VivekThakurCV.pdf"
        variants={fadeUp}
      >
        <RiDownloadLine className="text-base transition-transform group-hover:translate-y-0.5" />
        Download resume
      </ExternalButton>
    </m.div>
  </div>
);

Home.propTypes = {
  ready: PropTypes.bool,
};

export default Home;
