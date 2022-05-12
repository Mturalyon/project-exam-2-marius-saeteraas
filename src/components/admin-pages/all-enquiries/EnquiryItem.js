import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function EnquiryItem({ id, title, arrival, departure }) {

    return (
        <Link to={`../enquiry-specific/${id}`} className="plate manage-plate">
            <div className="plate-info manage-info">
                <h4>{title}</h4>
                <p>{arrival} - {departure}</p>
            </div>
        </Link>
    );
};

EnquiryItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    arrival: PropTypes.string.isRequired,
    departure: PropTypes.string.isRequired,
};

export default EnquiryItem;