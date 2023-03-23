import React, { useEffect, useState } from 'react';
import { useGetPersonsQuery } from '../redux/personApi';
import { useDispatch } from 'react-redux';
import { setActiveLink } from '../redux/masterSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import PersonCard from '../components/PersonCard';

export default function HomePage() {

    const { data = [], isLoading } = useGetPersonsQuery();

    const [persons = [], setPersons] = useState(data);
    const [fullNameInput, setFullNameInput] = useState("");
    const [passportInput, setPassportInput] = useState("");


    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleTransition = () => {
        if (passportInput !== "") {
            navigate(`/person/:${passportInput}`);
        }
    }

    useEffect(() => {
        if (fullNameInput !== "") {
            let newArr = data.filter(item =>
                item.firstName.toLowerCase().includes(fullNameInput.toLowerCase())
                || item.surname.toLowerCase().includes(fullNameInput.toLowerCase())
                || item.patronymic.toLowerCase().includes(fullNameInput.toLowerCase()))
            setPersons(newArr);
        } else { setPersons(data) }
    }, [data, fullNameInput])

    useEffect(() => {
        dispatch(setActiveLink("home"))
    }, [])

    return (
        <div className="container">
            <div className="block">
                <div class="columns">
                    <div class="column is-three-quarters">
                        <input
                            class="input is-info"
                            type="text"
                            placeholder="Search"
                            value={fullNameInput}
                            onChange={(e) => { setFullNameInput(e.target.value) }}
                        />
                    </div>
                    <div class="column">
                        <div class="field has-addons">
                            <div class="control">
                                <input
                                    class="input is-info"
                                    type="text"
                                    placeholder="Find by passport"
                                    value={passportInput}
                                    onChange={(e) => { setPassportInput(e.target.value) }} />
                            </div>
                            <div class="control"
                                onClick={handleTransition}>
                                <a class="button is-info">
                                    Find
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <br />
                    {isLoading && <Loader />}
                    {persons.map(person => (
                        <div className="box"
                            key={person.id}
                            onClick={() => { navigate(`/person/:${person.passportNumber}`) }}>
                            <PersonCard person={person} />
                        </div>
                    ))}
                    {persons.length === 0 && !isLoading &&
                        <div className="box">
                            <h4 class="subtitle is-5">
                                The list is empty
                            </h4>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
