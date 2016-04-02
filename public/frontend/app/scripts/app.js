
var React = window.React = require('react'),
    ReactDOM = require("react-dom"),
    mountNode = document.getElementById("content");
var reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
var EditProjectPage = require('./components/EditProjectPage');
var ViewUserPage = require('./components/ViewUserPage');
var EditUserPage = require('./components/EditUserPage');
var FundProjectPage = require('./components/FundProjectPage');
var UserTransactionsPage = require('./components/ViewTransactionPage');
import actions from './actions/AppStateAction';
import TopBar from './components/TopBar.js';
import AppStateStore from './stores/AppStateStore.js';
import SignupPage from './components/SignupPage.js';
import UserManagement from './components/UserManagementPage';
import UserProjectsPage from './components/UserProjectsPage';
import HomePage from './components/HomePage';
import ViewProjectPage from './components/ViewProjectPage';
import BrowseProjectsPage from './components/BrowseProjectsPage';

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
    console.log(this.state.currentPage);
    switch(this.state.currentPage){
      case 'home': return <HomePage/>;
      case 'UserSignup': return <SignupPage state="signup"/>;
      case 'UserLogin': return <SignupPage state="login"/>;
      case 'UserManagement': return <UserManagement />;
      case 'UserProjects': return <UserProjectsPage/>;
      case 'ViewProject': return <ViewProjectPage/>;
      case 'EditProject': return <EditProjectPage/>;
      case 'UserPage': return <ViewUserPage/>;
      case 'EditUser': return <EditUserPage state="EditUser"/>;
      case 'ChangePw': return <EditUserPage state="ChangePw"/>;
      case 'FundProject': return <FundProjectPage/>;
      case 'BrowseProjects': return <BrowseProjectsPage/>;
      case 'UserTransactions': return <UserTransactionsPage/>;
      default: return <div className="error">Oops, something went wrong!</div>;
    }
  }
});


ReactDOM.render(<App />, mountNode);

