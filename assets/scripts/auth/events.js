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
  const data = getFormFields(event)
  api.logIn(data)
    .then(ui.logInSuccess)
    .catch(ui.logInFail)
}

const handlerController = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#login-form').on('submit', onSignIn)
}

module.exports = {
  handlerController
}
