import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

export default function DeleteButton({ id }) {
    const [error, setError] = useState(null);

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

    return (
        <button className="button button-red delete-button" onClick={handleDelete}>{error ? "Error" : "Delete"}</button>
    )
}