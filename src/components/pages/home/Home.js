import Header from "./Header";
import HotelList from "./HotelList";
import VisitNorway from "./VisitNorway";


function Home() {
    return (
        <>
            <Header />
            <main >
                <div className="wrapper">
                    <HotelList />
                </div>
                <VisitNorway />
            </main>
        </>

    )
};

export default Home;

