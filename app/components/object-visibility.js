import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    toggleEnable: function () {
      var enabled = this.get('enabled');
      this.set('enabled', !enabled);
    },
    opacityChanged: function (val) {
      this.set('opacity', val);
    }
  }

});
