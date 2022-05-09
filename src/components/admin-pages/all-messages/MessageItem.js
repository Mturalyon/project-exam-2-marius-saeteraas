import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function MessageItem({ id, title, address }) {

    address = address.replace("<p>", "").replace("</p>", "");

    return (
        <Link to={`../message-specific/${id}`} className="plate manage-plate">
            <div className="plate-info manage-info">
                <h4>{title}</h4>
                <p>{address}</p>
            </div>
        </Link>
    );
};

MessageItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
};

export default MessageItem;