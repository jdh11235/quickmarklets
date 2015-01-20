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
		var compressed_prefix = Prefs.get('marklet_prefix_compressed');
		var compressed_suffix = Prefs.get('marklet_suffix_compressed');
		var uncompressed_prefix = Prefs.get('marklet_prefix_uncompressed');
		var uncompressed_suffix = Prefs.get('marklet_suffix_uncompressed');

		marklet = compressed_prefix + marklet + compressed_suffix;
		marklet = encodeURIComponent(marklet);
		marklet = uncompressed_prefix + marklet + uncompressed_suffix;

		return marklet;
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

	get: function(key) {
		if (localStorage.getItem(key)) {
			return localStorage.getItem(key);
		} else {
			return Prefs.defaults[key];
		}
	},

	set: function(key, value) {
		localStorage.setItem(key, value);
		console.log('reload to see the change');
	},

	reset: function() {
		for (var key in Prefs.defaults) {
			localStorage.removeItem(key);
		}
		console.log('reload to see the change');
	},

	defaults: {
		'marklet_prefix_uncompressed': 'javascript:',
		'marklet_prefix_compressed': '(function(){',
		'marklet_suffix_compressed': '})()',
		'marklet_suffix_uncompressed': ''
	}

};


var Customizer = {

	display: function(marklet, label) {
		Customizer.$custom_marklet.href = Marklets.convert(marklet);
		Customizer.$custom_label.value = '';
		Customizer.$custom_label.placeholder = label;
		Customizer.syncLabel();
		Customizer.$custom_label.addEventListener('input', Customizer.syncLabel);
		Customizer.$custom_display.removeAttribute('hidden');
		Customizer.$custom_label.focus();
	},

	syncLabel: function() {
		var input = Customizer.$custom_label.value;
		var default_label = Customizer.$custom_label.placeholder;
		if (!input) {
			input = default_label;
		}
		Customizer.$custom_marklet.innerHTML = input;
	},

	process: function(file) {
		if (file) {
			console.log(file);
			if (file.type === 'text/javascript') {

				Customizer.$fileinfo.innerHTML = file.name;
				var reader = new FileReader();
				reader.onload = function(event) {
					var text = event.currentTarget.result;
					Customizer.display(text, file.name);
				};
				reader.readAsText(file);

			} else {
				alert('Rejected! ' + file.name + ' is type: "' + (file.type === '' ? 'unknown' : file.type) + '"\nYou need a JavaScript file (.js)');
			}
		}
	},

	setup: function() {
		Customizer.$filedrag = document.getElementById('filedrag');
		Customizer.$filepicker = document.getElementById('filepicker');
		Customizer.$fileinfo = document.getElementById('fileinfo');
		Customizer.$filebutton = document.getElementById('filebutton');
		Customizer.$custom_display = document.getElementById('custom_display');
		Customizer.$custom_marklet = document.getElementById('custom_marklet');
		Customizer.$custom_label = document.getElementById('custom_label');

		Customizer.$filedrag.addEventListener('dragover', Customizer.fileDragoverHandler);
		Customizer.$filedrag.addEventListener('dragleave', Customizer.fileDragleaveHandler);
		Customizer.$filedrag.addEventListener('drop', Customizer.fileDropHandler);
		Customizer.$filepicker.addEventListener('change', Customizer.filepickerHandler);
		Customizer.$filebutton.addEventListener('click', Customizer.triggerfilepicker);
	},

	fileDropHandler: function(event) {
		event.stopPropagation();
		event.preventDefault();
		event.target.className = '';
		var file = event.dataTransfer.files[0];
		Customizer.process(file);
	},

	filepickerHandler: function(event) {
		var file = event.target.files[0];
		Customizer.process(file);
	},

	fileDragoverHandler: function(event) {
		event.stopPropagation();
		event.preventDefault();
		//PROBLEM: never contains any files
//		var file = event.dataTransfer.files[0];
//		event.target.className = (file.type === 'text/javascript' ? 'good' : 'bad');
		Customizer.$filedrag.className = 'good';
	},

	fileDragleaveHandler: function(event) {
		event.stopPropagation();
		event.preventDefault();
		event.target.className = '';
	},

	triggerfilepicker: function() {
		Customizer.$filepicker.focus();
		Customizer.$filepicker.click();
	}

};


function init() {
	Marklets.loadAll();
	Customizer.setup();
}


window.addEventListener('load', init);
