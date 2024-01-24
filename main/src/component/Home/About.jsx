import Data from "../Data.json";
import ProfilePic from "../../assets/myPic.jpg";
import Cards from "../Cards/Card";
import "./Styles/About.css";

const About = () => {
  const { user, RandomAboutText } = Data;
  const [randomTitle, randomDescription] = RandomAboutText;
  // ProjectKeys
  const projectKeys = Object.keys(Data.projects);

  return (
    <div className="about">
      <div className="container">
        <div className="text">
          <h2>About Me??</h2>
          <p>{user.About}</p>
        </div>
        <div className="image-box">
          <img src={ProfilePic} alt="Profile Picture" />
        </div>
      </div>

      <h1>{randomTitle}</h1>
      <p>{randomDescription}</p>
      <div className="project_container">
        {projectKeys.map((key, item) => (
          <Cards key={item} project={Data.projects[key]} />
        ))}
      </div>
    </div>
  );
};

export default About;
