import { useState } from 'react'
import './App.css'


// туту будет импорт компонентов
import Navbar from './Navbar/Navbar'

function App() {

  const [title, setTitle] = useState('Games Store (игровой маркет)')

  return (
  
    <>

      <Navbar />

      <div className='main-container'>
        <h3>Welcome { title }</h3>
      </div>

    </>

  )

}

export default App
