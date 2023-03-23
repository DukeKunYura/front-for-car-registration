import React, { useEffect, useState } from 'react';
import CarCard from '../components/CarCard';
import Loader from '../components/Loader';
import { useGetCarsQuery } from '../redux/personApi';
import { useDispatch } from 'react-redux';
import { setActiveLink } from '../redux/masterSlice';

export default function CarsPage() {

    const { data = [], isLoading } = useGetCarsQuery();

    const [cars = [], setCars] = useState(data);
    const [inputNumber, setInputNumber] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        if (inputNumber !== "") {
            let newArr = data.filter(item =>
                item.number.toLowerCase().includes(inputNumber.toLowerCase()))
            setCars(newArr);
        } else { setCars(data) }
    }, [data, inputNumber])

    useEffect(() => {
        dispatch(setActiveLink("cars"))
    }, [])

    return (
        <>
            <div class="column is-one-third">
                <input class="input is-info" type="text"
                    placeholder="Input car number"
                    value={inputNumber}
                    onChange={e => { setInputNumber(e.target.value) }}></input>
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
                        {cars.map(car => (
                            <CarCard
                                key={car.id}
                                person={car.person}
                                number={car.number}
                                brand={car.brand}
                                model={car.model}
                                color={car.color} />
                        ))}
                        {cars.length === 0 && !isLoading && <CarCard number={"The list is empty"} />}
                    </tbody>
                </table>

            </div>
        </>

    )
}
