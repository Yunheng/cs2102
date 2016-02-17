var React = require('react');
var StateMixin = require('reflux-state-mixin');
var LoginStore = require('../stores/LoginStore');

var TopBar = React.createClass({
  mixins: [StateMixin.connect(LoginStore)],
  render: function() {
    return (
      <div className="TopBar">
        <a href="home.html"><div className="logo" href="home.html"></div></a>
        {!this.state.userId ?
        <div className="user-action">
          <a href="signuppage.html?type=signup"><div className="signup">Signup</div></a>
        <a href="signuppage.html?type=login"><div className="login">Login</div></a>
        </div>
          :
        <div className="user-profile">
          <div className="username">Hello, {this.state.userId}!</div>
        </div>
        }
      </div>
    );
  }
});

module.exports = TopBar;
