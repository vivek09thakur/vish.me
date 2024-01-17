import reactlogo from "../../assets/react.svg";
import "./SideNav.css";

const SideNav = () => {
  return (
    <div className="sideNav">
      <div className="container">
        <div className="line"></div>
        <div className="social_box">
          <img src={reactlogo} className="icons" />
          <img src={reactlogo} className="icons" />
          <img src={reactlogo} className="icons" />
          <img src={reactlogo} className="icons" />
          <img src={reactlogo} className="icons" />
          <img src={reactlogo} className="icons" />
        </div>
      </div>
    </div>
  );
};

export default SideNav;
