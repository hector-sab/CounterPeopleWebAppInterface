$(document).ready(start);

function start() {
	var initMain = document.getElementById('start');
	initMain.addEventListener('click',initMainClickedResp,false);

	var initCalibration = document.getElementById('calibrate');
	initCalibration.addEventListener('click',initCalibrationClickedResp,false);

	/* Starts: Functions Response */
	function initMainClickedResp() {
		console.log('Initialization');
		var init_main = $.ajax({
			url: 'php/init_main.php',
			async: false
		}).responseText;
		console.log(init_main);
	}

	function initCalibrationClickedResp() {
		console.log('Calibration');
		var init_calibration = $.ajax({
			url: 'php/init_calibration.php',
			async: false
		}).responseText;
		console.log(init_calibration);
	}
	/**/

	var status = getCamStatus();

	for (var i=1; i<5; i++) {
		updateStatus(status['cam'+i.toString()],i);
	}

	function updateStatus(arg,cam) {
		// Updates the color of the indicator of the cemera status
		if(arg==1) {
			document.getElementById('cam-'+cam.toString()).style.backgroundColor = '#12ba36';
		} else {
			document.getElementById('cam-'+cam.toString()).style.backgroundColor = 'gray';
		};
	};

	function getCamStatus()
	{
		var jsonData = $.ajax({
			url: "php/systemStatus.php",
			dataType: "json",
			async: false
		}).responseText;

		var data = JSON.parse(jsonData);
		return data;//jsonData;
	};
};