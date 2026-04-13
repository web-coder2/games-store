import { useState, useEffect } from 'react'
import { getDataList } from '../reduxSetup.js'

import axios from 'axios'
import dayjs from 'dayjs'

import GameCard from '../GameCard/GameCard.jsx'

function GamesList() {

    const [allGames, setAllGames] = useState([])

    async function getGamesList() {
        try {
            const response = await getDataList('games/getAll', {})
            const gamesArray = response.data.games

            setAllGames([...gamesArray])
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
                        <div className="col mt-3" key={index}>
                            <GameCard gameObject={game} afterDeleteGame={ getGamesList } />
                        </div>
                    ))
                }
            </div>
        </div>

    )

}

export default GamesList