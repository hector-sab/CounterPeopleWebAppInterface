google.charts.load('current', {packages:['corechart','controls']}).then(stats);

function stats() {
	// Which chart to be displayed
	var drawChart = null;
	// Indicates if it's visible or not
	var visibilityChart = false;
	// Indicates which period to display
	var period = null;
	// Indicates which year to load
	var year = null;
	// Indicates which month to load
	var month = null;
	// indicates which day to load
	var day = null;


	if($('.container-fluid').is('#stats')) {
		period = 'day';
		selectChart('area');

		// Loads the available years
		var years = existingFiles(new Array('years'));
		populateForm(years,0);

		var periodSelect = document.getElementById('period_select');
		periodSelect.addEventListener('change',periodSelectedResp,false);

		var chartSelect = document.getElementById('chart_select');
		chartSelect.addEventListener('change',chartSelectedResp,false);

		var yearSelect = document.getElementById('year_select');
		yearSelect.addEventListener('change',yearSelectedResp,false);

		var monthSelect = document.getElementById('month_select');
		monthSelect.addEventListener('change',monthSelectedResp,false);

		var daySelect = document.getElementById('day_select');
		daySelect.addEventListener('change',daySelectedResp,false);
	};


	/////////////////
	function periodSelectedResp() {
		if (this.value.length>0) {
			// Save selected year
			period = this.value;

			switch(period) {
				case 'year':
					if (year!=null) {
						drawChart();
					}
					break;
				case 'month':
					if (month!=null) {
						drawChart();
					}
					break;
				case 'day':
					if (day!=null) {
						drawChart();
					}
					break;
			};
		};
	};

	function chartSelectedResp() {
		selectChart(this.value);
		if (visibilityChart) {
			drawChart();
		};
	};

	function yearSelectedResp() {
		if (this.value.length>0) {
			// Save selected year
			year = this.value;

			// Errase all old content
			cleanForm(1);
			cleanForm(2);

			// Populate form
			var months = existingFiles(new Array('months',this.value));
			populateForm(months,1);

			if(period=='year') {
				drawChart();
			};
		};
	};

	function monthSelectedResp() {
		if (this.value.length>0) {
			// Save selected month
			month = this.value;

			// Errase all old content
			cleanForm(2);

			// Populate form
			var months = existingFiles(new Array('days',year,this.value));
			populateForm(months,2);

			if(period=='month') {
				drawChart();
			};
		};
	};

	function daySelectedResp() {
		if (this.value.length>0) {
			day = this.value;

			if(period=='day') {
				drawChart();
			};
		};
	};
	/////////////////

	function cleanForm(id) {
		// id: 0='year_selector',1='month_selector', 
		//     2='day_selector'
		var cls_str = null;
		switch(id) {
			case 0:
				cls_str = 'year_select_item';
				break;
			case 1:
				cls_str = 'month_select_item';
				break;
			case 2:
				cls_str = 'day_select_item';
				break;
		};

		$('.'+cls_str).remove();
	};

	function populateForm(ymd,id) {
		// ymd: array containing the strings to be displayed
		// id: 0='year_selector',1='month_selector', 
		//     2='day_selector'

		var months = ['Enero','Febrero','Marzo','Abril','Mayo',
									'Junio','Julio','Agosto','Septiembre',
									'Octubre','Noviembre','Diciembre'];

		var cls_str = null;
		var dest_id = null;

		switch(id) {
			case 0:
				cls_str = 'year_select_item';
				dest_id = 'year_select';
				break;
			case 1:
				cls_str = 'month_select_item';
				dest_id = 'month_select';
				break;
			case 2:
				cls_str = 'day_select_item';
				dest_id = 'day_select';
				break;
		};
		
		for (var i=0;i<ymd.length;i++) {
			var oi = document.createElement('option');
			oi.setAttribute('class',cls_str);
			oi.setAttribute('value',ymd[i]);
			//oi.setAttribute('id',id_str);
			if(id!=1) {
				var txt = document.createTextNode(ymd[i]);
			} else {
				var txt = document.createTextNode(months[parseInt(ymd[i])-1]);
			}
			oi.appendChild(txt);
			document.getElementById(dest_id).appendChild(oi);
		};
	};

	function existingFiles(args) {
		// Returns how many elements exist
		// args should be an array -> new Array(...)
		//
		// args: indicates what folder to retrive
		// args[0] -> 'years','months', or 'days'
		//
		// for 'years' there's other arg expected 
		// for 'months', which year is espected. ie ['months','2018']
		// for 'days', which year and month is espected. ie ['months','2018','01']
		//
		// All parameters should be strings

		var nargs = args.length;
		var files = null;

		switch(args[0]) {
			case 'years':
				// Request what years are available
				files = $.ajax({
					url: 'php/existingFiles.php',
					dataType: 'json',
					data: {mode:'which_years'},
					async: false
				}).responseText;
				break;
			case 'months':
				// Request what months are available
				files = $.ajax({
					url: 'php/existingFiles.php',
					dataType: 'json',
					data: {mode:'which_months',year:args[1]},
					async: false
				}).responseText;
				break;
			case 'days':
				// Request what days are available
				files = $.ajax({
					url: 'php/existingFiles.php',
					dataType: 'json',
					data: {mode:'which_days',year:args[1],month:args[2]},
					async: false
				}).responseText;
				break;
		};

		files = JSON.parse(files)
		files.sort();
		return(files);
	};

	function getJsonData() {
		var jsonData = $.ajax({
			url: "php/getData2.php",
			data: {mode:period,year:year,month:month,day:day},
			dataType: "json",
			async: false
		}).responseText;

		var data = new google.visualization.DataTable(jsonData);
		formatDate.format(data,0)
		return data;
	};

	function selectChart(text) {
		// Select which chart is going to be used based on a text
		//  message
		var chart = null;
		switch(text) {
			case 'area':
				drawChart = drawArea;
				break;
			case 'bars':
				drawChart = drawBars;
				break;
		};
	};

	function drawArea() {
		console.log('Area');
		visibilityChart = true;
	};

	function drawBars() {
		console.log('Bars')
		visibilityChart = true;
	};
	///////
};