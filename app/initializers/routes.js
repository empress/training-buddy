import Router from '../router';

export function initialize() {
  Router.map(function() {

    this.route('login');
    this.route('intro');
    this.route('step', { path: '/*id' });
  });
}

export default {
  initialize
};
