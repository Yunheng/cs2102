var React = require('react');
var TopBar = require('./../components/TopBar');
import {render} from 'react-dom';
var Home = React.createClass({

  render: function() {

    return (
      <div className="Home">
        <TopBar/>
        <div className="body">
          HOME
        </div>
      </div>
    );
  }
});


render(<Home/>, document.getElementById('content'));
