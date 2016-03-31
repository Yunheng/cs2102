var reflux = require('Reflux');

var ProjectAction = reflux.createActions([
  'addNewProject',
  'retrieveUserProjects',
  'retrieveProjects',
  'viewProject',
  'addComment',
  'retrieveProjectComments',
  'deleteProject',
  'editProject',
  'updateProject',
  'fundProject'
]);


export default ProjectAction;