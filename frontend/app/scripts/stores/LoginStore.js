var reflux = require('Reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
import action from '../actions/LoginAction';

var LoginStore = reflux.createStore({
  mixins: [StateMixin],
  listenables: action,

  getInitialState(){
    if(localStorage.userId) {
      return {userId: localStorage.userId};
    }else{
      return {userId: ''}
    }
  },

  checkLogin(){
    this.setState({user: localStorage.userId});
  },

  loginUser(user){
    this.setState({userId: user});
    localStorage.userId = user;
  }
});

module.exports = LoginStore;