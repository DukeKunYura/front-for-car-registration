import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActiveLink } from '../redux/masterSlice';
import { useAddPersonMutation } from '../redux/personApi';
import { Formik } from 'formik';
import * as Yup from 'yup';


export default function AddPersonPage() {

    const [addPerson, { isError }] = useAddPersonMutation();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleAddPerson = async (values) => {
        await addPerson(values).unwrap();
        navigate("/");
        dispatch(setActiveLink("home"));
    }

    useEffect(() => {
        dispatch(setActiveLink("add"))
    }, [])

    const formValidationSchema = Yup.object().shape({
        passportNumber: Yup.string().required().max(10),
        firstName: Yup.string().required(),
        surname: Yup.string().required(),
        patronymic: Yup.string().required(),
    });

    return (
        <>
            <Formik
                validationSchema={formValidationSchema}
                initialValues={{ passportNumber: "", firstName: "", surname: "", patronymic: "" }}
                onSubmit={(values, { setSubmitting }) => { handleAddPerson(values); setSubmitting(false); }}>
                {(props) => (
                    <form class="box" onSubmit={props.handleSubmit}>
                        <div class="field">
                            <label class="label">First name</label>
                            <div class="control">
                                <input
                                    class={props.errors.firstName && props.touched.firstName ? "input is-danger" : "input"}
                                    placeholder='Input first name'
                                    type="text"
                                    name="firstName"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.firstName}
                                />
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Patronymic</label>
                            <div class="control">
                                <input
                                    class={props.errors.patronymic && props.touched.patronymic ? "input is-danger" : "input"}
                                    placeholder='Input patronymic'
                                    type="text"
                                    name="patronymic"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.patronymic}
                                />
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Surname</label>
                            <div class="control">
                                <input
                                    class={props.errors.surname && props.touched.surname ? "input is-danger" : "input"}
                                    placeholder='Input surname'
                                    type="text"
                                    name="surname"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.surname}
                                />
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Passport number</label>
                            <div class="control">
                                <input
                                    class={props.errors.passportNumber && props.touched.passportNumber ? "input is-danger" : "input"}
                                    placeholder='Input passport number'
                                    type="text"
                                    name="passportNumber"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.passportNumber}
                                />
                            </div>
                        </div>
                        <div class="field is-grouped">
                            <div class="control">
                                <button class="button is-info" type="submit" disabled={props.isSubmitting}>Submit</button>
                            </div>
                            <div class="control">
                                <button
                                    class="button is-link is-light"
                                    onClick={() => { navigate("/"); dispatch(setActiveLink("home")) }}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </>

    )
}
