import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { API } from "../../../constants/api";

function MessageSpecific() {
    const [message, setMessage] = useState(null);
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
                    setMessage(json);
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

    const description = message.description.replace("<p>", "").replace("</p>", "");
    const address = message.short_description.replace("<p>", "").replace("</p>", "");

    if (message.categories[0].name === "message") {
        return (
            <main className="form-main">
                <div className="form-background"></div>
                <form className="message-specific_container">
                    <div>
                        <p>{message.name}</p>
                        <p>{address}</p>
                    </div>
                    <h2>{message.sku}</h2>
                    <hr></hr>
                    <p className="message-specific_description">{description}</p>
                    <Link to={`/all-messages`} className="specific-button button">
                        Back
                    </Link>
                </form>
            </main>
        )
    }
    else {
        history("/");
        history(0);
    }


}

export default MessageSpecific;