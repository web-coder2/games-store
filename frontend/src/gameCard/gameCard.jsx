import { useState } from "react"
import { useNavigate } from 'react-router-dom'


const cardGame = function({ gameObject }) {

    const navigate = useNavigate()

    function redirectToPage(gameId) {
        navigate(`/game/${gameId}`)
    }

    return (

        <div className="card mb-3 bg-dark text-light h-100">
            <div className="card-header text-center d-flex align-items-center">
                <h3 className="card-title mb-0">{gameObject.title}</h3>
                <i className="fas fa-star text-warning ml-auto">{ gameObject.rating }</i>
            </div>
            <div className="card-body">
                <p className="card-text">{gameObject.description}</p>
                <button className="btn btn-success w-100"onClick={() => redirectToPage(gameObject._id)}>read more</button>
            </div>
            <div className="card-footer d-flex justify-content-between align-items-center">
                <small className="text-muted">{gameObject.dateCreated}</small>
                <strong>Цена: {gameObject.price}</strong>
            </div>
        </div>

    )

}

export default cardGame