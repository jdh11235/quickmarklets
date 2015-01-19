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
		marklet = encodeURIComponent(marklet);
		marklet = localStorage.marklet_prefix + marklet + localStorage.marklet_suffix;
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


var Uploader = {

	process: function(file) {
		if (file) {
			console.log(file);
			if (file.type === 'text/javascript') {
				Uploader.$fileinfo.innerHTML = file.name;
			} else {
				alert('ERROR: ' + file.name + ' is ' + (file.type === '' ? 'unknown' : file.type) + ' - it should be JavaScript (.js)');
			}

		}
	},

	setup: function() {
		Uploader.$filedrag = document.getElementById('filedrag');
		Uploader.$filepicker = document.getElementById('filepicker');
		Uploader.$fileinfo = document.getElementById('fileinfo');
		Uploader.$filebutton = document.getElementById('filebutton');

		Uploader.$filedrag.addEventListener('dragover', Uploader.fileDragoverHandler);
		Uploader.$filedrag.addEventListener('dragleave', Uploader.fileDragleaveHandler);
		Uploader.$filedrag.addEventListener('drop', Uploader.fileDropHandler);
		Uploader.$filepicker.addEventListener('change', Uploader.filepickerHandler);
		Uploader.$filebutton.addEventListener('click', Uploader.triggerfilepicker);
	},

	fileDropHandler: function(event) {
		event.stopPropagation();
		event.preventDefault();
		event.target.className = '';
		var file = event.dataTransfer.files[0];
		Uploader.process(file);
	},

	filepickerHandler: function(event) {
		var file = event.target.files[0];
		Uploader.process(file);
	},

	fileDragoverHandler: function(event) {
		event.stopPropagation();
		event.preventDefault();
		//PROBLEM: never contains any files
//		var file = event.dataTransfer.files[0];
//		event.target.className = (file.type === 'text/javascript' ? 'good' : 'bad');
		Uploader.$filedrag.className = 'good';
	},

	fileDragleaveHandler: function(event) {
		event.stopPropagation();
		event.preventDefault();
		event.target.className = '';
	},

	triggerfilepicker: function() {
		Uploader.$filepicker.focus();
		Uploader.$filepicker.click();
	}

};


function init() {
	Prefs.check();
	Marklets.loadAll();
	Uploader.setup();
}


window.addEventListener('load', init);
