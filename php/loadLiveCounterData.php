<?php
	$files_path = "../data/";
	$file = $files_path."eventos.txt";
	$string = file_get_contents($file);
	echo $string;
?>