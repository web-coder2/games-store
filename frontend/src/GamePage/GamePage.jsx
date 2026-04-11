import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { setDataList, getDataList, setUser } from '../reduxSetup.js'
import { Provider, useSelector, useDispatch } from 'react-redux'

import FormComment from '../FormComment/FormComment.jsx' 

function GamePage() {

    const { gameId } = useParams()

    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()


    const [gameObject, setGameObject] = useState({})
    const [userObject, setUserObject] = useState({})
    const [isCanAdd, setIsCanAdd] = useState(true)

    const countStars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    async function getGameById() {
        try {
            const response = await getDataList('games/getById', {
                gameId: gameId
            })

            const gameObject = response.data.game

            setGameObject({...gameObject})
        } catch (e) {
            console.log(e.message)
        }
    }

    async  function addGameToBuy() {
        try {

            const response = await setDataList('users/addNewGame', {
                newGameObject: gameObject,
                userObject: userObject
            })

            console.log(response)

            userObject.gamesList.push({
                gamePrice: gameObject.price,
                gameTitle: gameObject.title,
                gameRank: gameObject.rank
            })

            let newUserObject = userObject

            setUserObject(newUserObject)
            dispatch(setUser(newUserObject))

            setIsCanAdd(false)

        } catch (e) {
            console.log(e.message)
        }
    }

    async function setRaitingStar( countStar ) {    
        try {
            const response = await setDataList('games/setGameRaiting', {
                gameObject: gameObject,
                countStars: countStar,
                userObject: userObject
            })

            await getGameById()
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        getGameById()
        setUserObject(user)
    }, [])

    // нужно отлдельным юзэфектом вынести помоу что этот код должен рсботать тогда когда изменится юзеробджект из дефолтного {}
    useEffect(() => {
        if (userObject.gamesList && Array.isArray(userObject.gamesList)) {
            const gameExists = userObject.gamesList.some(game => game.gameTitle === gameObject.title)
            setIsCanAdd(!gameExists)
        }
    }, [userObject, gameObject])

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
                        <i className="fas fa-star text-warning ml-auto">{ Math.round(gameObject.rating) }</i>
                    </div>
                </div>
                <div className="mt-3">
                    <strong>Жанр:</strong> {gameObject.rank} <br></br>
                    <strong>Критиков оценило { gameObject.countRating } раз</strong>
                </div>
                <div className='mt-5'>
                    <h3>Добавить игру в корзину</h3>
                    <button disabled={ !isCanAdd } onClick={() => { addGameToBuy() }} className='btn btn-outline-warning'>Добавить</button>
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
            <div>
                <FormComment gameTitle={gameObject.title} userObject={userObject} game={gameObject._id} />
            </div>
        </div>
    )

}

export default GamePage