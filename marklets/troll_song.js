'use strict';

//embed youtube video http://youtu.be/i1EG-MKy4so
//<iframe width="560" height="315" src="//www.youtube.com/embed/i1EG-MKy4so" frameborder="0" allowfullscreen></iframe>

var frame = document.createElement('div');
frame.setAttribute('hidden', '');
frame.innerHTML = '<iframe width="560" height="315" src="//www.youtube.com/embed/i1EG-MKy4so?autoplay=1" frameborder="0" allowfullscreen></iframe>';

document.body.appendChild(frame);
