var React = require('react');
var moment = require('moment');
var AppAction = require('../actions/AppStateAction');
import {calculateDaysPassed} from '../utils';


var FundingSidebar = React.createClass({
  render(){
    var project = this.props.project;
    var displayButton = this.props.displayButton;
    var projectAmt = project.totalamt ? project.totalamt : 0;
    if(this.props.manualIncrement) projectAmt += this.props.manualIncrement;
    projectAmt = Number(projectAmt);
    return (
      <div className="FundingSidebar">

        <div className="side-info">
          {this.props.projectName ? <div className="project-name">{project.title}</div> : null}
          <div className="project-subinfo">
            <div className="project-location">
              Location: <span className="info">{project.city}, {project.country}</span>
            </div>
            <div className="project-category">
              Category: <span className="info">{project.category}</span>
            </div>
          </div>
        </div>
        <div className="amount">
          <div className="raised">${projectAmt}</div>
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
        {displayButton && this.props.loggedIn ? <div className="fund-me button" onClick={this.props.onClick}>Back This</div> : null}
        {!this.props.loggedIn ? <div className="log-in button" onClick={AppAction.getLoginPage}>Login To Back This Project</div> : null}
      </div>
    );
  }
});

export default FundingSidebar;