import Data from "../Data.json";
import ProfilePic from "../../assets/myPic2.png";
import TechStack from "./Techstack";
import Cards from "../Cards/Card";
import ExpCard from "../Cards/ExpCard";
import "./Styles/About.css";

const About = () => {
  const { user, RandomAboutText } = Data;
  const [randomTitle, randomDescription] = RandomAboutText;
  const projectKeys = Object.keys(Data.projects);
  const ExpKeys = Object.keys(Data.exp);

  const AboutMe = () => {
    return (
      <div className="container">
        <div className="text">
          <h2>About Me??🤔</h2>
          <p>{user.About}</p>
        </div>
        <div className="image-box">
          <img src={ProfilePic} alt="Profile Picture" />
        </div>
      </div>
    );
  };

  const MyExp = () => {
    return (
      <div className="experiences">
        <h2
          className="title"
          style={{ textTransform: "capitalize", paddingLeft: "2%" }}
        >
          My Experiences ⚡
        </h2>
        <div className="exp-container">
          {ExpKeys.map((key, item) => (
            <ExpCard key={item} exp={Data.exp[key]} />
          ))}
        </div>
      </div>
    );
  };

  const RandomText = () => {
    return (
      <>
        <h1
          className="h1"
          style={{
            textTransform: "capitalize",
            paddingLeft: "2%",
            marginTop: "8%",
          }}
        >
          {randomTitle}
        </h1>
        <p className="p" style={{ opacity: "0.7", paddingLeft: "2%" }}>
          {randomDescription}
        </p>
      </>
    );
  };

  const Projects = () => {
    return (
      <div className="project_container">
        {projectKeys.map((key, item) => (
          <Cards key={item} project={Data.projects[key]} />
        ))}
      </div>
    );
  };

  return (
    <div className="about">
      <AboutMe />
      <MyExp />
      <RandomText />
      <Projects />
      <TechStack />
    </div>
  );
};

export default About;
