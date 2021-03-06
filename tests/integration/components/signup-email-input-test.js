import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import startMirage from '../../helpers/setup-mirage-for-integration';
import wait from 'ember-test-helpers/wait';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/signup-password-input';

const { run } = Ember;

let page = PageObject.create(component);

moduleForComponent('signup-email-input', 'Integration | Component | signup email input', {
  integration: true,
  setup() {
    startMirage(this.container);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
    server.shutdown();
  }
});

test('it shows nothing when empty', function(assert) {
  page.render(hbs`{{signup-email-input}}`);

  assert.notOk(page.suggestionsArea.visible);
  assert.notOk(page.suggestionsArea.visible);
});

test('it shows suggestions when invalid', function(assert) {
  let done = assert.async();
  assert.expect(5);

  server.get('/users/email_available', () => {
    return { valid: false, available: true };
  });

  this.on('emailValidated', (result) => {
    run.next(() => {
      assert.notOk(result);
    });
  });
  page.render(hbs`{{signup-email-input user=user emailValidated="emailValidated"}}`);

  this.set('user', { email: 'incomplete@' });

  wait().then(() => {
    assert.notOk(page.suggestionsArea.ok);
    assert.ok(page.suggestionsArea.notOk);
    assert.equal(page.suggestionsArea.suggestions().count, 1);
    assert.equal(page.suggestionsArea.suggestions(0).text, 'Please enter a valid email.');
    done();
  });
});

test('it shows suggestions when unavailable', function(assert) {
  let done = assert.async();
  assert.expect(5);

  server.get('/users/email_available', () => {
    return { valid: true, available: false };
  });

  this.on('emailValidated', (result) => {
    run.next(() => {
      assert.notOk(result);
    });
  });
  page.render(hbs`{{signup-email-input user=user emailValidated="emailValidated"}}`);

  this.set('user', { email: 'taken@gmail.com' });

  wait().then(() => {
    assert.notOk(page.suggestionsArea.ok);
    assert.ok(page.suggestionsArea.notOk);
    assert.equal(page.suggestionsArea.suggestions().count, 1);
    assert.equal(page.suggestionsArea.suggestions(0).text, 'This email is already registered. Want to login?');
    done();
  });
});

test('it shows ok when valid and available', function(assert) {
  let done = assert.async();
  assert.expect(4);

  server.get('/users/email_available', () => {
    return { valid: true, available: true };
  });

  this.on('emailValidated', (result) => {
    run.next(() => {
      assert.ok(result);
    });
  });
  page.render(hbs`{{signup-email-input user=user emailValidated="emailValidated"}}`);

  this.set('user', { email: 'available@gmail.com' });

  wait().then(() => {
    assert.ok(page.suggestionsArea.ok);
    assert.notOk(page.suggestionsArea.notOk);
    assert.equal(page.suggestionsArea.suggestions().count, 0);
    done();
  });
});

test('it resets to invalid when deleted', function(assert) {
  let done = assert.async();
  assert.expect(3);

  server.get('/users/email_available', () => {
    return { valid: true, available: true };
  });

  this.on('emailValidated', (result) => {
    run.next(() => {
      assert.notOk(result);
    });
  });
  this.set('user', { email: 'available@gmail.com' });
  page.render(hbs`{{signup-email-input user=user emailValidated="emailValidated"}}`);

  this.set('user', { email: '' });

  wait().then(() => {
    assert.notOk(page.suggestionsArea.visible);
    assert.notOk(page.suggestionsArea.visible);
    done();
  });
});
