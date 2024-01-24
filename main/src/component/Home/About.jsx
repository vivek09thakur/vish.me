import Data from "../Data.json";
import ProfilePic from "../../assets/myPic.jpg";
import "./Styles/About.css";

const About = () => {
  return (
    <div className="about">
      <div className="container">
        <div className="text">
          <h2>About Me??</h2>
          <p>{Data.user.About}</p>
        </div>
        <div className="image-box">
          <img src={ProfilePic} alt="myimage" />
        </div>
      </div>

      <h1>Things I have Built (I am still working on them -_-)</h1>
    </div>
  );
};

export default About;
