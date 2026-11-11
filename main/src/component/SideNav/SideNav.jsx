import { m } from "framer-motion";
import PropTypes from "prop-types";
import { socialNav } from "../../data";
import SOCIAL_ICONS from "../ui/socialIcons";
import { bounce } from "../../motion";

const itemVariants = { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0, transition: bounce } };
const listVariants = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } } };

const SideNav = ({ ready = true }) => {
  return (
    <div className="w-[var(--rail-w)] h-[100dvh] fixed bottom-0 left-0 bg-dark1 z-[100]">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <m.div
          className="w-full h-[67%] flex flex-col justify-evenly items-center max-[500px]:h-[60%]"
          variants={listVariants}
          initial="hidden"
          animate={ready ? "show" : "hidden"}
        >
          {socialNav.map(({ key, href, label }) => {
            const Icon = SOCIAL_ICONS[key];
            return (
              <m.a
                href={href}
                key={key}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="inline-flex group"
                variants={itemVariants}
              >
                <span className="inline-flex group-hover:scale-[1.35] group-hover:-rotate-12 group-active:scale-90 transition-transform duration-500 ease-bounce">
                  <Icon className="text-[1.4rem] text-font1 relative left-[-5.5%] group-hover:text-btn group-focus:text-btn transition-colors duration-300" />
                </span>
              </m.a>
            );
          })}
        </m.div>
        <div className="bg-line w-[2px] h-[15%] absolute bottom-0"></div>
      </div>
    </div>
  );
};

SideNav.propTypes = {
  ready: PropTypes.bool,
};

export default SideNav;
