import { useState } from 'react'
import './App.css'

function App() {

  const [title, setTitle] = useState('Games Store (игровой маркет)')

  return (
    
    <div className='main-container'>
      <h3>Welcome { title }</h3>
    </div>
  )

}

export default App
