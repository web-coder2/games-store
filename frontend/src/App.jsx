import { useState, useEffect } from 'react'
import './App.css'

import axios from 'axios'
import dayjs from 'dayjs'


// туту будет импорт компонентов
import Navbar from './Navbar/Navbar'
import GameCard from './GameCard/GameCard'

function App() {

  const [title, setTitle] = useState('Games Store (игровой маркет)')
  const [gamesList, setGamesList] = useState([])

  let apiRoute = 'http://localhost:8000/api/'


  async function getGamesList() {

    try {
      
      const response = await axios.get(`${apiRoute}games/getAll`)
      const gamesList = response.data.games
      setGamesList(gamesList)

    } catch (e) {
      console.log(e.message)
    }

  }

  useEffect(() => {
    getGamesList()
  }, [])


  return (
  
    <>

      <Navbar />

      <div className='main-container'>
        <h3>Welcome { title }</h3>
      </div>

      <p>{ gamesList }</p>

    </>

  )

}

export default App
