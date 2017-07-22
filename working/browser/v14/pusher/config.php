<?php
error_reporting(E_ALL);

define('APP_KEY', '56fb1a2703a047b52627');
define('APP_SECRET', '452e0dc6be6c3ecc4a59');
define('APP_ID', '290252');

$GLOBALS['ip']='127.0.0.1';
$GLOBALS['r']=new Redis;
$GLOBALS['r']->connect($GLOBALS['ip']);
$msg_limit=10;
?>
