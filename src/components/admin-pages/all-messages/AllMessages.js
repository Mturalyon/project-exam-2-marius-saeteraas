import MessageList from "./MessageList";
import { useEffect } from "react";

function AllMessages() {

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