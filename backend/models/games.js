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
    dateCreated: String // дата выхода игры

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

module.exports = model('Game', gameSchema)