<?php
$json_a = file_get_contents("../config/cfg.json");
$json_a = json_decode($json_a, true);
$init_path = (string)$json_a['initializationPath'];

shell_exec($init_path)
echo "all done!";
?>