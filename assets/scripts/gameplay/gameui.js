const store = require('../store.js')
const gameInfo = require('./game-logic.js')



const newGameSuccess = function (data) {
  gameInfo.newGame()
    for (var i = 0; i < 9; i++) {
      $(`#${i}`).empty()
    }
  store.game = data.game
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
const oldGamesSuccess = function (data) {
  console.log(data.games.length)
}
const oldGamesFail = function () {
  alert('did not get old games')
}



module.exports = {
  newGameSuccess,
  newGameFail,
  makeMoveSuccess,
  makeMoveFail,
  oldGamesSuccess,
  oldGamesFail
}
