<?php
$rand = rand(0, 1);
$arr = array("ie", "ir");
$role = $arr[$rand];
$js = 'js/';
$css = 'css/';
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
	<link rel="stylesheet" href="//brick.a.ssl.fastly.net/BPreplay:400,700">
	<link rel="stylesheet" href="css/twemoji-awesome.css">
	<link rel="stylesheet" href="css/demo.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

	<script type="text/javascript" src="js/jquery1.9.1.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="<?php echo $js; ?>lz-string.min.js"></script>
	<script src="<?php echo $js; ?>base64-string.min.js"></script>
	<script src="<?php echo $js; ?>base64.min.js"></script>
	<script src="<?php echo $js; ?>jquery-ui.js"></script>
	<script src="<?php echo $js; ?>jquery.ui.chatbox.js"></script>
	<script src="//twemoji.maxcdn.com/2/twemoji.min.js?2.2.3"></script>
	<script src="https://js.pusher.com/4.0/pusher.min.js"></script>
	<script src="<?php echo $js; ?>custom.js"></script>
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


	</style>
</head>
<body>
<!-- <div id="chatbox">
  
</div> -->
<p id='1'></p>
<i class="twa twa-worried twa-2x" title=":tada:"></i>
<div id="chat_div">

</div>
</body>
<script type="text/javascript">
	/*$('#chat_div').dummy({
	 y: "10"
	 });*/
    window.role = "<?php echo $role;?>";
    console.log(role);
    var chat_box = $('#chat_div').construct({'left': '200px'});
    //console.log('asd');
	/*$( ".ui-chatbox" ).children().css({'position':'relative','width':'100% !important','max-width':'0% !important'});*/
	/*$(".ui-chatbox" ).children().css({'padding':'5px !important'});*/


    //chat_box.placeDiv(200);
    //$( ".ui-widget" ).css({'position':'relative'});
    //$( ".ui-widget" ).css({'left':500+'px'});
    //console.log(twemoji.parse('I \u2764\uFE0F emoji!'));
	/*var div = document.createElement('div');
	 div.textContent = 'I \u2764\uFE0F emoji!';
	 document.body.appendChild(div);
	 console.log(twemoji.parse('I \u2764\uFE0F emoji!'));*/
    document.getElementById('1').innerHTML = twemoji.parse('I \u2764\uFE0F emoji!');
</script>
</html>