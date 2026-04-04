import { useState, useEffect } from 'react'

import axios from 'axios'
import dayjs from 'dayjs'

import GameCard from '../GameCard/GameCard.jsx'

function GamesList() {

    const [allGames, setAllGames] = useState([])

    let apiRoute = 'http://localhost:8000/api/'

    async function getGamesList() {
        console.log('Вызов getGamesList');
        try {
            const response = await axios.get(`${apiRoute}games/getAll`)
            const gamesArray = response.data.games

            setAllGames([...gamesArray])

            console.log(allGames)
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        getGamesList()
    }, [])

    return (

        <div className="container my-4">
            <h3 className="mb-4 text-center mb-5">Все игры на Games-market</h3>

            <div className="row row-cols-1 row-cols-md-3 g-4 mb-3">
                {
                    allGames.map((game, index) => (
                        <div className="col" key={index}>
                            <GameCard gameObject={game} />
                        </div>
                    ))
                }
            </div>
        </div>

    )

}

export default GamesList