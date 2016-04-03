var React = require('react');
var reflux = require('reflux');
// var StateMixin = require('reflux-state-mixin')(reflux);
// var ProjectsStore = require('../stores/ProjectStore');
var {calculateDaysPassed} = require('../utils');
var moment = require('moment');
var ProjectAction = require('../actions/ProjectAction');
var ViewProjectsList = React.createClass({
  mixins: [],

  renderProjects(){
    // console.log(this.props);
    return this.props.list.map(function(project, i){
      // console.log(project);
      return (
        <div className="project" key={i} onClick={ProjectAction.viewProject.bind(this, project)}>
          <div className="title">{project.title}</div>
          <div className="place">{project.city + ', ' + project.country}</div>
          <div className="description">{project.description}</div>
          <div className="grow"></div>

          <div className="raised"><span className="text">raised</span>${project.totalamt ? project.totalamt : 0}</div>
          <div className="days">{calculateDaysPassed(moment(), moment(project.date_close))} day(s) left</div>
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