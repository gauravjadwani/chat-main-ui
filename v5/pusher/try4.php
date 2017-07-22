<?php
$rand=rand(0,1);
$arr=array("ie","ir");
?>

<!DOCTYPE html>
<html>
<head>
	<title>
		Chat
	</title>
	<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/smoothness/jquery-ui.css" type="text/css" media="screen" />
	<!--jQuery and jQuery UI with jQuery Chat-->
	<script type="text/javascript" src="jquery-1.8.3.js"></script>
	<script src="lz-string.min.js"></script>
	<script src="base64-string.min.js"></script>
	<script src="base64.min.js"></script>
	<script type="text/javascript" src="jquery-ui.js"></script>
	<link type="text/css" href="jquery.ui.chatbox.css" rel="stylesheet" />
	<script type="text/javascript" src="jquery.ui.chatbox.js"></script>
	<!--Pusher script start-->
	<script src="https://js.pusher.com/4.0/pusher.min.js"></script>
	<script type="text/javascript" src="plugin_oop.js"></script>
</head>
<body>
	<div id="chat_div"></div>
</body>
<script type="text/javascript">
	window.role="<?php echo $arr[$rand];?>";
	var options = {'left':'200px','title':'chatting...','color':'#ffa433'};
	var chat_box = $('#chat_div').chat.init(options);
</script>
</html>