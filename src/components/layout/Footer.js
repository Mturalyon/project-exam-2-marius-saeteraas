import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <>
            <footer>
                <Link to="/" className="logo-footer">Holidaze</Link>
                <ul className="social-container">
                    <Link to="#" className="nav-link"><FontAwesomeIcon icon={faTwitter} className="social-link" /></Link>
                    <Link to="#" className="nav-link"><FontAwesomeIcon icon={faFacebook} className="social-link" /></Link>
                    <Link to="#" className="nav-link"><FontAwesomeIcon icon={faInstagram} className="social-link" /></Link>
                </ul>
                <p>Copyright 2022</p>
            </footer>
        </>
    );
};

export default Footer;