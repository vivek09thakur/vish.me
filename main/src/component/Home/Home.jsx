import React, { useEffect, useState } from "react";
import Data from "../Data.json";
import { RiDownloadLine } from "react-icons/ri";
import MyImage from "../../assets/group6.svg";
import { CiLocationOn } from "react-icons/ci";
import "./Styles/Style.css";

const Typewriter = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setDisplayedText("");
          setIndex(0);
        }, 1000);
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [index, text]);

  return <h1 id="myname">{displayedText}</h1>;
};
const Home = () => {
  return (
    <div className="home grid-overlay">
      <div className="container ">
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
          <Typewriter text={Data.user.IntroLine} />
          <p>{Data.user.About}</p>
          <h1 id="location" style={{ opacity: "0.6", fontSize: "1.5rem" }}>
            <CiLocationOn style={{ position: "relative", bottom: "-4px" }} />{" "}
            Mumbai, Maharashtra, India
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;