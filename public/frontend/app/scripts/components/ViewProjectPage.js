var React = require('react');
var reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
var ProjectsStore = require('../stores/ProjectStore');
var ViewProjectPage = React.createClass({
  mixins: [StateMixin.connect(ProjectsStore)],
  render(){
    var fakeData = {owners: ['nate', 'ned', 'mate']};
    console.log(this.state);
    if(this.state.selectedProject) {
      var project = this.state.selectedProject;
      return (
        <div className="ViewProjectPage">
          <div className="project-info">
            <div className="project-title">{project.title}</div>
            <div className="project-details">
              <div className="project-owner">
                Project by: {fakeData.owners.map(function(owner){
                  return <span className="owner">{owner}</span>
                })}
              </div>
              <div className="project-location">
                Location: {project.city}, {project.country}
              </div>
            </div>
            <div className="section-title">Project Description</div>
            <div className="project-desc">{project.description}</div>

          </div>
          <div className="funding-options">funding option</div>
        </div>
      );
    }
    else{
     return <div>Error</div>;
    }
  }
});

export default ViewProjectPage;