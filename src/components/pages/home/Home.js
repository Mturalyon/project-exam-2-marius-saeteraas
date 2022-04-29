import Header from "./Header";
import HotelList from "./HotelList";
import VisitNorway from "./VisitNorway";
import TypeDown from "./TypeDown";


function Home() {

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

