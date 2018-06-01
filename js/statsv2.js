google.charts.load('current', {packages:['corechart','controls']}).then(stats);

function stats() {
	/*
	stats function is available to execute once the google 
	charts API is loaded.
	*/

	// Used to check wheter any chart is already being
	// displayed or not
	var ChartVisible = false;

	// This variable will contain the reference to the
	// function that will show the correct chart
	// and be used to adjust the width dynamically
	var drawChart = null;


	// Reload Chart every X milliseconds
	function RC() {
		var out = setInterval(function(){
			drawChart();
		},10000);
		return out;
	};

	var ReloadChart = RC;
	var StopReload_var = null;






	// Only if the current container being displayed is 
	// the one used for the charts, turn main action on
	if($(".container").hasClass("stats")) {
		// If any link from the side panel is clicked
		// show the correspondig chart
		$("a[id^=side-panel]").on("click", function(e) {
			// Prevents the page being reloaded and
			// redirected to the attribute href
			e.preventDefault();

			// Indicates where should we going... which chart
			// should be displayed
			var pageRef = $(this).attr('href');
			
			// Put the description content of the correct 
			// chart into place
			callStat(pageRef);

			// Read which chart should be displayed
			var which_chart = pageRef.slice(13,-5);

			switch( which_chart ) {
				case "area":
					// Draw Area chart
					drawArea();
					// Saves function of the Area chart
					//drawChart = drawArea;
					// Indicates that the chart is now visible
					//ChartVisible = true;
					break;

				case "bars":
					//drawChart = drawBar;
					drawBar();
					//ChartVisible = true;
					break;

				case "pieChart":
					break;
			}
			//StopReload_var = ReloadChart();
		});

		$("a[id^=nav]").on("click",function(e) {
			if(ChartVisible) {
				clearInterval(StopReload_var);
			}
		});
	}








	var dashboard = new google.visualization.Dashboard(
		document.getElementById('dashboard_div'));


	var rangeSlider = new google.visualization.ControlWrapper({
		'controlType': 'ChartRangeFilter',
		'containerId': 'slider_div',
		'options': {
			'filterColumnIndex': 0,
			'ui': {
				'chartType': 'LineChart',
				'chartOptions':{
					'chartArea': {'width': '90%'},
					'hAxis': {'baselineColor': 'none'}
				},
				'chartView': {
					'columns': [0,1,2]
				},
				// 1 day in milliseconds = 24 * 60 * 60 * 1000 = 86,400,000
				'minRangeSize': 21600000,
				'maxRangeSize': 86400000
			}
		},
		'state': {
			'range': {
				'start': new Date(2018,6,1,0,0),
				'ends': new Date(2018,6,2,0,0)
			}
		}
	});


	var chart = new google.visualization.ChartWrapper({
		'containerId': "chart_div",
		'view': {
			'columns': [
			{
				'calc':function(dataTable,rowIndex) {
					return dataTable.getFormattedValue(rowIndex,0);
				},
				'type': 'string'
			},1,2]
		}
	});





	function drawArea() {
		google.visualization.events.addListener(rangeSlider,'statechange',
		function() {
			var v = rangeSlider.getState();
			document.getElementById('slide_div_state').innerHTML = v.range.start + ' - ' + v.range.end;
			return 0;
		});

		chart.setChartType("AreaChart")
		chart.setOptions(options)

		dashboard.bind(rangeSlider,chart);
		dashboard.draw(getJsonData());
	};





	function drawBar() {
		//chart.setDataTable(getJsonData());
		//chart.draw();
		google.visualization.events.addListener(rangeSlider,'statechange',
		function() {
			var v = rangeSlider.getState();
			document.getElementById('slide_div_state').innerHTML = v.range.start + ' - ' + v.range.end;
			return 0;
		});

		chart.setChartType("ColumnChart")
		chart.setOptions(options)

		dashboard.bind(rangeSlider,chart);
		dashboard.draw(getJsonData());

	};

	var options = {
		'title': "Usuarios Registrados Hoy",
		'chartArea': {'height':'80%','width':'90%'},
		'hAxis': {
			'slantedText': false
		},
		'vAxis': {
			'title': 'Número de Ususarios',
			'viewWindow': {
				'min': 0 //,'max': 150
			}
		},
		'legend': {
			'position': 'none'
		}
	}

















	// Gets Data to be displayed on the charts
	function getJsonData() {
		var jsonData = $.ajax({
			url: "php/getData.php",
			dataType: "json",
			async: false
		}).responseText;
		var data = new google.visualization.DataTable(jsonData);
		return data;
	}

	// Reloads the content of the description
	function callStat( pageInfo ) {
		call(pageInfo,"#description");
	}
	////////////
};