import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
// import window, {reset} from 'ember-window-mock';

module('Acceptance | email', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /email', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
  });

  test('displaying all emails in inbox', async function(assert) {
    server.create('email', {
      from: "Me 1",
      to: "Anyone",
      subject: "Testing",
      message: "We will see if this works.",
      starred: false
    });
    server.create('email', {
      from: "Me 2",
      to: "Someone",
      subject: "Testing",
      message: "We will see if this works.",
      starred: false
    });
    server.create('email', {
      from: "Me 3",
      to: "No one",
      subject: "Testing",
      message: "We will see if this works.",
      starred: false
    });
    server.create('email', {
      from: "Me 4",
      to: "Friends",
      subject: "Testing",
      message: "We will see if this works.",
      starred: true
    });
    server.create('email', {
      from: "Me 5",
      to: "Family",
      subject: "Testing",
      message: "We will see if this works.",
      starred: true
    });

    await visit('/');
    assert.dom('[data-test="email"]').exists({count: 5});
    assert.dom('[data-test-starred="starred"]').exists({count: 2});
    assert.dom('[data-test-starred="not-starred"]').exists({count: 3});
  });

  test('viewing a single email', async function(assert) {
    server.create('email', {
      from: "Me 1",
      to: "Anyone",
      subject: "Testing",
      message: "We will see if this works.",
      starred: false
    });

    await visit('/emails/1');

    assert.dom('[data-test="from"]').hasText('Me 1');
    assert.dom('[data-test="to"]').hasText('to Anyone, me');
    assert.dom('[data-test="subject"]').hasText('Testing');
    assert.dom('[data-test="message"]').hasText('We will see if this works.');
  });

  test('deleting email', async function(assert) {
    server.createList('email', 1);
    window.confirm = () => true;

    await visit('/emails/1');
    await click('[data-test="delete-email"]');

    assert.dom('[data-test="email"]').exists({count:0});
  });

  test('creating email', async function(assert) {
    await visit('/emails/compose');
    await fillIn('#to', 'you');
    await fillIn('#from', 'me');
    await fillIn('#subject', 'Testing');
    await fillIn('#message', 'What up');

    await click('[data-test="send"]');

    assert.equal(currentURL(), '/emails/1');
  });
});
