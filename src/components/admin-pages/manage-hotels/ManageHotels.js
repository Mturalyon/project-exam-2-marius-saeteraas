import ManageList from "./ManageList";
import { useEffect } from "react";
import RedirectPage from "../redirectPage";

function ManageHotels() {

    RedirectPage();

    useEffect(() => {
        document.title = `Holidaze | Manage`;
    }, []);

    return (
        <main>
            <div className="wrapper">
                <ManageList />
            </div>
        </main>
    )
};

export default ManageHotels;