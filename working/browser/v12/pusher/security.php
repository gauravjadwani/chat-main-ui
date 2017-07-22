<?php
global $array;
$array=getallheaders();

// error_reporting(E_ALL);
// ini_set('display_errors',1);
header('Access-Control-Allow-Origin: https://www.ethnustech.com');

function verify() {
		global $array;



	$valid    = false;
	$referer  = isset($array['Referer']) ? explode('/',$array['Referer'])[2] : 'not set';
	

	
	if ($referer== $_SERVER['HTTP_HOST']) {
	//echo 'inside if';
			
		$valid = true;
	}
	return $valid;
}

/*function permission(){
	global $users_id=0;

	 print_r($users_id);
 
}
*/

?>