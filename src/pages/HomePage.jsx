import React from 'react';
import { useGetPersonsQuery, useDeletePersonMutation } from '../redux/personApi';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function HomePage() {

    const { data = [], isLoading } = useGetPersonsQuery();
    const [deletePerson] = useDeletePersonMutation();

    const navigate = useNavigate();

    const handleDeletePerson = async (number) => {
        await deletePerson(number).unwrap();
    }

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
                    <li>
                        <Link to="/cars">Cars</Link>
                    </li>
                </ul>
            </nav>
            <div>
                {isLoading && <div>load</div>}
                {data && data.map(person => (
                    <div key={person.id}>
                        <div onClick={() => { navigate(`/person/:${person.passportNumber}`) }}>
                            {person.firstName}
                        </div>
                        <div onClick={() => { handleDeletePerson(person.passportNumber) }}>delete</div>
                    </div>

                ))}

            </div>
        </div>
    )
}
