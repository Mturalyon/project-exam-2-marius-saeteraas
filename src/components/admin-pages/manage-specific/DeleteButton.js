import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

export default function DeleteButton({ id }) {
    const [error, setError] = useState(null);
    const [alertDelete, setAlertdelete] = useState(false);
    const [cancelDelete, setCancelDelete] = useState(false);

    const http = useAxios();
    const navigate = useNavigate();

    const url = `wc/v3/products/${id}`;

    async function handleDelete() {
        try {
            await http.delete(url);
            navigate("/manage");
        }
        catch (error) {
            setError(error);
        }
    }
    //

    function cancelDeleteThis() {
        setCancelDelete(true);
        setAlertdelete(false);
    };

    function alertDeleteThis() {
        setCancelDelete(false);
        setAlertdelete(true);
    };


    if (cancelDelete) {
        return (
            <button className="button button-red delete-button" onClick={alertDeleteThis}>{error ? "Error" : "Delete"}</button>
        )
    };

    if (alertDelete) {
        return (
            <div className="cancel-container">
                <p>Are you sure?</p>
                <div className="cancel-button-container">
                    <button className="button button-green delete-button" onClick={handleDelete}>Yes</button>
                    <button className="button button-red delete-button" onClick={cancelDeleteThis}>Cancel</button>
                </div>
            </div>
        )
    };

    //

    return (
        <button className="button button-red delete-button" onClick={alertDeleteThis}>{error ? "Error" : "Delete"}</button>
    )
};