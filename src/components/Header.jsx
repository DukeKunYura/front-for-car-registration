import React from 'react';
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setActiveLink } from '../redux/masterSlice';


export default function Header() {

    const state = useSelector((state) => state.master);

    const dispatch = useDispatch();

    return (
        <>
            <section className="hero is-primary">
                <div className="hero-body">
                    <p className="title">
                        Personal cars
                    </p>
                    <p className="subtitle">
                        Сar ownership registration service
                    </p>
                </div>

            </section>
            <nav className="tabs is-medium">
                <ul>
                    <li className={state.activeLink === "home" ? "is-active" : ""}
                        onClick={() => { dispatch(setActiveLink("home")) }}><NavLink to="/">Persons</NavLink></li>
                    <li className={state.activeLink === "add" ? "is-active" : ""}
                        onClick={() => { dispatch(setActiveLink("add")) }}><NavLink to="/add-person">Add person</NavLink></li>
                    <li className={state.activeLink === "cars" ? "is-active" : ""}
                        onClick={() => { dispatch(setActiveLink("cars")) }}><NavLink to="/cars">Cars</NavLink></li>
                </ul>
            </nav>
        </>

    )
}
