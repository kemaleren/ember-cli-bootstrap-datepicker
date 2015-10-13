import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('bootstrap-datepicker', 'BootstrapDatepickerComponent', {
  integration: true
});

test('resets date when input is cleared', function (assert) {
  assert.expect(2);

  this.set('myDate', new Date());

  this.render(hbs`
    {{bootstrap-datepicker value=myDate}}
  `);
  
  var datepicker = this.$('input.ember-text-field').datepicker();  
 
  datepicker.val('');
  Ember.run(() => {
    datepicker.trigger('input');
  });

  assert.equal(this.get('myDate'), null, 'value is reset');
  assert.equal(this.$('input.ember-text-field').datepicker('getDate'), null, 'datepicker is updated');
});

test('triggers changeDate action when input field is cleared', function (assert) {
  assert.expect(1);

  this.set('myDate', new Date());

  var actionIsTriggered = false;
  this.on('myAction', () => {
    actionIsTriggered = true;
  });

  this.render(hbs`
    {{bootstrap-datepicker value=myDate changeDate="myAction"}}
  `);

  var datepicker = this.$('input.ember-text-field').datepicker();  
  
  datepicker.val('');
  Ember.run(() => {
    datepicker.trigger('input');
  });

  assert.ok(actionIsTriggered, 'action is triggered');
});
