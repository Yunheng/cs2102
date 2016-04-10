var React = require('react');
var reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
var LoginStore = require('../stores/LoginStore');
var AppActions = require('../actions/AppStateAction');
var LoginActions = require('../actions/LoginAction');
var UserActions = require('../actions/UserAction');
var TopBar = React.createClass({
  mixins: [StateMixin.connect(LoginStore)],
  viewUserProfile(){
    AppActions.getUsers();
    window.setTimeout(function(){
      UserActions.selectUserById(this.state.userId);
      AppActions.getUserPage();
    }.bind(this), 500);
  },
  render: function() {
    return (
      <div className="TopBar">
        <div className="logo">
          <div className="logo-mount" onClick={AppActions.getHomePage}></div>
        </div>
        {!this.state.userId ?
        <div className="user-action">
          <div className="signup" onClick={AppActions.getSignupPage}>Signup</div>
          <div className="login" onClick={AppActions.getLoginPage}>Login</div>
        </div>
          :
        <div className="user-profile">
          {this.state.userId === 'admin' ?
            <div className="user-profile">
              <div className="user button" onClick={AppActions.getUserManagement}>Manage Users</div>
              <div className="projects button" onClick={AppActions.getProjectManagement}>Manage Projects</div>
              <div className="logout button" onClick={this.userLogout}>Logout</div>
            </div>
            :
            <div className="user-profile">
              <div className="username"><span className="hello">Hello</span> <span className="name" onClick={this.viewUserProfile}>{this.state.userId}</span>!</div>
              <div className="projects button" onClick={AppActions.getUserProjectsPage}>Manage Projects</div>
              <div className="logout button" onClick={this.userLogout}>Logout</div>
            </div>
          }
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
