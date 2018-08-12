// Global variables for game logic
const store = require('../store.js')
let gameBoard = ['', '', '', '', '', '', '', '', '']
const playerOne = 'X'
const playerTwo = 'O'
let over = false
let activePlayer = playerOne
const winningSpaces = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
/* Conroller, Updates gameboard array, checks for win,
checks for tie, changes player, updates if the game
is over */
const makeMove = function (space) {
  gameBoard[space] = activePlayer
  // checkForWin() ? alert('Winner Winner Chicken Dinner') : changePlayer()
  checkForWin()
  gameTied()
  updateApi(space)
}
// Check for winner, check for tie

// Tied Game
const gameTied = function () {
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === '') {
      over = false
      return false
    }
  }
  store.tiedGame = true
  over = true
  return true
}
// Check for win.....
const checkForWin = function () {
  for (let i = 0; i < winningSpaces.length; i++) {
    if (checkPlayer(winningSpaces[i])) {
      over = true
      return true
    }
  }
  return false
}
// callback in checking for the win
const checkPlayer = (combo) => {
  for (let i = 0; i < combo.length; i++) {
    if (gameBoard[combo[i]] !== activePlayer) {
      return false
    }
  }
  return true
}
// Switch Player
const changePlayer = function () {
  if (activePlayer === playerOne) {
    activePlayer = playerTwo
  } else if (activePlayer === playerTwo) {
    activePlayer = playerOne
  }
}
// Reset when New game is started
const newGame = function () {
  gameBoard = ['', '', '', '', '', '', '', '', '']
  over = false
  activePlayer = playerOne
}

// Update object to send to api
const updateApi = function (space) {
  store.gameUpdate.game.cell.index = space
  store.gameUpdate.game.cell.value = activePlayer
  store.gameUpdate.game.over = over
}

module.exports = {
  makeMove,
  activePlayer,
  newGame,
  gameBoard,
  changePlayer,
  checkForWin,
  gameTied
}
