import HobbieCards from "../Cards/HoobieCard";
import Data from "../Data.json";
import "./style.css";

const Hobbies = () => {
  const ArtWorks = Data.ArtWorks;
  const ArtKeys = Object.keys(ArtWorks);

  return (
    <>
      <div className="hobbies">
        <h1>
          Sketches and <span style={{ color: "var(--btn_color)" }}>Clicks</span>
        </h1>
        <p style={{ opacity: "0.8" }}>
          Besides of Programming, I like to draw sketches and shoot (pictures
          not peoples)
        </p>

        <div className="container">
          {ArtKeys.map((key, item) => (
            <HobbieCards key={item} ArtWork={Data.ArtWorks[key]} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Hobbies;
