import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    createEmail(event) {
      event.preventDefault();

      // console.log(this.to);

      let email = this.store.createRecord('email', {
        From: this.from,
        To: this.to,
        Subject: this.subject,
        Message: this.message
      });

      email.save().then(() => {
        // this.transitionToRoute('index');
        this.transitionToRoute('email', email.id);
      });
    }
  }
});
