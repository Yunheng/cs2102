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

  getUsers(){
    console.log('get users');
    $.get('/api/users')
      .done(function(data){
      console.log(data);
        this.setState({users: data});
    }.bind(this))
      .fail(function(error){

      }.bind(this)
    );
  }
});

module.exports = UserManagementStore;