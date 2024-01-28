import {
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineTwitter,
  AiOutlineInstagram,
} from "react-icons/ai";

import { FaStackOverflow,FaSpotify, FaDiscord } from "react-icons/fa6";
import userData from "../Data.json";
import "./SideNav.css";

const SideNav = () => {
  const { github, linkedin, instagram, twitter, discord, spotify, stackoverflow } =
    userData.socials;
  const socialLinks = {
    spotify,
    github,
    linkedin,
    instagram,
    twitter,
    discord,
    stackoverflow,
  };
  const Icons = {
    github: AiOutlineGithub,
    linkedin: AiOutlineLinkedin,
    instagram: AiOutlineInstagram,
    twitter: AiOutlineTwitter,
    discord: FaDiscord,
    spotify: FaSpotify,
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
