import { useState, useEffect } from 'react'
import { Provider, useSelector } from 'react-redux'


function BuyGames() {

    const user = useSelector((state) => state.user)

    const [userObject, setUserObject] = useState({})
    const [gamesList, setGamesList] = useState([])



    useEffect(() => {
        setUserObject(user)

        let allGames = [...user.gamesList]

        setGamesList(allGames)

    }, [])

    let gamesShow

    if (gamesList.length === 0) {
        gamesShow = <h3>Игр пока нет</h3>
    } else {
        gamesShow = gamesList.map((game) => {
            return (
                <div className='card bg-dark text-light mb-3 ml-3 col-sm-3'>
                    <div className='card-header'>
                        <h3>{ game.gameTitle }</h3>
                    </div>
                    <div className='card-body'>
                        <p>Жанр игры: { game.gameRank }</p>
                        <p>Цена игры: { game.gamePrice } $</p>
                    </div>
                    <div className='card-footer'>
                        <button className='btn btn-danger'>Убрать игру</button>
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