import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useAddPersonMutation } from '../redux/personApi';


export default function AddPersonPage() {

    const [newPerson, setNewPerson] = useState('');

    const [addPerson, { isError }] = useAddPersonMutation();

    const handleAddPerson = async () => {
        if (newPerson) {
            await addPerson({ firstName: newPerson }).unwrap();
            setNewPerson('');

        }
    }

    return (
        <>
            <div>AddPersonPage</div>
            <input type="text" value={newPerson} onChange={(e) => setNewPerson(e.target.value)}></input>
            <button onClick={handleAddPerson}></button>
            <Link to="/">Home</Link>
        </>

    )
}
