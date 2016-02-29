var React = require('react');
var reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(reflux);
var $ = require('jquery');
//var dt = require('datatable.net')();

import UserManagementStore from '../stores/UserManagementStore';
var UserManagementPage = React.createClass({

  mixins: [StateMixin.connect(UserManagementStore)],

  render: function(){
    return (
      <div className="UserManagementPage Page">
        <div id='table'></div>
      </div>
    );
  }
});

module.exports = UserManagementPage;