<?php

header("Access-Control-Allow-Origin: * ");
$data = array(
		'app_sec'	=>	'56fb1a2703a047b52627'
	);

echo base64_encode(json_encode($data));

?>