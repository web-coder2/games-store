const { Schema, model } = require('mongoose');

const commentSchema = new Schema({

    commentByGameTitle: String, // к какой игре написн комент (тайтл)
    commentByGameId: { //  к какой игре написан комент (айдишник)
        type: Schema.Types.ObjectId,
        ref: 'games'
    },
    userComment: String, // имя юбзера написавшего комент
    selfComment: String // сам коментайри
})


commentSchema.statics.create = async function(commentObject) {

    console.log(commentObject)

    let newComment = new this({
        commentByGameTitle: commentObject.commentByGameTitle,
        commentByGameId: commentObject.commentByGameId,
        userComment: commentObject.userComment,
        selfComment: commentObject.selfComment,
    })

    newComment.save()

    return true

}

commentSchema.statics.getByGame = async function(gameTitle) {

    let commentsByGame = this.find({
        commentByGameTitle: gameTitle
    })

    return commentsByGame

}

module.exports = model('commentSchema', commentSchema)