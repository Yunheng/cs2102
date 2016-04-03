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
        <div className="title">Your Transactions</div>
          <table id="table">
            <thead>
            <tr>
              <th>Transaction Code</th>
              <th>amount</th>
              <th>type</th>
            </tr>
            </thead>
            <tbody>
            {this.state.transactions.map(function(xact){
              return(
                <tr key={xact.code}>
                  <th>{xact.code}</th>
                  <th>{xact.amount}</th>
                  <th>{xact.type}{xact.type == 'Debit ' ? '(refund)' : ''}</th>
                </tr>
              );
            })}
            </tbody>
          </table>
      </div>
    );
  }
});

export default ViewTransactionPage;