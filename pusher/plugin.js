calling_obj = null;
window.channel_id='123';


var chat = $.fn.construct=function(object){
	console.log(object);
	key = '56fb1a2703a047b52627';
	var pusher = new Pusher(key, {encrypted: true});
	var color=object['color']==undefined?'#ffa433':object['color'];
	var headerColor=object['headerColor']==undefined?'#ffa433':object['headerColor'];
	var headerTextColor=object['headerTextColor']==undefined?'#ffffff':object['headerTextColor'];

	pusher.connection.bind('connected', function( change )  {
		$('.ui-chatbox-input-box').prop('disabled',false);
		$('.ui-chatbox').css({'width':'300px','border-color':color,'borderStyle':'solid'});
		$('.ui-widget-header').css({'background':headerColor,'border':'1px solid','border-color':headerColor,'color':headerTextColor});
		$('.ui-widget-content').css({'border':'0.1px solid','border-color':headerColor});
		$('.ui-widget').css({'border':'0.2px solid','border-color':headerColor});
	});
	var title=object['title']==undefined?"eguru chat":object['title'];
	addMessage(window.event,this,title);
	var channel = pusher.subscribe(window.channel_id);
	channel.bind( 'new_message', bind_data_to_chatbox);
	var left= object['left']==undefined?0:object['left'];
	calling_obj = $(this);
	return $(this).change_position(left);
};
function bind_data_to_chatbox(data){
	calling_obj.chatbox("option", "boxManager").addMsg('User name',data.text);
}
function addMessage(event,ui,chat_title){
	var box=null;
	if(box)
		box.chatbox("option", "boxManager").toggleBox();
	else{
		box = $(ui).chatbox({
			id:"User name",
			user:{
				key : "value"
			},
			title : chat_title,
		})
	}
}
$.fn.change_position = function (x_pos) {
	$(".ui-chatbox").css({'left':x_pos});
	return $(this);
};