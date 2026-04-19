import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'

function Navbar() {

    const [userObject, setUserObject] = useState({
        login: "test@test.com",
        password: "testUser",
        userNick: "user"
    })

    const user = useSelector((state) => state.user)

    const navbarLinks = [
        {to: '/games', name: 'Просмотр игр', allowed: ['user', 'superUser', 'admin', 'dev'], idx: 1},
        {to: '/about', name: 'Описание маркета', allowed: ['user', 'superUser', 'admin', 'dev'], idx: 2},
        {to: '/admin', name: 'Админка', allowed: ['admin', 'dev'], idx: 3},
    ]

    const navbarDropdowLinks = [
        {to: '/cart', name: 'Корзина', allowed: ['user', 'superUser', 'admin', 'dev'], idx: 1},
        {to: '/create', name: 'Добавить новую игру', allowed: ['admin', 'dev'], idx: 2},
        {to: '/historyStars', name: 'История критиков', allowed: ['user', 'superUser', 'admin', 'dev'], idx: 3},

    ]

    useEffect(() => {
        setUserObject(user)
    }, [user])

    // TODO: потом userObject передавать через пропс а в родителськом компоненте поулчать через redux а тамчерез
    // TODO в redux получать userObject через locallStorage

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <NavLink to="/" className="navbar-brand">Games Store</NavLink>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav mr-auto">
                    {/* <li className="nav-item">
                        <NavLink to="/games" className="nav-link">Просмотр игр</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/about" className="nav-link">Описание маркета</NavLink>
                    </li> */}
                    {

                        navbarLinks.map((link) => {
                            return (

                                link.allowed.includes(userObject.userRank) ? 

                                    <li className="nav-item" key={ link.idx }>
                                        <NavLink to={ link.to } className="nav-link">{ link.name }</NavLink>
                                    </li>
                                : null
                            )
                        })

                    }
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Меню
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            {/* <NavLink to="/cart" className="dropdown-item">Корзина</NavLink>
                            <NavLink to="/create" className="dropdown-item">Добавить новую игру</NavLink>
                            <NavLink to="/historyStars" className="dropdown-item">История критиков</NavLink> */}
                                {
                                    navbarDropdowLinks.map((link, index) => {
                                        return (

                                            link.allowed.includes(userObject.userRank) ? 

                                                <li className="nav-item" key={ link.idx }>
                                                    <NavLink to={ link.to } className="dropdown-item">{ link.name }</NavLink>
                                                </li>

                                            : null
                                        )
                                    })
                                }
                        </ul>
                    </li>
                </ul>
                <div className="dropdown d-flex align-items-center">
                    <a className="d-flex align-items-center dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img src="https://avatars.mds.yandex.net/i?id=c0f3acc0d405aa513700fbaffa9aa0d9db6c56a8-4314086-images-thumbs&n=13"alt="User Avatar" className="rounded-circle" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                        <span className="navbar-text">{userObject.userNick}</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                        <a className="dropdown-item" href="/login">Выйти</a>
                        <p className='dropdown-item'>Ранк: { userObject.userRank }</p>
                    </div>
                </div>
            </div>
        </nav>
    )

}


export default Navbar