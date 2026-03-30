const dayjs = require('dayjs')
const axios = require('axios')
const mongoose = require('mongoose')
const { Router } = require('express');

const gameSchema = require('../models/games.js')

const router = Router()

router.get('/api/games/getAll', async (req, res) => {
    try {
        let gamesList = await gameSchema.getAll()

        res.status(200).json({
            games: gamesList
        })

    } catch (e) {
        console.log(e.message)
        res.status(500).json({
            msg: e.message
        })
    }
})


router.post('/api/games/create', async (req, res) => {
    try {
        const { gameObject } = req.body

        const result = await gamesSchema.createNewGame(gameObject)

        res.status(200).json({
            result: result
        })

    } catch (e) {
        console.log(e.message)
        res.status(500).json({
            msg: e.message
        })
    }
})


// TODO: на фронте создать инпут слайдер для фиьтра по рейтингу и вывод (плохая,средняя,хорошая) игра от раитинга

router.get('/api/games/getByRaiting', async (req, res) => {
    try {
        
        const { raiting } = req.query

        const gamesByRating = await gamesSchema.getByRating(raiting)

        res.status(200).json({
            games: gamesByRating
        })

    } catch (e) {
        console.log(e.message)
        res.status(500).json({
            msg: e.message
        })
    }
})

module.exports = router