const gameLogic = require('./game-logic.js')
const api = require('./gameapi.js')
const ui = require('./gameui.js')
const store = require('../store.js')
// let computerPlayer = {}


const onNewGame = function (event) {
  event.preventDefault()
  api.newGame()
    .then(ui.newGameSuccess)
    // .then(onComputerMove)
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
 /*
const onComputerMove = function () {
  console.log('the current player the computer sees', store.currentPlayer())
  console.log(gameLogic.gameBoard, 'current gameboard')
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
}*/
const onOldGames = function (event) {
  event.preventDefault()
  api.oldGames()
    .then(ui.oldGamesSuccess)
    .catch(ui.oldGamesFail)
}
/*
const onNewGameComputerFirst = function (event) {
  event.preventDefault()
  computerPlayer = {}
  computerPlayer = {
    playing: true,
    compPiece: 'X',
    otherPiece: 'O'
  }
  gameLogic.activePlayer = gameLogic.playerOne
  onNewGame()
}
const onNewGameComputerSecond = function (event) {
  event.preventDefault()
  computerPlayer = {}
  computerPlayer = {
  playing: true,
  compPiece: 'O',
  otherPiece: 'X'
}
  onNewGame()
}
const onNewGameHuman = function (event) {
  event.preventDefault()
  computerPlayer = {}
  computerPlayer = {
  playing: false,
  compPiece: 'X',
  otherPiece: 'O'
}
  onNewGame()
}
*/
const gameEventHandler = function () {
  $('#new-game-human').on('click', onNewGame)
  $('#game-board td').on('click', onMakeMove)
  $('#old-games').on('click', onOldGames)
  // $('#new-game-computer-second').on('submit', onNewGameComputerSecond)
  // $('#newgamecomputerfirst').on('submit', onNewGameComputerFirst)
}

module.exports = {
  gameEventHandler
  // onComputerMove
}
