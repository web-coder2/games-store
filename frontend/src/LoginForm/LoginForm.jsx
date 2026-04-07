import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setDataList, setUser } from '../reduxSetup.js'

import axios from 'axios'
import dayjs from 'dayjs'

function LoginForm() {

    let apiRoute = 'http://localhost:8000/api/'
    let dispatch = useDispatch()

    const [createFormData, setCreateFormData] = useState({
        login: '',
        password: '',
        nick: ''
    })

    const [loginFormData, setLoginFormData] = useState({
        login: '',
        password: ''
    })

    const handleCreateChange = (e) => {
        const { name, value } = e.target
        setCreateFormData({ ...createFormData, [name]: value })
    }

    const handleLoginChange = (e) => {
        const { name, value } = e.target
        setLoginFormData({ ...loginFormData, [name]: value })
    }


    async function requestAuth() {
        const response = await setDataList('users/auth', {
            login: loginFormData.login,
            password: loginFormData.password
        })
        let userObject = response.data.user
        console.log(userObject)

        // dispatch(setUser(userObject))
    }

    async function requestCreate() {
        const response = await setDataList('users/create', {
            userObject: createFormData
        })
        console.log(response)
    }

    function submitCreateForm(e) {
        e.preventDefault()
        console.log('Данные создания:', createFormData)

        requestCreate()
    }

    const submitLoginForm = (e) => {
        e.preventDefault()
        console.log('Данные входа:', loginFormData)

        requestAuth()
    }


    return (
        <div className="container bg-dark text-white p-4">
            <ul className="nav nav-tabs" id="authTab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="true">
                        создать аккаунт
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="login-tab" data-toggle="tab" href="#login" role="tab" aria-controls="login" aria-selected="false">
                        Войти
                    </a>
                </li>
            </ul>
            <div className="tab-content pt-3" id="authTabContent">
                <div className="tab-pane fade show active" id="register" role="tabpanel" aria-labelledby="register-tab">
                    <div className='mt-5 text-center row'>
                        <form onSubmit={submitCreateForm} className='form-group w-50 col-sm-6 offset-sm-3'>
                            <h5 className='text-success'>Форма регистрации</h5>
                            <input value={createFormData.login} onChange={handleCreateChange} name='login' className='form-control mb-3 bg-dark text-light' placeholder='login'></input>
                            <input value={createFormData.password} onChange={handleCreateChange} name='password' className='form-control mb-3 bg-dark text-light' placeholder='password'></input>
                            <input value={createFormData.nick} onChange={handleCreateChange} name='nick' className='form-control mb-3 bg-dark text-light' placeholder='nick'></input>
                            <button type="submit" className='btn btn-success w-100'>Зарегаться</button>
                        </form>
                    </div>
                </div>
                <div className="tab-pane fade" id="login" role="tabpanel" aria-labelledby="login-tab">
                    <div className='mt-5 text-center'>
                    <form onSubmit={submitLoginForm} className='form-group w-50 col-sm-6 offset-sm-3'>
                            <h5 className='text-primary'>Форма входа</h5>
                            <input value={loginFormData.login} onChange={handleLoginChange} name='login' className='form-control mb-3 bg-dark text-light' placeholder='login'></input>
                            <input value={loginFormData.password} onChange={handleLoginChange} name='password' className='form-control mb-3 bg-dark text-light' placeholder='password'></input>
                            <button type="submit" className='btn btn-primary w-100'>Войти</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default LoginForm