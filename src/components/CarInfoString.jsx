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
                <div className="columns">
                    <div className="column is-four-fifths">
                        <div className="columns">
                            <div className="column">
                                <h4 className="subtitle is-5">{number}</h4>
                            </div>
                            <div className="column">
                                <h4 className="subtitle is-5">{brand}</h4>
                            </div>
                            <div className="column">
                                <h4 className="subtitle is-5">{model}</h4>
                            </div>
                            <div className="column">
                                <h4 className="subtitle is-5">{color}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <a href="#" className="item"
                            onClick={() => { handleDeleteCar(passportNumber, number) }}>Delete car</a>
                    </div>
                    <div className="block">
                    </div>
                </div>
            </td>
        </tr>
    )
}
