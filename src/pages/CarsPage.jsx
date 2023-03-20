import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCarsQuery } from '../redux/personApi';

export default function CarsPage() {

    const { data = [], isLoading } = useGetCarsQuery();

    const navigate = useNavigate();

    return (
        <>
            <div>CarsPage</div>
            <div onClick={() => { navigate("/") }}>home</div>
            {data && data.map(car => (<div key={car.id}>{car.brand}</div>))}
        </>

    )
}
