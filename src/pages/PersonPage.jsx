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
            {data && data.id}
        </>

    )
}
