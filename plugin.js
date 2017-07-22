calling_obj = null;
window.channel_id='123';


$.fn.construct=function(object){


	var pusher = new Pusher('56fb1a2703a047b52627');
	pusher.connection.bind('connected', function( change )  {
		console.log("hi");
			document.getElementsByTagName("textarea")[0].removeAttribute("disabled");
			$( ".ui-chatbox" ).css({'width':'300px !important'});
				 		$( ".ui-chatbox" ).css({'border-color':'green'}).css({'borderStyle':'solid'});
				 	
				 	

	});
	addMessage(event,this);

	var channel = pusher.subscribe('presence-'+window.channel_id);
	channel.bind( 'new_message', bind_data_to_chatbox);
	console.log("addMessage");
	calling_obj = $(this);

	console.log("fef");
	var left= object['left']==undefined?0:object['left'];
	console.log("left "+left);
	change_position(left); 

	return calling_obj;
};
function bind_data_to_chatbox(data){
	console.log("bind_data_to_chatbox");
	calling_obj.chatbox("option", "boxManager").addMsg('User name',data.text);
}



function addMessage(event,ui)
{
	console.log('ui'+ui);
	var box=null;
	if(box)
box.chatbox("option", "boxManager").toggleBox();

	else
	{
					
					box = $(ui).chatbox(
					{
						
							id:"User name",
							user:
							{
								key : "value"
							},
						
							title : "Eguru Chat",
                        })
				}
			}

				 $(document).ready(function(){

				 		
				 });


			function change_position(x_pos) {
				console.log("change_position executed");

  	//$( ".ui-chatbox" ).css({'position':'relative'});
	$( ".ui-chatbox" ).css({'left':x_pos});
	
}