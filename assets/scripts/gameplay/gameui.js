const store = require('../store.js')
const gameInfo = require('./game-logic.js')



const newGameSuccess = function (data) {
  gameInfo.newGame()
  store.game = data.game
  // Add function to clear display
}
const newGameFail = function () {
  alert('No new game created')
}
const makeMoveSuccess = function (data) {
  gameInfo.changePlayer()
  store.game = data.game

  console.log('Return from API', data)
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
