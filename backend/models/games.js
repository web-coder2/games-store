const { Schema, model } = require('mongoose');

const gameSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: Number,
    company: String,
    rating: Number,
    rank: String, // жанр игры
    dateCreated: String, // дата выхода игры
    countRating: {  // кол-во оценивших игру юзеров
        type: Number,
        default: 1
    },
    totalCountStars: { // кол-во всего звезд
        type: Number,
        default: 5
    }
})

// получение всех игр
gameSchema.statics.getAll = function() {
    return this.find()
}

// получение игры по рейтинги
gameSchema.statics.getByRaiting = function(raiting) {
    return this.find({
        raiting: {
            $gte: raiting
        }
    })
}

// получение игр по жанру
gameSchema.statics.getByRank = function(rank) {
    return this.find({
        rank: rank
    })
}

// создание новой игры
gameSchema.statics.createNewGame = function(gameObject) {
    const newGame = new this(gameObject)
    return newGame.save()
}

// получить игру по ее айди
gameSchema.statics.findByGameId = function(gameId) {
    const gameObject = this.findOne({
        _id: gameId
    })
    return gameObject
}

gameSchema.statics.setNewRating = async function(countStars, gameObject) {
    const game = await this.findOne({ _id: gameObject._id })
    
    if (!game) {
        throw new Error('Game not found')
    }

    const newCountRating = game.countRating + 1
    const newTotalCountStars = game.totalCountStars + countStars
    const newRating = newTotalCountStars / newCountRating

    await this.findOneAndUpdate(
        { _id: game._id },
        {
            $set: {
                countRating: newCountRating,
                totalCountStars: newTotalCountStars,
                rating: newRating
            }
        }
    )
}

module.exports = model('Game', gameSchema)