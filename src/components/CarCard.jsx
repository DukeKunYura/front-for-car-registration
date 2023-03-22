import React from 'react';

export default function CarCard(props) {

    const { person, number, brand, model, color } = props;

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
                            onClick={() => { }}>Delete car</a>
                    </div>
                    <div className="block">
                    </div>

                </div>

            </td>
        </tr>
    )
}
