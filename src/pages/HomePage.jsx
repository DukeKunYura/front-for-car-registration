import React, { useEffect, useState } from 'react';
import { useGetPersonsQuery } from '../redux/personApi';
import { useDispatch } from 'react-redux';
import { setActiveLink } from '../redux/masterSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import PersonCard from '../components/PersonCard';

export default function HomePage() {

    const { data = [], isLoading, isSuccess } = useGetPersonsQuery();

    const [persons = [], setPersons] = useState();
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
    }, [fullNameInput])

    useEffect(() => {
        setPersons(data);
    }, [isSuccess])

    useEffect(() => {
        dispatch(setActiveLink("home"))
    }, [])

    return (
        <div className="container">
            <div className="block">
                <div className="columns">
                    <div className="column is-three-quarters">
                        <input
                            className="input is-info"
                            type="text"
                            placeholder="Search"
                            value={fullNameInput}
                            onChange={(e) => { setFullNameInput(e.target.value) }}
                        />
                    </div>
                    <div className="column">
                        <div className="field has-addons">
                            <div className="control">
                                <input
                                    className="input is-info"
                                    type="text"
                                    placeholder="Find by passport"
                                    value={passportInput}
                                    onChange={(e) => { setPassportInput(e.target.value) }} />
                            </div>
                            <div className="control"
                                onClick={handleTransition}>
                                <a className="button is-info">
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
                            <h4 className="subtitle is-5">
                                The list is empty
                            </h4>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
