import React from 'react';
import { useGetCarsQuery } from '../redux/personApi';

export default function CarsPage() {

    const { data = [], isLoading } = useGetCarsQuery();

    return (
        <>
            <div>CarsPage</div>
            {data && data.map(car => (<div key={car.id}>{car.brand}</div>))}
        </>

    )
}
