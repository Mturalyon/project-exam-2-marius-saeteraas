import { API } from "../../../constants/api";
import { useState, useEffect } from "react";
import MessageItem from "../all-messages/MessageItem";
import { Link } from "react-router-dom";

const url = API + "/?per_page=100";

function AdminMessages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(function () {
        async function fetchData() {
            try {
                const response = await fetch(url);

                if (response.ok) {
                    const json = await response.json();
                    setMessages(json);
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
                <section className="home-hotel-section admin-section">
                    <div className="admin_header-container">
                        <h3>Latest Messages</h3>
                        <Link to={`/all-messages`} className="plate manage-plate">See All</Link>
                    </div>
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
                <section className="home-hotel-section admin-section">
                    <div className="admin_header-container">
                        <h3>Latest Messages</h3>
                        <Link to={`/all-messages`} className="plate manage-plate">See All</Link>
                    </div>
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
        <section className="home-hotel-section admin-section">
            <div className="admin_header-container">
                <h3>Latest Messages</h3>
                <Link to={`/all-messages`} className="plate manage-plate">See All</Link>
            </div>

            <div className="plate-container">
                {messages.map(function (message) {

                    if (message.categories[0].name === "message") {
                        const { id, sku, short_description } = message;
                        return <MessageItem key={id} id={id} title={sku} address={short_description} />
                    }
                    else {
                        return null;
                    }

                })}
            </div>
        </section>
    )
};

export default AdminMessages;