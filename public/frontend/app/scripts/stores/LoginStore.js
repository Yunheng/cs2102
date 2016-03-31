var reflux = require('Reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
import AppActions from '../actions/AppStateAction';
import LoginActions from '../actions/LoginAction';
import ProjectAction from '../actions/ProjectAction';
var $ = require('jquery');

var LoginStore = reflux.createStore({
  mixins: [StateMixin],
  listenables: [AppActions, LoginActions],

  getInitialState(){
    if (localStorage.userId) {
      return {
        userId: localStorage.userId,
        loginError: '',
        userRole: ''
      };
    } else {
      return {
        userId: '',
        loginError: '',
        userRole: ''
      }
    }
  },
  
  checkLogin(){
    this.setState({user: localStorage.userId});
  },

  loginUser(user, password){
    $.ajax({
      type: 'POST',
      url:'/api/user/login',
      dataType: 'json',
      data:{
        username: user,
        password: password
      }
    }).done(function(data){
      console.log(data, data === []);
      if(data.length === 0){
        this.setState({
          loginError: 'Error occurred. Please try again.'
        });
        window.setTimeout(this.setState.bind(this, {loginError: ''}), 3000);
      }else {
        this.setState({
          userId: user
        });
        localStorage.userId = user
        AppActions.getHomePage();
      }
    }.bind(this)).fail(function(error){
      this.setState({
        loginError: 'Error occurred. Please try again.'
      });
      window.setTimeout(this.setState.bind(this, {loginError: ''}), 3000);
    }.bind(this));
  },
  changeUserDetails(user){
    $.ajax({
     type: 'PUT',
      url: '/api/user/' + user.user,
      dataType: 'json',
      data: {
        email: user.email,
        address: user.address,
        avatar: ''
      }
    }).done(function(data){
      this.setState({loginError: 'Changes saved Successfully!'});
      window.setTimeout(function(){
        this.setState({loginError: ''});
        AppActions.getUserPage();
      }.bind(this), 2000);
    }.bind(this));
  },
  testPassword(user, oldPw, newPw){
    console.log('chpw', user, oldPw, newPw);
    $.ajax({
      type: 'POST',
      url:'/api/user/login',
      dataType: 'json',
      data:{
        username: user,
        password: oldPw
      }
    }).done(function(data) {
     if(data.length === 0){
       this.setState({
         loginError: 'Your old password is wrong. Please try again.'
       });
       window.setTimeout(this.setState.bind(this, {loginError: ''}), 3000);
     }else{
       $.ajax({
         type: 'POST',
         url: '/api/user/password',
         dataType: 'json',
         data: {
           username: user,
           password: newPw,
           oldPassword: oldPw
         }
       }).done(function(data){
         this.setState({loginError: 'Password changed!'});
         window.setTimeout(function(){
           this.setState({loginError: ''});
           AppActions.getUserPage();
         }.bind(this), 2000);
       }.bind(this));
     }
    }.bind(this)).fail(function(){
      this.setState({
        loginError: 'Your old password is wrong. Please try again.'
      });
      window.setTimeout(this.setState.bind(this, {loginError: ''}), 3000);
    }.bind(this));
  },
  signupUser(user, password, email, file, address){
    console.log(user, password, email, file, address);
    var form_data = new FormData();
    form_data.append('username', user);
    form_data.append('password', password);
    form_data.append('address', address);
    form_data.append('avatar', '');
    form_data.append('email', email);
    $.ajax({
      type: 'POST',
      url: '/api/user',
      //dataType: 'json',
      data: form_data,
      contentType: false,
      processData: false
    }).done(function(data){
      this.setState({
        userId: user
      });
      AppActions.getHomePage();
    }.bind(this)).fail(function(){
      this.setState({
        loginError: 'Error occurred. Please try again.'
      });
      window.setTimeout(this.setState.bind(this, {loginError: ''}), 3000);
    }.bind(this));
  },
  userLogout(){
    delete localStorage.userId;
    AppActions.getHomePage();
    this.setState(this.getInitialState());
  }
});

module.exports = LoginStore;