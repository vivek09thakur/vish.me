import Data from "../Data.json";
import { RiDownloadLine } from "react-icons/ri";
import MyImage from "../../assets/mypic5.png";
import { CiLocationOn } from "react-icons/ci";
import "./Styles/Style.css";

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <div className="image-box">
          <img src={MyImage} alt="" />
        </div>
        <div className="text-box">
          <a
            href={Data.myCV}
            className="resume-btn"
            download="VivekThakurCV.pdf"
            id="resume"
          >
            <RiDownloadLine
              style={{
                marginRight: "5px",
                position: "relative",
                bottom: "-4px",
              }}
            />
            Resume
          </a>
          <h1 id="myname">{Data.user.IntroLine}</h1>
          <p>{Data.user.About}</p>
          <h1 id="#location" style={{ opacity: "0.6", fontSize: "1.5rem" }}>
            <CiLocationOn style={{ position: "relative", bottom: "-4px" }} />{" "}
            Mumbai, Maharashtra, India
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
