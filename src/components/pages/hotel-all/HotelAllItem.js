import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function HotelAllItem({ id, title, address, image, price }) {

    address = address.replace("<p>", "").replace("</p>", "");

    return (
        <div className="plate">
            <img src={image} alt="display of the accommodation" />
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