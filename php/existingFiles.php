<?php 

// This is just an example of reading server side data and sending it to the client.
// It reads a json formatted text file and outputs it.

// mode: indicates if you want to retrieve information of
//    a day, month, year, or the full registery
$files_path = "../data/";

$mode = $_GET['mode'];

switch ($mode) {
	case 'which_years':
		// Indicates which years are available
		$files = scandir($files_path.'yearly/');
		break;
	case 'which_months':
		// Indicates which years are available
		$year = $_GET['year'];
		$files = scandir($files_path.'monthly/'.$year.'/');
		break;
	case 'which_days':
		// Indicates which years are available
		$year = $_GET['year'];
		$month = $_GET['month'];
		$files = scandir($files_path.'daily/'.$year.'/'.$month.'/');
		break;
	case 'year':
		$year = $_GET['year'];
		$file = $file."yearly/".$year.".json";
		break;
	case 'month':
		$year = $_GET['year'];
		$month = $_GET['month'];
		$file = $file."monthly/".$year."/".$month.".json";
		break;
	case 'day':
		$year = $_GET['year'];
		$month = $_GET['month'];
		$day = $_GET['day'];
		$file = $file."daily/".$year."/".$month."/".$day.".json";
		break;
};

switch ($mode) {
	case 'which_years' or 'which_months' or 'which_days':
		$ffiles = array(); // Filtered years

		for ($i=0; $i<count($files)-2; $i++) {
			array_push($ffiles,substr($files[$i+2],0,-5));
		}
		echo json_encode($ffiles);
		break;
	case 'year' or 'month' or 'day':
		$string = file_get_contents($file);
		echo $string;
		break;
}






//$string = file_get_contents($file);

//echo $string;


// Instead you can query your database and parse into JSON etc etc

?>