import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import axios from 'axios'
import dayjs from 'dayjs'

import Navbar from './Navbar/Navbar'
import IndexPage from './IndexPage/IndexPage'
import CreateGame from './CreateGame/CreateGame'

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
          </Routes>
        </div>
    </Router>
  </>

  )

}

export default App
