import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr(),
  title: DS.attr(),
  order: DS.attr('number'),
  task: DS.belongsTo('task'),
});
