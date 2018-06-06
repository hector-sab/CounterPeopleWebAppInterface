$(document).ready(start);

function start() {
	var status = ut.getCamStatus();
	//status = JSON.parse(status);
	console.log(status['cam1'])
	
	for (var i=1; i<5; i++) {
		updateStatus(status['cam'+i.toString()],i);
	}
};

function updateStatus(arg,cam) {
	console.log("hey",arg,cam,'cam-'+cam.toString())
	if(arg==1) {
		document.getElementById('cam-'+cam.toString()).style.backgroundColor = '#12ba36';
	} else {
		document.getElementById('cam-'+cam.toString()).style.backgroundColor = 'gray';
	};
};