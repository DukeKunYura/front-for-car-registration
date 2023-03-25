import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useUpdatePersonMutation } from '../redux/personApi';

/**
 * Компонент отвечает за редактирование информации о персоне
 */
export default function PersonEditor(props) {

    const { passport,
        setIsEditingPerson,
        firstName,
        surname,
        patronymic,
        passportNumber } = props;

    const [updatePerson, { isError }] = useUpdatePersonMutation();

    const navigate = useNavigate();

    const editPerson = async (passport, values) => {
        let response = await fetch(`http://localhost:8080/person?passport=${values.passportNumber}`);
        if (response.ok) {
            if (passport === values.passportNumber) {
                await updatePerson({ passport, ...values }).unwrap();
                setIsEditingPerson(false);
            } else {
                alert("Passport number is already exists")
            }
        } else {
            await updatePerson({ passport, ...values }).unwrap();
            setIsEditingPerson(false);
            navigate("/");
        }
    }

    const handleEditPerson = (values) => {
        editPerson(passport, values);
    }

    const formValidationSchema = Yup.object().shape({
        passportNumber: Yup.string().required().max(10),
        firstName: Yup.string().required(),
        surname: Yup.string().required(),
        patronymic: Yup.string().required(),
    });

    return (
        <Formik
            validationSchema={formValidationSchema}
            initialValues={{
                passportNumber: passportNumber,
                firstName: firstName,
                surname: surname,
                patronymic: patronymic
            }}
            onSubmit={(values, { setSubmitting }) => { handleEditPerson(values); setSubmitting(false); }}>
            {(props) => (

                <form className="box" onSubmit={props.handleSubmit}>
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
                    <br />
                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-info" type="submit" disabled={props.isSubmitting}>Submit</button>
                        </div>
                        <div className="control">
                            <button
                                className="button is-link is-light"
                                type='button'
                                onClick={() => { setIsEditingPerson(false) }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )
}
