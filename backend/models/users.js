const { Schema, model, Types } = require('mongoose')
const { ObjectId } = require('mongoose').Types

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
        gameTitle: String,
        gamePrice: Number,
        gameRank: String
      }
    ],
    default: []
  }
});

userSchema.statics.createNewUser = function(userObject) {
  const newUser = new this(userObject)
  return newUser.save()
}

userSchema.statics.addNewGame = async function(userObject, newGameObject) {
  const userInfo = await this.findOne({
    login: userObject.login,
    password: userObject.password
  })

  if (userInfo) {

    let listGames = [...userInfo.gamesList]

    console.log(newGameObject)

    listGames.push({
      gameTitle: newGameObject.title,
      gamePrice: newGameObject.price,
      gameRank: newGameObject.rank
    })

    await this.findOneAndUpdate(
      { login: userObject.login, password: userObject.password },
      { $set: { gamesList: listGames } }
    )

  }
}


userSchema.statics.removeGame = async function(userObject, newGameObject) {
  const userInfo = await this.findOne({
    login: userObject.login,
    password: userObject.password
  })

  if (userInfo) {

    let listGames = [...userInfo.gamesList]

    // могут убраться несоклько игр одинаковых из корзины но так и нужно 
    // помоу что их и не должно быть несоклько это баг на коинге был пока не доделал
    let filteredByRemove = listGames.filter((game) => {
      return !(
        game.gameTitle === newGameObject.gameTitle &&
        game.gamePrice === newGameObject.gamePrice &&
        game.gameRank === newGameObject.gameRank
      )
    })

    await this.findOneAndUpdate(
      { login: userObject.login, password: userObject.password },
      { $set: { gamesList: filteredByRemove } }
    )

  }
}

module.exports = model('User', userSchema);