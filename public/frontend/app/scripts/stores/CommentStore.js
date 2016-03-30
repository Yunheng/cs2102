var reflux = require('Reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
var ProjectAction = require('../actions/ProjectAction');
var fakeData = require('./fakeData');

var CommentStore = reflux.createStore({
  mixins: [StateMixin],
  listenables: [ProjectAction],
  getInitialState(){
    return ({comments: []});
  },
  retrieveProjectComments(project){
    $.ajax({
      type: 'GET',
      url: '/api/project/' + project.id + '/comment',
      dataType: 'JSON'
    }).done(function(data){
      console.log('comment', data);
    });
  },
  addComment(comment){
    console.log(comment);
  }
});

export default CommentStore;