var reflux = require('Reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
import action from '../actions/AppStateAction';

var AppStateStore = reflux.createStore({
  mixins: [StateMixin],
  listenables: action,
  getInitialState() {
    return ({
      currentPage: 'home'
    });
  },
  getSignupPage(){
    console.log('setState');
    this.setState({
      currentPage: 'userSignup'
    });
  },
  getLoginPage(){
    this.setState({
      currentPage: 'userLogin'
    });
  }

});

module.exports = AppStateStore;