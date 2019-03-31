import Controller from '@ember/controller';
import config from 'ember-get-config';

const { trainingBuddy } = config;

export default Controller.extend({
  config: trainingBuddy,
});
