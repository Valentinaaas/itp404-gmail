import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  id(i) {
    return i + 1;
  },
  from() {
    return faker.name.firstName() + " " + faker.name.lastName();
  },
  to() {
    return faker.name.firstName() + " " + faker.name.lastName();
  },
  subject() {
    return faker.lorem.words();
  },
  message() {
    return faker.lorem.paragraph();
  },
  starred() {
    return false;
  }
});
