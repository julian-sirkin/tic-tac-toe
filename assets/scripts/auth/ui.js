const store = require('../store.js')
const gameUi = require('../gameplay/gameui.js')

const signUpSuccess = function () {
  $('#login-message').html('<h4>You have created a new Account</h4>')
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
  $('#login-container, #information').toggleClass('hidden')
  $('#login-form input').val('')
  $('#login-message').html('')
}
const logInFail = function () {
  $('#login-message').html('<h4> Please try again </h4>')
  $('#login-form input').val('')
}
const logOutSuccess = function (data) {
  gameUi.clearGameBoard()
  $('#old-games-info, #display').html('')
  $('#login-container, #information').toggleClass('hidden')
  $('#game-board').addClass('hidden')
  $('#display').html('<h1>Tic Tac Toe</h1>')
}
const logOutFail = function () {
  $('display').html('<h1> Try to log out again </h1>')
}
const changePasswordSuccess = function () {
  // gameUi.clearGameBoard()
  $('#change-password input').val('')
  //$('#old-games-info').html('')
  //$('$display').empty()
  /*$('#login-container, #information').toggleClass('hidden')
  $('#game-board').addClass('hidden')
  $('#display').html(`<h1>Tic Tac Toe</h1>`)*/
  $('#old-games-info').html('<h1>You have succesfully changed Your password</h1>')
}
const changePasswordFail = function () {
  $('#change-password input').val('')
  $('display').html('<h1> Try to change your password again </h1>')
  $('#old-games-info').html('<h4>Please try to change password again </h4>')
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
