import {
  FaStackOverflow,
  FaDiscord,
  FaXTwitter,
  FaInstagram,
} from "react-icons/fa6";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { SiGeeksforgeeks } from "react-icons/si";
import userData from "../Data.json";
import "./SideNav.css";

const SideNav = () => {
  const { github, linkedin, instagram, twitter, discord, gfg, stackoverflow } =
    userData.socials;
  const socialLinks = {
    github,
    linkedin,
    instagram,
    twitter,
    discord,
    gfg,
    stackoverflow,
  };
  const Icons = {
    github: FiGithub,
    linkedin: FiLinkedin,
    instagram: FaInstagram,
    twitter: FaXTwitter,
    discord: FaDiscord,
    gfg: SiGeeksforgeeks,
    stackoverflow: FaStackOverflow,
  };

  return (
    <div className="sideNav">
      <div className="container">
        <div className="line"></div>
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
      </div>
    </div>
  );
};

export default SideNav;
