import AdminMessages from "./AdminMessages";
import AdminEnquiries from "./AdminEnquiries";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Admin() {

    const navigate = useNavigate();

    let user = JSON.parse(window.localStorage.getItem("auth"));
    let auth = true;

    if (!user) {
        user = "Admin";
        auth = false;
    } else {
        user = user.email;
        auth = true;
    }

    useEffect(() => {
        if (!auth) {
            navigate("/");
        }

        document.title = `Holidaze | ${user}`;
    }, []);

    return (
        <main>
            <div className="wrapper">
                <div className="admin-nav">

                    <p>{user}</p>
                    <ul>
                        <li><Link to={`/manage`}>Manage</Link></li>
                        <li><Link to={`/create`}>Create</Link></li>
                        <li><Link to={`/all-enquiries`}>Enquiries</Link></li>
                        <li><Link to={`/all-messages`}>Messages</Link></li>
                    </ul>

                </div>
                <AdminEnquiries />
                <hr></hr>
                <AdminMessages />
            </div>
        </main>
    )
};

export default Admin;