import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../pages/login/FormError";
import useAxios from "../../../hooks/useAxios";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const schema = yup.object().shape({
    full_name: yup.string().required("Please enter a name").min(4, "Minimum 4 characters"),
    email: yup.string().email("Please enter a valid email").required("Please enter an email address"),
    phone_number: yup.number().typeError("You must specify a number").required("Please provide with a phone number").min(6, "Too short number"),
    number_of_guests: yup.number(),
});

function Enquiry() {
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

    let history = useNavigate();

    let { id } = useParams();

    if (!id) {
        history("/hotel-all");
    }

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

        const enquiry = {
            title: data.title,
            content: "",
            fields: {
                full_name: data.full_name,
                email: data.email,
                phone_number: data.phone_number,
                number_of_guests: data.number_of_guests,
                message: data.message
            }
        }

        try {

            console.log(enquiry);
            setUpdated(true);
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

    if (updated) {
        return (
            <main className="form-main">
                <div className="form-background"></div>
                <form>
                    <div className="update-complete">
                        <FontAwesomeIcon icon={faCircleCheck} className="update-icon" />
                        <h2 className="update-heading">Reservation of: {hotel.name} complete!</h2>
                        <Link to="/hotel-all" className="update-link">Back</Link>
                    </div>
                </form>
            </main>
        )
    }

    if (hotel.categories[0].name === "hotel") {
        return (
            <main className="form-main">
                <div className="form-background"></div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Reservation</h2>
                    <fieldset disabled={updatingHotel}>
                        <label>
                            Accommodation
                            <input {...register("title")} name="title" defaultValue={hotel.name} readOnly="readonly" />
                        </label>

                        <label>
                            Full Name
                            <input {...register("full_name")} name="full_name" placeholder="Your full name.." />
                            {errors.full_name && <FormError>{errors.full_name.message}</FormError>}
                        </label>

                        <label>
                            Email
                            <input {...register("email")} name="email" placeholder="Email address.." />
                            {errors.email && <FormError>{errors.email.message}</FormError>}
                        </label>

                        <label>
                            Phone Number
                            <input {...register("phone_number")} name="phone_number" placeholder="Phone Number.." type="number" />
                            {errors.phone_number && <FormError>{errors.phone_number.message}</FormError>}
                        </label>

                        <label>
                            How Many Guests?
                            <input {...register("number_of_guests")} name="number_of_guests" type="number" placeholder="0" min={1} max={8} />
                            {errors.number_of_guests && <FormError>{errors.number_of_guests.message}</FormError>}
                        </label>

                        <label>
                            Message
                            <textarea {...register("message")} name="message" placeholder="Tell us something.." />
                        </label>

                        <button className="button button-green" disabled={updatingHotel}>{updatingHotel ? "Booking.." : "Book"}</button>

                        {updateError && <div className="invalid-error">{updateError}</div>}
                    </fieldset>
                </form>
            </main>
        )
    }
    else {
        history("/hotel-all");
    }




};

export default Enquiry;