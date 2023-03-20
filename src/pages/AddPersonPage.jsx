import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useAddPersonMutation } from '../redux/personApi';


export default function AddPersonPage() {

    const [newFirstName, setNewFirstName] = useState('');
    const [newPassport, setNewPassport] = useState('');
    const [newSurname, setNewSurname] = useState('');
    const [newPatronymic, setNewPatronymic] = useState('');

    const [addPerson, { isError }] = useAddPersonMutation();

    const handleAddPerson = async () => {
        if (newFirstName && newPassport) {
            await addPerson({
                firstName: newFirstName,
                surname: newSurname,
                patronymic: newPatronymic,
                passportNumber: newPassport
            }).unwrap();
            setNewFirstName('');
            setNewSurname('');
            setNewPatronymic('');
            setNewPassport('');
        }
    }

    return (
        <>
            <div>AddPersonPage</div>
            <label>Name</label>
            <input type="text" value={newFirstName} onChange={(e) => setNewFirstName(e.target.value)}></input>
            <label>Surname</label>
            <input type="text" value={newSurname} onChange={(e) => setNewSurname(e.target.value)}></input>
            <label>Patronymic</label>
            <input type="text" value={newPatronymic} onChange={(e) => setNewPatronymic(e.target.value)}></input>
            <label>Passport</label>
            <input type="text" value={newPassport} onChange={(e) => setNewPassport(e.target.value)}></input>
            <button className="button" onClick={handleAddPerson}>add</button>
            <Link to="/">Home</Link>
        </>

    )
}
