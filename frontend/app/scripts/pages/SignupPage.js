var React = require('react');
var utils = require('../utils');
import {render} from 'react-dom';

var TopBar = require('./../components/TopBar');
var SignupPage = React.createClass({

  render: function() {
    var isLogin = utils.getURLQuery() && utils.getURLQuery().type === 'login';
    return (
      <div className="SignupPage">
        <TopBar/>
        <div className="body">
          <div className="form">
            <h2>{isLogin ? 'Login below' : 'Sign up below'}</h2>
            <div className="form-line">
              <span className="line-text">Username:</span>
              <input type="text"/>
            </div>
            <div className="form-line">
              <span className="line-text">password:</span>
              <input type="password"/>
            </div>
            {isLogin ? null :
            <div className="form-line">
              <span className="line-text">email:</span>
              <input type="email"/>
            </div>}
            <button className="submit" onClick={this.handleClick.bind(this, isLogin)}>{isLogin ? 'Login' : 'Signup'}</button>

          </div>
        </div>
      </div>
    );
  },

  handleClick: function(isLogin){
    if(isLogin){
      console.log('doLoginstuff');
    }else{
      console.log('dosignupstuff');
    }
  }
});

render(<SignupPage/>, document.getElementById('content'));
