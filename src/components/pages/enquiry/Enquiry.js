import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../pages/login/FormError";
import { BASE_URL } from "../../../constants/api";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import { ENQ_API } from "../../../constants/api";
import CreateToken from "../contact/CreateToken";
import axios from "axios";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
    full_name: yup.string().required("Please enter a name").min(4, "Minimum 4 characters"),
    email: yup.string().email("Please enter a valid email").required("Please enter an email address"),
    phone_number: yup.string().matches(phoneRegExp, "Phone number is not valid"),
    arrival_date: yup.date().required("Choose an arrival date").typeError("Choose your arrival date"),
    departure_date: yup.date().required("Choose your departure date").typeError("Choose your departure date"),
    number_of_guests: yup.number().typeError("Add number of guests").min(1, "Minimum 1 guest").max(8, "No more than 8 guests"),
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

    let history = useNavigate();

    let { id } = useParams();

    if (!id) {
        history("/hotel-all");
    }

    const url = BASE_URL + `wc/store/products/${id}`;

    useEffect(
        function () {
            async function getHotel() {
                try {
                    const response = await axios.get(url);
                    setHotel(response.data);
                    document.title = `Holidaze | ${response.data.name}`;
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


    const token = CreateToken();
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };

    async function onSubmit(data) {
        setUpdatingHotel(true);
        setUpdateError(null);
        setUpdated(false);

        const enquiry = {
            title: data.title,
            content: "",
            status: "publish",
            fields: {
                full_name: data.full_name,
                email: data.email,
                phone_number: data.phone_number,
                arrival_date: data.arrival_date,
                departure_date: data.departure_date,
                number_of_guests: data.number_of_guests,
                message: data.message
            }
        };

        try {
            await axios.post(ENQ_API, enquiry, { headers });
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
                    <div className="update-complete enquiry_update-complete">
                        <FontAwesomeIcon icon={faCircleCheck} className="update-icon" />
                        <h3 className="update-heading">Reservation of:</h3>
                        <p className="enquiry_hotel-name">{hotel.name}</p>
                        <h2>complete!</h2>
                        <p className="enquiry_assurance">We will be back with you shortly</p>
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
                            <input {...register("phone_number")} name="phone_number" placeholder="Phone Number.." />
                            {errors.phone_number && <FormError>{errors.phone_number.message}</FormError>}
                        </label>

                        <div className="date-container">
                            <label>
                                Arrival
                                <input {...register("arrival_date")} name="arrival_date" type="date" />
                                {errors.arrival_date && <FormError>{errors.arrival_date.message}</FormError>}
                            </label>

                            <label>
                                Departure
                                <input {...register("departure_date")} name="departure_date" type="date" />
                                {errors.departure_date && <FormError>{errors.departure_date.message}</FormError>}
                            </label>
                        </div>

                        <label>
                            How Many Guests?
                            <input {...register("number_of_guests")} name="number_of_guests" type="number" placeholder="0" />
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