const store = require('../store.js')
const gameApi = require('../gameplay/gameapi.js')
const gameUi = require('../gameplay/gameui.js')

const signUpSuccess = function () {
  alert('A great success')
}
const signUpFail = function () {
  alert('failed miserably')
}
const logInSuccess = function (data) {
  store.user = data.user
  $('#login-container, #information').toggleClass('hidden')
  gameApi.newGame()
    .then(gameUi.newGameSuccess)
    .catch(gameUi.newGameFail)
}
const logInFail = function () {
  alert('Failed login')
}
const logOutSuccess = function (data) {
  $('#login-container, #information').toggleClass('hidden')
}
const logOutFail = function () {
  console.log('You are trapped here forever!')
}
const changePasswordSuccess = function () {
  $('#login-container, #information').toggleClass('hidden')
}
const changePasswordFail = function () {
  alert('BOOOO, BOOOOO, BOOOOO, Boooo princess buttercup')
}

module.exports = {
  signUpSuccess,
  signUpFail,
  logInSuccess,
  logInFail,
  logOutSuccess,
  logOutFail,
  changePasswordSuccess,
  changePasswordFail
}
