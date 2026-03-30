import { useState } from 'react'
import './Navbar.css'

function Navbar() {

    const [userObject, setUserObject] = useState({
        login: "test@test.com",
        name: "testUser",
        role: "user"
    })

    return (
        <div className='navbar'>
            <div className='navbar-title'>
                <h4 className='navbar-logo'>Games Store</h4>
            </div>
            <div className='navbar-main'>
                <div className='navbar-list'>
                    <p className='navbat-list-item'>Просмотр игр</p>
                    <p className='navbat-list-item'>Описание маркета</p>
                    <p className='navbat-list-item'>Покупка игры</p>
                    <p className='navbat-list-item'>Корзина</p>
                </div>
            </div>
            <div className='navbar-user'>
                <img className='navbar-user-img' src='https://avatars.mds.yandex.net/i?id=c0f3acc0d405aa513700fbaffa9aa0d9db6c56a8-4314086-images-thumbs&n=13'></img>
                <span className='navbar-user-name'>{ userObject.name }</span>
            </div>
        </div>
    )

}


export default Navbar