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
  console.log('the best move for O is', computer('O', 'X'))
  console.log('The best for X is', computer('X', 'O'))
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
const computer = function (player, opponent) {
  console.log('O can win?', winOnNextMove('O', 'X', winningSpaces))
  console.log('X can win?', winOnNextMove('X', 'O', winningSpaces))
if (winOnNextMove(player, opponent, winningSpaces) !== false) {
  return winOnNextMove(player, opponent, winningSpaces)
} else if (winOnNextMove(opponent, player, winningSpaces) !== false) {
  return winOnNextMove(opponent, player, winningSpaces)
} else {
return bestSpotForWin(player, opponent)
  }
}
// Calculate spot with most possible wins
const bestSpotForWin = function (player, opponent) {
let bestMove = 0
  let moveCount = []
  /* Turns moveCount into an array with a length of 9, the index of
  each number in the array represents that space on the board, and the number
  in the index is the number of possible winninc combinations it can still
  be used in */
  for (var i = 0; i < winningSpaces.length; i++) {
    if (potentialWinningCobo(winningSpaces[i], gameBoard, opponent)) {
      bestSpot(winningSpaces[i], moveCount, player)
    }
  }
  console.log('Number of possible wins', moveCount)
  // Selects largest space from array created in for loop above
for (let i = 0; i < moveCount.length; i++) {
    if (moveCount[i] > bestMove) {
      bestMove = moveCount[i]
    }
  }
  if (moveCount.indexOf(bestMove) !== -1) {
    return moveCount.indexOf(bestMove)
  } else {
    // If no more winning moves are available, pick a random space
    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i] === '') {
        return gameBoard.indexOf[gameBoard[i]]
      }
    }
  }
}
// Checks to see what winning combos are still possible
const potentialWinningCobo = (winningCombo, gameBoard, opponent) => {
  for (let i = 0; i < winningCombo.length; i++) {
    if (gameBoard[winningCombo[i]] === opponent) {
      return false
    }
  }
  return true
}
// Adds one in index of move for each possible winning combo it is in
const bestSpot = (combo, spaceCount, player) => {
  for (let i = 0; i < combo.length; i++) {
    if (spaceCount[combo[i]] === undefined && gameBoard[combo[i]] !== player) {
      spaceCount[combo[i]] = 1
    } else if (gameBoard[combo[i]] !== player) {
      spaceCount[combo[i]]++
    }
  }
}
// Calculate if win on next move
const winOnNextMove = function (player, opponent, winningCombo) {
for (let i = 0; i < winningCombo.length; i++) {
  if (checkSpaceForWin(player, opponent, winningCombo[i]) !== false) {
    return checkSpaceForWin(player, opponent, winningCombo[i])
    }
  }
  return false
}
const checkSpaceForWin = (player, opponent, combo) => {
// Fill array with
const possibleWinArr = []
let winningSpace = NaN
for (let i = 0; i < combo.length; i++) {
if (gameBoard[combo[i]] === opponent) {
      return false
    } else if (gameBoard[combo[i]] === player) {
      possibleWinArr.push(combo[i])
    } else {
      winningSpace = combo[i]
    }
  }
if (possibleWinArr.length === 2 && gameBoard[winningSpace] !== opponent) {
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
