import React from 'react';
import CarCard from '../components/CarCard';
import Loader from '../components/Loader';
import { useGetCarsQuery } from '../redux/personApi';

export default function CarsPage() {

    const { data = [], isLoading } = useGetCarsQuery();

    return (
        <>
            <div class="column is-one-third">
                <input class="input is-info" type="text" placeholder="Input car number"></input>
            </div>
            {isLoading && <Loader />}
            <div className="box">
                <table class="table is-fullwidth">
                    <tbody>
                        <tr>
                            <td>
                                <h4 class="subtitle is-5" id="1">All cars:</h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="columns">
                                    <div class="column is-four-fifths">
                                        <div class="columns">
                                            <div class="column">
                                                <h4 class="subtitle is-5">number</h4>
                                            </div>
                                            <div class="column">
                                                <h4 class="subtitle is-5">brand</h4>
                                            </div>
                                            <div class="column">
                                                <h4 class="subtitle is-5">model</h4>
                                            </div>
                                            <div class="column">
                                                <h4 class="subtitle is-5">color</h4>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="column">
                                        <h4 class="subtitle is-5">owner</h4>
                                    </div>
                                    <div className="block">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        {data && data.map(car => (
                            <CarCard
                                key={car.id}
                                person={car.person}
                                number={car.number}
                                brand={car.brand}
                                model={car.model}
                                color={car.color} />
                        ))}
                        {data.length === 0 && !isLoading && <CarCard number={"The list is empty"} />}
                    </tbody>
                </table>

            </div>
        </>

    )
}
