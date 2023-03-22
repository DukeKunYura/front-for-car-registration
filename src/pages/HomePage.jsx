import React from 'react';
import { useGetPersonsQuery } from '../redux/personApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import PersonCard from '../components/PersonCard';

export default function HomePage() {

    const { data = [], isLoading } = useGetPersonsQuery();

    const state = useSelector((state) => state.master);

    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="block">
                <div class="columns">
                    <div class="column is-three-quarters">
                        <input class="input is-info" type="text" placeholder="Search"></input>
                    </div>
                    <div class="column">
                        <div class="field has-addons">
                            <div class="control">
                                <input class="input is-info" type="text" placeholder="Find by passport" />
                            </div>
                            <div class="control">
                                <a class="button is-info">
                                    Search
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <br />
                    {isLoading && <Loader />}
                    {data && data.map(person => (
                        <div className="box"
                            key={person.id}
                            onClick={() => { navigate(`/person/:${person.passportNumber}`) }}>
                            <PersonCard person={person} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
