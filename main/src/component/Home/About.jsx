import Data from "../Data.json";
import "./Styles/About.css";

const About = () => {
    return(
        <div className="about">
            <div className="container">
                <div className="text">
                    <h2>About Me??</h2>
                    <p>{Data.user.About}</p>
                </div>
                <div className="image-box">
                    <img src={Data.user.ProfilePic} alt="myimage"/>
                </div>
            </div>
        </div>
    )
}

export default About;