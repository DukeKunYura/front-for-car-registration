import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetPersonQuery, useRegistrationCarMutation, useRemovalCarMutation } from '../redux/personApi';

export default function PersonPage() {

    const params = useParams();

    const { data = [], isLoading } = useGetPersonQuery(params.passport.substring(1));

    const [registrationCar, { isErrorRegistration }] = useRegistrationCarMutation();
    const [removalCar, { isErrorRemoval }] = useRemovalCarMutation();

    const [newCarNumber, setNewCarNumber] = useState('');
    const [newCarBrand, setNewCarBrand] = useState('');

    const navigate = useNavigate();

    const handleAddCar = async (passport) => {
        if (newCarNumber && newCarBrand) {
            await registrationCar({ passport, "number": newCarNumber, "brand": newCarBrand }).unwrap();
            setNewCarNumber('');
            setNewCarBrand('');
        }
    }

    const handleDeleteCar = async (passport, number) => {
        await removalCar({ passport, number }).unwrap();
    }


    return (
        <>
            <article class="panel is-primary">
                <p class="panel-heading">
                    Person
                </p>
                <div className="box">

                    <h4 class="subtitle is-5">{data.surname + " " + data.firstName + " " + data.patronymic}</h4>
                    <p>
                        {data.passportNumber && "passport number: " + data.passportNumber}
                    </p>
                    <br />
                    <footer class="card-footer">
                        <a href="#" class="card-footer-item">Add car</a>
                        <a href="#" class="card-footer-item">Edit person</a>
                        <a href="#" class="card-footer-item">Delete person</a>
                    </footer>
                </div>
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
                        <tr>
                            <td>
                                <div class="columns">
                                    <div class="column is-four-fifths">
                                        <div class="columns">
                                            <div class="column">
                                                <h4 class="subtitle is-5">7687688</h4>
                                            </div>
                                            <div class="column">
                                                <h4 class="subtitle is-5">bmw</h4>
                                            </div>
                                            <div class="column">
                                                <h4 class="subtitle is-5">t7</h4>
                                            </div>
                                            <div class="column">
                                                <h4 class="subtitle is-5">red</h4>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="column">
                                        <a href="#" class="item">Delete car</a>
                                    </div>
                                    <div className="block">
                                    </div>

                                </div>

                            </td>
                        </tr>

                    </tbody>
                </table>

            </article>


            <div>PersonPage</div>
            <div onClick={() => { navigate("/") }}>return</div>
            {data &&
                <div>
                    <div>{data.id && data.id}</div>
                    <div>{data.passportNumber && data.passportNumber}</div>
                    <div>{data.firstName && data.firstName}</div>
                    <div>{data.surname && data.surname}</div>
                    <div>{data.patronymic && data.patronymic}</div>
                    <div>{data.cars && data.cars.map(car => (<div key={car.id} onClick={() => { handleDeleteCar(data.passportNumber, car.number) }}>{car.brand}</div>))}</div>
                </div>}
            <input type="text" value={newCarNumber} onChange={(e) => setNewCarNumber(e.target.value)}></input>
            <input type="text" value={newCarBrand} onChange={(e) => setNewCarBrand(e.target.value)}></input>
            <button onClick={() => { handleAddCar(data.passportNumber) }}>addCar</button>
        </>

    )
}
