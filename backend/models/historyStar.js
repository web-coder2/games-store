const { Schema, model, Types } = require('mongoose');

const dayjs = require('dayjs')

const historyStar = new Schema({

    userNick: String,
    gameTitle: String,
    dateCritic: String,
    countStars: Number // кол-во звезд пославеную за одну оценку метакритик

});


historyStar.statics.create = async function(userObject, gameObject, countStars) {

    const newHistoryRow = new this({
        userNick: userObject.userNick,
        gameTitle: gameObject.title,
        dateCritic: dayjs(new Date).format('YYYY-MM-DD'),
        countStars: countStars
    })

    newHistoryRow.save()

}

historyStar.statics.getAll = async function() {
    const allHistoryRows = await this.find()
    return allHistoryRows
}

module.exports = model('historyStar', historyStar);