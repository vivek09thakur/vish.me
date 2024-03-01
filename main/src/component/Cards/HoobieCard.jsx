// import { RxInstagramLogo } from "react-icons/rx";
// import { PiTagSimple } from "react-icons/pi";
import PropTypes from "prop-types";
import "./Style.css";

const HobbieCards = ({ ArtWork }) => {
  return (
    <a
      href={ArtWork.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{ cursor: "pointer" }}
    >
      <div className="HobbieCard">
        <img
          src={ArtWork.img}
          id="post-img"
          style={{ height: "100%", objectFit: "fill" }}
        />
      </div>
    </a>
  );
};

HobbieCards.propTypes = {
  ArtWork: PropTypes.object.isRequired,
};

export default HobbieCards;
