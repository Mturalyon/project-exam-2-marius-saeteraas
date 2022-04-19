import { Link } from "react-router-dom";

function Contact() {
    return (
        <>
            <h1>Contact</h1>
            <p>This is the contact page</p>
            <Link to="/login">Login</Link>
        </>
    );
};

export default Contact;