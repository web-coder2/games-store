import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import axios from 'axios'
import dayjs from 'dayjs'

function GamePage() {

    const { gameId } = useParams()

    const [gameObject, setGameObject] = useState({})
    const countStars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    let apiRoute = 'http://localhost:8000/api/'

    async function getGameById() {
        try {
            const response = await axios.get(`${apiRoute}games/getById`, {
                params: {
                    gameId: gameId
                }
            })
            const gameObject = response.data.game

            setGameObject({...gameObject})
        } catch (e) {
            console.log(e.message)
        }
    }

    async function setRaitingStar( countStar ) {
        console.log(countStar)
        // TODO: туду ебать патом сделать роут и метод для засета рейтинга по коунтЮзерСетСтарс и суме всех звезд
        // TODO: и крч патом создать функцию с апи запрососм на бьэк по этой хуйне
        
        try {
            const response = await axios.post(`${apiRoute}games/setGameRaiting`, {
                gameId: gameId,
                countStars: countStar     
            })

            await getGameById()
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        getGameById()
    }, [])

    return (

        <div className="container mt-4">
            <div className="p-4 bg-dark text-white rounded shadow-sm">
                <h2 className="mb-3">{gameObject.title} Общий рейтинг: <span className='text-success'>{ gameObject.totalCountStars }</span> <i className="fas fa-star text-warning ml-auto"></i></h2>
                    <h5 className="mb-3 text-muted">Компания: {gameObject.company}</h5>
                    <p className="mb-3">{gameObject.description}</p>
                    <div className="row">
                        <div className="col-md-4 mb-2">
                            <strong>Цена:</strong> {gameObject.price}$
                        </div>
                    <div className="col-md-4 mb-2">
                        <strong>Дата создания:</strong> {gameObject.dateCreated}
                    </div>
                    <div className="col-md-4 mb-2">
                        <i className="fas fa-star text-warning ml-auto">{ gameObject.rating }</i>
                    </div>
                </div>
                <div className="mt-3">
                    <strong>Жанр:</strong> {gameObject.rank} <br></br>
                    <strong>Критиков оценило { gameObject.countRating } раз</strong>
                </div>
                <div className='mt-5'>
                    <h3>Добавить игру в корзину</h3>
                    <button className='btn btn-outline-warning'>Добавить</button>
                    {/* TOOD: потом добавить роут с получением и доабвлением в маисв юзера его игр */}
                </div>
                <div className='mt-5'>
                    <h4>Оценить игру metaCritic</h4>

                    {
                        countStars.map((starValue, index) => {
                            return (
                                <button key = { index } className='btn btn-danger ml-3 mb-3' onClick={() => { setRaitingStar(starValue) }}>
                                    <i className="fas fa-star text-warning ml-auto"></i>
                                    <span>{ starValue }</span>
                                    {/* TODO: в роуте при изменение эттго сделать чтоыб ыбал вызвана функция дял занесеня в истори user countStars gameId */}
                                </button>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )

}

export default GamePage