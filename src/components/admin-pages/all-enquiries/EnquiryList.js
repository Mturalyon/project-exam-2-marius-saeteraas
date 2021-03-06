import { ENQ_API } from "../../../constants/api";
import { useState, useEffect } from "react";
import EnquiryItem from "./EnquiryItem";

const url = ENQ_API + "/?per_page=100";

function EnquiryList() {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(function () {
        async function fetchData() {
            try {
                const response = await fetch(url);

                if (response.ok) {
                    const json = await response.json();
                    setEnquiries(json);
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
                    <h3>All Enquiries</h3>
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
                    <h3>All Enquiries</h3>
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
            <h3>All Enquiries</h3>
            <div className="plate-container">
                {enquiries.map(function (enquiry) {

                    return <EnquiryItem key={enquiry.id} id={enquiry.id} title={enquiry.title.rendered} arrival={enquiry.acf.arrival_date} departure={enquiry.acf.departure_date} />

                })}
            </div>
        </section>
    )
};

export default EnquiryList;