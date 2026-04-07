import { createStore } from 'redux'
import axios from 'axios'

// 1. Начальное состояние state
const initialState = {
  user: null,
  baseURL: 'http://localhost:8000/api/',
}

// 2. Типы действий (mutations)
const SET_USER = 'SET_USER'

// 3. Редьюсер (reducer)
// Аналог mutation в Vuex, отвечает за изменение состояния.
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      // Обновляем user в state
      return { ...state, user: action.payload }
    default:
      return state
  }
}

// 4. Создаем хранилище (store)
const store = createStore(reducer)

// функции для get запросов
export const getDataList = async (route, params) => {
    try {
        const response = await axios.get(`${initialState.baseURL}${route}`, { params })
        return response.data
    } catch (error) {
        console.error(error.message)
    }
}

// функции для post запросов
export const setDataList = async (route, params) => {
    try {
        const response = await axios.post(`${initialState.baseURL}${route}`, params)
        return response.data
    } catch (error) {
        console.error(error.message)
    }
}



// 5. Экспортируем функции-действия (actions)
// Аналог commit или dispatch в Vuex.
export const setUser = (user) => ({ type: SET_USER, payload: user })

// 6. Экспортируем store
export default store