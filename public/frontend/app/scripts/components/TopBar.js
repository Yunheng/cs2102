var React = require('react');
var StateMixin = require('reflux-state-mixin');
var LoginStore = require('../stores/LoginStore');
var actions = require('../actions/AppStateAction');
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
          <div className="signup" onClick={this.handleClick.bind(this, 'signup')}>Signup</div>
          <div className="login" onClick={this.handleClick.bind(this, 'login')}>Login</div>
        </div>
          :
        <div className="user-profile">
          <div className="username">Hello, {this.state.userId}!</div>
        </div>
        }
      </div>
    );
  },
  handleClick(action){
    if(action === 'signup'){
      console.log('signup');
      actions.getSignupPage();
    }else{
      actions.getLoginPage();
    }
  }
});

module.exports = TopBar;
