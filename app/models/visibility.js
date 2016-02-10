import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  enabled: DS.attr('boolean'),
  opacity: DS.attr('number')
});
