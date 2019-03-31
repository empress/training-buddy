import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({

  model() {
    return hash({
      steps: this.store.findAll('step').then((steps) => {
        return steps.filter(step => step.id.startsWith('steps'));
      })
      // profile: TODO: add  back in Authmaker based profile - optional based on config
    });
  },
});
