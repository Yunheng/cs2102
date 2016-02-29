var reflux = require('Reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
import AppActions from '../actions/AppStateAction';
import LoginActions from '../actions/LoginAction';
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
      url:'/api/login',
      dataType: 'json',
      data:{
        user: user,
        password: password
      }
    });
    this.setState({userId: user});
    localStorage.userId = user;
  },
  signupUser(user, password, email, file, address){
    console.log(user, password, email, file, address);
    var form_data = new FormData();
    form_data.append('username', user);
    form_data.append('password', password);
    form_data.append('address', address);
    form_data.append('avatar', file);
    form_data.append('email', email);
    $.ajax({
      type: 'POST',
      url: '/api/user',
      dataType: 'json',
      data: form_data,
      contentType: false,
      processData: false
    }).done(function(data){
      console.log(data);
    }).fail(function(){
      this.setState({
        loginError: 'Error occurred. Please try again.'
      });
      window.setTimeout(this.setState.bind(this, {loginError: ''}), 3000);
    }.bind(this));
    //$.ajax({
    //  type: 'POST',
    //  url: '/api/user/create',
    //  dataType: 'json',
    //  data: form_data,
    //  contentType: false,
    //  processData: false
    //}).done(function(data){
    //  console.log(data);
    //})
  },
  userLogout(){
    delete localStorage.userId;
    AppActions.getHomePage();
    this.setState(this.getInitialState());
  }
});

module.exports = LoginStore;