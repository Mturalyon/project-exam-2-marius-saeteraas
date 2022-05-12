import { API } from "../../../constants/api";
import { useState, useEffect } from "react";
import HotelAllItem from "./HotelAllItem";

const url = API + "/?per_page=100";

function HotelAllList() {
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
                    <h3>All Accommodations</h3>
                    <div className="card-container">
                        <div className="loader-container flex-mid">
                            <div className="loader"></div>
                        </div>
                    </div>
                </section>

            </>
        )
    }

    if (error) {
        return (
            <>
                <section className="home-hotel-section">
                    <h3>All Accommodations</h3>
                    <div className="card-container">
                        <div className="loader-container flex-mid">
                            <p className="error">{error}</p>
                        </div>
                    </div>
                </section>

            </>
        )
    };

    return (
        <section className="home-hotel-section">
            <h3>All Accommodations</h3>
            <div className="plate-container">
                {hotels.map(function (hotel) {

                    if (hotel.categories[0].name === "hotel") {
                        const { id, name, short_description, sku } = hotel;
                        const { price } = hotel.prices;

                        return <HotelAllItem key={id} id={id} title={name} address={short_description} image={sku} price={price} />
                    }
                    else {
                        return null;
                    }

                })}
            </div>
        </section>
    )
}

export default HotelAllList;