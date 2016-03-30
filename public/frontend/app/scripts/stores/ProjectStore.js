var reflux = require('Reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
var ProjectAction = require('../actions/ProjectAction');
var AppStateAction = require('../actions/AppStateAction');
var $ = require('jquery');
var fakeData = require('./fakeData');

var ProjectStore = reflux.createStore({
  mixins: [StateMixin],
  listenables: ProjectAction,
  getInitialState(){
    return ({
      userProjects: [],
      projects: [],
      selectedProject: {}
    });
  },
  retrieveUserProjects(user){
    $.ajax({
      type: 'GET',
      url: '/api/users/' + user +'/projects',
      dataType: 'json'
    }).done(function(data) {
      console.log(data);
    });
  },
  retrieveProjects(){
    // $.ajax({
    //   type: 'GET',
    //   url: '/api/projects',
    //   dataType: 'json'
    // }).done(function(data){
    //   console.log('all projects', data);
    // })
    this.setState({
      projects: fakeData('projects')
    });
  },
  addNewProject(args){
    console.log(args);
    //TODO: link to endpoint
  },
  viewProject(project){
    this.setState({selectedProject: project});
    AppStateAction.getViewProjectPage();
  }
});

export default ProjectStore;
