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
        let response = await fetch(`http://localhost:8080/person?passport=${values.passportNumber}`);
        if (response.ok) {
            alert("Passport number is already exists")
        } else {
            await addPerson(values).unwrap();
            navigate("/");
            dispatch(setActiveLink("home"));
        }
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
                    <form className="box" onSubmit={props.handleSubmit}>
                        <div className="field">
                            <label className="label">First name</label>
                            <div className="control">
                                <input
                                    className={props.errors.firstName && props.touched.firstName ? "input is-danger" : "input"}
                                    placeholder='Input first name'
                                    type="text"
                                    name="firstName"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.firstName}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Patronymic</label>
                            <div className="control">
                                <input
                                    className={props.errors.patronymic && props.touched.patronymic ? "input is-danger" : "input"}
                                    placeholder='Input patronymic'
                                    type="text"
                                    name="patronymic"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.patronymic}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Surname</label>
                            <div className="control">
                                <input
                                    className={props.errors.surname && props.touched.surname ? "input is-danger" : "input"}
                                    placeholder='Input surname'
                                    type="text"
                                    name="surname"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.surname}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Passport number</label>
                            <div className="control">
                                <input
                                    className={props.errors.passportNumber && props.touched.passportNumber ? "input is-danger" : "input"}
                                    placeholder='Input passport number'
                                    type="text"
                                    name="passportNumber"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.passportNumber}
                                />
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-info" type="submit" disabled={props.isSubmitting}>Submit</button>
                            </div>
                            <div className="control">
                                <button
                                    className="button is-link is-light"
                                    type="button"
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
