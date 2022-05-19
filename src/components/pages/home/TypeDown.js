import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { API } from "../../../constants/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const url = API + "/?per_page=100";

function TypeDown() {
    const [hotels, setHotels] = useState([]);
    const [text, setText] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(function () {
        async function fetchData() {
            try {
                const response = await fetch(url);

                if (response.ok) {
                    const json = await response.json();
                    setHotels(json);
                }
                else {
                    console.log("Woops! Something seems to be wrong :(");
                };

            }
            catch (error) {
                console.log("There seems to have ben an error :(");
            }
        }
        fetchData();
    }, []);

    const onChangeHandler = (text) => {
        let matches = [];

        if (text.length > 0) {
            matches = hotels.filter(hotel => {
                const regex = new RegExp(`${text}`, "gi");
                return hotel.name.match(regex);
            });
        };

        setSuggestions(matches);
        setText(text);
    };

    return (
        <>
            <label className="typedown-label flex-mid">
                <div className="typedown-wrapper">
                    <div className="typedown-bg">
                        <input type="text" id="search" name="search" placeholder="Search.."
                            onChange={e => onChangeHandler(e.target.value)}
                            value={text}
                        />
                        <FontAwesomeIcon icon={faSearch} className="social-link" />
                    </div>
                    {suggestions && suggestions.map((suggestion) => {
                        if (suggestion.categories[0].name === "hotel") {
                            return <Link key={suggestion.id} to={`hotel-specific/${suggestion.id}`} className="typedown-link">{suggestion.name}</Link>
                        }
                        else {
                            return null;
                        }
                    })}
                </div>
            </label>
        </>
    )
};

export default TypeDown;