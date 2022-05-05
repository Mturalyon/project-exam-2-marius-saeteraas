import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../pages/login/FormError";
import useAxios from "../../../hooks/useAxios";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const schema = yup.object().shape({
    name: yup.string().required("Please enter a name").min(4, "Minimum 4 characters"),
    short_description: yup.string().required("Please enter an address").min(4, "Minimum 4 characters"),
    regular_price: yup.string().required("Please enter a price per night"),
    description: yup.string().required("Please describe your accommodation").min(4, "Minimum 4 characters"),
    sku: yup.string().url("Please enter a valid url").required("Please enter image url"),
});

function CreateHotel() {
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState(null);
    const [created, setCreated] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const http = useAxios();

    async function onSubmit(data) {
        setSubmitting(true);
        setServerError(null);

        data.categories = [{}];

        data.categories[0].name = "hotel";
        data.categories[0].slug = "hotel";
        data.categories[0].id = 19;

        console.log(data);

        try {
            const response = await http.post("wc/v3/products", data);
            console.log(response.data);
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
                        <Link to="/manage" className="update-link">Back</Link>
                    </div>
                </form>
            </main>
        )
    }

    return (
        <main className="form-main">
            <div className="form-background"></div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Create</h2>
                <fieldset disabled={submitting}>
                    <label>
                        Name
                        <input {...register("name")} name="name" placeholder="Name of Accommodation.." />
                        {errors.name && <FormError>{errors.name.message}</FormError>}
                    </label>

                    <label>
                        Address
                        <input {...register("short_description")} name="short_description" placeholder="Address.." />
                        {errors.short_description && <FormError>{errors.short_description.message}</FormError>}
                    </label>

                    <label>
                        Price
                        <input {...register("regular_price")} type="text" name="regular_price" placeholder="Price per night (NOK).." />
                        {errors.regular_price && <FormError>{errors.regular_price.message}</FormError>}
                    </label>

                    <label>
                        Image
                        <input {...register("sku")} name="sku" placeholder="Image URL.." />
                        {errors.sku && <FormError>{errors.sku.message}</FormError>}
                    </label>

                    <label>
                        Description
                        <textarea {...register("description")} name="description" placeholder="Describe your accommodation.." />
                        {errors.description && <FormError>{errors.description.message}</FormError>}
                    </label>

                    <button className="button button-green">{submitting ? "Creating.." : "Create"}</button>
                    {serverError && <div className="invalid-error">{serverError}</div>}
                </fieldset>
            </form>
        </main>
    );
};

export default CreateHotel;