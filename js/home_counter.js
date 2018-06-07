$(document).ready(start);

function start() {
	// Cool digital counter https://codepen.io/ashlewis/pen/dwxnq
	counter.displayNumber(6);
};






var counter = {}

counter.hideElement = function(elem) {
	elem.style.visibility = 'hidden';
};

counter.showElement = function(elem) {
	elem.style.visibility = 'visible';
};

counter.showAll = function() {
	var top = document.getElementById('top');
	var bottom = document.getElementById('bottom');
	var middle = document.getElementById('middle');
	var top_left = document.getElementById('top-left');
	var bottom_left = document.getElementById('bottom-left');
	var top_right = document.getElementById('top-right');
	var bottom_right = document.getElementById('bottom-right');

	counter.showElement(top);
	counter.showElement(middle);
	counter.showElement(bottom);
	counter.showElement(top_left);
	counter.showElement(top_right);
	counter.showElement(bottom_left);
	counter.showElement(bottom_right);
}

counter.displayNumber = function(num) {
	counter.showAll();
	var top = document.getElementById('top');
	var bottom = document.getElementById('bottom');
	var middle = document.getElementById('middle');
	var top_left = document.getElementById('top-left');
	var bottom_left = document.getElementById('bottom-left');
	var top_right = document.getElementById('top-right');
	var bottom_right = document.getElementById('bottom-right');

	switch(num) {
		case 0:
			counter.hideElement(middle);
			break;
		case 1:
			counter.hideElement(top);
			counter.hideElement(bottom);
			counter.hideElement(middle);
			counter.hideElement(top_left);
			counter.hideElement(bottom_left);
			break;
		case 2:
			counter.hideElement(top_left);
			counter.hideElement(bottom_right);
			break;
		case 3:
			counter.hideElement(top_left);
			counter.hideElement(bottom_left);
			break;
		case 4:
			counter.hideElement(top);
			counter.hideElement(bottom);
			counter.hideElement(bottom_left);
			break;
		case 5:
			counter.hideElement(top_right);
			counter.hideElement(bottom_left);
			break;
		case 6:
			counter.hideElement(top_right);
			break;
		case 7:
			counter.hideElement(bottom);
			counter.hideElement(middle);
			counter.hideElement(top_left);
			counter.hideElement(bottom_left);
			break;
		case 8:
			break;
		case 9:
			counter.hideElement(bottom_left);
			break;
	};
};