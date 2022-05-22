import { API } from "../../../constants/api";
import { useState, useEffect } from "react";
import MessageItem from "../all-messages/MessageItem";
import { Link } from "react-router-dom";
import LoopControl from "../../pages/home/LoopControl";

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

    const loopedMessages = LoopControl(messages, "message");

    return (
        <section className="home-hotel-section admin-section">
            <div className="admin_header-container">
                <h3>Latest Messages</h3>
                <Link to={`/all-messages`} className="plate manage-plate">See All</Link>
            </div>

            <div className="plate-container">
                {loopedMessages.map(function (message) {

                    const { id, sku, short_description } = message;
                    return <MessageItem key={id} id={id} title={sku} address={short_description} />

                })}
            </div>
        </section>
    )
};

export default AdminMessages;