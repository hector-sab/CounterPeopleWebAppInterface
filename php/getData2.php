<?php 

// This is just an example of reading server side data and sending it to the client.
// It reads a json formatted text file and outputs it.

// mode: indicates if you want to retrieve information of
//    a day, month, year, or the full registery
$file = "../data/";

$mode = $_GET['mode'];
switch ($mode) {
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
}


$string = file_get_contents($file);

echo $string;


// Instead you can query your database and parse into JSON etc etc

?>