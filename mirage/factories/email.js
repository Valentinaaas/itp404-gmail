import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  id(i) {
    return i + 1;
  },
  from(i) {
    return faker.name.firstName() + " " + faker.name.lastName();
  },
  to(i) {
    return faker.name.firstName() + " " + faker.name.lastName();
  },
  subject(i) {
    return faker.lorem.words();
  },
  message(i) {
    return faker.lorem.paragraph();
  }
});
