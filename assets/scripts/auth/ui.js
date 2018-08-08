const store = require ('../store.js')
const signUpSuccess = function () {
alert('A great success')
}
const signUpFail = function () {
alert('failed miserably')
}
const logInSuccess = function () {
store.user = response.user
}
const logInFail = function () {
  alert('shame, shame, shame, shame')
}

module.exports = {
  signUpSuccess,
  signUpFail,
  logInSuccess,
  logInFail
}
