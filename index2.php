<!-- The following line is essential for the "position: fixed" property to work correctly in IE -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN">
<html xmlns="https://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <title>Eguru Chat</title>
	<!--jQuery UI CSS-->
	<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/smoothness/jquery-ui.css" type="text/css" media="screen" />
	<!--jQuery and jQuery UI with jQuery Chat-->
    <script type="text/javascript" src="jquery-1.8.3.js"></script>
    <script type="text/javascript" src="jquery-ui.js"></script>
    <link type="text/css" href="jquery.ui.chatbox.css" rel="stylesheet" />
    <script type="text/javascript" src="jquery.ui.chatbox.js"></script>
	
    
    <!--Pusher script start-->
   <script src="https://js.pusher.com/4.0/pusher.min.js">
   	
   </script>
<script>
 var flag=0;
 var box=null;
window.channel_id=prompt("Please enter the name of the chat-room","family");
console.log(window.channel_id);
  Pusher.log = function(msg) {
    if( window.console && window.console.log ) {
      window.console.log( msg );
    }
  };
  
  //var endcode=feafgq;

   	$( ".ui-chatbox " ).css( "background", "red" );
   var x = document.getElementsByTagName("textarea");
   console.log(x);
   	console.log("disabled");
   
  var pusher = new Pusher('56fb1a2703a047b52627');
  pusher.connection.bind('connected', function( change ) 
  {
  	console.log("hi");
  	document.getElementsByTagName("textarea")[0].removeAttribute("disabled");
   	 
   	$( ".ui-chatbox " ).css( "background", "green" );
  
   
});
   

 var channel = pusher.subscribe(window.channel_id);

  channel.bind( 'new_message', f);
  
 function f(data)
		{
			/*console.log("dww");
			console.log('data is '+data.text);*/
			var a=document.getElementById('chat_div');
			/*console.log(a);*/
			$("#log").append('User name'+ " said: " +data.text + "<br/>");
			 $("#chat_div").chatbox("option", "boxManager").addMsg('User name',data.text);
		};
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
			
			
			/*
				we are now adding click hanlder for 
				toggle button.
			*/
			
			$(document).ready(function addMessage(event, ui)
			{
				/*console.log('fe');
				console.log(event);*/
			/*	console.log(ui);*/
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
							/*console.log('sent'+id);
							console.log('sentmsg-'+msg);*/
							//$("#log").append(id + " said: " + msg + "<br/>");
                            //$("#chat_div").chatbox("option", "boxManager").addMsg(id, msg);
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
		<!-- <div id='pusher'>NOT CONNECTED!
		</div> -->
		<!-- <button onclick="f()">bt</button> -->
		<script type="text/javascript">

			function f()
		{
			/*console.log("dww");*/
			var a=document.getElementById('chat_div');
		/*	console.log(a);*/
			//$("#log").append('User name'+ " said: " + 'guarav' + "<br/>");
			 //$("#chat_div").chatbox("option", "boxManager").addMsg('User name','guarav');
		};

		</script>
	</body>
</html>