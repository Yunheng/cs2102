var React = require('react');
var reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
var LoginStore = require('../stores/LoginStore');
var ProjectStore = require('../stores/ProjectStore');
var ProjectAction = require('../actions/ProjectAction');
var UserSelectBar = require('./UserSelectBar');
var {countryCode} = require('../constants');
var ViewProjectsList = require('./ViewProjectsList');

var UserProjectsPage = React.createClass({
  mixins: [
    StateMixin.connect(LoginStore),
    StateMixin.connect(ProjectStore)
  ],
  getInitialState(){
    return ({newProject: false, selectedUsers: []});
  },
  componentDidMount(){
    ProjectAction.retrieveUserProjects(this.state.userId);
  },

  showCreateNewProject: function(){
    this.setState({newProject: true});
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
  createNewProject(){
    console.log(this.state.selectedUsers);
    ProjectAction.addNewProject({
      title: $('#projtitle').val(),
      description: $('#projdescription').val(),
      country: $('#country').val(),
      city: $('#city').val(),
      category: $('#category').val(),
      projectOwners: this.state.selectedUsers
    });
  },
  cancelCreateNew(){
    console.log('cancel');
    this.setState({newProject: false});
  },
  renderCountryOptions(){
    return countryCode.map(function(country){
      return <option key={country} value={country}>{country}</option>
    });
  },
  renderProjects(){
    return (
      <div className="projects">
        <div className="section-title">YOUR PROJECTS</div>
        <ViewProjectsList list={this.state.userProjects}/>
      </div>
    );
  },
  renderNewProjectPage(){
    return (
      <div className="new-project-page">
        <div className="title">Add New Project</div>
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
              <span className="line-text">Collaborators:</span>
              <UserSelectBar onSelection={this.onSelectUser} deleteUser={this.deleteUser} selectedUsers={this.state.selectedUsers}/>
            </div>
            <div className="form-line">
              <div className="cancel button" onClick={this.cancelCreateNew}>Cancel</div>
              <div className="submit button" onClick={this.createNewProject}>Create New</div>
            </div>
          </div>
      </div>
    )
  },

  render: function(){
    console.log(this.state);
    console.log('render');
    return (
      <div className="ProjectsPage">
        {!this.state.newProject ?
          this.state.userProjects.length > 0 ?
            this.renderProjects()
            :
            <div className="empty-project">You don't appear to have any projects created...</div>
          : null}
        <div className="add-new-project">
          {!this.state.newProject ?
            <div className="new button" onClick={this.showCreateNewProject}>Create Project</div>
            :
            this.renderNewProjectPage()}
        </div>
      </div>
    );
  }
});



export default UserProjectsPage;