const gameLogic = require('./game-logic.js')
const api = require('./gameapi.js')
const ui = require('./gameui.js')
const store = require('../store.js')

const onNewGame = function (event) {
  event.preventDefault()
  api.newGame()
    .then(ui.newGameSuccess)
    .catch(ui.newGame)
}
const onMakeMove = function (event) {
  if (gameLogic.checkForWin() === false && gameLogic.gameTied() === false) {
    const space = event.currentTarget.id
    if (store.game.cells[space] === '') {
      gameLogic.makeMove(space)
      const data = store.gameUpdate
      api.makeMove(data)
        .then(ui.makeMoveSuccess)
        .catch(ui.makeMoveFail)
    } else {
      $('#display').html('<h1> Please pick another square')
    }
  }
}
const onOldGames = function (event) {
  event.preventDefault()
  api.oldGames()
    .then(ui.oldGamesSuccess)
    .catch(ui.oldGamesFail)
}

const gameEventHandler = function () {
  $('#new-game').on('submit', onNewGame)
  $('#game-board td').on('click', onMakeMove)
  $('#old-games').on('click', onOldGames)
}

module.exports = {
  gameEventHandler
}
