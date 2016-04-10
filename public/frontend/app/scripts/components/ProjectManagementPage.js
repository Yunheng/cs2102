var React = require('react');
var reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(reflux);


import ProjectStore from '../stores/ProjectStore';
import ProjectAction from '../actions/ProjectAction';
import AppAction from '../actions/AppStateAction';
var ProjectManagementPage = React.createClass({

  mixins: [StateMixin.connect(ProjectStore)],
  deleteProject(project){
    ProjectAction.deleteProject(project, function(){
      AppAction.getHomePage();
      AppAction.getProjectManagement();
    });
  },
  render: function(){
    console.log('page', this.state);
    if(this.state && this.state.projects && this.state.projects.length > 0) {
      return (
        <div className="UserManagementPage Page">
          <h2>Projects</h2>
          <table id="table">
            <thead>
            <tr>
              <th>Project Id</th>
              <th>title></th>
              <th>total raised</th>
              <th>registered date</th>
              <th>created by:</th>
              <th>delete?</th>
            </tr>
            </thead>
            <tbody>
              {this.state.projects.map(function(project){
                console.log(project);
                return(
                  <tr key={project.id}>
                    <th>{project.id}</th>
                    <th>{project.title}</th>
                    <th>{project.totalamt ? project.totalamt : 0}</th>
                    <th>{project.date_created}</th>
                    <th>{project.owners.map(function(owner){return <span key={owner.member}>{owner.member+ '\n'}</span>;})}</th>
                    <th onClick={this.deleteProject.bind(this, project)}>[x]</th>
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

module.exports = ProjectManagementPage;