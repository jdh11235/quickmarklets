function hider(event) {
	event.preventDefault();
	var element = event.toElement;
	element.setAttribute('hidden', '');
	window.removeEventListener('click', hider);
}
window.addEventListener('click', hider);
