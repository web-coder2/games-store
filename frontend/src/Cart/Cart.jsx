import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { setDataList, getDataList, setUser, updateUserObjectAfterAction } from '../reduxSetup.js'
import { Provider, useSelector, useDispatch } from 'react-redux'


function BuyGames() {

    const user = useSelector((state) => state.user)

    const [userObject, setUserObject] = useState({})
    const [gamesList, setGamesList] = useState([])

    
    async function removeGameFromUser(game) {
        try {

            const response = await setDataList('users/removeGame', {
                userObject: userObject,
                gameObject: game
            })

            await updateUserObjectAfterAction(userObject)

            // КОНЧЕНАЯ БЛЯДСКАЯ РЕАКТИВНОСТЬ В РЕАКТЕ НАЗУЯ ТАКОЕ ЗУЙНЮ СДЕЛАЛИ КОГДА ЕТСЬ VUE.JS
            let updatedUserData = JSON.parse(localStorage.getItem('user'))

            setUserObject(updatedUserData)
            setGamesList([...updatedUserData.gamesList])


        } catch (e) {
            console.log(e.message)
        }
    }


    useEffect(() => {
        setUserObject(user)
        let allGames = [...user.gamesList]
        setGamesList(allGames)
    }, [])

    let gamesShow

    if (gamesList.length === 0) {
        gamesShow = <h3>Игр пока нет</h3>
    } else {
        gamesShow = gamesList.map((game, index) => {
            return (
                <div key={ game._id || index } className='card bg-dark text-light mb-3 ml-3 col-sm-3'>
                    <div className='card-header'>
                        <h3>{ game.gameTitle }</h3>
                    </div>
                    <div className='card-body'>
                        <p>Жанр игры: { game.gameRank }</p>
                        <p>Цена игры: { game.gamePrice } $</p>
                    </div>
                    <div className='card-footer'>
                        <button onClick={() => { removeGameFromUser(game) }} className='btn btn-danger'>Убрать игру</button>
                    </div>
                </div>
            )
        })
    }


    return (
        <div className='container mt-5'>
            <h3 className='text-center'>Это корзна купленых игр</h3>
            {/* <p className='text-center'>на момент раработки она пуста</p>
            <p className='text-center'>потом сдесь будет список купленыз игр</p> */}

            <div className='row mt-5'>
                { gamesShow }
            </div>


        </div>
    )

}

export default BuyGames