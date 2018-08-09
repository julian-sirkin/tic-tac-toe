const store = require('../store.js')

const newGameSuccess = function (data) {
  store.game = data.game
}
const newGameFail = function () {
  alert('No new game created')
}
const makeMoveSuccess = function (data) {
store.game = data.game
alert('Winning')
}

const makeMoveFail = function () {
  alert('Complete failure')
}





module.exports = {
  newGameSuccess,
  newGameFail,
  makeMoveSuccess,
  makeMoveFail
}
