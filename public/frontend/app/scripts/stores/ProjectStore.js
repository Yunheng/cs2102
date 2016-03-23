var reflux = require('Reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
var ProjectAction = require('../actions/ProjectAction');
var $ = require('jquery');


var ProjectStore = reflux.createStore({
  mixins: [StateMixin],
  listenables: ProjectAction,
  getInitialState(){
    return ({
      userProjects: []
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
  addNewProject(args){
    console.log(args);
    //TODO: link to endpoint
  }
});

export default ProjectStore;