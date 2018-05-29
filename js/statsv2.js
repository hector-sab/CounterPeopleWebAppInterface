google.charts.load('current').then(stats);

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
					drawChart = drawArea;
					// Indicates that the chart is now visible
					ChartVisible = true;
					break;
				case "bars":
					drawChart = drawBar;
					drawBar();
					ChartVisible = true;
					break;
				case "pieChart":
					break;
			}
			StopReload_var = ReloadChart();
		});

		$("a[id^=nav]").on("click",function(e) {
			if(ChartVisible) {
				clearInterval(StopReload_var);
			}
		});
	}

	function callStat( pageInfo ) {
		call(pageInfo,"#description");
	}

	var chart = new google.visualization.ChartWrapper({
		containerId: "chart"
	});

	function getJsonData() {
		var jsonData = $.ajax({
			url: "php/getData.php",
			dataType: "json",
			async: false
		}).responseText;
		var data = new google.visualization.DataTable(jsonData);
		return data;
	}

	var optionsBar = {
		title: "Usuarios Registrados Hoy",
		bar: {groupWidth: '95%'},
		hAxis: {
			title: "Hora del Día",
			// Set Time labels 
			format: 'h:mm a',
			viewWindow: {
				min: [0,0,0],
				max: [24,0,0]
			},
			// Rotate Axis labels
			//slantedText: true,
			//slantedTextAngle: 90
		},
		vAxis: {
			title: "Número de Usuarios Registrados"
		}
	}

	var optionsArea = {
		title: "Usuarios Registrados Hoy",
		hAxis: {
			title: "Hora del Día",
			format: 'h:mm a',
			viewWindow: {
				min: [0,0,0],
				max: [24,0,0]
			},
		},
		vAxis: {
			title: "Número de Usuarios Registrados"
		}
	}

	function drawArea() {	
		chart.setChartType("AreaChart");
		chart.setDataTable(getJsonData());
		chart.setOptions(optionsArea);
		chart.draw();
	}

	function drawBar() {	
		chart.setChartType("ColumnChart");
		chart.setDataTable(getJsonData());
		chart.setOptions(optionsBar);
		chart.draw();
	}




	$(window).resize(function() {
		if (ChartVisible) {
			drawChart();
		}
	})

	if (ChartVisible) {
		console.log("234")
		setInterval(function(){
			drawChart();
			console.log("YES");
		},500)
	}
	////////////
};