
var React = window.React = require('react'),
    ReactDOM = require("react-dom"),
    mountNode = document.getElementById("content");
var reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
import actions from './actions/AppStateAction';
import TopBar from './components/TopBar.js';
import AppStateStore from './stores/AppStateStore.js';
import SignupPage from './components/SignupPage.js';
import UserManagement from './components/UserManagementPage';
var App = React.createClass({
  mixins: [StateMixin.connect(AppStateStore)],
  render: function() {
    return (
      <div id="app">
        <TopBar/>
        {this.mountNode()}
      </div>
    );
  },
  mountNode(){
    switch(this.state.currentPage){
      case 'home': return <div className="home Page"><h2>homepage</h2></div>;
      case 'UserSignup': return <SignupPage state="signup"/>;
      case 'UserLogin': return <SignupPage state="login"/>;
      case 'UserManagement': return <UserManagement />;
      default: return <div className="error">Oops, something went wrong!</div>;
    }
  }
});


ReactDOM.render(<App />, mountNode);

