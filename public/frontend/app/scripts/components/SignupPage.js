var React = require('react');
import actions from '../actions/LoginAction';
var SignupPage = React.createClass({

  render: function() {
    var isLogin = this.props.state === 'login';
    return (
      <div className="SignupPage">
        <div className="body">
          <div className="form">
            <h2>{isLogin ? 'Login below' : 'Sign up below'}</h2>
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
            <button className="submit" onClick={this.handleClick.bind(this, isLogin)}>{isLogin ? 'Login' : 'Signup'}</button>

          </div>
        </div>
      </div>
    );
  },

  handleClick: function(isLogin){
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
        document.getElementById('address').value
      );
    }
  }
});


module.exports = SignupPage;