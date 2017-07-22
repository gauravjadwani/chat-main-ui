<?php


echo 'start'.(microtime(true)*1000)."\n";

require_once('security.php');
require_once('Pusher.php');
require_once('config.php');

ini_set('display_errors', true);
error_reporting(E_ALL);

echo 'before '.(microtime(true)*1000)."\n";

function getPusherInstance()
{
    if(isset($_SESSION['pusher_obj'])){
	echo 'instance pooled';

        return unserialize(($_SESSION['pusher_obj']));
    }
    else
    {
	echo 'instance created';
        $pusherr= new Pusher(APP_KEY, APP_SECRET, APP_ID);
        // create new inst
        // set it to $_SESSION[PUSHER_INST]
        $_SESSION['pusher_obj']=serialize($pusherr);
        return $pusherr;
    }
}
echo 'before the verify if'.(microtime(true)*1000)."\n";
if (verify()) {
    // session_start();
    $role = $_SESSION["role"];
    $data = $_POST['text'];

    $user_id = 'user_id';
    $check = false;

echo 'before creation of the pusher instance '.(microtime(true)*1000)."\n";

    $pusher = getPusherInstance();//new Pusher(APP_KEY, APP_SECRET, APP_ID);
    $data['role'] = $role;

echo 'after creation of the pusher instance '.(microtime(true)*1000)."\n";

    $response = $pusher->get('/channels/' . $data['channel_id'] . '/users');
   
    if ($response['status'] == 200) {
             if (!empty($response['result']['users'][1])) {
            echo ' not empty ';
            if ($response['result']['users'][0]['id'] == $response['result']['users'][1]['id']) {
                echo '\n' . $check;
                echo 'equal';
                //$check = false;
            } else {
echo 'before trigger of the pusher instance '.(microtime(true)*1000)."\n";
                $check = $pusher->trigger($data['channel_id'], 'new_message', array(
                    'text' => $data));
echo 'after trigger of the pusher instance '.(microtime(true)*1000)."\n";
                echo ' not equal ';
                $check = true;
            }
        }
    }

 /*   
    header("Content-Encoding: none");
    header("Content-Length: 0");
    header("Connection: close");
    flush();*/

    if ($check) {
        echo "break3";
        $time = time();
        // echo("server side if executed");
echo 'before the insertion in the database '.(microtime(true)*1000)."\n";
        $GLOBALS['r']->zadd($data['channel_id'], $time, $data['message']['data'] . "/-/" . $role . "/-/" . $time);
echo 'after the insertion in the database '.(microtime(true)*1000)."\n";
    }
    // echo 'guarav';
}

echo 'after the verify if'.(microtime(true)*1000)."\n";
