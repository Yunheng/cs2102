var React = require('react');
var reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
var LoginStore = require('../stores/LoginStore');
var UserManagementStore = require('../stores/UserManagementStore');
var $ = require('jquery');
var AppStateAction = require('../actions/AppStateAction');
var ProjectStore = require('../stores/ProjectStore');
var ProjectAction = require('../actions/ProjectAction');
var UserSelectBar = require('./UserSelectBar');
var {countryCode} = require('../constants');

var EditProjectPage = React.createClass({
  mixins: [
    StateMixin.connect(ProjectStore),
    StateMixin.connect(UserManagementStore)
  ],

  getInitialState(){
    AppStateAction.getUsers()
    return ({selectedUsers: []});
  },

  deleteUser(user){
    this.setState({selectedUsers:
      this.state.selectedUsers.filter(function(selectedUser){
        return user.username !== selectedUser.username;
      })
    });
  },
  onSelectUser(user){
    console.log('onSelection');
    this.setState({
      selectedUsers: [...this.state.selectedUsers, user],
      selectBarShown: false
    })
  },
  renderCountryOptions(){
    return countryCode.map(function(country){
      return <option key={country} value={country}>{country}</option>
    });
  },
  cancel(){
    AppStateAction.getViewProjectPage();
  },
  update(){
    ProjectAction.updateProject(
      {
        title: $('#projtitle').val(),
        description: $('#projdescription').val(),
        country: $('#country').val(),
        city: $('#city').val(),
        category: $('#category').val(),
        id: this.state.selectedProject.id
      }
    );
  },
  componentDidMount(){
    var proj = this.state.selectedProject;
    console.log('proj', proj);
    $('#projtitle').val(proj.title);
    $('#projdescription').val(proj.description);
    $('#country').val(proj.country);
    $('#city').val(proj.city);
    $('#category').val(proj.category);
    this.setState({
      selectedUsers: proj.owners.map(function(owner){
        owner.username=owner.member;
        return owner;
      })
    });
  },
  render(){
    return (
      <div className="EditProjectPage">
        <div className="title">Edit Project</div>
        <div className="form">
          <div className="form-line">
            <span className="line-text">Project Title:</span>
            <input type="text" id="projtitle"/>
          </div>
          <div className="form-line">
            <span className="line-text">Project Description:</span>
            <textarea rows="3" type="text" id="projdescription"/>
          </div>
          <div className="form-line">
            <span className="line-text">Country:</span>
            <select id="country">
              {this.renderCountryOptions()}
            </select>
          </div>
          <div className="form-line">
            <span className="line-text">City:</span>
            <input type="text" id="city"/>
          </div>
          <div className="form-line">
            <span className="line-text">Category:</span>
            <input type="text" id="category"/>
          </div>
          <div className="form-line">
            <div className="msg">{this.state.projMsg}</div>
          </div>
          <div className="form-line">
            <div className="cancel button" onClick={this.cancel}>Cancel</div>
            <div className="submit button" onClick={this.update}>Update Project</div>
          </div>
        </div>
      </div>
    );
  }
});

export default EditProjectPage;