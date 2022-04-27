import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function HotelItem({ id, title, address, image, price }) {

    address = address.replace("<p>", "").replace("</p>", "");

    return (
        <Link to={`hotel-specific/${id}`}>
            <img src={image} alt="Logo" height="300px" />
            <h5>{title}</h5>
            <p>{address}</p>
            <p>{price} NOK: Per Night</p>
        </Link>
    );
}

HotelItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
};

export default HotelItem;