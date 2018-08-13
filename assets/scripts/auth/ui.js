const store = require('../store.js')
const gameApi = require('../gameplay/gameapi.js')
const gameUi = require('../gameplay/gameui.js')

const signUpSuccess = function () {
  alert('succeeded greatly! ')
  $('#sign-up input').val('')
}
const signUpFail = function () {
  $('#sign-up input').val('')
  $('#login-message').html('')
  if (store.passWorMatch === false) {
    $('#login-message').html('<h4> Make sure your passwords match </h4>')
  } else {
    $('#login-message').html('<h4> Please try again </h4>')
  }
}
const logInSuccess = function (data) {
  store.user = data.user
  $('#login-container, #information, #game-board').toggleClass('hidden')
  $('#login-form input').val('')
  $('#login-message').html('')
  gameApi.newGame()
    .then(gameUi.newGameSuccess)
    .catch(gameUi.newGameFail)
}
const logInFail = function () {
  $('#login-message').html('<h4> Please try again </h4>')
}
const logOutSuccess = function (data) {
  $('#old-games-info').html('')
  $('#login-container, #information, #game-board').toggleClass('hidden')
  $('#display').html(`<h1>Tic Tac Toe</h1>`)
}
const logOutFail = function () {
  $('display').html('<h1> Try to log out again </h1>')
}
const changePasswordSuccess = function () {
  $('#change-password input, old-games-info').val('')
  $('#login-container, #information, #game-board').toggleClass('hidden')
}
const changePasswordFail = function () {
  $('display').html('<h1> Try to change your password again </h1>')
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
