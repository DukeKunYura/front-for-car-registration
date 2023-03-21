import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CarAdder from '../components/CarAdder';
import { useGetPersonQuery } from '../redux/personApi';
import { useSelector, useDispatch } from 'react-redux';
import { setIsActiveCarAdder } from '../redux/masterSlice';
import CarInfoString from '../components/CarInfoString';
import Loader from '../components/Loader';

export default function PersonPage() {

    const params = useParams();

    const state = useSelector((state) => state.master);

    const dispatch = useDispatch();

    const { data = [], isLoading, isSuccess } = useGetPersonQuery(params.passport.substring(1));

    const navigate = useNavigate();


    return (
        <>
            <article class="panel is-primary">
                <p class="panel-heading">
                    Person
                </p>
                <div className="box">
                    {isLoading && <><Loader /></>}
                    {isSuccess &&
                        <>
                            <h4 class="subtitle is-5">{data.surname + " " + data.firstName + " " + data.patronymic}</h4>
                            <p>
                                {"passport number: " + data.passportNumber}
                            </p>
                        </>
                    }
                    <br />
                    <footer class="card-footer">
                        <a href="#" onClick={() => { dispatch(setIsActiveCarAdder(true)) }} class="card-footer-item">Add car</a>
                        <a href="#" class="card-footer-item">Edit person</a>
                        <a href="#" class="card-footer-item">Delete person</a>
                    </footer>
                </div>
                {state.isActiveCarAdder && <CarAdder passport={data.passportNumber} />}
                <table class="table is-fullwidth">
                    <tbody>
                        <tr>
                            <td>
                                <h4 class="subtitle is-5">Cars:</h4>
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
            </article>
        </>

    )
}
