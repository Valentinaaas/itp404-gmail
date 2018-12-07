import Component from '@ember/component';

export default Component.extend({
  starred: false,
  actions: {
    star(email, newValue) {
      email.set('starred', newValue);
      email.save();
    }
  }
});
