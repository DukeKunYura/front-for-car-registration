import React from 'react'

export default function PersonCard(props) {

    const { person } = props;

    return (
        <div>
            <h4 className="subtitle is-5">{person.surname + " " + person.firstName + " " + person.patronymic}</h4>
            <p>
                {"passport number: " + person.passportNumber}
            </p>
        </div>
    )
}
