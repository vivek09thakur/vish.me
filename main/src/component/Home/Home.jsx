import Data from "../Data.json";
import TypedIntro from "./TypedIntro";
import { IoDownloadOutline } from "react-icons/io5";
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
          <a href={Data.myCV} className="resume-btn" download="VivekThakurCV.pdf">Download CV <IoDownloadOutline/></a>
        </div>
      </div>
    </div>
  );
};

export default Home;
