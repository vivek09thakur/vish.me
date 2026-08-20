import { FaInstagram} from "react-icons/fa6";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { SiDiscord, SiStackoverflow } from "react-icons/si";
import { RiTwitterXFill } from "react-icons/ri";
import { motion } from "framer-motion";
import userData from "../../Data.json";

const SideNav = () => {
  const {
    github,
    linkedin,
    instagram,
    x,
    discord,
    stackoverflow,
  } = userData.socials;
  const socialLinks = {
    linkedin,
    instagram,
    discord,
    stackoverflow,
    github,
    x,
  };
  const Icons = {
    github: FiGithub,
    stackoverflow: SiStackoverflow,
    linkedin: FiLinkedin,
    instagram: FaInstagram,
    x: RiTwitterXFill,
    discord: SiDiscord,
  };

  return (
    <div className="w-[10%] h-[100dvh] fixed bottom-0 left-0 bg-dark1 z-[100] max-[500px]:w-[15%]">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <motion.div
          className="w-full h-[67%] flex flex-col-reverse justify-evenly items-center max-[500px]:h-[60%]"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } } }}
          initial="hidden"
          animate="show"
        >
          {Object.entries(socialLinks).map(([key, link], index) => {
            const Icon = Icons[key];
            return (
              <motion.a
                href={link}
                key={index}
                target="_blank"
                rel="noreferrer"
                variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="text-[1.4rem] text-font1 relative left-[-5.5%] hover:text-btn focus:text-btn transition-colors duration-300" />
              </motion.a>
            );
          })}
        </motion.div>
        <div className="bg-line w-[2px] h-[15%] absolute bottom-0"></div>
      </div>
    </div>
  );
};

export default SideNav;
