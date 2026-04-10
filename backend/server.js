const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors');
const axios = require('axios')
const dayjs = require('dayjs')
const dotenv = require('dotenv')
const mongoose = require('mongoose');

const gamesRoute = require('./routes/games.js')
const usersRoute = require('./routes/users.js')
const historyStarRoute = require('./routes/historyStarRoute.js')

const PORT = 8000
const app = express()
dotenv.config();


const MONGO_URL = process.env.DATABASE_URL
const MONGO_USER = process.env.DATABASE_USERNAME
const MONGO_PASS = process.env.DATABASE_PASSWORD
const MONGO_PORT = process.env.DATABASE_PORT
const DATABASE_NAME = process.env.DATABASE_NAME


app.use(cors({ origin: '*' }))
app.use(express.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../frontend/dist')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

app.use(gamesRoute)
app.use(usersRoute)
app.use(historyStarRoute)

async function startConnectToDB() {
    try {
        const uri = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_URL}:${MONGO_PORT}/${DATABASE_NAME}?authSource=admin`;
        await mongoose.connect(uri);
    } catch (err) {
        console.log(err);
    }
}

app.listen(PORT, () => {
    startConnectToDB()
    console.log(`express start and running on localhost:${PORT}`)
})