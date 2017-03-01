import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  role: 'owner',

  // ensures creation of associated records if they were not otherwise specified
  afterCreate(record, /* server */) {
    if (!record.user) {
      record.createUser();
    }

    if (!record.project) {
      record.createProject();
    }
  }
});
