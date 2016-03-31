var reflux = require('Reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
import AppActions from '../actions/AppStateAction';
//import LoginActions from '../actions/LoginAction';

var AppStateStore = reflux.createStore({
  mixins: [StateMixin],
  listenables: AppActions,
  getInitialState() {
    return ({
      currentPage: 'home'
    });
  },
  getSignupPage(){
    console.log('setState');
    this.setState({
      currentPage: 'UserSignup'
    });
  },
  getLoginPage(){
    this.setState({
      currentPage: 'UserLogin'
    });
  },
  getHomePage(){
    this.setState({
      currentPage: 'home'
    })
  },
  getUserManagement(){
    AppActions.getUsers();
    this.setState({
      currentPage: 'UserManagement'
    })
  },
  getUserProjectsPage(){
    this.setState({
      currentPage: 'UserProjects'
    })
  },
  getViewProjectPage(){
    this.setState({
      currentPage: 'ViewProject'
    })
  },
  getEditProjectPage(){
    this.setState({
      currentPage: 'EditProject'
    })
  },
  getUserPage(){
    this.setState({
      currentPage: 'UserPage'
    })
  },
  getEditUserPage(){
    this.setState({
      currentPage: 'UserPage'
    });
    this.setState({
      currentPage: 'EditUser'
    })
  },
  getChangePwPage(){
    this.setState({
      currentPage: 'UserPage'
    });
    this.setState({
      currentPage: 'ChangePw'
    })
  }

});

module.exports = AppStateStore;