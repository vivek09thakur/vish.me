import Data from "../Data.json";
import "./Style/Style.css";


const Footer = () => {
    return (
        <div className="footer">
            <div className="footer_container">
                <div className="footline"></div>
                <div className="content">
                    <a href={Data.user.email} className="email">{Data.user.email}</a>
                </div>
            </div>
        </div>
    );
}

export default Footer;