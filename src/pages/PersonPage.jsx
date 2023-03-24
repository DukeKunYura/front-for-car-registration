import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CarAdder from '../components/CarAdder';
import { useGetPersonQuery, useDeletePersonMutation } from '../redux/personApi';
import { useSelector, useDispatch } from 'react-redux';
import { setIsActiveCarAdder, setActiveLink } from '../redux/masterSlice';
import CarInfoString from '../components/CarInfoString';
import Loader from '../components/Loader';

export default function PersonPage() {

    const params = useParams();

    const state = useSelector((state) => state.master);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { data = [], isLoading, isSuccess } = useGetPersonQuery(params.passport.substring(1));

    const [deletePerson] = useDeletePersonMutation();

    const handleDeletePerson = async (number) => {
        await deletePerson(number).unwrap();
        navigate("/");
    }

    useEffect(() => {
        dispatch(setActiveLink("home"));
        dispatch(setIsActiveCarAdder(false));
    }, [])

    return (
        <>
            <article className="panel is-primary">
                <p className="panel-heading">
                    Person
                </p>
                {isLoading && <><Loader /></>}
                {!isLoading && !isSuccess &&
                    <div className="box">
                        <h4 className="subtitle is-5">
                            No such person
                        </h4>
                        <br />
                        <a href="#" className="item"
                            onClick={() => { navigate("/") }}>
                            Back
                        </a>
                    </div>
                }
                {isSuccess &&
                    <>
                        <div className="box">

                            <div className="field">
                                <label className="label">Surname</label>
                                <div className="control">
                                    <input className="input is-static" type="text"
                                        value={data.surname || " "} readOnly />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">First name</label>
                                <div className="control">
                                    <input className="input is-static" type="text"
                                        value={data.firstName || " "} readOnly />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Patronymic</label>
                                <div className="control">
                                    <input className="input is-static" type="text"
                                        value={data.patronymic || " "} readOnly />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Passport number</label>
                                <div className="control">
                                    <input className="input is-static" type="text"
                                        value={data.passportNumber || " "} readOnly />
                                </div>
                            </div>
                            <br />
                            <footer className="card-footer">
                                {!state.isActiveCarAdder &&
                                    <a href="#1" onClick={() => { dispatch(setIsActiveCarAdder(true)) }}
                                        className="card-footer-item">Add car</a>}
                                {state.isActiveCarAdder &&
                                    <a href="#" onClick={() => { dispatch(setIsActiveCarAdder(false)) }}
                                        className="card-footer-item">Cancel adding</a>}
                                <a href="#" className="card-footer-item">Edit person</a>
                                <a href="#" className="card-footer-item"
                                    onClick={() => { handleDeletePerson(data.passportNumber) }}>Delete person</a>
                            </footer>
                        </div>
                        {state.isActiveCarAdder && <CarAdder passport={data.passportNumber} />}
                        <table className="table is-fullwidth">
                            <tbody>
                                <tr>
                                    <td>
                                        <h4 className="subtitle is-5" id="1">Cars:</h4>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="columns">
                                            <div className="column is-four-fifths">
                                                <div className="columns">
                                                    <div className="column">
                                                        <h4 className="subtitle is-5">number</h4>
                                                    </div>
                                                    <div className="column">
                                                        <h4 className="subtitle is-5">brand</h4>
                                                    </div>
                                                    <div className="column">
                                                        <h4 className="subtitle is-5">model</h4>
                                                    </div>
                                                    <div className="column">
                                                        <h4 className="subtitle is-5">color</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="column">
                                                <a href="#" className="item"></a>
                                            </div>
                                            <div className="block">
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                {data.cars && data.cars.map(car => (
                                    <CarInfoString
                                        key={car.id}
                                        passportNumber={data.passportNumber}
                                        number={car.number}
                                        brand={car.brand}
                                        model={car.model}
                                        color={car.color} />
                                ))}
                            </tbody>
                        </table>
                    </>}
            </article>
        </>
    )
}
