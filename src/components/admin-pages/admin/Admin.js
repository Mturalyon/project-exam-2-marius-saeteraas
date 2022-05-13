import AdminMessages from "./AdminMessages";
import AdminEnquiries from "./AdminEnquiries";
import { Link } from "react-router-dom";

function Admin() {
    let user = JSON.parse(window.localStorage.getItem("auth"));

    return (
        <main>
            <div className="wrapper">
                <div className="admin-nav">

                    <p>{user.email}</p>
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