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
  if (gameBoard[space] === '') {
    gameBoard[space] = activePlayer
    // checkForWin() ? alert('Winner Winner Chicken Dinner') : changePlayer()
    gameOver()
    changePlayer()
  } else {
    alert('Pick another space')
  }
  console.log(gameBoard)
  console.log('is game over?', over)
}
// Check for winner, check for tie
const gameOver = function () {
  if (checkForWin()) {
    return alert('winner winner chicken dinner')
  } else if (gameTied(gameBoard)) {
    return alert('the game has been tied')
  }
}
// Tied Game
const gameTied = function (gameBoard) {
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === '') {
      over = false
      return false
    }
  }
  over = true
  return true
}
// Check for win.....
const checkForWin = function () {
for (let i = 0; i < winningSpaces.length; i++) {
    if (checkPlayer(winningSpaces[i])) {
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
module.exports = {
  makeMove
}
