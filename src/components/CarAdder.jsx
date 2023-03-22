import React from 'react';
import { setIsActiveCarAdder } from '../redux/masterSlice';
import { useRegistrationCarMutation } from '../redux/personApi';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function CarAdder(props) {

    const { passport } = props;

    const [registrationCar, { isErrorRegistration }] = useRegistrationCarMutation();

    const dispatch = useDispatch();

    const addCar = async (passport, values) => {
        await registrationCar({ passport, ...values }).unwrap();
        console.log({ passport, ...values })

    }

    const handleAdder = (values) => {
        addCar(passport, values);
        dispatch(setIsActiveCarAdder(false));
    }

    const formValidationSchema = Yup.object().shape({
        number: Yup.string().required().max(9),
        brand: Yup.string().required(),
        model: Yup.string().required(),
        color: Yup.string().required(),
    });


    return (
        <div>
            <Formik
                validationSchema={formValidationSchema}
                initialValues={{ number: "", brand: "", model: "", color: "" }}
                onSubmit={(values, { setSubmitting }) => { handleAdder(values); setSubmitting(false); }}>
                {(props) => (
                    <form class="box" onSubmit={props.handleSubmit}>
                        <div class="field">
                            <label class="label">Number</label>
                            <div class="control">
                                <input
                                    class={props.errors.number && props.touched.number ? "input is-danger" : "input"}
                                    placeholder='Input number'
                                    type="text"
                                    name="number"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.number}
                                />
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Brand</label>
                            <div class="control">
                                <input
                                    class={props.errors.brand && props.touched.brand ? "input is-danger" : "input"}
                                    placeholder='Input brand'
                                    type="text"
                                    name="brand"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.brand}
                                />
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Model</label>
                            <div class="control">
                                <input
                                    class={props.errors.model && props.touched.model ? "input is-danger" : "input"}
                                    placeholder='Input model'
                                    type="text"
                                    name="model"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.model}
                                />
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Color</label>
                            <div class="control">
                                <input
                                    class={props.errors.color && props.touched.color ? "input is-danger" : "input"}
                                    placeholder='Input color'
                                    type="text"
                                    name="color"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.color}
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
                                    onClick={() => { dispatch(setIsActiveCarAdder(false)) }}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}
