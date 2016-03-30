var reflux = require('Reflux');

var ProjectAction = reflux.createActions([
  'addNewProject',
  'retrieveUserProjects',
  'retrieveProjects',
  'viewProject',
  'addComment',
  'retrieveProjectComments'
]);


export default ProjectAction;