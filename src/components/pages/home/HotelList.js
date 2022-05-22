import { API } from "../../../constants/api";
import { useState, useEffect } from "react";
import HotelItem from "./HotelItem";
import { Link } from "react-router-dom";
import LoopControl from "./LoopControl";

const url = API + "/?per_page=100";

function HotelList() {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(function () {
        async function fetchData() {
            try {
                const response = await fetch(url);

                if (response.ok) {
                    const json = await response.json();
                    setHotels(json);
                }
                else {
                    setError("An error has occured.");
                };

            }
            catch (error) {
                setError("An error has occured.");
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <>
                <section className="home-hotel-section">
                    <h3>Accommodations</h3>
                    <div className="card-container">
                        <div className="loader-container flex-mid">
                            <div className="loader"></div>
                        </div>
                    </div>
                    <div className="flex-mid">
                        <Link to={`/hotel-all`} className="button">
                            See More
                        </Link>
                    </div>
                </section>

            </>
        )
    }

    if (error) {
        return (
            <>
                <section className="home-hotel-section">
                    <h3>Accommodations</h3>
                    <div className="card-container">
                        <div className="loader-container flex-mid">
                            <p className="error">{error}</p>
                        </div>
                    </div>
                    <div className="flex-mid">
                        <Link to={`/hotel-all`} className="button">
                            See More
                        </Link>
                    </div>
                </section>

            </>
        )
    };

    const loopedHotels = LoopControl(hotels, "hotel");

    return (
        <section className="home-hotel-section">
            <h3>Accommodations</h3>

            <div className="card-container">
                {loopedHotels.map(function (hotel) {

                    const { id, name, short_description, sku } = hotel;
                    const { price } = hotel.prices;
                    return <HotelItem key={id} id={id} title={name} address={short_description} image={sku} price={price} />

                })}
            </div>

            <div className="flex-mid">
                <Link to={`/hotel-all`} className="button">
                    See More
                </Link>
            </div>
        </section>
    )
};

export default HotelList;

