const dayjs = require('dayjs')
const axios = require('axios')
const mongoose = require('mongoose')
const { Router } = require('express');

const gameSchema = require('../models/games.js')
const historyStar = require('../models/historyStar.js')

const router = Router()

router.get('/api/games/getAll', async (req, res) => {
    try {
        let gamesList = await gameSchema.getAll()

        gamesList = gamesList.map((game) => {

            return {
                title: game.title,
                description: game.description.slice(0, 50) + '....',
                price: game.price,
                company: game.company,
                rating: game.rating,
                rank: game.rank,
                dateCreated: game.dateCreated,
                _id: game._id
            }

        })

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

        const result = await gameSchema.createNewGame(gameObject)

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

        const gamesByRating = await gameSchema.getByRating(raiting)

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

router.get('/api/games/getById', async (req, res) => {
    try {

        const { gameId } = req.query

        const gameObject = await gameSchema.findByGameId(gameId)

        res.status(200).json({
            game: gameObject
        })

    } catch (e) {
        console.log(e.message)
        res.status(500).json({
            err: e.message
        })
    }
})

router.post('/api/games/setGameRaiting', async (req, res) => {
    try {

        const { gameObject, countStars, userObject } = req.body

        const responseBySet = await gameSchema.setNewRating(countStars, gameObject)

        const responseByHistory = await historyStar.create(userObject, gameObject, countStars)

        const allHistoryRows = await historyStar.getAll()

        res.status(200).json({
            msg: responseBySet
        })

        // TODO: сделать новую модель история рейтинга user, game, countStars
        // TODO: потом создать комопнетн с просомтром этих истоий в вид таблицы
        // TODO: но только после того как сделаю модуль с юзерами

    } catch (e) {
        console.log(e.message)
        res.status(500).json({
            err: e.message
        })
    }
})

module.exports = router