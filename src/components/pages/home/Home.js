import Header from "./Header";
import HotelList from "./HotelList";
import VisitNorway from "./VisitNorway";
import TypeDown from "./TypeDown";

import { useEffect } from "react";


function Home() {

    useEffect(() => {
        document.title = "Holidaze | Home";
    }, []);

    return (
        <>
            <Header />
            <main >
                <TypeDown />
                <div className="wrapper">
                    <HotelList />
                </div>
                <VisitNorway />
            </main>
        </>

    )
};

export default Home;

