import { API } from "../../../constants/api";
import { useState, useEffect } from "react";
import MessageItem from "./MessageItem";

const url = API + "/?per_page=100";

function MessageList() {
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
                <section className="home-hotel-section">
                    <h3>All Messages</h3>
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
                    <h3>All Messages</h3>
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
            <h3>All Messages</h3>
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

export default MessageList;