const dayjs = require('dayjs')
const axios = require('axios')
const mongoose = require('mongoose')
const { Router } = require('express');

const gameSchema = require('../models/games.js')
const commentSchema = require('../models/comments.js')

const router = Router()


router.post('/api/comments/create', async (req, res) => {

    try {

        const { gameTitle, gameId, userName, selfComment } = req.body

        let commentObject = {
            commentByGameTitle: gameTitle,
            commentByGameId: gameId,
            userComment: userName,
            selfComment: selfComment
        }

        commentSchema.create(commentObject)

        res.status(200).json({
            msg: 'comment has benn setted )))'
        })

    } catch (e) {
        console.log(e.message)
        res.status(500).json({
            error: e.message
        })
    }

})

router.get('/api/comments/getByTitle', async (req, res) => {
    try {

        const { gameTitle } = req.query

        const commentByTitle = await commentSchema.getByGame(gameTitle)

        res.status(200).json({
            comments: commentByTitle
        })

    } catch (e) {
        console.log(e.message)
        res.status(500).json({
            error: e.message
        })
    }
})


module.exports = router