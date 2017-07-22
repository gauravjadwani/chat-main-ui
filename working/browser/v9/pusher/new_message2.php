<?php
include 'Pusher.php';
include 'config.php';


$data=$_POST['text'];


$user_id='user_id';

if(verify())
{	
$pusher= new Pusher(APP_KEY,APP_SECRET,APP_ID);
$pusher->trigger($data['channel_id'],'new_message',array('text'=>$data['message']));
?>