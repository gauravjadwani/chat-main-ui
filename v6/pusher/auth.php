<?php
include_once('Pusher.php');

/*session_start();
header("Content-Type: application/json");
require_once("pusher_info.php");

if(!isset($_SESSION["user_id"]))
{
$_SESSION["user_id"] = time();
}
$channel_name = $_POST["channel_name"];

// check user has access to $channel_name
echo $_pusher--->presence_auth($channel_name, $_POST["socket_id"], $_SESSION["user_id"], array("id" => $_SESSION["user_id"]));

*/

$user = json_decode(json_encode(array(
	'name' => 'ASD',
	'uid' => rand(1, 200)
	)));

global $user;
if (verify()) {
	$pusher        = new Pusher('56fb1a2703a047b52627', '452e0dc6be6c3ecc4a59', '290252');
	$presence_data = array(
		'name' => $user->name
		);
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