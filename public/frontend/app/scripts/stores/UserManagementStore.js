var reflux = require('Reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
var $ = require('jquery');
import actions from '../actions/AppStateAction';
import UserAction from '../actions/UserAction';

var UserManagementStore = reflux.createStore({
  mixins: [StateMixin],
  listenables: [actions, UserAction],
  getInitialState(){
    return ({
      users: [],
      selectedUser: {}
    });
  },
  selectUserById(id){
    // console.log(this.state.users);
    this.setState({selectedUser: this.state.users.filter(function(user){
      return id === user.username;
    })[0]});
  },
  selectUser(user, fromList){
    if(!fromList) this.setState({selectedUser: user});
    else{
      this.setState({
        
      })
    }
  },
  getUsers(){
    // console.log('get users');
    $.get('/api/users')
      .done(function(data){
      // console.log(data);
        this.setState({users: data});
    }.bind(this))
      .fail(function(error){

      }.bind(this)
    );
  }
});

module.exports = UserManagementStore;