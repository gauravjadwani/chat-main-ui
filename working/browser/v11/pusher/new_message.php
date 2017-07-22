<?php
require_once('security.php');


if (verify()) {
	
		include 'Pusher.php';
	include 'config.php';
    
	session_start();
	$role = $_SESSION["role"];
	$data = $_POST['text'];
	
	$user_id = 'user_id';
	$check=false;


	$pusher= new Pusher(APP_KEY, APP_SECRET, APP_ID);
	$data['role'] = $role;


$response = $pusher->get( '/channels/'.$data['channel_id'].'/users' );
print_r($response);
// $info=$pusher->get_channel_info($data['channel_id']);
// var_dump($info);
/*	$info=$pusher->get_channel_info($data['channel_id']);
	print_r($info);*/
	/*$info = $pusher->get_channel_info('presence-channel-name', array('info' => 'user_count'));
$user_count = $info->user_count;
print_r($user_count);*/
if( $response[ 'status'] == 200 ) {
	// echo $response['result']['users'][0]['id'];
 // print_r($response[ 'body' ]);
  // $users_id= json_decode( $response[ 'body' ], true );
// print_r($users_id);
echo 'first';
  	if(!empty($response['result']['users'][1]))
  	{
  	echo ' not empty ';	
  if($response['result']['users'][0]['id'] == $response['result']['users'][1]['id'])
  {
  	
  	echo '\n'.$check;
  	echo 'equal';
  	$check=false;
  }
  else
  {
  	$check= $pusher->trigger($data['channel_id'], 'new_message', array(
		'text' => $data));
  	echo ' not equal ';
  	$check=true;
  
}
}


}

 


	if($check)
	{
		echo "break3";
		$time = time();
		// echo("server side if executed");
		$GLOBALS['r']->zadd($data['channel_id'], $time, $data['message']['data'] . "/-/" . $role . "/-/" . $time);
	}
	// echo 'guarav';
}
/*function verify() {
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

}*/
?>