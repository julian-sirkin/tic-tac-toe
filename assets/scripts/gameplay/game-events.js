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
  const space = event.currentTarget.id
  gameLogic.makeMove(space)
  const data = store.gameUpdate
  api.makeMove(data)
    .then(ui.makeMoveSuccess)
    .catch(ui.makeMoveFail)
}

const gameEventHandler = function () {
  $('#new-game').on('submit', onNewGame)
  $('#game-board td').on('click', onMakeMove)
}

module.exports = {
  gameEventHandler
}
