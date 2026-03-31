import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {

    const [userObject, setUserObject] = useState({
        login: "test@test.com",
        name: "testUser",
        role: "user"
    })

    // TODO: потом userObject передавать через пропс а в родителськом компоненте поулчать через redux а тамчерез
    // TODO в redux получать userObject через locallStorage

    return (
        <div className='navbar'>
            <div className='navbar-title'>
                <h4 className='navbar-logo'>Games Store</h4>
            </div>
            <div className='navbar-main'>
                <div className='navbar-list'>
                    <NavLink to="/games" className='navbat-list-item'>Просмотр игр</NavLink>
                    <NavLink to="/about" className='navbat-list-item'>Описание маркета</NavLink>
                    <NavLink to="/buy" className='navbat-list-item'>Покупка игры</NavLink>
                    <NavLink tp="/cart" className='navbat-list-item'>Корзина</NavLink>
                    <NavLink to="/create" className='navbat-list-item'>Добавить новую игру</NavLink>
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