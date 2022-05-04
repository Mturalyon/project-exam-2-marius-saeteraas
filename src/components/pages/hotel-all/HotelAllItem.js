import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function HotelAllItem({ id, title, address, image, price }) {

    address = address.replace("<p>", "").replace("</p>", "");

    return (
        <div className="plate">

            <img src={image} onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
            }} alt="" />

            <div className="plate-info">
                <div>
                    <h4>{title}</h4>
                    <p>{address}</p>
                    <p><span>{price}</span> NOK: Per Night</p>
                </div>
                <Link to={`../hotel-specific/${id}`} className="plate-button button button-secondary">Book</Link>
            </div>
        </div>
    );
};

HotelAllItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
};

export default HotelAllItem;