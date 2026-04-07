const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userNick: {
    type: String,
    required: false,
    default: 'user367502754'
  },
  avatarImg: {  // ссылка на аватарку фото
    type: String,
    required: false,
  },
  gamesList: { // корзина игр для юзера
    type: [
      {
        gameId: {
          type: Types.ObjectId,
          ref: 'Game'
        }
      }
    ],
    default: []
  }
});

userSchema.statics.createNewUser = function(userObject) {
  const newUser = new this(userObject)
  return newUser.save()
}

module.exports = model('User', userSchema);