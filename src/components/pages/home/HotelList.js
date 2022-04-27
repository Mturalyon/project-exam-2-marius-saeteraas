import { API } from "../../../constants/api";
import { useState, useEffect } from "react";
import HotelItem from "./HotelItem";

function HotelList() {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                }

            }
            catch (error) {
                setError(error.toString())
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <div>Lodaing...</div>
    }

    if (error) {
        return <div>There has ben an error</div>
    }

    return (
        <>
            {hotels.map(function (hotel) {
                const { id, name, short_description } = hotel;
                const { src } = hotel.images[0];
                const { price } = hotel.prices;
                return <HotelItem key={id} id={id} title={name} address={short_description} image={src} price={price} />
            })}
        </>
    )
}

export default HotelList;

