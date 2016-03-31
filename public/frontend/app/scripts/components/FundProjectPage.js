var React = require('react');
var reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
var ProjectsStore = require('../stores/ProjectStore');

var FundProjectPage = React.createClass({
  mixins: [StateMixin.connect(ProjectsStore)],


  render(){
    return (
      <div className="FundProjectPage">
        <div className="section">
          <div className="section-title">Enter Your Amount</div>
          <div className="row">
            <span className="dollar">$</span>
            <input id="amount" className="input-amount"/>
          </div>
        </div>
        <div className="section"></div>
      </div>
    );
  }
});

export default FundProjectPage;
