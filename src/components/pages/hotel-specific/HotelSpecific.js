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
        history.push("/");
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

    return (
        <div className="wrapper">
            <main className="hotel-specific-main">
                <h2>{hotel.name}</h2>
                <div>
                    <img src={hotel.images[0].src} alt="Logo" height="300px" />
                    <div>
                        <p>{description}</p>
                        <p>{address}</p>
                        <p>{hotel.prices.price} NOK</p>
                    </div>
                    <Link to={`../enquiry/${id}`}>
                        <button>BOOK</button>
                    </Link>
                </div>
            </main>
        </div>
    )
}

export default HotelSpecific;