import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { observer } from '@ember/object';

export default Helper.extend({
  router: service(),
  compute([routeName, ...models], hash) {
    if(hash.queryParams) {
      return this.get('router').isActive(routeName, ...models, hash.queryParams);
    }
    return this.get('router').isActive(routeName, ...models);
  },
  didTransition: observer('router.currentRoute', function() {
    this.recompute();
  })
});
