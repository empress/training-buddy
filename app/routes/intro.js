import Route from '@ember/routing/route';
import { get } from '@ember/object';

export default Route.extend({
  model() {
    return get(this, 'store').findRecord('step', 'introduction');
  }
});
