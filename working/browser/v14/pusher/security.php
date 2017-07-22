<?php
require_once('config.php');
global $array;
$array=getallheaders();

// error_reporting(E_ALL);
// ini_set('display_errors',1);
header('Access-Control-Allow-Origin: https://www.ethnustech.com');
session_start();
function verify() {
// print_r($_POST);
// echo strlen( $_POST['text']['message']['data']);
		global $array;



	$valid    = false;
	$referer  = isset($array['Referer']) ? explode('/',$array['Referer'])[2] : 'not set';
	

	
	if ($referer== $_SERVER['HTTP_HOST']&&(isset($_SESSION["role"]))) {
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