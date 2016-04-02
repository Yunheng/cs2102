var reflux = require('Reflux');

var UserAction = reflux.createActions([
  'selectUser',
  'selectUserById',
  'getUserTransactions'
]);

module.exports = UserAction;