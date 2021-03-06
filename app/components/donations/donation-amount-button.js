import Ember from 'ember';

const { Component, computed, isEmpty } = Ember;

export default Component.extend({
  classNames: ['preset-amount'],
  classNameBindings: ['presetAmount', 'selected:default:clear'],
  tagName: 'button',

  selected: computed('customAmount', 'presetAmount', 'selectedAmount', function() {
    let { customAmount, presetAmount, selectedAmount } = this.getProperties('customAmount', 'presetAmount', 'selectedAmount');
    let amountInPresets = parseInt(presetAmount) === parseInt(selectedAmount);
    return isEmpty(customAmount) ? amountInPresets : false;
  }),

  click() {
    this.sendAction('setCustomAmount', null);
    let presetAmount = this.get('presetAmount');
    this.sendAction('setAmount', presetAmount);
  }
});
