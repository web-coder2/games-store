import { useState } from "react";


const cardGame = function(gameObject) {

    return (

        <div className="card">
            <div className="card-title">
                <h3>{ gameObject.title }</h3>
            </div>
            <div className="card-body">
                <p>{ gameObject.description }</p>
            </div>
            <div className="card-footer">
                <span>{ gameObject.dateCreated }</span>
            </div>
        </div>

    )

}

export default cardGame