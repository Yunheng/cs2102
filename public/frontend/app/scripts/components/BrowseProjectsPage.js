var React = require('react');
var reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
var ProjectStore = require('../stores/ProjectStore');
var ViewProjectsList = require('./ViewProjectsList');

var BrowseProjectsPage = React.createClass({
  mixins: [StateMixin.connect(ProjectStore)],
  render(){
    return (
      <div className="BrowserProjectsPage">
        <div className="title">
          Browser all Available Projects
        </div>
        <ViewProjectsList list={this.state.projects}/>
      </div>
    );
  }
});

export default BrowseProjectsPage;