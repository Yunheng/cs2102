var React = require('react');
var reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
var TransactionStore = require('../stores/TransactionStore');
var LoginStore = require('../stores/LoginStore');

var ViewTransactionPage = React.createClass({
  mixins: [
    StateMixin.connect(TransactionStore),
    StateMixin.connect(LoginStore)
  ],
  render(){
    return (
      <div className="ViewTransactionPage">
        Your Transactions
        <div className="xact-list">
          
        </div>
      </div>
    );
  }
});

export default ViewTransactionPage;