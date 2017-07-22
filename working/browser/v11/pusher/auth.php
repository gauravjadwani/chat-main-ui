<?php
//print_r(getallheaders());

/*global $array;
$array=getallheaders();

error_reporting(E_ALL);
ini_set('display_errors',1);*/

require_once('Pusher.php');
require_once('config.php');
require_once('security.php');

// if()
// header('Access-Control-Allow-Origin: https://www.ethnustech.com');
/*$rand = rand(0, 1);
$arr = array("ie", "ir");
$uid = $arr[$rand];*/
//  rand(1, 100)
session_start();
// echo $_SESSION["role"];
$uid=$_SESSION["role"];
$user = json_decode(json_encode(array(
	'name' => 'ASD',
	'uid' => $uid
	)));

global $user;
if (verify()) {
	// $pusher        = new Pusher('56fb1a2703a047b52627', '452e0dc6be6c3ecc4a59', '290252');
	$pusher= new Pusher(APP_KEY, APP_SECRET, APP_ID);
	$presence_data = array(
		'name' => $user->name
		);
	// echo $_POST['channel_name'];
	echo $pusher->presence_auth($_POST['channel_name'], $_POST['socket_id'], $user->uid, $presence_data);
} else {
	header('', true, 403);
	echo ("Forbidden");
}

/*function verify() {
		global $array;
	//echo explode('/',$array['Referer'])[2];
	//echo $_SERVER['HTTP_ORIGIN'];


	$valid    = false;
	$referer  = isset($array['Referer']) ? explode('/',$array['Referer'])[2] : 'not set';
	
	//echo 'origion is '.$referer;
	//	$protocol = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
	
	if ($referer== $_SERVER['HTTP_HOST']) {
	//echo 'inside if';
		
		$valid = true;
	}
	return $valid;
}*/

?>