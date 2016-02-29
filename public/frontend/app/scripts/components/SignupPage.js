var React = require('react');
var reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
import LoginStore from '../stores/LoginStore';
import actions from '../actions/LoginAction';


var SignupPage = React.createClass({
  mixins: [StateMixin.connect(LoginStore)],

  render: function() {
    var isLogin = this.props.state === 'login';
    return (
      <div className="SignupPage Page">
        <div className="body">
          <div className="form">
            <h2 className="header">{isLogin ? 'Login below' : 'Sign up below'}</h2>
            <div className="form-line">
              <span className="line-text">Username:</span>
              <input type="text" id="username"/>
            </div>
            <div className="form-line">
              <span className="line-text">password:</span>
              <input type="password" id="password"/>
            </div>
            {isLogin ? null :
            <div className="form-line">
              <span className="line-text">email:</span>
              <input type="email" id="email"/>
            </div>
            }
            {isLogin ? null :
              <div className="form-line">
                <span className="line-text">address:</span>
                <input type="address" id="address"/>
              </div>
            }
            {isLogin ? null :
              <div className="form-line">
                <span className="line-text">choose image:</span>
                <input type="file" id="file"/>
              </div>
            }
            <button className="submit" onClick={this.handleClick.bind(this, isLogin)}>{isLogin ? 'Login' : 'Signup'}</button>
            {this.state && this.state.loginError ? <div className="error">{this.state.loginError}</div> : null}
          </div>
        </div>
      </div>
    );
  },

  handleClick: function(isLogin, e){
  e.preventDefault();
    if(isLogin){
      actions.checkLogin(
        document.getElementById('username').value,
        document.getElementById('password').value
      );
    }else{
      actions.signupUser(
        document.getElementById('username').value,
        document.getElementById('password').value,
        document.getElementById('email').value,
        $('#file').prop('files')[0],
        document.getElementById('address').value
      );
    }
  }
});


module.exports = SignupPage;