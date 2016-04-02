var reflux = require('Reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
var UserAction = require('../actions/UserAction');
var $ = require('jquery');

var TransactionStore = reflux.createStore({
  mixins: [StateMixin],
  listenables: [UserAction],
  getInitialState(){
    return ({
      transactions: []
    });
  },
  getUserTransactions(user){
    $.get('/api/user/' + user + '/transaction').then(function(data){
      this.setState({
        transactions: data
      });
    });
  }


});

export default TransactionStore;