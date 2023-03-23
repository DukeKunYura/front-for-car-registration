import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CarCard(props) {

    const { person, number, brand, model, color } = props;

    const navigate = useNavigate();

    return (
        <tr>
            <td>
                <div class="columns">
                    <div class="column is-four-fifths">
                        <div class="columns">
                            <div class="column">
                                <h4 class="subtitle is-5">{number ? number : "-"}</h4>
                            </div>
                            <div class="column">
                                <h4 class="subtitle is-5">{brand ? brand : " "}</h4>
                            </div>
                            <div class="column">
                                <h4 class="subtitle is-5">{model ? model : " "}</h4>
                            </div>
                            <div class="column">
                                <h4 class="subtitle is-5">{color ? color : " "}</h4>
                            </div>
                        </div>

                    </div>
                    <div class="column">
                        <a href="#" class="item"
                            onClick={() => { navigate(`/person/:${person ? person.passportNumber : ""}`) }}>
                            {person ? person.passportNumber : ""}
                        </a>
                    </div>
                    <div className="block">
                    </div>

                </div>

            </td>
        </tr>
    )
}
