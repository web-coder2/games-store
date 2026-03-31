import { useState, useEffect } from 'react'

import axios from 'axios'
import dayjs from 'dayjs'

import GameCard from '../GameCard/GameCard.jsx'
import './GamesList.css'

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

        <div className='games-container'>
            <h3 className='games-title'>Все игры на Games-market</h3>

            <div className='games-cards'>
                {
                    allGames.map((game, index) => {
                        return (
                            <div className='games-card'>
                                <GameCard key={ index } gameObject={ game } />
                            </div>
                        )
                    })
                }
            </div>

        </div>

    )

}

export default GamesList