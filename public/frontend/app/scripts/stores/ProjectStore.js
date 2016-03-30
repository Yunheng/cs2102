var reflux = require('Reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
var ProjectAction = require('../actions/ProjectAction');
var AppStateAction = require('../actions/AppStateAction');
var LoginStore = require('./LoginStore');
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
    console.log('asd');
   $.ajax({
      type: 'GET',
      url: '/api/user/' + user +'/project',
      dataType: 'json'
    }).done(function(data) {
     console.log('project', data);
     this.setState({
       userProjects: this.state.projects.filter(function(proj){
         for(var userProj in data){

           if(data[userProj].project === proj.id){
             return true;
           }
         }
         return false;
        })
     });
   }.bind(this));
  },
  retrieveProjects(){
    console.log('projects');
    var projData;
    $.when($.ajax({
      type: 'GET',
      url: '/api/project',
      dataType: 'json'
    }).done(function(data){
      projData = data;
      projData.map(function(proj, i){
        $.ajax({
          type: 'GET',
          url: '/api/project/' + proj.id + '/owner',
          dataType: 'json'
        }).done(function(data){
          projData[i].owners = data;
        });
      });
    })).then(function(){
        this.setState({projects: projData});
    }.bind(this));

  },
  addNewProject(args){
    console.log(args);
    $.when($.ajax({
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
    }).done(function(data){
      var id = data.id;
      args.projectOwners.push(LoginStore.state.userId);
      args.projectOwners.map(function(user){
        $.ajax({
          type: 'POST',
          url: '/api/project/' + id + '/owner',
          dataType: 'json',
          data: {
            role: 'collaborator',
            user: user.username ? user.username : user
          }
        });
      });
    })).then(function() {
      AppStateAction.getHomePage();
      AppStateAction.getUserProjectsPage();
    });
  },

  viewProject(project){
    this.setState({selectedProject: project});
    ProjectAction.retrieveProjectComments(project);
    AppStateAction.getViewProjectPage();
  }
});

export default ProjectStore;
