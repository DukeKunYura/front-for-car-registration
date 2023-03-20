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
        <div className="container">
            <div className="block">

                <div>HomePage</div>
                <div>
                    {isLoading && <div>load</div>}
                    {data && data.map(person => (

                        <div className="box"
                            key={person.id}
                            onClick={() => { navigate(`/person/:${person.passportNumber}`) }}>
                            <div class="column is-narrow">
                                <h4 class="subtitle is-4">{person.surname + " " + person.firstName + " " + person.patronymic}</h4>
                                <h5 class="subtitle is-5">
                                    {"passport number: " + person.passportNumber}
                                </h5>
                                <div onClick={() => { handleDeletePerson(person.passportNumber) }}>delete</div>
                            </div>

                        </div>

                    ))}

                </div>


            </div>
        </div>


    )
}
