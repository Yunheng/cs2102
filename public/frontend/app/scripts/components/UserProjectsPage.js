var React = require('react');
var reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
var LoginStore = require('../stores/LoginStore');
var ProjectStore = require('../stores/ProjectStore');
var ProjectAction = require('../actions/ProjectAction');
var DatePicker = require('react-datetime');
var UserSelectBar = require('./UserSelectBar');
var moment = require('moment');

var {countryCode, category} = require('../constants');
var ViewProjectsList = require('./ViewProjectsList');

var UserProjectsPage = React.createClass({
  mixins: [
    StateMixin.connect(LoginStore),
    StateMixin.connect(ProjectStore)
  ],
  getInitialState(){
    return ({newProject: false, selectedUsers: [], date: moment().add(7, 'days')});
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
      targetAmount: $('#targetAmt').val(),
      date_close: this.state.date.format(),
      projectOwners: this.state.selectedUsers
    });
  },
  cancelCreateNew(){
    console.log('cancel');
    this.setState({newProject: false});
  },
  renderOptions(type){
    switch(type){
      case 'country': return countryCode.map(function (country) {
        return <option key={country} value={country}>{country}</option>
      });
      case 'category': return category.map(function (cat) {
        return <option key={cat} value={cat}>{cat}</option>
      });
    }

  },
  handleDate(date){
    this.setState({date: date});
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
              <span className="line-text">Target Amount:</span>
              $<input type="text" id="targetAmt" defaultValue="1"/>
            </div>
            <div className="form-line">
              <span className="line-text">Closing Date:</span>
              <DatePicker onChange={this.handleDate}
                          defaultValue={this.state.date}
                          isValidDate={function(date){
                            var today = moment();
                            return (today.add(6, 'days').isBefore(date) && today.add(12, 'months').isAfter(date));
                          }}
                          timeFormat={false}
                          dateFormat="DD MMM YYYY"
                          closeOnSelect={true}
              />
            </div>
            <div className="form-line">
              <span className="line-text">Category:</span>
              <select id="category">
                {this.renderOptions('category')}
              </select>
            </div>
            <div className="form-line">
              <span className="line-text">Country:</span>
              <select id="country">
                {this.renderOptions('country')}
              </select>
            </div>
            <div className="form-line">
              <span className="line-text">City:</span>
              <input type="text" id="city"/>
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
    // console.log(this.state);
    // console.log('render');
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

//<input id="pick-date" className="pick-date" placeholder="click to pickdate" onClick={this.togglePickDate}></input>