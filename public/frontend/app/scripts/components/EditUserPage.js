var React = require('react');
var reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
var $ = require('jquery');
var UserManagementStore = require('../stores/UserManagementStore');
var LoginStore = require('../stores/LoginStore');
var AppStateAction = require('../actions/AppStateAction');
var LoginAction = require('../actions/LoginAction');
var EditUserPage = React.createClass({
  mixins: [
    StateMixin.connect(UserManagementStore),
    StateMixin.connect(LoginStore)
  ],
  cancel(){
    AppStateAction.getUserPage();
  },
  changeDetails(){
    LoginAction.changeUserDetails({
      address: $('#address').val(),
      email: $('#email').val(),
      user: this.state.selectedUser.username
    });
  },

  changePw(){
    LoginAction.testPassword(this.state.selectedUser.username, $('#old').val(), $('#new').val());
  },

  componentDidMount(){
    $('#email').val(this.state.selectedUser.email);
    $('#address').val(this.state.selectedUser.address);
  },
  renderEditUser(){
    return (
      <div className="EditUserPage">
        <div className="section-title">Edit User</div>
        <div className="field-line">
          <span className="field-title">Username</span>
          <div className="username">{this.state.selectedUser.username}</div>
        </div>
        <div className="field-line">
          <span className="field-title">Email</span>
          <input className="field" id="email"/>
        </div>
        <div className="field-line">
          <span className="field-title">Address</span>
          <input className="field" id="address"/>
        </div>

        <div className="field-line message">{this.state.loginError}</div>
        <div className="field-line-button">
          <div className="cancel button" onClick={this.cancel}>Cancel</div>
          <div className="changePw button" onClick={AppStateAction.getChangePwPage}>Change Password</div>
          <div className="save button"onClick={this.changeDetails}>Save Changes</div>
        </div>
      </div>
    )

  },
  renderChangePw(){
    return (
      <div className="EditUserPage">
        <div className="section-title">Edit User</div>
        <div className="field-line">
          <span className="field-title">Username</span>
          <div className="username">{this.state.selectedUser.username}</div>
        </div>
        <div className="field-line">
          <span className="field-title">Old Password</span>
          <input type="password" className="field" id="old"/>
        </div>
        <div className="field-line">
          <span className="field-title">New Password</span>
          <input type="password" className="field" id="new"/>
        </div>
        <div className="field-line message">{this.state.loginError}</div>
        <div className="field-line-button">
          <div className="cancel button" onClick={this.cancel}>Cancel</div>
          <div className="save button" onClick={this.changePw}>Confirm</div>
        </div>
      </div>
    );
  },
  render(){
    if(this.props.state === 'EditUser') return this.renderEditUser();
    else return this.renderChangePw();
  }
});

export default EditUserPage;