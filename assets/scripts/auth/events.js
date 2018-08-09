'use strict'
const getFormFields = require('../../../lib/get-form-fields.js')
const gameLogic = require('../gameplay/game-logic.js')
const api = require('./api.js')
const ui = require('./ui.js')


const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFail)
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.logIn(data)
    .then(ui.logInSuccess)
    .catch(ui.logInFail)
}
const onLogOut = function (event) {
  event.preventDefault()
  console.log('Literally anything')
  api.logOut()
    .then(ui.logOutSuccess)
    .catch(ui.logOutFail)
}
const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFail)
}
const handlerController = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#login-form').on('submit', onSignIn)
  $('#log-out').on('submit', onLogOut)
  $('#change-password').on('submit', onChangePassword)
  gameLogic.selectSpace()
}

module.exports = {
  handlerController
}
