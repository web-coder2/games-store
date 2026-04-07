import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux'
import store from './reduxSetup.js'
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

function PrivateRoute({ children }) {
  const user = useSelector((state) => state.user)
  const location = useLocation()

  console.log(user, 'is Auth', user !== null)

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

function App() {

  const user = useSelector((state) => state.user)


  return (
  
    <>
      <Router>
        {  user !== null ? <Navbar /> : '' }
        <div className='main-container'>
          <Routes>
            <Route path="/" element={ <PrivateRoute>  <IndexPage />  </PrivateRoute> } />
            <Route path="/create" element={ <PrivateRoute>  <CreateGame />  </PrivateRoute> } />
            <Route path="/games" element={ <PrivateRoute>  <GamesList />  </PrivateRoute> } />
            <Route path="/about" element={ <PrivateRoute>  <AboutGame />  </PrivateRoute> } />
            <Route path="/cart" element={ <PrivateRoute>  <Cart />  </PrivateRoute>  } />
            <Route path="/game/:gameId" element={ <PrivateRoute>  <GamePage />  </PrivateRoute> } />
            <Route path="/login" element={ <LoginForm /> } />
          </Routes>
        </div>
      </Router>
  </>

  )

}

export default App
