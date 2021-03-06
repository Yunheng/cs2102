var React = require('react');
var reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
var UserManagementStore = require('../stores/UserManagementStore');
var ProjectStore = require('../stores/ProjectStore');
var LoginStore = require('../stores/LoginStore');
var AppStateAction = require('../actions/AppStateAction');
var UserAction = require('../actions/UserAction');
var ViewProjectsList = require('./ViewProjectsList');

var ViewUserPage = React.createClass({
  mixins: [
    StateMixin.connect(UserManagementStore),
    StateMixin.connect(ProjectStore),
    StateMixin.connect(LoginStore)
  ],
  editUser(){
    AppStateAction.getEditUserPage();
  },
  changePw(){
    AppStateAction.getChangePwPage();
  },
  isUser(){
    return this.state.userId === this.state.selectedUser.username;
  },
  viewXact(){

    UserAction.getUserTransactions(this.state.userId);
    AppStateAction.getUserTransactionPage();
  },
  render(){
    var user = this.state.selectedUser;
    var createdList = this.state.projects.filter(function(project) {
      return project.owners.some(function(owner){
        var user= owner.member ? owner.member : owner.username;
        return user === this.state.selectedUser.username;
      }.bind(this));
    }.bind(this));

    var backedList = this.state.projects.filter(function(project){
      return this.state.selectedUser.backing.some(function(backed){
        return backed.id === project.id;
      }.bind(this));
    }.bind(this));

    return (
     <div className="ViewUserPage">
       <div className="section-title">User Profile</div>
       {this.isUser ?
         <div className="edit-user">
          <div className="edit-details button" onClick={this.editUser}>Edit details</div>
          <div className="change-pw button" onClick={this.changePw}>Change Password</div>
           <div className="View-xact button" onClick={this.viewXact}>View Transactions</div>
         </div>
         : null}
       <div className="user-details">
         <div className="field-line">
           <span className="field-title">username</span>
           <span className="username">{user.username}</span>
         </div>
         <div className="field-line">
           <span className="field-title">email</span>
           <span className="email">{user.email}</span>
         </div>
         <div className="field-line">
           <span className="field-title">address</span>
           <span className="email">{user.address}</span>
         </div>
       </div>
       {createdList.length ? <div className="section-title">Projects Involved</div> : null}
       <ViewProjectsList list={createdList}/>
       {this.state.selectedUser.backing.length ? <div className="section-title">Projects Backed</div> : null}
       <ViewProjectsList list={backedList}/>

     </div>
    );
  }
});

export default ViewUserPage;