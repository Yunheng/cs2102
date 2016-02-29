var reflux = require('Reflux');

var AppStateAction = reflux.createActions([
  'getSignupPage',
  'getLoginPage',
  'getUserManagement',
  'getHomePage'
]);

module.exports = AppStateAction;