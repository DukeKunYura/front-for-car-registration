import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Компонент рендерит строку с информацией об авто и ссылкой на владельца
 */
export default function CarCard(props) {

    const { person, number, brand, model, color } = props;

    const navigate = useNavigate();

    return (
        <tr>
            <td>
                <div className="columns">
                    <div className="column is-four-fifths">
                        <div className="columns">
                            <div className="column">
                                <h4 className="subtitle is-5">{number ? number : "-"}</h4>
                            </div>
                            <div className="column">
                                <h4 className="subtitle is-5">{brand ? brand : " "}</h4>
                            </div>
                            <div className="column">
                                <h4 className="subtitle is-5">{model ? model : " "}</h4>
                            </div>
                            <div className="column">
                                <h4 className="subtitle is-5">{color ? color : " "}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <a href="#" className="item"
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
