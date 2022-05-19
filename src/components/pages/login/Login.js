import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { TOKEN_API } from "../../../constants/api";
import FormError from "./FormError";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../../context/AuthContext";

const schema = yup.object().shape({
    username: yup.string().required("Please enter your username").min(4, "Minimum 4 characters"),
    password: yup.string().required("Please enter your password").min(4, "Minimum 4 characters"),
});

function Login() {

    useEffect(() => {
        document.title = "Holidaze | Login";
    }, []);


    const [submitting, setSubmitting] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [auth, setAuth] = useContext(AuthContext)
    const navigate = useNavigate();

    async function onSubmit(data) {
        setSubmitting(true);
        setLoginError(null);

        try {
            const response = await axios.post(TOKEN_API, data);
            setAuth(response.data.data);
            navigate("/admin");
        }
        catch (error) {
            setLoginError("Invalid Login Credentials");
        }
        finally {
            setSubmitting(false);
        }
    }

    return (
        <main className="form-main">
            <div className="form-background"></div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Login</h2>
                <fieldset disabled={submitting}>
                    <label>
                        Username
                        <input {...register("username")} name="username" placeholder="Username.." />
                        {errors.username && <FormError>{errors.username.message}</FormError>}
                    </label>

                    <label>
                        Password
                        <input {...register("password")} type="password" name="password" placeholder="Password.." />
                        {errors.password && <FormError>{errors.password.message}</FormError>}
                    </label>

                    <button className="button">{submitting ? "Loggin in.." : "Login"}</button>
                    {loginError && <div className="invalid-error">{loginError}</div>}
                </fieldset>
            </form>
        </main>
    );
};

export default Login;