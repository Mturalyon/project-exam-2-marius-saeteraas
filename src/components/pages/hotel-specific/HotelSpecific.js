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
        return <div>Loading..</div>
    }
    if (error) {
        return <div>{error}</div>
    }

    return (
        <div>
            <h5>{hotel.name}</h5>
            <img src={hotel.images[0].src} alt="Logo" height="300px" />
            <p>{hotel.description}</p>
            <p>{hotel.short_description}</p>
            <p>{hotel.prices.price} NOK</p>
            <Link to={`../enquiry/${id}`}>
                <button>BOOK</button>
            </Link>
        </div>
    )
}

export default HotelSpecific;