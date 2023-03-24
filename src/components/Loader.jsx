import React from 'react'

export default function Loader() {
    return (
        <div className="block">
            <div className="box">
                <progress className="progress is-small is-primary" max="100">15%</progress>
            </div>
        </div>
    )
}
