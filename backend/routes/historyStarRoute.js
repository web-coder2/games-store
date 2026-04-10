const dayjs = require('dayjs')
const axios = require('axios')
const mongoose = require('mongoose')
const { Router } = require('express');

const gameSchema = require('../models/games.js')
const historyStar = require('../models/historyStar.js')

const router = Router()


router.get('/api/history/getAll', async (req, res) => {
    try {

        const allHistoryRows = await historyStar.getAll()

        res.status(200).json({
            allHistoryRows: allHistoryRows
        })

    } catch (e) {
        console.log(e.message)
        res.status(500).json({
            error: e.message
        })
    }
})


module.exports = router