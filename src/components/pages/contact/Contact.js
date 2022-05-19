import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../pages/login/FormError";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import axios from "axios";
import { BASE_URL } from "../../../constants/api";
import CreateToken from "./CreateToken";

const schema = yup.object().shape({
    name: yup.string().required("Please enter your full name").min(4, "Minimum 4 characters"),
    short_description: yup.string().email("Enter a valid email").required("Please enter your email"),
    description: yup.string().required("Enter a message").min(4, "Minimum 4 characters"),
    sku: yup.string().required("Please enter a subject"),
});

function Contact() {

    useEffect(() => {
        document.title = "Holidaze | Contact";
    }, []);


    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState(null);
    const [created, setCreated] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const url = BASE_URL + "wc/v3/products";
    const token = CreateToken();
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };

    async function onSubmit(data) {

        setSubmitting(true);
        setServerError(null);

        data.categories = [{}];

        data.categories[0].name = "message";
        data.categories[0].slug = "message";
        data.categories[0].id = 20;

        try {
            await axios.post(url, data, { headers });
            setCreated(true);
        }
        catch (error) {
            setServerError("There has ben an error: " + error);
        }
        finally {
            setSubmitting(false);
        }
    }

    if (created) {
        return (
            <main className="form-main">
                <div className="form-background"></div>
                <form>
                    <div className="update-complete">
                        <FontAwesomeIcon icon={faCircleCheck} className="update-icon" />
                        <h2 className="update-heading">Success!</h2>
                        <Link to="/" className="update-link">Back</Link>
                    </div>
                </form>
            </main>
        )
    }

    return (
        <main className="form-main">
            <div className="form-background"></div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Contact Us</h2>
                <fieldset disabled={submitting}>
                    <label>
                        Full Name
                        <input {...register("name")} name="name" placeholder="Full Name.." />
                        {errors.name && <FormError>{errors.name.message}</FormError>}
                    </label>

                    <label>
                        Email
                        <input {...register("short_description")} name="short_description" placeholder="Email.." />
                        {errors.short_description && <FormError>{errors.short_description.message}</FormError>}
                    </label>

                    <label>
                        Subject
                        <input {...register("sku")} name="sku" placeholder="Subject of topic.." />
                        {errors.sku && <FormError>{errors.sku.message}</FormError>}
                    </label>

                    <label>
                        Description
                        <textarea {...register("description")} name="description" placeholder="Your Message.." />
                        {errors.description && <FormError>{errors.description.message}</FormError>}
                    </label>

                    <button className="button button-green">{submitting ? "Sending.." : "Send"}</button>
                    {serverError && <div className="invalid-error">{serverError}</div>}
                </fieldset>
            </form>
        </main>
    );
};

export default Contact;