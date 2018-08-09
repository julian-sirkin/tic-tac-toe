const store = require('../store.js')

const newGameSuccess = function (data) {
  console.log(data)
  store.game = data.game
}
const newGameFail = function () {
  alert('No new game created')
}

module.exports = {
  newGameSuccess,
  newGameFail
}
