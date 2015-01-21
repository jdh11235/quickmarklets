'use strict';

function deleter(event) {
	event.preventDefault();
	var element = event.toElement;
	element.parentNode.removeChild(element);
	window.removeEventListener('click', deleter);
}

window.addEventListener('click', deleter);
