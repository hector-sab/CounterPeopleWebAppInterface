google.charts.load('current', {packages:['corechart','controls']}).then(stats);

// TODO: Fix the appeareance of the dropdown menues and their flags

function stats() {
	/*
	stats function is available to execute once the google 
	charts API is loaded.
	*/

	// Which chart to be displayed
	var drawChart = null;
	// Indicates if it's visible or not
	var visibilityChart = false;
	// Indicates which year to load
	var year = null;
	var yearSelected = false;
	// Indicates which month to load
	var month = null;
	var monthSelected = false;
	// indicates which day to load
	var day = null;
	var daySelected = false;

	if($('.container').hasClass('stats')) {
		// If the type of chart is selected
		$('a[id^=chart_selector]').on('click',function(e) {
			e.preventDefault();
			var pageRef = $(this).attr('href');
			var this_chart = pageRef.slice(13,-5);

			drawChart = selectChart(this_chart);

			// Load available years
			var years = existingFiles(new Array('years'));
			if(yearSelected) {
				$(document).parents('div').hasClass('year_selector').remove();
			};

			createDropdown(years,0);
			// Show year selector
			$('#btn-group-year').show()
			//yearSelected = true;
		});


		$(document).on('click','a[id^=year_selector]',function(e) {
			e.preventDefault();
			year = $(this).attr('href');

			// Load available years
			var months = existingFiles(new Array('months',year));
			if(monthSelected) {
				$(document).parents('div').hasClass('month_selector').remove();
			};

			createDropdown(months,1);
			// Show year selector
			$('#btn-group-month').show()
			yearSelected = true;
		});


		$(document).on('click','a[id^=month_selector]',function(e) {
			e.preventDefault();
			month = $(this).attr('href');

			// Load available years
			var days = existingFiles(new Array('days',year,month));
			if(daySelected) {
				$(document).parents('div').hasClass('day_selector').remove();
			};

			createDropdown(days,2);
			// Show year selector
			$('#btn-group-day').show();
			daySelected = true;
		});

		//// End of if container 
	};


	function createDropdown(ymd,id) {
		// ymd: array containing the strings to be displayed
		// id: 0='year_selector',1='month_selector', 
		//     2='day_selector'
		var id_str = null;
		var dest_id = null;
		switch(id) {
			case 0:
				id_str = 'year_selector';
				dest_id = 'btn-group-year'
				break;
			case 1:
				id_str = 'month_selector';
				dest_id = 'btn-group-month'
				break;
			case 2:
				id_str = 'day_selector';
				dest_id = 'btn-group-day'
				break;
		};

		var ddm = document.createElement('div');
		ddm.setAttribute('class','dropdown-menu '+id_str);
		ddm.setAttribute('aria-labelledby','dropdownMenuButton');

		for (var i=0;i<ymd.length;i++) {
			var ddi = document.createElement('a');
			ddi.setAttribute('class','dropdown-item');
			ddi.setAttribute('id',id_str);
			ddi.setAttribute('href',ymd[i]);
			var txt = document.createTextNode(ymd[i]);
			ddi.appendChild(txt);
			ddm.appendChild(ddi);
		}

		document.getElementById(dest_id).appendChild(ddm);
	};

	function existingFiles(args) {
		// args: ['years'] for all years available... it's an array
		var nargs = args.length;
		var files = null;
		switch(nargs) {
			case 1:
				// Request what years are available
				files = $.ajax({
					url: 'php/existingFiles.php',
					dataType: 'json',
					data: {mode:'which_years'},
					async: false
				}).responseText;
				break;
			case 2:
				// Request what months are available
				files = $.ajax({
					url: 'php/existingFiles.php',
					dataType: 'json',
					data: {mode:'which_months',year:args[1]},
					async: false
				}).responseText;
				break;
			case 3:
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

	function selectChart(text) {
		// Select which chart is going to be used based on a text
		//  message
		var chart = null;
		switch(text) {
			case 'area':
				chart = drawArea;
				break;
			case 'bars':
				chart = drawBars;
				break;
		};

		return(chart);
	};

	function drawArea() {
		console.log('Area')
	};

	function drawBars() {
		console.log('Bars')
	}
	////////////
};