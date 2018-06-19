$(document).ready(start);

function start() {
	counterUpdateClickedResp();
	var counterUpdate = document.getElementById('liveCountBtn');
	counterUpdate.addEventListener('click',counterUpdateClickedResp,false);

	function counterUpdateClickedResp() {
		var jsonData = $.ajax({
			url: "php/loadLiveCounterData.php",
			dataType: "json",
			async: false
		}).responseText;
		jsonData = JSON.parse(jsonData)
		document.getElementById("in").textContent=jsonData['entradas'];
		document.getElementById("out").textContent=jsonData['salidas'];
	};
}