import React from 'react'
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div>
            <div>HomePage</div>
            <nav>
                <ul>
                    <li>
                        <Link to="/add-person">add-person</Link>
                    </li>
                    <li>
                        <Link to="/add-auto">add-auto</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
