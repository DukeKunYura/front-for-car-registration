import React from 'react'

/**
 * Компонент рендерит индикатор загрузки
 */
export default function Loader() {
    return (
        <div className="block">
            <div className="box">
                <progress className="progress is-small is-primary" max="100">15%</progress>
            </div>
        </div>
    )
}
