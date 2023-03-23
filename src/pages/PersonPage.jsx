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
            <article class="panel is-primary">
                <p class="panel-heading">
                    Person
                </p>
                {isLoading && <><Loader /></>}
                {!isLoading && !isSuccess &&
                    <div className="box">
                        <h4 class="subtitle is-5">
                            No such person
                        </h4>
                        <br />
                        <a href="#" class="item"
                            onClick={() => { navigate("/") }}>
                            Back
                        </a>
                    </div>
                }
                {isSuccess &&
                    <>
                        <div className="box">

                            <div class="field">
                                <label class="label">Surname</label>
                                <div class="control">
                                    <input class="input is-static" type="text"
                                        value={data.surname || " "} readonly />
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">First name</label>
                                <div class="control">
                                    <input class="input is-static" type="text"
                                        value={data.firstName || " "} readonly />
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Patronymic</label>
                                <div class="control">
                                    <input class="input is-static" type="text"
                                        value={data.patronymic || " "} readonly />
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Passport number</label>
                                <div class="control">
                                    <input class="input is-static" type="text"
                                        value={data.passportNumber || " "} readonly />
                                </div>
                            </div>

                            <br />
                            <footer class="card-footer">
                                {!state.isActiveCarAdder &&
                                    <a href="#1" onClick={() => { dispatch(setIsActiveCarAdder(true)) }}
                                        class="card-footer-item">Add car</a>}
                                {state.isActiveCarAdder &&
                                    <a href="#" onClick={() => { dispatch(setIsActiveCarAdder(false)) }}
                                        class="card-footer-item">Cancel adding</a>}
                                <a href="#" class="card-footer-item">Edit person</a>
                                <a href="#" class="card-footer-item"
                                    onClick={() => { handleDeletePerson(data.passportNumber) }}>Delete person</a>
                            </footer>
                        </div>
                        {state.isActiveCarAdder && <CarAdder passport={data.passportNumber} />}
                        <table class="table is-fullwidth">
                            <tbody>
                                <tr>
                                    <td>
                                        <h4 class="subtitle is-5" id="1">Cars:</h4>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="columns">
                                            <div class="column is-four-fifths">
                                                <div class="columns">
                                                    <div class="column">
                                                        <h4 class="subtitle is-5">number</h4>
                                                    </div>
                                                    <div class="column">
                                                        <h4 class="subtitle is-5">brand</h4>
                                                    </div>
                                                    <div class="column">
                                                        <h4 class="subtitle is-5">model</h4>
                                                    </div>
                                                    <div class="column">
                                                        <h4 class="subtitle is-5">color</h4>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="column">
                                                <a href="#" class="item"></a>
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
