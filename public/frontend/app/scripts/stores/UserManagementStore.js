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
        selectedUser: this.state.users.filter(function(u){
          console.log(u);
          return u.username === user;
        }.bind(this))[0]
      })
    }
  },
  getUsers(){
    // console.log('get users');
    var users;
    $.when($.get('/api/users')
      .done(function(data){
      console.log(data);
        users = data;
        data.forEach(function(user, i){
          $.get('/api/user/' + user.username +'/backing').done(function(backing){
            users[i].backing = backing;
          });
        });
    }.bind(this))
      .fail(function(error){

      }.bind(this)
    )).then(function(){
      console.log(users);
      this.setState({users: users});
    }.bind(this));
  },
  deleteUser(username){
    $.ajax({
      type: 'DELETE',
      url: '/api/user/' + username
    }).done(function(data){
      fn(true);
    });
  }
});

module.exports = UserManagementStore;