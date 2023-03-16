import React from 'react'
import { Link } from "react-router-dom";


export default function NotFoundPage() {
    return (
        <div>
            <h2>404 Not found page!</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    )
}
