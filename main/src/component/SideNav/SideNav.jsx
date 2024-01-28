import {
  AiOutlineCodepen,
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineTwitter,
  AiOutlineInstagram,
} from "react-icons/ai";

import { FaStackOverflow } from "react-icons/fa6";
import { FaDev } from "react-icons/fa";
import userData from "../Data.json";
import "./SideNav.css";

const SideNav = () => {
  const { github, linkedin, instagram, twitter, codepen, dev, stackoverflow } =
    userData.socials;
  const socialLinks = {
    github,
    dev,
    twitter,
    linkedin,
    instagram,
    codepen,
    stackoverflow,
  };
  const Icons = {
    github: AiOutlineGithub,
    linkedin: AiOutlineLinkedin,
    instagram: AiOutlineInstagram,
    twitter: AiOutlineTwitter,
    codepen: AiOutlineCodepen,
    dev: FaDev,
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
