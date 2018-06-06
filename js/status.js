$(document).ready(start);

function start() {
	var status = ut.getCamStatus();

	for (var i=1; i<5; i++) {
		updateStatus(status['cam'+i.toString()],i);
	}
};

function updateStatus(arg,cam) {
	// Updates the color of the indicator of the cemera status
	if(arg==1) {
		document.getElementById('cam-'+cam.toString()).style.backgroundColor = '#12ba36';
	} else {
		document.getElementById('cam-'+cam.toString()).style.backgroundColor = 'gray';
	};
};