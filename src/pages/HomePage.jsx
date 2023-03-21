import React from 'react';
import { useGetPersonsQuery, useDeletePersonMutation } from '../redux/personApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

export default function HomePage() {

    const { data = [], isLoading } = useGetPersonsQuery();
    const [deletePerson] = useDeletePersonMutation();

    const state = useSelector((state) => state.master);

    const navigate = useNavigate();

    const handleDeletePerson = async (number) => {
        await deletePerson(number).unwrap();
    }

    return (
        <div className="container">
            <div className="block">
                <input class="input is-primary" type="text" placeholder="Search"></input>
                <br />
                <div>
                    <br />
                    {isLoading && <Loader />}
                    {data && data.map(person => (

                        <div className="box"
                            key={person.id}
                            onClick={() => { navigate(`/person/:${person.passportNumber}`) }}>
                            <div class="column is-narrow">
                                <h4 class="subtitle is-5">{person.surname + " " + person.firstName + " " + person.patronymic}</h4>
                                <p>
                                    {"passport number: " + person.passportNumber}
                                </p>
                                <div onClick={() => { handleDeletePerson(person.passportNumber) }}>delete</div>
                            </div>


                        </div>

                    ))}

                </div>


            </div>
        </div>


    )
}
