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
      url: '/api/user/' + user +'/project',
      dataType: 'json'
    }).done(function(data) {
      console.log(data);
    });
  },
  retrieveProjects(){
    $.ajax({
      type: 'GET',
      url: '/api/project',
      dataType: 'json'
    }).done(function(data){
      var projData = data;
    })
  },
  addNewProject(args){
    console.log(args);
    $.ajax({
      type: 'POST',
      url: '/api/project',
      dataType: 'json',
      data: {
        title: args.title,
        description: args.description,
        country: args.country,
        city: args.city,
        category: args.category
      }
    });
  },

  viewProject(project){
    this.setState({selectedProject: project});
    ProjectAction.retrieveProjectComments(project);
    AppStateAction.getViewProjectPage();
  }
});

export default ProjectStore;
