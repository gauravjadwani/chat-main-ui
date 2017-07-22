<?php
include 'pusher/config.php';

for($i=1;$i<=100000;$i++)
{
	$time=time().rand(0,10000000000000);
	echo 'inserting record '.$i.$time;
$GLOBALS['r']->zadd('channel_id:'.$i.$time,$time,$time.'--'.$i);	
echo "\n";
}
?>