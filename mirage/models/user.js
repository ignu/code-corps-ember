import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  organizationMemberships: hasMany({ inverse: 'member' }),
  projectUsers: hasMany(),
  stripePlatformCard: belongsTo('stripe-platform-card'),
  stripePlatformCustomer: belongsTo('stripe-platform-customer'),
  stripeConnectSubscriptions: hasMany('stripe-connect-subscription'),
  userCategories: hasMany(),
  userRoles: hasMany(),
  userSkills: hasMany()
});
