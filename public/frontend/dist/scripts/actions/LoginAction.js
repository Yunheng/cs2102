var reflux = require('Reflux');

var TopBarActions = reflux.createActions([
  'checkLogin',
  'loginUser',
  'signupUser',
  'userLogout'
]);

module.exports = TopBarActions;