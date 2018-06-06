<?php 

$files_path = "../data/system_status/";
$file = $files_path.'status.json';

$string = file_get_contents($file);
echo $string;
?>