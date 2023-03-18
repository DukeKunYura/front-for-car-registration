import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAddPersonMutation } from '../redux/personApi';


export default function AddPersonPage() {

    const [newPerson, setNewPerson] = useState('');
    const [newPassport, setNewPassport] = useState('');

    const [addPerson, { isError }] = useAddPersonMutation();

    const navigate = useNavigate();

    const handleAddPerson = async () => {
        if (newPerson) {
            await addPerson({ firstName: newPerson, passportNumber: newPassport }).unwrap();
            setNewPerson('');
            setNewPassport('');
            navigate("/");

        }
    }

    return (
        <>
            <div>AddPersonPage</div>
            <input type="text" value={newPerson} onChange={(e) => setNewPerson(e.target.value)}></input>
            <input type="text" value={newPassport} onChange={(e) => setNewPassport(e.target.value)}></input>
            <button onClick={handleAddPerson}>add</button>
            <Link to="/">Home</Link>
        </>

    )
}
