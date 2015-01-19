'use strict';


var Marklets = {

	load: function(template) {
		var request = new XMLHttpRequest();
		request.onload = function(event) {
			Marklets.load_2(event, template);
		};
		request.open('get', template.href, true);
		request.send();
	},

	load_2: function(event, template) {
		var marklet = event.currentTarget.responseText;
		marklet = Marklets.convert(marklet);
		template.href = marklet;
	},

	convert: function(marklet) {
		//input must always use semicolons and not have single-line comments
		marklet = encodeURIComponent(marklet);
		marklet = localStorage.marklet_prefix + marklet + localStorage.marklet_suffix;
		return marklet;
	},

	loadAll: function() {
		var items = document.querySelectorAll('#marklets a');
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			//iterate through templates
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
			key: 'marklet_prefix',
			value: 'javascript:(function(){'
		},
		{
			key: 'marklet_suffix',
			value: '})()'
		}
	]

};


function init() {
	Prefs.check();
	Marklets.loadAll();
}


window.addEventListener('load', init);
