import Controller from '@ember/controller';
import { get } from '@ember/object';
import { sort } from '@ember/object/computed';
import { later } from '@ember/runloop';
import { inject as service } from '@ember/service';


export default Controller.extend({
  router: service(),

  stepsSorting: Object.freeze(['order:asc']),
  sortedSteps: sort('model.steps', 'stepsSorting'),

  showConfetti: false,

  actions: {
    markTaskCompleted(profile, taskId) {
      let task = get(this, 'store').peekRecord('task', taskId);
      profile.get('tasks').pushObject(task);

      profile.save().then(() => {
        this.set('showConfetti', true);
        later(this, function() {
          this.set('showConfetti', false);
        }, 4000);
      }).catch((err) => {
        this.set('hasError', err);
      })
    },

    markTaskIncomplete(profile, taskId) {
      let task = get(this, 'store').peekRecord('task', taskId);
      profile.get('tasks').removeObject(task);
      profile.save().then(() => {

      }).catch((err) => {
        this.set('hasError', err);
      })
    }
  }
});
