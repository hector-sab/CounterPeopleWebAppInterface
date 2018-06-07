$(document).ready(start);

function start() {
	var period = null;
	var year = null;
	var month = null;
	var day = null;

	if($('.container').is('#reports')) {
		period = 'year';

		var years = ut.existingFiles(new Array('years'));
		ut.populateForm(years,0);

		var periodSelect = document.getElementById('period_select');
		periodSelect.addEventListener('change',periodSelectedResp,false);

		var yearSelect = document.getElementById('year_select');
		yearSelect.addEventListener('change',yearSelectedResp,false);
		//yearSelect.on("change",yearSelectedResp);

		var monthSelect = document.getElementById('month_select');
		monthSelect.addEventListener('change',monthSelectedResp,false);

		var daySelect = document.getElementById('day_select');
		daySelect.addEventListener('change',daySelectedResp,false);

		var downloadClick = document.getElementById('download');
		downloadClick.addEventListener('click',downloadSelectedResp,false);		
	};







	////////////// Start: Response Functions
	function periodSelectedResp() {
		if (this.value.length>0) {
			// Save selected year
			period = this.value;
		};
	};

	function yearSelectedResp() {
		if (this.value.length>0) {
			// Save selected year
			year = this.value;

			// Errase all old content
			ut.cleanForm(1);
			ut.cleanForm(2);

			// Populate form
			var months = ut.existingFiles(new Array('months',this.value));
			ut.populateForm(months,1);
		};
	};

	function monthSelectedResp() {
		if (this.value.length>0) {
			// Save selected month
			month = this.value;

			// Errase all old content
			ut.cleanForm(2);

			// Populate form
			var months = ut.existingFiles(new Array('days',year,this.value));
			ut.populateForm(months,2);
		};
	};

	function daySelectedResp() {
		if (this.value.length>0) {
			day = this.value;
		};
	};

	function downloadSelectedResp() {
		var GET_DATA = false;
		switch(period) {
			case 'year':
				if (year!=null) {
					GET_DATA = true;
				};
				break;
			case 'month':
				if(year!=null && month!=null) {
					GET_DATA = true;
				};
				break;
			case 'day':
				if(year!=null && month!=null && day!=null) {
					GET_DATA = true;
				};
				break
		};
		if(GET_DATA) {
			var data = ut.getJson(new Array(period,year,month,day));
			downloadJSON(data);
		}
	};
	////////////// Ends: Response Functions
}


function leadZeros(str) {
		if (str.length<2) {
			str = '0'+str;
		}
		return str;
	};

function downloadJSON(data) {
	// https://code-maven.com/create-and-download-csv-with-javascript
	// data should be a JSON object with two objects inside; 
	//  'cols' and 'rows'
	var csv = 'Fecha,Hora,Entradas,Salidas\n';
	
	for (var i = 0; i<data['rows'].length; i++) {
		var row = data['rows'][i]['c'];
		
		var dateTime = row[0]['v'];
		var ins = row[1]['v'];
		var outs = row[2]['v'];

		dateTime = dateTime.replace('Date(','');
		dateTime = dateTime.replace(')','');
		
		dateTime = dateTime.split(',');
		
		var MM = leadZeros((parseInt(dateTime[1])+1).toString());
		var DD = leadZeros(dateTime[2]);

		var date = dateTime[0]+'-'+MM+'-'+DD+',';
		



		var hh = leadZeros(dateTime[3]);
		var mm = leadZeros(dateTime[4]);
		var ss = leadZeros(dateTime[5]);

		var time = hh+':'+mm+':'+ss+',';
		
		csv += date+time+ins+','+outs+'\n';
	};


	var hiddenElement = document.createElement('a');
	hiddenElement.href = 'data:text/csv;charset=utf-8,'+encodeURI(csv);
	hiddenElement.target = '_blank';
	hiddenElement.download = 'people.csv';
	document.getElementById('csv_download').appendChild(hiddenElement);
	hiddenElement.click();
};
////////