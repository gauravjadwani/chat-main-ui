<?php

$js = 'js/';
$css = 'css/';

$role=$_GET['role'];
session_start();
$_SESSION["role"] = $role;
?>

<!DOCTYPE html>
<html>
<head>

	<title>
		Chat
	</title>
	<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/smoothness/jquery-ui.css"
	type="text/css" media="screen"/>
	<link type="text/css" href="<?php echo $css; ?>jquery.ui.chatbox.css" rel="stylesheet"/>
	<link rel="stylesheet" href="css/twemoji-awesome.css">
	<link rel="stylesheet" href="css/demo.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

	<script type="text/javascript" src="https://code.jquery.com/jquery-1.9.1.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

	<script src="https://ajax.aspnetcdn.com/ajax/jquery.ui/1.9.1/jquery-ui.min.js"></script>
	<script src="<?php echo $js; ?>jquery.ui.chatbox.js"></script>
	<script src="https://twemoji.maxcdn.com/2/twemoji.min.js?2.2.3"></script>
	<script src="https://js.pusher.com/4.0/pusher.min.js"></script>
	<script src="<?php echo $js; ?>custom.js"></script>
	<script type="text/javascript" src="<?php echo $js; ?>/emoticons.js"></script>
	<script type="text/javascript" src="plugin.js"></script>

	<style type="text/css">
		.You {
			width: 95%;
			background-color: #80ffaa;
			padding-top: 5px;
			padding-bottom: 5px;
			padding-left: 4px;
			margin: 5px;
			border-radius: 8px;

		}

		.other {
			width: 95%;
			background-color: #ffffb3;
			padding-top: 5px;
			padding-bottom: 5px;
			padding-left: 4px;
			margin: 5px;
			border-radius: 8px;

		}

		.ui-chatbox-log {
			background-image: url('images/back.jpg');
		}

		.ui-widget-header{
			pointer-events:none;
		}
		.ui-icon-minusthick{
			pointer-events:all !important;
		}
		.demo{
			display: none;
		}
		.time{
			/*width: 95%;*/
			float:right;
			font-size: 10px;
		}

	</style>
</head>
<body>
<!-- <div id="chatbox">
  
</div> -->
<p id='1'></p>
<p id='role'></p>

<i id=:+1: class='twa twa-relaxed twa-lg emoji-content demo' title='relaxed'></i>
<i id=:+2: class='twa twa-satisfied twa-lg emoji-content demo' title='satisfied'></i>
<i id=:+3: class='twa twa-thumbsup twa-lg emoji-content demo' title='thumbsup'></i>
<i id=:+4: class='twa twa-laughing twa-lg emoji-content demo' title='laughing'></i>
<i id=:+5: class='twa twa-worried twa-lg emoji-content demo' title='worried'></i>
<div id="chat_div">

</div>
</body>
<script type="text/javascript">
	
	window.role = "<?php echo $role;?>";
	console.log(role);
	document.getElementById('role').innerHTML=window.role;

	var chat_box = $('#chat_div').construct({'left': '200px'});


</script>
</html>