import { useState } from "react";


const cardGame = function({ gameObject }) {

    return (

        <div className="card mb-3 bg-dark text-light h-100">
            <div className="card-header text-center">
                <h3 className="card-title mb-0">{gameObject.title}</h3>
            </div>
            <div className="card-body">
                <p className="card-text">{gameObject.description}</p>
                <button className="btn btn-success w-100">read more</button>
            </div>
            <div className="card-footer d-flex justify-content-between align-items-center">
                <small className="text-muted">{gameObject.dateCreated}</small>
                <strong>Цена: {gameObject.price}</strong>
            </div>
        </div>

    )

}

export default cardGame