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
  console.log('the best move is', computer())
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

// Computer opponent
const computer = function () {
if (winOnNextMove('O', winningSpaces) !== false) {
  return winOnNextMove('O', winningSpaces)
} else if (winOnNextMove('X', winningSpaces) !== false) {
  return winOnNextMove('X', winningSpaces)
} else {
return bestSpotForWin()
  }
}
// Calculate spot with most possible wins
const bestSpotForWin = function () {
let bestMove = 0
  let moveCount = []
  /* Turns moveCount into an array with a length of 9, the index of
  each number in the array represents that space on the board, and the number
  in the index is the number of possible winninc combinations it can still
  be used in */
  for (var i = 0; i < winningSpaces.length; i++) {
    if (potentialWinningCobo(winningSpaces[i], gameBoard)) {
      bestSpot(winningSpaces[i], moveCount)
    }
  }
for (let i = 0; i < moveCount.length; i++) {
    if (moveCount[i] > bestMove) {
      bestMove = moveCount[i]
    }
  }
return moveCount.indexOf(bestMove)
}
// Checks to see what winning combos are still possible
const potentialWinningCobo = (winningCombo, gameBoard) => {
  for (let i = 0; i < winningCombo.length; i++) {
    if (gameBoard[winningCombo[i]] === 'X') {
      return false
    } else {
      return true
    }
  }
}
// Adds one in index of move for each possible winning combo it is in
const bestSpot = (combo, spaceCount) => {
  for (let i = 0; i < combo.length; i++) {
    if (spaceCount[combo[i]] === undefined && gameBoard[combo[i]] !== 'O') {
      spaceCount[combo[i]] = 1
    } else if (gameBoard[combo[i]] !== 'O') {
      spaceCount[combo[i]]++
    }
  }
}
// Calculate if win on next move
const winOnNextMove = function (player, winningCombo) {
for (let i = 0; i < winningCombo.length; i++) {
  if (checkSpaceForWin(player, winningCombo[i]) !== false) {
    return checkSpaceForWin(player, winningCombo[i])
    }
  }
  return false
}
const checkSpaceForWin = (player, combo) => {
// Fill array with
const possibleWinArr = []
let winningSpace = NaN
for (var i = 0; i < combo.length; i++) {
  console.log('Check GameBoard', gameBoard[combo[i]])
if (gameBoard[combo[i]] !== player && gameBoard[combo[i]] !== '') {
      return false
    } else if (gameBoard[combo[i]] === player) {
      possibleWinArr.push(combo[i])
    }
    winningSpace = combo[i]
  }
if (possibleWinArr.length === 2) {
    return winningSpace
  } else {
    return false
  }
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
