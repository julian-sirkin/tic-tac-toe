const store = require('../store.js')
const gameInfo = require('./game-logic.js')
const clearOldGames = $('#old-games-info').html('')


const newGameSuccess = function (data) {
  $('#old-games-info').html('')
  gameInfo.newGame()
  for (let i = 0; i < 9; i++) {
    $(`#${i}`).empty()
    $('#display').html(`<h2>Current Player: 1 </h2>`)
  }
  store.game = data.game
}
const newGameFail = function () {
  $('#display').html(`<h2>Unable to start a new Game, try again</h2>`)
}
const makeMoveSuccess = function (data) {
  // Store info for using in this function
  const move = store.gameUpdate.game.cell.index
  const token = store.gameUpdate.game.cell.value
  const nextPlayer = token === 'X' ? '2' : '1'
  $('#old-games-info').html('')
  store.game = data.game
  // Place the piece on the board`
  const placeToken = `<h1 class="piece"> ${token} </h1>`
  $(`#${move}`).html(placeToken)
  // Clear out display
  $('#display').html('')
  // Display active Player/Winner/Draw
  if (gameInfo.checkForWin()) {
    $('#display').html(`<h2>${token} Wins!</h2>`)
  } else if (gameInfo.gameTied()) {
    $('#display').html(`<h2>Game tied</h2>`)
  } else {
    $('#display').html(`<h2>Current Player: ${nextPlayer} </h2>`)
    gameInfo.changePlayer(placeToken)
  }
}
const makeMoveFail = function () {
  $('#display').html('<h1>Please try to move again </h1>')
}
const oldGamesSuccess = function (data) {
  $('#old-games-info').html(`<h4>You have played ${data.games.length} games</h4>`)
}
const oldGamesFail = function () {
  $('#old-games-info').html('<h4>Unable to get old games, try again!')
}



module.exports = {
  newGameSuccess,
  newGameFail,
  makeMoveSuccess,
  makeMoveFail,
  oldGamesSuccess,
  oldGamesFail,
  clearOldGames
}
