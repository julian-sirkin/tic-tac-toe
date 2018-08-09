// Board defined

let gameBoard = ['', '', '', '', '', '', '', '', '']
const playerOne = 'X'
const playerTwo = 'O'
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


// Marks board with X or O and marks the javascript
// Game board with X or O at same index

const selectSpace = function () {
  $('#game-board td').click(function() {
  if (gameBoard[this.id] == '') {
    $(this).text(activePlayer)
    gameBoard[this.id] = activePlayer
    checkForWin() ? alert('Winner Winner Chicken Dinner') : changePlayer()
  } else {
  alert('Pick another space')
    }
  })
}


// Switch Player
const changePlayer = function () {
  if (activePlayer === playerOne) {
    activePlayer = playerTwo
  } else if ( activePlayer === playerTwo) {
    activePlayer = playerOne
  }
}

// Check for win.....
const checkForWin = function () {
for (var i = 0; i < winningSpaces.length; i++) {
  if (checkPlayer(winningSpaces[i])) {
    return true
    }
  }
  return false
}
// callback
const checkPlayer = (combo) => {
  for (var i = 0; i < combo.length; i++) {
    if (gameBoard[combo[i]] !== activePlayer) {
  return false
      }
  }
  return true
}

module.exports = {
selectSpace
}
