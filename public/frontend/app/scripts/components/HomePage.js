var React = require('react');
var reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
var ProjectsStore = require('../stores/ProjectStore');
var ViewProjectsList = require('./ViewProjectsList');
var ProjectAction = require('../actions/ProjectAction');
var AppAction = require('../actions/AppStateAction');
var HomePage = React.createClass({
  mixins: [StateMixin.connect(ProjectsStore)],
  componentDidMount(){
    ProjectAction.retrieveProjects();
  },
  viewAllProjects(){
    AppAction.getBrowseProjectsPage();
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
          <div className="sub-section-title">Most Popular</div>
          <ViewProjectsList list={this.state.mostPopularProjects} limit={10}/>
          <div className="sub-section-title">Newest</div>
          <ViewProjectsList list={this.state.newestProjects} limit={10}/>
          <div className="browse all button" onClick={this.viewAllProjects}>Browse all</div>
        </div>
      </div>
    );
  }
});


export default HomePage;