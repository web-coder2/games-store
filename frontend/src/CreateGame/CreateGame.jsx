import { useState } from 'react'
import './CreateGame.css'

import dayjs from 'dayjs'
import axios from 'axios'

let apiRoute = 'http://localhost:8000/api/'


function CreateGame() {

    let apiRoute = 'http://localhost:8000/api/'

    const [newGame, setNewGame] = useState({
        title: "",
        description: "",
        price: 0,
        company: "",
        rating: 5,
        rank: "",
        dateCreated: dayjs(new Date).format('YYYY-MM-DD')
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewGame({ ...newGame, [name]: value })
    }

    const createNewGame = async (e) => {
        e.preventDefault()

        try {

            const response = await axios.post(`${apiRoute}games/create`, {
                gameObject: newGame
            })

            setNewGame({
                title: "",
                description: "",
                price: 0,
                company: "",
                rating: 5,
                rank: "",
                dateCreated: dayjs(new Date).format('YYYY-MM-DD')
            })

        } catch (e) {
            console.log(e.message)
        }

    }

    return (
        <form className="create-game-form" onSubmit={ createNewGame }>

            <h3>Добавить новую игру</h3>

            <input className="form-input" type="text" placeholder="Название игры" name="title" value={newGame.title} onChange={handleChange} required />
            <textarea className="form-textarea" placeholder="Описание" name="description" value={newGame.description} onChange={handleChange} required />
            <input className="form-input" type="number" placeholder="Цена" name="price" value={newGame.price} onChange={handleChange} required />
            <input className="form-input" type="text" placeholder="Компания" name="company" value={newGame.company} onChange={handleChange} required />
            <input className="form-input" type="text" placeholder="Жанр" name="rank" value={newGame.rank} onChange={handleChange} />

            <button className="submit-btn" type="submit">Добавить в маркет</button>
        </form>
    )

}

export default CreateGame