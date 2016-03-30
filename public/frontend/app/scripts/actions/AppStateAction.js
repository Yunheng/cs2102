var reflux = require('Reflux');

var AppStateAction = reflux.createActions([
  'getSignupPage',
  'getLoginPage',
  'getUserManagement',
  'getUsers',
  'getHomePage',
  'getUserProjectsPage',
  'getViewProjectPage'
]);

module.exports = AppStateAction;