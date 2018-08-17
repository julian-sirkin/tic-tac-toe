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

// Check for Tied Game by seeing if there are any free spaces on the Board
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
/*Check for the win, by looping through all winning combinations
Then use a callback to see if that specific combination is occupied
By the same piece. If any given array of 3 winning squares does not come
back as true, then it will move to the next set of 3 squares until it has tested
all possible arrays */
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
  if (pickMove !== undefined) {
    return pickMove(player, opponent)
  }
  return randomMove()
}


const randomMove = function() {
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === '') {
      return i
    }
  }
}
/* Controller of all the small functions for the computer
Currently checks to see if there is a winning move for itself, then the opponent
then checks to see if there are any moves to play that will allow there to be 2
moves that win on the following move, then checks the same for the opponent
Finally checks the board to see how many possible winning combinations can be made
with each square, it compares that to the same information from the opponent, and
takes whichever one has a higher rating. */
const pickMove = function (player, opponent) {
  if (winOnNextMove(player, opponent, winningSpaces) !== false) {
    return winOnNextMove(player, opponent, winningSpaces)
  } else if (winOnNextMove(opponent, player, winningSpaces) !== false) {
    return winOnNextMove(opponent, player, winningSpaces)
  } else if (checkDoubleWin(player, opponent) !== false) {
    return checkDoubleWin(player, opponent)
  } else if (checkDoubleWin(opponent, player) !== false) {
    checkDoubleWin(opponent, player)
  } else if (bestSpotForWin(player, opponent) >= bestSpotForWin(opponent, player)) {
    return bestSpotForWin(player, opponent)
  } else {
    return bestSpotForWin(opponent, player)
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
/*Calculate if win on next move Loop through all winning combinations, in a callback
check to see if two spaces within the winning combination are occupied by the same player
If either an opponent pieces is in that combination, or two spaces are not occupied
It comes back as false */
const winOnNextMove = function (player, opponent, winningCombo) {
for (let i = 0; i < winningCombo.length; i++) {
  if (checkSpaceForWin(player, opponent, winningCombo[i]) !== false) {
    return checkSpaceForWin(player, opponent, winningCombo[i])
    }
  }
  return false
}
// Callback to winOnNextMove Only returns true if two spaces are occupied
// by the player
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

/* Check for move with that gives multiple possibilities of a win. Creates
a copy of the current gameboard, as to not meess with the callback. Then Loops
Through the copy of the gameboard, adding one piece to each square, then uses
a callback nested within a callback to test if there are multiple ways to win
on the next turn with the piece on the board. If The callbacks come back negative
then the loop continues, until every move on the board is tested */
const checkDoubleWin = function (player, opponent) {
  // Create test Board
  let futureBoard = []
  // Function to reset the test board to the actual gameboard
  const setFutureBoard = function () {
    futureBoard = []
    for (let i = 0; i < gameBoard.length; i++) {
  futureBoard.push(gameBoard[i])
    }
  }
  // Loop through and add a piece to an empty square then run callback
      for (let i = 0; i < gameBoard.length; i++) {
    setFutureBoard()
    if (futureBoard[i] === '') {
      futureBoard[i] = player
      // Callback to test the new board for potential winning combination
      if (spaceDouble(player, futureBoard, opponent) !== false) {
        futureBoard[i] = ''
        return i
      }
    }
  }
  return false
}

/* With new board loops through possible winning combination like above,
ubut only returns true only if the callback returns as true two times */
const spaceDouble = (player, testBoard, opponent) => {
 let tracker = 0
  for (let i = 0; i < winningSpaces.length; i++) {
    if (doubleWin(player, testBoard, winningSpaces[i], opponent)) {
      tracker += 1
    }
  }
  if (tracker === 2) {
    return true
  }
  return false
}
/* Callback to the spaceDouble Loops through pieces to see if opponent has
a piece in the winning combination. If yes, then returns false. Otherwise, it Loops
through again, and returns true if two pieces are occupied by the player  */
const doubleWin = (player, testBoard, winArray, opponent) => {
  let counter = 0
  for (let i = 0; i < winArray.length; i++) {
    if (testBoard[winArray[i]] === opponent) {
      return false
    }
  }
  for (let j = 0; j < winArray.length; j++) {
  if (testBoard[winArray[j]] === player) {
      counter += 1
    }
  }
  if (counter === 2) {
    return true
  } else {
    return false
  }
}
/*
a. Before this check for double jeapordy for player (Already written)
1. Loop through all moves See if any force a block
2. Play that block, check if opponent has double jeapordy
2a. If they do, return after block false
3. See if after opponent blocks if player can get double jeapordy, if yes #Winning
4. If no double jeapordy move, take best available
5. Write another
*/
module.exports = {
  makeMove,
  activePlayer,
  newGame,
  gameBoard,
  changePlayer,
  checkForWin,
  gameTied,
  computer,
  playerOne
}
