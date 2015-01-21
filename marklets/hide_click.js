'use strict';

function hider(event) {
	event.preventDefault();
	var element = event.target;
	element.setAttribute('hidden', '');
	window.removeEventListener('click', hider);
}

window.addEventListener('click', hider);
