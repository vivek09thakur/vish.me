import Data from "../Data.json";
import TypedIntro from "./TypedIntro";
import { IoDownloadOutline } from "react-icons/io5";
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
          >
            <IoDownloadOutline style={{ marginRight: "5px" }} />
            RESUME
          </a>
          <h1 style={{ opacity: "0.6", fontSize: "1.4rem" }}>Hey There!</h1>
          <h1>{Data.user.IntroLine}</h1>
          <h2>
            <TypedIntro />
          </h2>
          <h1 style={{ opacity: "0.6", fontSize: "1.5rem" }}>
            <CiLocationOn /> Bihar, India
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
