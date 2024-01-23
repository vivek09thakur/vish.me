import Data from "../Data.json";
import TypedIntro from "./TypedIntro";
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
          <p>{Data.user.About}</p>
        </div>
      </div>
      <div className="image-part"></div>
    </div>
  );
};

export default Home;
