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
    })
  },
  render(){
    console.log(this.state);
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
          <div className="fund button" onClick={this.fundProject}>Fund This Project!</div>
        </div>
          <FundingSidebar project={this.state.selectedProject} projectName={true} loggedIn={this.state.userId}/>
      </div>
    );
  }
});

export default FundProjectPage;
