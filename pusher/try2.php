<?php
  $rand=rand(0,1);
  $arr=array("ie","ir");
  
  $js = 'js/';
  $css = 'css/';
?>

<!DOCTYPE html>
<html>
<head>
  <title>
    Chat
  </title>
  <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/smoothness/jquery-ui.css" type="text/css" media="screen" />
  <!--jQuery and jQuery UI with jQuery Chat-->
  <script type="text/javascript" src="js/jquery-1.8.3.js"></script>
  <script src="<?php echo $js; ?>lz-string.min.js"></script>
  <script src="<?php echo $js; ?>base64-string.min.js"></script>
  <script src="<?php echo $js; ?>base64.min.js"></script>
  <script src="<?php echo $js; ?>jquery-ui.js"></script>
  <link type="text/css" href="<?php echo $css; ?>jquery.ui.chatbox.css" rel="stylesheet" />
  <script src="<?php echo $js; ?>jquery.ui.chatbox.js"></script>
  <!--Pusher script start-->
  <script src="https://js.pusher.com/4.0/pusher.min.js"></script>
  <script type="text/javascript" src="plugin.js"></script>
</head>
<body>
<!-- <div id="chatbox">
	
</div> -->

	<div id="chat_div">
			
		</div>
</body>
<script type="text/javascript">
/*$('#chat_div').dummy({
	y: "10"
});*/
window.role="<?php echo $arr[$rand];?>";
console.log(role);
var chat_box = $('#chat_div').construct({'left':'200px'});
console.log('asd');
/*$( ".ui-chatbox" ).children().css({'position':'relative','width':'100% !important','max-width':'0% !important'});*/ 	
/*$(".ui-chatbox" ).children().css({'padding':'5px !important'});*/


//chat_box.placeDiv(200);
	//$( ".ui-widget" ).css({'position':'relative'});
	//$( ".ui-widget" ).css({'left':500+'px'});

</script>
</html>