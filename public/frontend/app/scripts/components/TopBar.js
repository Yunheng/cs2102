var React = require('react');
var StateMixin = require('reflux-state-mixin');
var LoginStore = require('../stores/LoginStore');
var AppActions = require('../actions/AppStateAction');
var LoginActions = require('../actions/LoginAction');
var TopBar = React.createClass({
  mixins: [StateMixin.connect(LoginStore)],
  render: function() {
    return (
      <div className="TopBar">
        <div className="logo">
          <div className="logo-mount"></div>
        </div>
        {!this.state.userId ?
        <div className="user-action">
          <div className="signup" onClick={AppActions.getSignupPage}>Signup</div>
          <div className="login" onClick={AppActions.getLoginPage}>Login</div>
        </div>
          :
        <div className="user-profile">
          <div className="username"><span className="hello">Hello</span> {this.state.userId}!</div>
          <div className="manage-users button" onClick={AppActions.getUserManagement}>Manage Users</div>
          <div className="projects button" onClick={AppActions.getUserProjectsPage}>Manage Projects</div>
          <div className="logout button" onClick={this.userLogout}>Logout</div>

        </div>
        }
      </div>
    );
  },
  userLogout(){
    LoginActions.userLogout();
  }
});

module.exports = TopBar;
