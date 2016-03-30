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
      this.setState({comments: data});
    }.bind(this));
  },
  addComment(comment){
    $.ajax({
      type: 'POST',
      url: '/api/project/' + comment.project.id + '/comment',
      dataType: 'JSON',
      data: {
        content: comment.comment,
        user: comment.commenter
      }
    }).done(function(data){
      console.log('commented', data);
      this.retrieveProjectComments(comment.project);
    }.bind(this));
  }
});

export default CommentStore;