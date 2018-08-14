'use strict'
let win
let tiedGame
const store = {
}
let gameUpdate = {
  game: {
    cell: {
      index: NaN,
      value: 'x'
    },
    over: false
  }
}
let currentPlayer = function () {
  if (gameUpdate.game.cell.value === 'X') {
    return 'O'
  } else {
    return 'X'
  }
}
module.exports = {
  store,
  gameUpdate,
  currentPlayer
}
