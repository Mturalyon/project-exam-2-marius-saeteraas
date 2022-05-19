import HotelAllList from "./HotelAllList";
import { useEffect } from "react";

function HotelAll() {

    useEffect(() => {
        document.title = "Holidaze | Accommodations";
    }, []);


    return (
        <main>
            <div className="wrapper">
                <HotelAllList />
            </div>
        </main>
    )
};

export default HotelAll;