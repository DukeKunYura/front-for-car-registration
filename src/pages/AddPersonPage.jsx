import { Link } from "react-router-dom";
import React, { useEffect } from 'react'

export default function AddPersonPage() {
    useEffect(() => {
        async function addData() {
            const response = fetch("http://localhost:8080/person", {
                method: 'post',
                body: JSON.stringify({ name: 'ooo', surname: '12345' }),
                headers: {
                    'content-type': 'application/json'
                }
            })
            console.log(response);
        }

        addData()
    }, [])

    return (
        <>
            <div>AddPersonPage</div>
            <Link to="/">Home</Link>
        </>

    )
}
