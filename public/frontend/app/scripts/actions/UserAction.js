var reflux = require('Reflux');

var UserAction = reflux.createActions([
  'selectUser',
  'selectUserById'
]);

module.exports = UserAction;