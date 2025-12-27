import Data from "../../Data.json";
import "./Style/Style.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer">
      <div className="footer_container">
        <div className="footline"></div>
        <div className="content">
          <a href={`mailto: ${Data.user.email}`} className="email">
            {Data.user.email}
          </a>
        </div>
      </div>
      <div className="copyrights">
        <p>
          All Rights Reserved © {year} | {" "}
          <a href={Data.user.github}>vivek09thakur</a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
