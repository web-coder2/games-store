const dayjs = require('dayjs')
const axios = require('axios')
const mongoose = require('mongoose')
const { Router } = require('express');

const usersSchema = require('../models/users.js')

const router = Router()

router.post('/api/users/create', async (req, res) => {
    try {

        const { userObject } = req.body

        isResultByCreate = await usersSchema.createNewUser(userObject)

        res.status(200).json({
            msg: 'user created successfuly'
        })

    } catch (e) {
        console.log(e.message)
        res.status(500).json({
            msg: e.message
        })
    }
})

router.post('/api/users/addNewGame', async (req, res) => {
    try {
        
        const { userObject, newGameObject } = req.body
        const result = await usersSchema.addNewGame(userObject, newGameObject)

        res.status(200).json({
            msg: 'игра доабвлена в корзину успешно'
        })

    } catch (e) {
        console.log(e.message)
        res.status(500).json({
            msg: e.message
        })
    }
})

router.post('/api/users/removeGame', async (req, res) => {
    try {
        
        const { userObject, gameObject } = req.body
        const result = await usersSchema.removeGame(userObject, gameObject)

        res.status(200).json({
            msg: 'игра удалилась из корзины'
        })

    } catch (e) {
        console.log(e.message)
        res.status(500).json({
            msg: e.message
        })
    }
})

router.post('/api/users/auth', async (req, res) => {

    try {

        const { login, password } = req.body

        const isUser = await usersSchema.findOne({
            login: login,
            password: password
        })

        if (isUser) {
            res.status(201).json({
                user: isUser
            })
        } else if (!isUser) {
            res.status(301).json({
                msg: 'user not found'
            })
        }

    } catch (e) {
        console.log(e.message)
        res.status(500).json({
            msg: e.message
        })
    }

})


module.exports = router