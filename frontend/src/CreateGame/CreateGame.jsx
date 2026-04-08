import { useState } from 'react'
import { setDataList, getDataList } from '../reduxSetup.js'

import dayjs from 'dayjs'
import axios from 'axios'

let apiRoute = 'http://localhost:8000/api/'


function CreateGame() {

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

            const response = await setDataList('games/create', {
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
        <form className="needs-validation" noValidate onSubmit={createNewGame}>
  
            <h3 className="mb-4">Добавить новую игру</h3>

            <div className="form-group">
                <input className="form-control" type="text" placeholder="Название игры" name="title" value={newGame.title} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <textarea className="form-control" placeholder="Описание" name="description" value={newGame.description} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <input className="form-control" type="number" placeholder="Цена" name="price" value={newGame.price} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <input className="form-control" type="text" placeholder="Компания" name="company" value={newGame.company} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <input className="form-control" type="text" placeholder="Жанр" name="rank" value={newGame.rank} onChange={handleChange} />
            </div>

            <button className="btn btn-danger w-100" type="submit">Добавить в маркет</button>
        </form>
    )

}

export default CreateGame