google.charts.load('current', {'packages':['corechart']}).then(stats);

function stats() {
	if($(".container").hasClass("stats")) {		
		$("a[id^=side-panel]").on("click", function(e) {
			e.preventDefault();

			var pageRef = $(this).attr('href');
			console.log(pageRef);
			callStat(pageRef)

			drawChart();
		});		
	}

	function callStat( pageInfo ) {
		call(pageInfo,"#description");
		//test();
	}




	var options = {
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

	///////////
};