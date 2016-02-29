var reflux = require('Reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
import action from '../actions/LoginAction';

var LoginStore = reflux.createStore({
  mixins: [StateMixin],
  listenables: action,

  getInitialState(){
    if (localStorage.userId) {
      return {
        userId: localStorage.userId,
        loginError: ''
      };
    } else {
      return {
        userId: '',
        loginError: ''
      }
    }
  },

  checkLogin(){
    this.setState({user: localStorage.userId});
  },

  loginUser(user, password){
    //check with db
    this.setState({userId: user});
    localStorage.userId = user;
  },
  signupUser(user, password, email, address){
    //check with db
  }
});

module.exports = LoginStore;