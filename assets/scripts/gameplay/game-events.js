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
const onClickSpace = function (event) {
  const space = event.currentTarget.id
gameLogic.makeMove(space)
}

const gameEventHandler = function () {
  $('#new-game').on('submit', onNewGame)
  $('#game-board td').on('click', onClickSpace)
}

module.exports = {
  gameEventHandler
}
