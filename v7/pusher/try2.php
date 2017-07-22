<?php
  $rand=rand(0,1);
  $arr=array("ie","ir");
  $role=$arr[$rand];
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
  <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/smoothness/jquery-ui.css" type="text/css" media="screen" />
  <!--jQuery and jQuery UI with jQuery Chat-->


<!--  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script> -->
  <!-- <script type="text/javascript" src="js/jquery-1.8.3.js"></script> -->
    <!-- <script type="text/javascript" src="js/jquery-1.9.1.js"></script> -->
 <!--    <script
  src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous"></script> -->
  <script type="text/javascript" src="js/jquery1.9.1.js"></script>
  <script src="<?php echo $js; ?>lz-string.min.js"></script>
  <script src="<?php echo $js; ?>base64-string.min.js"></script>
  <script src="<?php echo $js; ?>base64.min.js"></script>
  <script src="<?php echo $js; ?>jquery-ui.js"></script>
  <link type="text/css" href="<?php echo $css; ?>jquery.ui.chatbox.css" rel="stylesheet" />
  <script type="text/javascript" src="plugin.js"></script>
  <script src="<?php echo $js; ?>jquery.ui.chatbox.js"></script>
  <script src="<?php echo $js; ?>custom.js"></script>


  <link rel="stylesheet" href="css/twemoji-awesome.css">
  <link rel="stylesheet" href="css/demo.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
 

 <!-- emoji picker -->.
 <!-- Begin emoji-picker JavaScript -->
    <script src="lib/js/config.js"></script>
    <script src="lib/js/util.js"></script>
    <script src="lib/js/jquery.emojiarea.js"></script>
    <script src="lib/js/emoji-picker.js"></script>
    <!-- End emoji-picker JavaScript -->
 <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet">
  <link href="css/emoji.css" rel="stylesheet">
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>


  <!--Pusher script start-->
  <script src="https://js.pusher.com/4.0/pusher.min.js"></script>
  
  <style type="text/css">
    .You{
   width: 95%;
   background-color: #80ffaa ;
   padding-top: 5px;
   padding-bottom: 5px;
   padding-left: 4px;
   margin: 5px;
   border-radius: 8px;
        
      }
      .other{
    width: 95%;
   background-color: #ffffb3 ;
   padding-top: 5px;
   padding-bottom: 5px;
   padding-left: 4px;
   margin: 5px;
   border-radius: 8px;
   
      }
      .ui-chatbox-log
      {
        background-image: url('images/back.jpg');
      }
     

  </style>
</head>
<body>
<!-- <div id="chatbox">
  
</div> -->
<i class="twa twa-tada"></i>
  <div id="chat_div">
      
    </div>
</body>
<script type="text/javascript">
/*$('#chat_div').dummy({
  y: "10"
});*/
window.role="<?php echo $role;?>";
//console.log(role);
var chat_box = $('#chat_div').construct({'left':'200px'});
//console.log('asd');
/*$( ".ui-chatbox" ).children().css({'position':'relative','width':'100% !important','max-width':'0% !important'});*/   
/*$(".ui-chatbox" ).children().css({'padding':'5px !important'});*/


//chat_box.placeDiv(200);
  //$( ".ui-widget" ).css({'position':'relative'});
  //$( ".ui-widget" ).css({'left':500+'px'});

</script>
</html>