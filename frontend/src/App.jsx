import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import axios from 'axios'
import dayjs from 'dayjs'

import Navbar from './Navbar/Navbar'
import IndexPage from './IndexPage/IndexPage'
import CreateGame from './CreateGame/CreateGame'
import GamesList from './GamesList/GamesList'
import AboutGame from './AboutGame/AboutGame'
import Cart from './Cart/Cart'
import GamePage from './GamePage/GamePage'
import LoginForm from './LoginForm/LoginForm'

function App() {

  let apiRoute = 'http://localhost:8000/api/'

  return (
  
    <>
      <Router>
        <Navbar />
        <div className='main-container'>
          <Routes>
            <Route path="/" element={ <IndexPage /> } />
            <Route path="/create" element={ <CreateGame /> } />
            <Route path="/games" element={ <GamesList /> } />
            <Route path="/about" element={ <AboutGame /> } />
            <Route path="/cart" element={ <Cart /> } />
            <Route path="/game/:gameId" element={ <GamePage /> } />
            <Route path="/login" element={ <LoginForm /> } />
          </Routes>
        </div>
    </Router>
  </>

  )

}

export default App
