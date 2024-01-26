import Data from "../Data.json";
import ProfilePic from "../../assets/myPic.jpg";
import TechStack from "./Techstack";
import Cards from "../Cards/Card";
import ExpCard from "../Cards/ExpCard";
import "./Styles/About.css";

const About = () => {
  const { user, RandomAboutText } = Data;
  const [randomTitle, randomDescription] = RandomAboutText;
  // ProjectKeys
  const projectKeys = Object.keys(Data.projects);
  // ExpKeys
  const ExpKeys = Object.keys(Data.exp);

  return (
    <div className="about">
      {/* ----------- About Me -----------*/}
      <div className="container">
        <div className="text">
          <h2>About Me??🤔</h2>
          <p>{user.About}</p>
        </div>
        <div className="image-box">
          <img src={ProfilePic} alt="Profile Picture" />
        </div>
      </div>

      {/* ----------- Experience -----------*/}
      <div className="experiences">
        <h2
          style={{
            color: "var(--font_color1)",
            fontFamily: "var(--robotic_font)",
            fontWeight: "normal",
            fontSize: "2rem",
            marginBottom: "3.5%",
          }}
        >
          My Work Experiences 👨‍💻
        </h2>
        <div className="exp-container">
          {ExpKeys.map((key, item) => (
            <ExpCard key={item} exp={Data.exp[key]} />
          ))}
        </div>
      </div>

      {/* ----------- Tech Stack -----------*/}
      <TechStack />

      {/* ------------ Random Talks ------------- */}
      <h1>{randomTitle}</h1>
      <p>{randomDescription}</p>

      {/* ------------ Projects ------------- */}
      <div className="project_container">
        {projectKeys.map((key, item) => (
          <Cards key={item} project={Data.projects[key]} />
        ))}
      </div>
    </div>
  );
};

export default About;
