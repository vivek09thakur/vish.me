import Data from "../Data.json";
import TypedIntro from "./TypedIntro";
// import MyImage from "../../assets";

import "./Styles/Style.css";

const Home = () => {
  return (
    <div className="home">
      <div className="text-part">
        <div className="text-box">
          <h1>{Data.user.IntroLine}</h1>
          <h2>
            <TypedIntro />
          </h2>
          <a href="" className="resume-btn">Download CV</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
