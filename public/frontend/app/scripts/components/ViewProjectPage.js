var React = require('react');
var reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
var ProjectsStore = require('../stores/ProjectStore');
var LoginStore = require('../stores/LoginStore');
var CommentStore = require('../stores/CommentStore');
var $ = require('jquery');
var AppStateAction = require('../actions/AppStateAction');
var ProjectAction = require('../actions/ProjectAction');
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
  submitComment(){
    var comment = $('#comment').val();
    ProjectAction.addComment({
      comment: comment,
      project: this.state.selectedProject,
      commenter: this.state.userId
    });
  },
  renderComments(){

  },
  render(){
    var fakeData = {owners: ['nate', 'ned', 'mate']};
    console.log(this.state);
    if(this.state.selectedProject) {
      var project = this.state.selectedProject;
      return (
        <div className="ViewProjectPage">
          <div className="project-info">
            <div className="project-title">{project.title}</div>
            <div className="project-details">
              <div className="project-owner">
                Project by: {project.owners.map(function(owner){
                  return <span className="owner" key={owner.member}>{owner.member}</span>
                })}
              </div>
              <div className="project-location">
                Location: {project.city}, {project.country}
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
          <div className="funding-options">funding option</div>
        </div>
      );
    }
    else{
     return <div>Error</div>;
    }
  }
});

export default ViewProjectPage;