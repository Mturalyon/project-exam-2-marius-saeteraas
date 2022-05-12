import { API } from "../../../constants/api";
import { useState, useEffect } from "react";
import EnquiryItem from "./EnquiryItem";

const url = API + "/?per_page=100";

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

                    if (enquiry.categories[0].name === "enquiry") {
                        const { id, name, short_description } = enquiry;
                        return <EnquiryItem key={id} id={id} title={name} address={short_description} />
                    }
                    else {
                        return null;
                    }

                })}
            </div>
        </section>
    )
};

export default EnquiryList;