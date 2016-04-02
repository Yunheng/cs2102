var React = require('react');
var reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
var $ = require('jquery');
var ProjectsStore = require('../stores/ProjectStore');
var LoginStore = require('../stores/LoginStore');
var FundingSidebar = require('./FundingSideBar');
var AppAction = require('../actions/AppStateAction');
var UserAction = require('../actions/UserAction');
var ProjectAction = require('../actions/ProjectAction');
var UserManagementStore = require('../stores/UserManagementStore');
var FundProjectPage = React.createClass({
  mixins: [
    StateMixin.connect(ProjectsStore),
    StateMixin.connect(LoginStore),
    StateMixin.connect(UserManagementStore)
  ],
  getInitialState(){
    this.setState({fundSuccess: false, fundingDetails: {}});
  },
  componentDidMount(){
    AppAction.getUsers();
    window.setTimeout(function(){
      UserAction.selectUser(this.state.userId, true);
    }.bind(this), 500);
  },

  fundProject(){
    ProjectAction.fundProject({
      username: this.state.userId,
      amt: $('#amount').val(),
      project: this.state.selectedProject.id,
      address: this.state.selectedUser.address
    }, function(fundingDetails){
      this.setState({fundSuccess: true, fundingDetails: fundingDetails});
    }.bind(this))
  },
  render(){
    console.log(this.state);
    if(!this.state.fundSuccess) {
      return (
        <div className="FundProjectPage">
          <div className="section">
            <div className="section-title">Enter Your Amount</div>
            <div className="row amount">
              <span className="dollar">$</span>
              <input id="amount" type="number" className="input-amount" defaultValue='1' min="1"/>
            </div>
            <div className="section-title-small">Your Information</div>
            <div className="field-title">Your Username</div>
            <div className="field">{this.state.userId}</div>
            <div className="field-title">Your Email</div>
            {this.state.selectedUser ? <div className="field">{this.state.selectedUser.email}</div> : null}
            <div className="field-title">Your Address</div>
            {this.state.selectedUser ? <div className="field">{this.state.selectedUser.address}</div> : null}
            <div className="fund button" onClick={this.fundProject}>Back This Project!</div>
          </div>
          <FundingSidebar project={this.state.selectedProject} projectName={true} loggedIn={this.state.userId}/>
        </div>
      );
    }else{
      return (
        <div className="FundProjectPage">
          <div className="section">
            <div className="section-title">You got this project's back!</div>
            <div className="field-title">Receipt No:</div>
            <div className="field">{this.state.fundingDetails.receiptNo}</div>
            <div className="field-title">Amount:</div>
            <div className="field">${this.state.fundingDetails.amt}</div>

          </div>
          <FundingSidebar manualIncrement={this.state.fundingDetails.amt} project={this.state.selectedProject} projectName={true} loggedIn={this.state.userId}/>
        </div>
      );
    }
  }
});

export default FundProjectPage;
