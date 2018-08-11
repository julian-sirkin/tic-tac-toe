const store = require('../store.js')
const gameInfo = require('./game-logic.js')



const newGameSuccess = function (data) {
  gameInfo.newGame()
    for (var i = 0; i < 9; i++) {
      $(`#${i}`).empty()
      $('#display').html(`<h2>Current Player: 1 </h2>`)
    }
  store.game = data.game
}
const newGameFail = function () {
  alert('No new game created')
}
const makeMoveSuccess = function (data) {
  // Store info for using in this function
  const move = store.gameUpdate.game.cell.index
  const token = store.gameUpdate.game.cell.value
  const nextPlayer = token === 'X' ? '2' : '1'
  store.game = data.game
  // Place the piece on the board
  const placeToken = `<h1 class="piece"> ${token} </h1>`
  $(`#${move}`).html(placeToken)
  // Clear out display
  $('#display').html('')
  // Display active Player/Winner/Draw
  if (data.game.over === false) {
    gameInfo.changePlayer(placeToken)
  $('#display').html(`<h2>Current Player: ${nextPlayer} </h2>`)
} else if (store.tiedGame) {
  $('#display').html(`<h2>Game tied</h2>`)
  }
  else {
    $('#display').html(`<h2>${token} Wins!</h2>`)
  }
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
