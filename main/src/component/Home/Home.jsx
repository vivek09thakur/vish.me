import Data from "../Data.json";
import TypedIntro from "./TypedIntro";
import { RiDownloadLine } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import "./Styles/Style.css";

const Home = () => {
  return (
    <div className="home">
      <div className="text-part">
        <div className="text-box">
          <a
            href={Data.myCV}
            className="resume-btn"
            download="VivekThakurCV.pdf"
            id="resume"
          >
            <RiDownloadLine style={{ marginRight: "5px",position:"relative",bottom:"-4px" }} />
            Resume
          </a>

          <h1 style={{ opacity: "0.6", fontSize: "1.4rem" }}>Hey There!</h1>
          <h1>{Data.user.IntroLine}</h1>
          <h2>
            <TypedIntro />
          </h2>
          <h1 id="#location" style={{ opacity: "0.6", fontSize: "1.5rem" }}>
            <CiLocationOn style={{ position: "relative", bottom: "-4px" }} />{" "}
            Bihar, India
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
