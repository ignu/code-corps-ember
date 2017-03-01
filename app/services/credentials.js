import Ember from 'ember';

const {
  computed: { alias },
  getProperties,
  inject: { service },
  Service
} = Ember;

export default Service.extend({
  currentUser: service(),
  store: service(),
  user: alias('currentUser.user'),

  joinProject(project) {
    let { store, user } = getProperties(this, 'store', 'user');
    return store.createRecord('project-user', { user, project, role: 'pending' })
                .save();
  }
});
