import React from 'react';
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';

/**
 * Компонент рендерит хедер с панелью навигации
 */
export default function Header() {

    const state = useSelector((state) => state.master);

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
                    <li className={state.activeLink === "home" ? "is-active" : ""}>
                        <NavLink to="/">Persons</NavLink></li>
                    <li className={state.activeLink === "add" ? "is-active" : ""}>
                        <NavLink to="/add-person">Add person</NavLink></li>
                    <li className={state.activeLink === "cars" ? "is-active" : ""}>
                        <NavLink to="/cars">Cars</NavLink></li>
                </ul>
            </nav>
        </>

    )
}
