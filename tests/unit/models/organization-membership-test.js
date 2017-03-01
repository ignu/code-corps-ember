import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import { testForBelongsTo } from '../../helpers/relationship';

moduleForModel('organization-membership', 'Unit | Model | organization membership', {
  // Specify the other units that are required for this test.
  needs: [
    'model:organization',
    'model:user'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('organization-membership', ['role']);
testForBelongsTo('organization-membership', 'member');
testForBelongsTo('organization-membership', 'organization');
