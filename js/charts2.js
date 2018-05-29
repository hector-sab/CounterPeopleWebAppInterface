google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawGraph);


function drawGraph() {
	var options = {
		height: 400,
		animation: {
			duration: 1000,
			easing: 'in'
		}
	};

	var chart = new google.visualization.AreaChart(
    document.getElementById('chart'));

	function drawChart() {
		var jsonData = $.ajax({
			url: "php/getData.php",
			dataType: "json",
			async: false
		}).responseText;
	
	var data = new google.visualization.DataTable(jsonData);
	chart.draw(data,options)
	}

	$(window).resize(function() {
		drawChart();
	})

	drawChart();
}