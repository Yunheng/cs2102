var reflux = require('Reflux');

var ProjectAction = reflux.createActions([
  'addNewProject',
  'retrieveUserProjects',
  'retrieveProjects',
  'viewProject'
]);


export default ProjectAction;