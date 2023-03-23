import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActiveLink } from '../redux/masterSlice';

export default function CarCard(props) {

    const { person, number, brand, model, color } = props;

    useEffect(() => {
        dispatch(setActiveLink("cars"))
    }, [])

    const dispatch = useDispatch();

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
                            onClick={() => {
                                navigate(`/person/:${person ? person.passportNumber : ""}`);
                                dispatch(setActiveLink("home"));
                            }}>
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
