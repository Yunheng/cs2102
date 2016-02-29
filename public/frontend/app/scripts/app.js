
var React = window.React = require('react'),
    ReactDOM = require("react-dom"),
    mountNode = document.getElementById("content");
var reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
import TopBar from './components/TopBar.js';
import AppStateStore from './stores/AppStateStore.js';
import SignupPage from './components/SignupPage.js';
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
      case 'home': return <div className="home">homepage</div>;
      case 'userSignup': return <SignupPage state="signup"/>;
      case 'userLogin': return <SignupPage state="login"/>;
      default: return <div className="error">Oops, something went wrong!</div>;
    }
  }
});


ReactDOM.render(<App />, mountNode);

