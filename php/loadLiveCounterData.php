<?php
//$files_path = "../data/";
$json_a = file_get_contents("../config/cfg.json");
$json_a = json_decode($json_a, true);
$files_path = (string)$json_a['dataDir'];

$file = $files_path."eventos.txt";
$string = file_get_contents($file);
echo $string;
?>