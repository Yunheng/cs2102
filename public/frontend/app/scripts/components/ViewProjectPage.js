var React = require('react');
var reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
var ProjectsStore = require('../stores/ProjectStore');
var LoginStore = require('../stores/LoginStore');
var CommentStore = require('../stores/CommentStore');
var moment = require('moment');
var $ = require('jquery');
import {displayTime, calculateDaysPassed} from '../utils';
var AppStateAction = require('../actions/AppStateAction');
var ProjectAction = require('../actions/ProjectAction');
var UserAction = require('../actions/UserAction');
var ViewProjectPage = React.createClass({
  mixins: [
    StateMixin.connect(ProjectsStore),
    StateMixin.connect(LoginStore),
    StateMixin.connect(CommentStore)
  ],
  verifyUser(type){
    if(type === 'login') AppStateAction.getLoginPage();
    else AppStateAction.getSignupPage();
  },
  userIsOwner(){
    return this.state.selectedProject.owners.some(function(owner){
          return owner.member === this.state.userId;
    }.bind(this));

  },
  submitComment(){
    console.log('submit');
    var comment = $('#comment').val();
    ProjectAction.addComment({
      comment: comment,
      project: this.state.selectedProject,
      commenter: this.state.userId
    });
  },
  userClick(user){
    AppStateAction.getUsers();
    window.setTimeout(function(){
    UserAction.selectUser(user, true);
    AppStateAction.getUserPage();
    }, 500);
  },
  renderComments(){
    return this.state.comments.map(function(comment){
      return (
        <div className="comment" key={comment.id}>
          <div className="commenter" onClick={this.userClick.bind(this, comment.member)}>{comment.member}</div>
          <div className="content">{comment.content}</div>
          <div className="timestamp">posted: {displayTime(comment.posted)}</div>
        </div>
      );
    }.bind(this))
  },
  render(){
    console.log(this.state);
    if(this.state.selectedProject) {
      var project = this.state.selectedProject;
      return (
        <div className="ViewProjectPage">
          <div className="project-info">
            {this.userIsOwner() ?
              <div className="user-control">
                <div className="edit button" onClick={ProjectAction.editProject}>Edit Project</div>
                <div className="delete button" onClick={ProjectAction.deleteProject.bind(this, this.state.selectedProject)}>Delete Project</div>
              </div>
              :
              null
            }
            <div className="project-title">{project.title}</div>
            <div className="project-details">
              <div className="project-owner">
                Project by: {project.owners.map(function(owner){
                  return <span className="owner" key={owner.member} onClick={this.userClick.bind(this, owner.member)}>{owner.member}</span>
                }.bind(this))}
              </div>
            </div>
            <div className="section-title">Project Description</div>
            <div className="project-desc">{project.description}</div>
            <div className="project-comments">
              <div className="section-title">Comments</div>

              {this.state.comments.length > 0 ?
                  this.renderComments()
                :
                  <div className="no-comments">Be the first to comment!</div>
              }


              {this.state.userId === '' ?
                  <span className="user-login">To comment, <span className="login" onClick={this.verifyUser.bind(this, 'login')}>Login </span> or <span className="login" onClick={this.verifyUser.bind(this, 'signup')}>sign up </span> first
                  </span>
                :
                  <div className="add-comment">
                    <input id="comment" type="text" className="comment-input"/>
                      <span className="submit-comment button" onClick={this.submitComment}>Submit</span>
                  </div>
              }
            </div>

          </div>
          <div className="funding-options">
            <div className="project-info">
              <div className="project-location">
                Location: <span className="info">{project.city}, {project.country}</span>
              </div>
              <div className="project-category">
                Category: <span className="info">{project.category}</span>
              </div>
            </div>
            <div className="amount">
              <div className="raised">${project.totalamt ? project.totalamt : 0}</div>
              <span className="of">of</span>
              <div className="target">${project.targetamount}</div>
            </div>
            <div className="bar"></div>
            <div className="stats">
              <div className="stats-line">
                <div className="stat-text">Raised by</div>
                <div className="stat-val">{project.backers}</div>
                <div className="stat-text">people in</div>
                <div className="stat-val">{calculateDaysPassed(moment(project.date_created), moment())}</div>
                <div className="stat-text">day(s)</div>
              </div>
              <div className="stats-line">
                <div className="stat-text">Closing in</div>
                <div className="stat-val">{calculateDaysPassed(moment(), moment(project.date_close))}</div>
                <div className="stat-text">day(s)</div>
              </div>
            </div>
            <div className="fund-me button">Fund This</div>

          </div>
        </div>
      );
    }
    else{
     return <div>Error</div>;
    }
  }
});

export default ViewProjectPage;