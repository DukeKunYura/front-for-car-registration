import React, { useEffect, useState } from 'react'
import { useGetPersonsQuery } from '../redux/personApi';
import { Link } from "react-router-dom";

export default function HomePage() {

    const { data = [], isLoading } = useGetPersonsQuery();

    //const [persons, setPersons] = useState()

    // useEffect(() => {
    //     async function loadData() {
    //         const response = await fetch("http://localhost:8080/persons", {
    //             mode: "cors"
    //         });
    //         const data = await response.json();
    //         console.log(data);
    //         //setPersons(data);
    //     }

    //     loadData()
    // }, [])


    return (
        <div>
            <div>HomePage</div>
            <nav>
                <ul>
                    <li>
                        <Link to="/add-person">add-person</Link>
                    </li>
                    <li>
                        <Link to="/add-auto">add-auto</Link>
                    </li>
                </ul>
            </nav>
            <div>
                {isLoading && <div>load</div>}
                {data && data.map(person => (<div key={person.id}>{person.surname}</div>))}

            </div>
        </div>
    )
}
