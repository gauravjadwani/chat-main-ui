<?php
require_once('config.php');

$channel_id=$_REQUEST['channel_id'];
// print_r($_REQUEST['text']);
// $channel_id='presence-123';

$data=$GLOBALS['r']->zrange($channel_id,0,-1,'withscores');

// print_r($data);
// exit();
$json_encode=json_encode($data);

echo $json_encode;

// $r=array_merge($data,$data1);

// print_r($r);

?>