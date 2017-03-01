import Ember from 'ember';

const {
  Component,
  computed: { alias, mapBy }
} = Ember;

export default Component.extend({
  classNames: ['organization-profile'],

  members: mapBy('organization.organizationMemberships', 'member'),
  membersCount: alias('members.length')
});
