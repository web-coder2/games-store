const { Schema, model, Types } = require('mongoose');

const historyStar = new Schema({

    userNick: String,
    gameId: {
        type: Types.ObjectId
    },
    countStars: Number // кол-во звезд пославеную за одну оценку метакритик

});

module.exports = model('historyStar', historyStar);