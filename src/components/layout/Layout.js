import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import Home from "../pages/home/Home";
import Contact from "../pages/contact/Contact";


function Layout() {
    return (
        <>
            <Router>
                <Navbar bg="light" expand="lg" sticky="top">
                    <Container>
                        <Navbar.Brand href="/" className="logo">Holidaze</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />

                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                            <Nav>
                                <Link to="/" className="nav-link">Home</Link>
                                <Link to="#" className="nav-link">Accommodations</Link>
                                <Link to="/contact" className="nav-link">Contact</Link>
                                <Link to="#" className="nav-link">Login</Link>

                                <NavDropdown title="Admin" id="basic-nav-dropdown" className="d-none">
                                    <Link to="#" className="dropdown-item">Admin Panel</Link>
                                    <NavDropdown.Divider />
                                    <Link to="#" className="dropdown-item">Manage</Link>
                                    <Link to="#" className="dropdown-item">Create</Link>
                                    <Link to="#" className="dropdown-item">Enquiries</Link>
                                    <Link to="#" className="dropdown-item">Messages</Link>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>

                    </Container>
                </Navbar>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </Router>
        </>
    );
};

export default Layout;