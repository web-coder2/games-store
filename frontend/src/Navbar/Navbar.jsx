import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {

    const [userObject, setUserObject] = useState({
        login: "test@test.com",
        name: "testUser",
        role: "user"
    })

    // TODO: потом userObject передавать через пропс а в родителськом компоненте поулчать через redux а тамчерез
    // TODO в redux получать userObject через locallStorage

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Games Store</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink to="/games" className="nav-link">Просмотр игр</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/about" className="nav-link">Описание маркета</NavLink>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Меню
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <NavLink to="/cart" className="dropdown-item">Корзина</NavLink>
                            <NavLink to="/create" className="dropdown-item">Добавить новую игру</NavLink>
                        </div>
                    </li>
                </ul>
                <div className="d-flex align-items-center">
                    <img
                        src="https://avatars.mds.yandex.net/i?id=c0f3acc0d405aa513700fbaffa9aa0d9db6c56a8-4314086-images-thumbs&n=13"
                        alt="User Avatar"
                        className="rounded-circle"
                        style={{ width: '40px', height: '40px', marginRight: '10px' }}
                    />
                    <span className="navbar-text">{userObject.name}</span>
                </div>
            </div>
        </nav>
    )

}


export default Navbar