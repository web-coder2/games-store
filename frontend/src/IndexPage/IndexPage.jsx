import { useState } from 'react'
import './IndexPage.css'

import dayjs from 'dayjs'
import axios from 'axios'

function IndexPage() {

    const [title, setTitle] = useState('Games-Market (Игровой маркет)')

    return (

        <div className='title-container'>
            <h3 className='title-name'>Welcome to { title }</h3>
            <p className='title-content'>Это приложение интернет маркет дял просмотра покупки оценки игр разных компаний рейтингов и жанров</p>
        </div>
    
    )

}

export default IndexPage