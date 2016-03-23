var React = require('react');
var reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
var UserManagementStore = require('../stores/UserManagementStore');
var LoginStore = require('../stores/LoginStore');
var OfflineSearchList = require('./offLineSearchList');
var AppActions = require('../actions/AppStateAction');


var UserSelectBar = React.createClass({
  mixins: [
    StateMixin.connect(UserManagementStore),
    StateMixin.connect(LoginStore)
  ],
  getInitialState(){
    return ({
      selectBarShown: false,
    });
  },
  componentDidMount(){
    AppActions.getUsers();
  },

  showSearchBar(){
    this.setState({selectBarShown: true});
  },
  onSelection(user){
    this.setState({selectBarShown: false});
    this.props.onSelection(user);
  },
  deleteUser(user){
    this.props.deleteUser(user);
  },
  render(){
    return(
      <div className="UserSelectBar">
        {this.props.selectedUsers.map(function(user){
          return (
            <div key={user.username} className="user-line">
              <span className="username">{user.username}</span>
              <span className="delete" onClick={this.deleteUser.bind(this, user)}>[x]</span>
            </div>
          );
        }.bind(this))}
        {this.state.selectBarShown ?
          <div className="user-search">
            <OfflineSearchList onSelection={this.onSelection} list={this.state.users} selectedList={this.props.selectedUsers}/>
          </div>
          :
          <div className="add-user button" onClick={this.showSearchBar}>Add User</div>
            }
      </div>
    )
  }
});

export default UserSelectBar;