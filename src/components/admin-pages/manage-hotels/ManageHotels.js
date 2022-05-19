import ManageList from "./ManageList";
import { useEffect } from "react";

function ManageHotels() {

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