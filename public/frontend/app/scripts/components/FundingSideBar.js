var React = require('react');
var moment = require('moment');
import {calculateDaysPassed} from '../utils';


var FundingSidebar = React.createClass({
  render(){
    var project = this.props.project;
    var displayButton = this.props.displayButton;
    return (
      <div className="FundingSidebar">
        <div className="project-info">
          <div className="project-location">
            Location: <span className="info">{project.city}, {project.country}</span>
          </div>
          <div className="project-category">
            Category: <span className="info">{project.category}</span>
          </div>
        </div>
        <div className="amount">
          <div className="raised">${project.totalamt ? project.totalamt : 0}</div>
          <span className="of">of</span>
          <div className="target">${project.targetamount}</div>
        </div>
        <div className="bar"></div>
        <div className="stats">
          <div className="stats-line">
            <div className="stat-text">Raised by</div>
            <div className="stat-val">{project.backers}</div>
            <div className="stat-text">people in</div>
            <div className="stat-val">{calculateDaysPassed(moment(project.date_created), moment())}</div>
            <div className="stat-text">day(s)</div>
          </div>
          <div className="stats-line">
            <div className="stat-text">Closing in</div>
            <div className="stat-val">{calculateDaysPassed(moment(), moment(project.date_close))}</div>
            <div className="stat-text">day(s)</div>
          </div>
        </div>
        {displayButton ? <div className="fund-me button" onClick={this.props.onClick}>Fund This</div> : null}
      </div>
    );
  }
});

export default FundingSidebar;