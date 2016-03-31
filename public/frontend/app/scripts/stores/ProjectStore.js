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
   $.ajax({
      type: 'GET',
      url: '/api/user/' + user +'/project',
      dataType: 'json'
    }).done(function(data) {
     console.log('project', data);
     this.setState({
       userProjects: this.state.projects.filter(function(proj){
         for(var userProj in data){

           if(data[userProj].id === proj.id){
             return true;
           }
         }
         return false;
        })
     });
   }.bind(this));
  },
  deleteProject(project){
    $.ajax({
      type: 'DELETE',
      url: '/api/project/' + project.id
    });
  },
  retrieveProjects(){
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
      console.log('projects', projData);
      this.setState({projects: projData});
    }.bind(this));

  },
  updateProject(){

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
        category: args.category,
        date_close: args.date_close,
        targetAmount: args.targetAmount
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
  editProject(){
    AppStateAction.getEditProjectPage();
  },
  viewProject(project){
    this.setState({selectedProject: project});
    ProjectAction.retrieveProjectComments(project);
    AppStateAction.getViewProjectPage();
  }
});

export default ProjectStore;
