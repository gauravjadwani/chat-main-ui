<!-- The following line is essential for the "position: fixed" property to work correctly in IE -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <title>How to create chatbox using jQuery UI</title>
	<!--jQuery UI CSS-->
	<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/smoothness/jquery-ui.css" type="text/css" media="screen" />
	<!--jQuery and jQuery UI with jQuery Chat-->
    <script type="text/javascript" src="jquery-1.8.3.js"></script>
    <script type="text/javascript" src="jquery-ui.js"></script>
    <link type="text/css" href="jquery.ui.chatbox.css" rel="stylesheet" />
    <script type="text/javascript" src="jquery.ui.chatbox.js"></script>
	
    
    <!--Pusher script start-->
   <script src="http://js.pusher.com/1.12/pusher.min.js">
   	
   </script>
<script>
 var flag=0;
var r=prompt("Please enter your name","family");
//console.log(r);
  Pusher.log = function(msg) {
    if( window.console && window.console.log ) {
      window.//console.log( msg );
    }
  };
  
  var pusher = new Pusher('56fb1a2703a047b52627');
  pusher.connection.bind('state_change', function( change ) 
  {
  flag++;
   if(flag==2)
   {
   	document.getElementById("pusher").innerHTML='CONNECTED';
   }
   
  });
 var channel = pusher.subscribe(r);

  channel.bind( 'new_message', addMessage );
  
  function addMessage( data ) 
  {

    var li = $('<li class="ui-li ui-li-static ui-body-c"></li>');
    li.text( data.text );
    li.hide();
    $('#messages').prepend(li);
    li.slideDown();
  }
    <!--Pusher script end-->
</script>



    <script type="text/javascript">
		/*
			document ready.
		*/
		
		$(document).ready(function()
		{
			/*document.getElementsByClassName("ui-widget-header").click();*/
			/*
				declare gloabl box variable,
				so we can check if box is alreay open,
				when user click toggle button
			*/
			var box = null;
			
			/*
				we are now adding click hanlder for 
				toggle button.
			*/
			
			$(document).ready(function(event, ui)
			{
				/*
					now if box is not null,
					we are toggling chat box.
				*/

				if(box)
				{
					/*
						below code will hide the chatbox that 
						is active, when first clicked on toggle button
					*/
					box.chatbox("option", "boxManager").toggleBox();
				}
				else
				{
					/*
						if box variable is null then we will create
						chat-box.
					*/
					box = $("#chat_div").chatbox(
					{
						/*
							unique id for chat box
						*/
						id:"User name",
                        user:
						{
							key : "value"
						},
						/*
							Title for the chat box
						*/
						title : "Eguru Chat",
						/*
							messageSend as name suggest,
							this will called when message sent.
							and for demo we have appended sent message to our log div.
						*/
						messageSent : function(id, user, msg)
						{
							$("#log").append(id + " said: " + msg + "<br/>");
                            $("#chat_div").chatbox("option", "boxManager").addMsg(id, msg);
                        }
					});
				}
			});
		});
    </script>
</head>
	<body style=" overflow: scroll">
		
		
		<!--Chat box will be generated in this container-->
		<div id="chat_div">
			
		</div>

		
		<div id="log" style="visibility: hidden;">
			
		</div>
		<div id='pusher'>NOT CONNECTED!
		</div>
		<button onclick="f()">bt</button>
		
	</body>
</html>