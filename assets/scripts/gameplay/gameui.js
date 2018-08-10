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
  const move = store.gameUpdate.game.cell.index
  const token = store.gameUpdate.game.cell.value
  const placeToken = `<h1 class="piece"> ${token} </h1>`
  $(`#${move}`).html(placeToken)
  gameInfo.changePlayer(placeToken)
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
