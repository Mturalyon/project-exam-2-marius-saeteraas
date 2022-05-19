import MessageList from "./MessageList";
import { useEffect } from "react";
import RedirectPage from "../redirectPage";

function AllMessages() {

    RedirectPage();

    useEffect(() => {
        document.title = `Holidaze | Messages`;
    }, []);

    return (
        <main>
            <div className="wrapper">
                <MessageList />
            </div>
        </main>
    )

};

export default AllMessages;