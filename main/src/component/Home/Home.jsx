import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Data from "../Data.json";
import MyImage from "../../assets/vector-image.png";
import { RiDownloadLine } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import "./Styles/Style.css";

const Typewriter = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!text) return;
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, index + 1));
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
    const resetTimeout = setTimeout(() => {
      setDisplayedText("");
      setIndex(0);
    }, 1000);
    return () => clearTimeout(resetTimeout);
  }, [index, text]);

  return <h1 id="myname">{displayedText}</h1>;
};

Typewriter.propTypes = {
  text: PropTypes.string.isRequired,
};

const Home = () => (
  <div className="home grid-overlay">
    <div className="container">
      <div className="image-box">
        <img src={MyImage} alt="Group" />
      </div>
      <div className="text-box">
        <a
          href={Data.myCV}
          className="resume-btn"
          download="VivekThakurCV.pdf"
          id="resume"
        >
          <RiDownloadLine style={{ marginRight: 5, position: "relative", bottom: -4 }} />
          Resume
        </a>
        <Typewriter text={Data.user.IntroLine} />
        <p>{Data.user.About}</p>
        <h1 id="location" style={{ opacity: 0.6, fontSize: "1.5rem" }}>
          <CiLocationOn style={{ position: "relative", bottom: -4 }} /> Mumbai, Maharashtra, India
        </h1>
      </div>
    </div>
  </div>
);

export default Home;
