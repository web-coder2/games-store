import { useState } from "react";
import './GameCard.css'

const cardGame = function({ gameObject }) {

    return (

        <div className="card">
            <div className="card-title">
                <h3>{ gameObject.title }</h3>
            </div>
            <div className="card-body">
                <p>{ gameObject.description }</p>
            </div>
            <div className="card-footer">
                <span className="card-date">{ gameObject.dateCreated }</span>
                <strong className="card-price">Цена: { gameObject.price }</strong>
            </div>
        </div>

    )

}

export default cardGame