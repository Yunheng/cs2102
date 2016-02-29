var reflux = require('Reflux');

var TopBarActions = reflux.createActions([
  'checkLogin',
  'loginUser',
  'signupUser'
]);

module.exports = TopBarActions;