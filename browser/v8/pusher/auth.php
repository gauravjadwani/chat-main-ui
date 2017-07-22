<?php

require_once('Pusher.php');
require_once('config.php');

$user = json_decode(json_encode(array(
	'name' => 'ASD',
	'uid' => rand(1, 200)
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

function verify() {
	$valid    = false;
	$origin   = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
	$protocol = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
	if ($origin == $protocol . $_SERVER['HTTP_HOST']) {

		$valid = true;
	}
	return $valid;
}

?>