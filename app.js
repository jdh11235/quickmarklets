'use strict';


var Marklets = {

	load: function(marklet_template) {
		console.log(marklet_template);
	},

	loadAll: function() {
		var items = document.querySelectorAll('#marklets a');
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			Marklets.load(item);
		}
	}

};


var Prefs = {

	check: function() {
		var items = Prefs.defaults;
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (!localStorage.getItem(item.key)) {
				localStorage.setItem(item.key, item.value);
			}
		}
	},

	defaults: [
		{
			key: 'key1',
			value: 'value1'
		},
		{
			key: 'key2',
			value: 'value2'
		}
	]

};


function init() {
	Prefs.check();
	Marklets.loadAll();
}


window.addEventListener('load', init);
