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
  const movePlayed = store.gameUpdate.cell.index
  let activePlayer = store.gameUpdate.game.cell.value
  $(`#${movePlayed}`).html(`<h3> ${activePlayer}</h3>`)
  gameInfo.changePlayer()
  store.game = data.game
  console.log('where the game is', data)
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
