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

module.exports = {
  store,
  gameUpdate
}
