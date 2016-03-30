var React = require('react');
var reflux = require('reflux');
// var StateMixin = require('reflux-state-mixin')(reflux);
// var ProjectsStore = require('../stores/ProjectStore');
var ProjectAction = require('../actions/ProjectAction');
var ViewProjectsList = React.createClass({
  mixins: [],

  renderProjects(){
    console.log(this.props);
    return this.props.list.map(function(project, i){
      console.log(project);
      return (
        <div className="project" key={i} onClick={ProjectAction.viewProject.bind(this, project)}>
          <div className="title">{project.title}</div>
          <div className="description">{project.description}</div>
          <div className="place">{project.city + ', ' + project.country}</div>

        </div>
      );
    });
  },
  render(){
    return (
      <div className="ViewProjectsList">
        {this.renderProjects()}
      </div>
    );
  }

});

export default ViewProjectsList;