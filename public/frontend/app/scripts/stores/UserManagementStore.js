var reflux = require('Reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
var $ = require('jquery');
import actions from '../actions/AppStateAction';

var UserManagementStore = reflux.createStore({
  mixins: [StateMixin],
  listenables: actions,
  getInitialState(){
    return ({
      users: []
    });
  },

  getUserManagement(){
    console.log('get users');
    $.get('/api/user/show', function(data, error){
      console.log(data);
      console.log(error);
    })
  }
});

module.exports = UserManagementStore;