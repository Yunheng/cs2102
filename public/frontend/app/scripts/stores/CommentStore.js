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
    this.setState({
      comments: fakeData('comments')
    });
  },
  addComment(comment){

  }
});

export default CommentStore;