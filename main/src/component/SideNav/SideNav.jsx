import {
  AiOutlineCodepen,
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineTwitter,
  AiOutlineInstagram,
} from "react-icons/ai";
import userData from "../../data.json";
import "./SideNav.css";

const SideNav = () => {
  const { github, linkedin, instagram, twitter, codepen } =
    userData.user.socials;
  const socialLinks = { github, linkedin, instagram, twitter, codepen };
  const Icons = {
    github: AiFillGithub,
    linkedin: AiFillLinkedin,
    instagram: AiOutlineInstagram,
    twitter: AiOutlineTwitter,
    codepen: AiOutlineCodepen,
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
