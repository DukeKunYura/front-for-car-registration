import React, { useState } from 'react';
import { NavLink } from "react-router-dom";


export default function Header() {
    const [activeLink, setActiveLink] = useState("home");

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
                    <li className={activeLink === "home" ? "is-active" : ""}
                        onClick={() => { setActiveLink("home") }}><NavLink to="/">Persons</NavLink></li>
                    <li className={activeLink === "add" ? "is-active" : ""}
                        onClick={() => { setActiveLink("add") }}><NavLink to="/add-person">Add person</NavLink></li>
                    <li className={activeLink === "cars" ? "is-active" : ""}
                        onClick={() => { setActiveLink("cars") }}><NavLink to="/cars">Cars</NavLink></li>
                </ul>
            </nav>
        </>

    )
}
