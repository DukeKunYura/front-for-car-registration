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
