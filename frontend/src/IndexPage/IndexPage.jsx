import { useState } from 'react'

import dayjs from 'dayjs'
import axios from 'axios'

function IndexPage() {

    const [title, setTitle] = useState('Games-Market (Игровой маркет)')

    return (

        <div className="container my-4">
            <div className="p-4 shadow-sm">
                <h3 className="mb-3 text-center">Welcome to {title}</h3>
                <p className="text-center">
                    Это приложение интернет маркет для просмотра, покупки, оценки игр разных компаний, рейтингов и жанров.
                </p>
            </div>
        </div>
    
    )

}

export default IndexPage