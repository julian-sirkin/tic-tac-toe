const store = require('../store.js')
const signUpSuccess = function () {
alert('A great success')
}
const signUpFail = function () {
alert('failed miserably')
}
const logInSuccess = function (data) {
  store.user = data.user
console.log(store.user)
}
const logInFail = function () {
  alert('shame, shame, shame, shame')
}
const logOutSuccess = function (data) {
  alert('you are logged out now')
}
const logOutFail = function () {
  console.log('You are trapped here forever!')
}
const changePasswordSuccess = function () {
  alert('You have changed your password')
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
