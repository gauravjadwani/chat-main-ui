<?php
include 'Pusher.php';
include 'config.php';


$data=$_POST['text'];


$user_id='user_id';

if(verify())
{	
$pusher= new Pusher(APP_KEY,APP_SECRET,APP_ID);
$pusher->trigger($data['channel_id'],'new_message',array('text'=>$data['message']));
$time=time();

/*
$GLOBALS['r']->zadd($data['channel_id'],$time,md5($data['channel_id'].$time));
$GLOBALS['r']->lpush($time.':'.$user_id.':'.md5($data['channel_id'].$time),$data['message']);
*/
function get_channel_name($http_referer) {
  // not allowed :, / % #
  $pattern = "/(\W)+/";
  $channel_name = preg_replace($pattern, '-', $http_referer);
  return $channel_name;
}
$channel_name = get_channel_name($_SERVER['HTTP_REFERER']);
echo $channel_name;



}
function verify()
{
	
	return true;
}
?>