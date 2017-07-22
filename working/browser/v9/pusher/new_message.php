<?php
echo 'guarav';
// header("Access-Control-Allow-Origin: https://ethnustech.com");

if (true) {
	echo "break1";
		include 'Pusher.php';
	include 'config.php';
    
	session_start();
	$role = $_SESSION["role"];
	$data = $_POST['text'];
	
	$user_id = 'user_id';
	// print_r($data['channel_id']);
	echo($data['message']['data']);

	$pusher= new Pusher(APP_KEY, APP_SECRET, APP_ID);
	$data['role'] = $role;
	$check= $pusher->trigger($data['channel_id'], 'new_message', array(
		'text' => $data));
	var_dump($check);
	echo 'gauravffefefefe';
	$time = time();
	echo "break2";

	if($check)
	{
		echo "break3";
		// echo("server side if executed");
		$GLOBALS['r']->zadd($data['channel_id'], $time, $data['message']['data'] . "/-/" . $role . "/-/" . $time);
	}
	// echo 'guarav';
}
function verify() {
	$valid    = false;
	$origin   = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
	$protocol = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
	if ($origin == $protocol . $_SERVER['HTTP_HOST']) {
		$is_ajax = isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
		if ($is_ajax)
			$valid = true;
	}
	echo "break5";
	return $valid;

}
?>