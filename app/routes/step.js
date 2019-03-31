import Route from '@ember/routing/route';
import RSVP from 'rsvp';

const { hash } = RSVP;

export default Route.extend({
  model({ id }) {
    let { profile, steps } = this.modelFor('application');
    return hash({
      step: this.store.findRecord('step', id),
      steps,
      path: id,
      profile,
    });
  },
});
