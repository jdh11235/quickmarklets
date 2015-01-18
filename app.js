'use strict';


var Marklets = {

	load: function(marklet_template) {

		console.log(marklet_template);

	},

	loadAll: function() {

		var items = document.querySelectorAll('#marklets a');
		for (var i = 0; i < items.length; i++) {
			Marklets.load(items[i]);
		}

	}

};


function init() {
	Marklets.loadAll();
}


window.addEventListener('load', init);
