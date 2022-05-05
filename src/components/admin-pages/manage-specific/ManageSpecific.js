import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../pages/login/FormError";
import useAxios from "../../../hooks/useAxios";

import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const schema = yup.object().shape({
    name: yup.string().required("Please enter a name").min(4, "Minimum 4 characters"),
    short_description: yup.string().required("Please enter an address").min(4, "Minimum 4 characters"),
    regular_price: yup.string().required("Please enter a price per night"),
    description: yup.string().required("Please describe your accommodation").min(4, "Minimum 4 characters"),
    sku: yup.string().url("Please enter a valid url").required("Please enter image url"),
});

function ManageSpecific() {
    const [hotel, setHotel] = useState(null);
    const [updated, setUpdated] = useState(false);
    const [fetchingHotel, setFetchingHotel] = useState(true);
    const [updatingHotel, setUpdatingHotel] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [updateError, setUpdateError] = useState(null);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const http = useAxios();

    let { id } = useParams();

    const url = `wc/v3/products/${id}`;

    useEffect(
        function () {
            async function getHotel() {
                try {
                    const response = await http.get(url);
                    setHotel(response.data);
                }
                catch (error) {
                    setFetchError("An error has occured");
                }
                finally {
                    setFetchingHotel(false);
                }
            }
            getHotel();
        },
        []
    );

    async function onSubmit(data) {
        setUpdatingHotel(true);
        setUpdateError(null);
        setUpdated(false);

        try {
            const response = await http.put(url, data);
            setUpdated(true);
            console.log(response);
        }
        catch (error) {
            setUpdateError("An error has occured");
        }
        finally {
            setUpdatingHotel(false);
        }
    }

    if (fetchingHotel) {
        return (
            <div className="loader-container flex-mid">
                <div className="loader"></div>
            </div>
        )
    }
    if (fetchError) {
        return (
            <div className="loader-container flex-mid">
                <p className="error">{fetchError}</p>
            </div>
        )
    }

    const description = hotel.description.replace("<p>", "").replace("</p>", "");
    const address = hotel.short_description.replace("<p>", "").replace("</p>", "");

    if (updated) {
        return (
            <main className="form-main">
                <div className="form-background"></div>
                <form>
                    <div className="update-complete">
                        <FontAwesomeIcon icon={faCircleCheck} className="update-icon" />
                        <h2 className="update-heading">Update Complete</h2>
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
                <h2>Manage</h2>
                <fieldset disabled={updatingHotel}>
                    <label>
                        Name
                        <input {...register("name")} name="name" placeholder="Name of Accommodation.." defaultValue={hotel.name} />
                        {errors.name && <FormError>{errors.name.message}</FormError>}
                    </label>

                    <label>
                        Address
                        <input {...register("short_description")} name="short_description" placeholder="Address.." defaultValue={address} />
                        {errors.short_description && <FormError>{errors.short_description.message}</FormError>}
                    </label>

                    <label>
                        Price
                        <input {...register("regular_price")} type="text" name="regular_price" placeholder="Price per night (NOK).." defaultValue={hotel.regular_price} />
                        {errors.regular_price && <FormError>{errors.regular_price.message}</FormError>}
                    </label>

                    <label>
                        Image
                        <input {...register("sku")} name="sku" placeholder="Image URL.." defaultValue={hotel.sku} />
                        {errors.sku && <FormError>{errors.sku.message}</FormError>}
                    </label>

                    <label>
                        Description
                        <textarea {...register("description")} name="description" placeholder="Describe your accommodation.." defaultValue={description} />
                        {errors.description && <FormError>{errors.description.message}</FormError>}
                    </label>

                    <button className="button button-green" disabled={updatingHotel}>{updatingHotel ? "Updating.." : "Update"}</button>
                    <hr className="form-hr" />
                    <DeleteButton id={hotel.id} />

                    {updateError && <div className="invalid-error">{updateError}</div>}
                </fieldset>
            </form>
        </main>
    )


};

export default ManageSpecific;