import React from 'react';
import { useRemovalCarMutation } from '../redux/personApi';

export default function CarInfoString(props) {

    const { passportNumber, number, brand, model, color } = props;

    const [removalCar, { isErrorRemoval }] = useRemovalCarMutation();

    const handleDeleteCar = async (passport, number) => {
        await removalCar({ passport, number }).unwrap();
    }

    return (
        <tr>
            <td>
                <div class="columns">
                    <div class="column is-four-fifths">
                        <div class="columns">
                            <div class="column">
                                <h4 class="subtitle is-5">{number}</h4>
                            </div>
                            <div class="column">
                                <h4 class="subtitle is-5">{brand}</h4>
                            </div>
                            <div class="column">
                                <h4 class="subtitle is-5">{model}</h4>
                            </div>
                            <div class="column">
                                <h4 class="subtitle is-5">{color}</h4>
                            </div>
                        </div>

                    </div>
                    <div class="column">
                        <a href="#" class="item"
                            onClick={() => { handleDeleteCar(passportNumber, number) }}>Delete car</a>
                    </div>
                    <div className="block">
                    </div>

                </div>

            </td>
        </tr>
    )
}
