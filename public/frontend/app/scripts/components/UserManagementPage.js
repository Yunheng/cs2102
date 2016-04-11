var React = require('react');
var reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(reflux);


import UserManagementStore from '../stores/UserManagementStore';
import UserAction from '../actions/UserAction';
import AppAction from '../actions/AppStateAction';
var UserManagementPage = React.createClass({

  mixins: [StateMixin.connect(UserManagementStore)],
  deleteUser(username){
    UserAction.deleteUser(username, function(){
      AppAction.getHomePage();
      AppAction.getUserManagement();
    });
  },
  render: function(){
    if(this.state && this.state.users && this.state.users.length > 0) {
      return (
        <div className="UserManagementPage Page">
          <h2>Users</h2>
          <table id="table">
            <thead>
            <tr>
              <th>Username</th>
              <th>email</th>
              <th>address</th>
              <th>registered_date</th>
            </tr>
            </thead>
            <tbody>
              {this.state.users.map(function(user){
                return(
                  <tr key={user.username}>
                    <th>{user.username}</th>
                    <th>{user.email}</th>
                    <th>{user.address}</th>
                    <th>{user.registered_date}</th>
                  </tr>
                );
              }.bind(this))}
            </tbody>
          </table>
        </div>
      );
    }else return (<div className="message">Waiting for data...</div>);
  }
});

module.exports = UserManagementPage;