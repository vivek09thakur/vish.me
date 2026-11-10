import { FaInstagram } from "react-icons/fa6";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { SiDiscord, SiStackoverflow } from "react-icons/si";
import { RiTwitterXFill } from "react-icons/ri";
import { m } from "framer-motion";
import PropTypes from "prop-types";
import { socialLinks } from "../../data";
import { bounce } from "../../motion";

const NAV = [
  { href: socialLinks.linkedin, label: "LinkedIn", Icon: FiLinkedin },
  { href: socialLinks.instagram, label: "Instagram", Icon: FaInstagram },
  { href: socialLinks.discord, label: "Discord", Icon: SiDiscord },
  { href: socialLinks.stackoverflow, label: "Stack Overflow", Icon: SiStackoverflow },
  { href: socialLinks.github, label: "GitHub", Icon: FiGithub },
  { href: socialLinks.x, label: "X", Icon: RiTwitterXFill },
];

const SideNav = ({ ready = true }) => {
  return (
    <div className="w-[10%] h-[100dvh] fixed bottom-0 left-0 bg-dark1 z-[100] max-[500px]:w-[15%]">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <m.div
          className="w-full h-[67%] flex flex-col-reverse justify-evenly items-center max-[500px]:h-[60%]"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } } }}
          initial="hidden"
          animate={ready ? "show" : "hidden"}
        >
          {NAV.map(({ href, label, Icon }) => (
            <m.a
              href={href}
              key={label}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="inline-flex group"
              variants={{ hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0, transition: bounce } }}
            >
              <span className="inline-flex group-hover:scale-[1.35] group-hover:-rotate-12 group-active:scale-90 transition-transform duration-500 ease-bounce">
                <Icon className="text-[1.4rem] text-font1 relative left-[-5.5%] group-hover:text-btn group-focus:text-btn transition-colors duration-300" />
              </span>
            </m.a>
          ))}
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
