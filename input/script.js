Polymer({
	is: 'input-clab',
	properties: {
		label: {
			type: String,
		},
		name: {
			type: String,
			value: 'textinput'
		},
		type: {
			type: String,
			value: ''
		},
		value: {
			type: String,
			notify: true,
			reflectToAttribute: true
		},
		disabled: {
			type: Boolean,
			value: false
		},
		placeholder: {
			type: String
		}
	},
	_computeType: function(type){
		var arr = ['input-wrapper'];
		arr.push(type);
		return arr.join(' ');
	},
	_updateCompValue: function(evt){
		this.value = this.querySelector('input').value;
	},
	_dashify: function(label){
		var str = label.replace(' ','-');
		return str.toLowerCase();
	},
	_viewLabel: function(label) {
		if(label.length > 0){
			return true;
		} else {
			return false;
		}
	}
});