import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function EnquiryItem({ id, title, address }) {

    address = address.replace("<p>", "").replace("</p>", "");

    return (
        <Link to={`../enquiry-specific/${id}`} className="plate manage-plate">
            <div className="plate-info manage-info">
                <h4>{title}</h4>
                <p>{address}</p>
            </div>
        </Link>
    );
};

EnquiryItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
};

export default EnquiryItem;