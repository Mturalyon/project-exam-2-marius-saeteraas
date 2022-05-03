import {
    Routes,
    Route,
    Link,
    useNavigate,
} from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

//Page
import Home from "../pages/home/Home";
import Contact from "../pages/contact/Contact";
import HotelSpecific from "../pages/hotel-specific/HotelSpecific";
import Login from "../pages/login/Login";
import HotelAll from "../pages/hotel-all/HotelAll";
import Enquiry from "../pages/enquiry/Enquiry";
//Admin Page
import Admin from "../admin-pages/admin/Admin";
//Component
import Footer from "./Footer";



function Layout() {
    const [auth, setAuth] = useContext(AuthContext);
    const navigate = useNavigate()

    function logout() {
        setAuth(null);
        navigate("/")
        navigate(0)
    };


    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/" className="logo">Holidaze</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/hotel-all" className="nav-link">Accommodations</Link>
                            <Link to="/contact" className="nav-link">Contact</Link>

                            {auth ? (
                                <>
                                    <Link to="#" className="nav-link" onClick={logout}>| Log Out |</Link>
                                    <NavDropdown title="Admin" id="basic-nav-dropdown">
                                        <Link to="/admin" className="dropdown-item">Admin Panel</Link>
                                        <NavDropdown.Divider />
                                        <Link to="#" className="dropdown-item">Manage</Link>
                                        <Link to="#" className="dropdown-item">Create</Link>
                                        <Link to="#" className="dropdown-item">Enquiries</Link>
                                        <Link to="#" className="dropdown-item">Messages</Link>
                                    </NavDropdown>
                                </>

                            ) : (<Link to="/login" className="nav-link">Login</Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hotel-all" element={<HotelAll />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />

                <Route path="/hotel-specific/:id" element={<HotelSpecific />} />
                <Route path="/enquiry/:id" element={<Enquiry />} />

                <Route path="/admin" element={<Admin />} />
            </Routes>
            <Footer />
        </>
    );
};

export default Layout;