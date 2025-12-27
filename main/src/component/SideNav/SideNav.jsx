import { FaInstagram} from "react-icons/fa6";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { SiDiscord, SiStackoverflow,SiExpo } from "react-icons/si";
import { RiTwitterXFill } from "react-icons/ri";
import userData from "../../Data.json";
import "./SideNav.css";

const SideNav = () => {
  const {
    github,
    linkedin,
    instagram,
    expo,
    discord,
    stackoverflow,
  } = userData.socials;
  const socialLinks = {
    linkedin,
    instagram,
    discord,
    stackoverflow,
    github,
    expo,
  };
  const Icons = {
    github: FiGithub,
    stackoverflow: SiStackoverflow,
    linkedin: FiLinkedin,
    instagram: FaInstagram,
    expo: SiExpo,
    discord: SiDiscord,
  };

  return (
    <div className="sideNav">
      <div className="container">
        <div className="social_box">
          {Object.entries(socialLinks).map(([key, link], index) => {
            const Icon = Icons[key];
            return (
              <a href={link} key={index} target="_blank" rel="noreferrer">
                <Icon className="icon" />
              </a>
            );
          })}
        </div>
        <div className="line"></div>
      </div>
    </div>
  );
};

export default SideNav;
