<?php
header("Access-Control-Allow-Origin: https://ethnustech.com");
if (verify()) {
	
	include 'Pusher.php';
	include 'config.php';
    //session role
	session_start();
	$role = $_SESSION["role"];
	$data = $_POST['text'];
	
	$user_id = 'user_id';
	
	$pusher       = new Pusher(APP_KEY, APP_SECRET, APP_ID);
	$data['role'] = $role;
	$check        = $pusher->trigger($data['channel_id'], 'new_message', array(
		'text' => $data
		));
	echo 'the check is' . $check;
	$time = time();
	
	$GLOBALS['r']->zadd($data['channel_id'], $time, $data['message'] . "/-/" . $role . "/-/" . $time);
	
	function get_channel_name($http_referer) {
        // not allowed :, / % #
		$pattern      = "/(\W)+/";
		$channel_name = preg_replace($pattern, '-', $http_referer);
		return $channel_name;
	}
	$channel_name = get_channel_name($_SERVER['HTTP_REFERER']);
	echo $channel_name;
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
	return $valid;
}
?>