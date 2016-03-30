var React = require('react');
var reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
var ProjectsStore = require('../stores/ProjectStore');
var ViewProjectsList = require('./ViewProjectsList');
var ProjectAction = require('../actions/ProjectAction');
var HomePage = React.createClass({
  mixins: [StateMixin.connect(ProjectsStore)],
  componentDidMount(){
    ProjectAction.retrieveProjects();
  },
  render(){
    // console.log(this.state);
    return (
      <div className="HomePage">
        <div className="welcome-bar">
          <div className="welcome-message">
            Welcome to BackMeUp.
          </div>
          <div className="sub-message">
            The easiest place to fund your projects.
          </div>
        </div>
        <div className="projects">
          <div className="section-title">Browse Projects</div>
          <ViewProjectsList list={this.state.projects} limit={10}/>
        </div>
      </div>
    );
  }
});


export default HomePage;