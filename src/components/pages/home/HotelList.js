import { API } from "../../../constants/api";
import { useState, useEffect } from "react";
import HotelItem from "./HotelItem";
import { Link } from "react-router-dom";

function HotelList() {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let approvedImage = "";

    useEffect(function () {
        async function fetchData() {
            try {
                const response = await fetch(API);

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

    return (
        <section className="home-hotel-section">
            <h3>Accommodations</h3>
            <div className="card-container">
                {hotels.map(function (hotel) {
                    const { id, name, short_description } = hotel;
                    const { price } = hotel.prices;

                    if (!hotel.images[0]) {
                        approvedImage = "https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
                    } else {
                        const { src } = hotel.images[0];
                        approvedImage = src;
                    }

                    return <HotelItem key={id} id={id} title={name} address={short_description} image={approvedImage} price={price} />
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

