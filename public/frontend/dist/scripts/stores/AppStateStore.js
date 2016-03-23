var reflux = require('Reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
import AppActions from '../actions/AppStateAction';
//import LoginActions from '../actions/LoginAction';

var AppStateStore = reflux.createStore({
  mixins: [StateMixin],
  listenables: AppActions,
  getInitialState() {
    return ({
      currentPage: 'home'
    });
  },
  getSignupPage(){
    console.log('setState');
    this.setState({
      currentPage: 'UserSignup'
    });
  },
  getLoginPage(){
    this.setState({
      currentPage: 'UserLogin'
    });
  },
  getHomePage(){
    this.setState({
      currentPage: 'home'
    })
  },
  getUserManagement(){
    this.setState({
      currentPage: 'UserManagement'
    })
  }

});

module.exports = AppStateStore;