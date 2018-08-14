const gameLogic = require('./game-logic.js')
const api = require('./gameapi.js')
const ui = require('./gameui.js')
const store = require('../store.js')
  let computerPlayer = {
    playing: true,
    compPiece: 'X',
    otherPiece: 'O'
  }



const onNewGame = function () {
  api.newGame()
    .then(ui.newGameSuccess)
    .then(onComputerMove)
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
        .then(onComputerMove)
        .catch(ui.makeMoveFail)
    } else {
      $('#display').html('<h1> Please pick another square')
    }
  }
}
const onComputerMove = function () {
  console.log('I have been ran')
  console.log('computer playing', computerPlayer.playing)
  console.log('comp piece', computerPlayer.compPiece)
  console.log('active Player', store.gameUpdate.game.cell.value)
  if (gameLogic.checkForWin() === false && gameLogic.gameTied() === false &&
      computerPlayer.playing === true &&
      computerPlayer.compPiece === store.currentPlayer()) {
    const player = computerPlayer.compPiece
    const opponent = computerPlayer.otherPiece
    const compMove = gameLogic.computer(player, opponent)
    gameLogic.makeMove(compMove)
    const data = store.gameUpdate
    api.makeMove(data)
      .then(ui.makeMoveSuccess)
      .catch(ui.makeMoveFail)
  }
}
const onOldGames = function (event) {
  event.preventDefault()
  api.oldGames()
    .then(ui.oldGamesSuccess)
    .catch(ui.oldGamesFail)
}
const onNewGameO = function (event) {
  console.log('I have been registered')
  event.preventDefault()
  computerPlayer.playing = true
  computerPlayer.compPiece = 'O'
  computerPlayer.otherPiece = 'X'
  onNewGame()
}
const onNewGameX = function (event) {
  event.preventDefault()
  computerPlayer.playing = true
  computerPlayer.compPiece = 'X'
  computerPlayer.otherPiece = 'O'
  onNewGame()
}
const onNewGameHuman = function (event) {
  console.log('playing human')
  event.preventDefault()
  computerPlayer.playing = false
  onNewGame()
}

const gameEventHandler = function () {
  $('#new-game-human').on('submit', onNewGameHuman)
  $('#game-board td').on('click', onMakeMove)
  $('#old-games').on('click', onOldGames)
  $('#new-game-computerO').on('submit', onNewGameO)
  $('#new-game-computerX').on('submit', onNewGameX)
}

module.exports = {
  gameEventHandler,
  onComputerMove
}
