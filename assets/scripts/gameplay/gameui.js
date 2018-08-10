const store = require('../store.js')
const gameInfo = require('./game-logic.js')



const newGameSuccess = function (data) {
  gameInfo.newGame()
  store.game = data.game
  console.log('the updated game is', store.game)
}
const newGameFail = function () {
  alert('No new game created')
}
const makeMoveSuccess = function (data) {
store.game = data.game
}

const makeMoveFail = function () {
  alert('Complete failure')
}





module.exports = {
  newGameSuccess,
  newGameFail,
  makeMoveSuccess,
  makeMoveFail
}
