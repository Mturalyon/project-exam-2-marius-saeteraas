import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ENQ_API } from "../../../constants/api";

function EnquirySpecific() {
    const [enquiry, setEnquiry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let history = useNavigate();

    const { id } = useParams();

    if (!id) {
        history("/");
        history(0);
    }

    const url = ENQ_API + "/" + id;

    useEffect(function () {
        async function fetchData() {
            try {
                const response = await fetch(url);

                if (response.ok) {
                    const json = await response.json();
                    setEnquiry(json);
                    document.title = `Holidaze | Enquiry - ${json.title.rendered}`;
                }
                else {
                    setError("An error has occured.");
                    document.title = `Holidaze | No enquiry found`;
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


    return (
        <main className="form-main">
            <div className="form-background"></div>
            <form className="enquiry-specific_form">
                <div className="enquiry-specific_container">
                    <div>
                        <p>Accommodation:</p>
                        <p>Full Name:</p>
                        <p>Email:</p>
                        <p>Phone nr:</p>
                        <p>Date:</p>
                        <p>Guests:</p>
                    </div>

                    <div>
                        <p className="enquiry-specific_hotel">{enquiry.title.rendered}</p>
                        <p>{enquiry.acf.full_name}</p>
                        <p>{enquiry.acf.email}</p>
                        <p>+47 {enquiry.acf.phone_number}</p>
                        <p>{enquiry.acf.arrival_date} - {enquiry.acf.departure_date}</p>
                        <p>{enquiry.acf.number_of_guests}</p>
                    </div>
                </div>
                <hr></hr>
                <p id="enquiry_message">Message:</p>
                <p className="enquiry-specific_message">{enquiry.acf.message}</p>
                <hr></hr>
                <Link to={`/all-enquiries`} className="specific-button button">
                    Back
                </Link>
            </form>
        </main>
    )
};

export default EnquirySpecific;