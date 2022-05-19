import { TOKEN_API } from "../../../constants/api";
import axios from "axios";
import { useState } from "react";

function CreateToken() {

    const [token, setToken] = useState(null);

    const headers = {
        "Content-Type": "application/json",
    };
    const data = {
        "username": "marius.turalyon@outlook.com",
        "password": "megaklump123"
    };

    async function getToken() {

        try {
            const response = await axios.post(TOKEN_API, data, headers);
            const token = response.data.data.token;
            setToken(token);
        }
        catch (error) {
            console.log(error);
        }
    }
    getToken();

    if (token) {
        return token;
    }
}

export default CreateToken;