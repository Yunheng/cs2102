var reflux = require('Reflux');

var TopBarActions = reflux.createActions([
  'checkLogin',
  'loginUser'
]);

module.exports = TopBarActions;