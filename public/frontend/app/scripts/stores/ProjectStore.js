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
      mostPopularProjects: [],
      newestProjects: [],
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
  deleteProject(project, fn){
    $.ajax({
      type: 'DELETE',
      url: '/api/project/' + project.id
    }).done(function(data){
      fn(true);
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
    var popProj;
    $.when($.ajax({
      type: 'GET',
      url: '/api/project',
      dataType: 'json',
      data: {
        view: 'popular'
      }
    }).done(function(data){
      popProj = data;
      popProj.map(function(proj, i){
        $.ajax({
          type: 'GET',
          url: '/api/project/' + proj.id + '/owner',
          dataType: 'json'
        }).done(function(data){
          popProj[i].owners = data;
        });
      });
    })).then(function(){
      console.log('projects', popProj);
      this.setState({mostPopularProjects: popProj});
    }.bind(this));

    var newProj;
    $.when($.ajax({
      type: 'GET',
      url: '/api/project',
      dataType: 'json',
      data: {
        view: 'newest'
      }
    }).done(function(data){
      newProj = data;
      newProj.map(function(proj, i){
        $.ajax({
          type: 'GET',
          url: '/api/project/' + proj.id + '/owner',
          dataType: 'json'
        }).done(function(data){
          newProj[i].owners = data;
        });
      });
    })).then(function(){
      console.log('projects', newProj);
      this.setState({newestProjects: newProj});
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
    var proj = this.state.projects.filter(function(p){
      return p.id === project.id;
    })[0];
    this.setState({selectedProject: proj});
    ProjectAction.retrieveProjectComments(proj);
    AppStateAction.getViewProjectPage();
  },
  fundProject(args, fn){
    // console.log(args);
    $.ajax({
      type: 'POST',
      url: '/api/project/' + args.project + '/backer',
      dataType: 'json',
      data: {
        amount: args.amt,
        user: args.username,
        address: args.address
      }
    }).done(function(data){
      console.log(data);
      args.receiptNo = data;
      fn(args);
    }.bind(this))
  }
});

export default ProjectStore;
