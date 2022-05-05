import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { API } from "../../../constants/api";

function HotelSpecific() {
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let history = useNavigate();

    const { id } = useParams();

    if (!id) {
        history("/");
        history(0);
    }

    const url = API + "/" + id;

    useEffect(function () {
        async function fetchData() {
            try {
                const response = await fetch(url);

                if (response.ok) {
                    const json = await response.json();
                    setHotel(json);
                }
                else {
                    setError("An error has occured.");
                }
            }
            catch (error) {
                setError("An error has occured.")
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [url]);

    if (loading) {
        return (
            <div className="loader-container flex-mid">
                <div className="loader"></div>
            </div>
        )
    }
    if (error) {
        return (
            <div className="loader-container flex-mid">
                <p className="error">{error}</p>
            </div>
        )
    }

    const description = hotel.description.replace("<p>", "").replace("</p>", "");
    const address = hotel.short_description.replace("<p>", "").replace("</p>", "");

    if (hotel.categories[0].name === "hotel") {
        return (
            <div className="specific-wrapper">
                <main className="hotel-specific-main">
                    <h2>{hotel.name}</h2>
                    <div className="hotel-specific-content">

                        <img src={hotel.sku} onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
                        }} alt="display of accommodation" />

                        <div className="hotel-specific-flex">
                            <div className="hotel-specific-info">
                                <p className="specific-address">{address}</p>
                                <p className="specific-description">{description}</p>
                                <p><span>{hotel.prices.price}</span> NOK: Per Night</p>
                            </div>
                            <Link to={`../enquiry/${id}`} className="specific-button button">
                                Book
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
    else {
        history("/");
        history(0);
    }


}

export default HotelSpecific;