var reflux = require('Reflux');

var AppStateAction = reflux.createActions([
  'getSignupPage',
  'getLoginPage',
  'getUserManagement',
  'getUsers',
  'getHomePage',
  'getUserProjectsPage',
  'getViewProjectPage',
  'getEditProjectPage',
  'getUserPage',
  'getEditUserPage',
  'getChangePwPage',
  'getFundProjectPage'
]);

module.exports = AppStateAction;