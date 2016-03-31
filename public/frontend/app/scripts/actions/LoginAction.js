var reflux = require('Reflux');

var TopBarActions = reflux.createActions([
  'checkLogin',
  'loginUser',
  'signupUser',
  'userLogout',
  'testPassword',
  'changeUserDetails'
]);

module.exports = TopBarActions;