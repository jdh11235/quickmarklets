'use strict';

function randRange(min, max) {
	return Math.random() * (max - min) + min
}
function randInt(min, max) {
	return Math.round(randRange(min, max))
}
function randIntString(min, max) {
	return randInt(min, max).toString()
}
function randColor() {
	return 'rgb(' + randIntString(0, 256) + ', ' + randIntString(0, 256) + ', ' + randIntString(0, 256) + ')'
}

window.addEventListener('click', function(event) {
	var element = event.target;
	element.style.backgroundColor = randColor();
	element.style.color = randColor();
});
