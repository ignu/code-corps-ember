import Ember from 'ember';

const {
  Component,
  computed,
  get,
  inject: { service }
} = Ember;

/**
  Displays information about the project and allows a user to join the project

  ## default usage
  ```handlebars
  {{project-details project=project}}
  ```

  @module Component
  @extends Ember.Component
  @class project-details
 */

export default Component.extend({
  classNames: ['project__header'],
  classNameBindings: ['expanded'],
  expanded: false,
  tagName: 'header',

  /**
    @property session
    @type Ember.service
   */
  session: service(),

  /**
    @property credentials
    @type Ember.service
   */
  credentials: service(),

  /**
    @property currentUser
    @type Ember.service
   */
  currentUser: service(),

  // TODO: Maybe move this into credentials service and alias from there
  // Similar code is defined in `abilities/task.js`
  currentProjectMembership: computed('project.projectUsers', 'currentUser.user.id', function() {
    let projectUsers = get(this, 'project.projectUsers');
    let currentUserId = get(this, 'currentUser.user.id');

    return projectUsers.find((item) => {
      return get(item, 'user.id') === currentUserId;
    });
  }),

  actions: {
    /**
      Action that allows a user to join a project.

      @method joinProject
     */
    joinProject() {
      let project = get(this, 'project');
      get(this, 'credentials').joinProject(project);
    }
  }
});
