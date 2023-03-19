import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetPersonQuery } from '../redux/personApi';

export default function PersonPage() {

    const params = useParams();

    const { data = [], isLoading } = useGetPersonQuery(params.passport.substring(1));

    const navigate = useNavigate();

    console.log(data)


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
                    <div>{data.cars && data.cars.map(car => (<div>{car.brand}</div>))}</div>
                </div>}
        </>

    )
}
