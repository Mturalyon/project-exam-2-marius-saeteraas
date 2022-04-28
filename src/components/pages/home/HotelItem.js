import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function HotelItem({ id, title, address, image, price }) {

    address = address.replace("<p>", "").replace("</p>", "");

    return (
        <Link to={`hotel-specific/${id}`} className="cards">
            <img src={image} alt="display of the accommodation" />
            <h4>{title}</h4>
            <p>{address}</p>
            <p><span>{price}</span> NOK: Per Night</p>
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