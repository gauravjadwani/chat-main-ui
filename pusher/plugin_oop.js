calling_obj = null;
window.channel_id='123';


$.fn.chat = function(object){

	console.log('thi');
	this.init(object);

	this.init = function(object){
		key = '56fb1a2703a047b52627';
		var pusher = new Pusher(key, {encrypted: true});
		var color=object['color']==undefined?'#ffa433':object['color'];
		var headerColor=object['headerColor']==undefined?'#ffa433':object['headerColor'];
		var headerTextColor=object['headerTextColor']==undefined?'#ffffff':object['headerTextColor'];

		pusher.connection.bind('connected', function( change )  {
			$('.ui-chatbox-input-box').prop('disabled',false);
			$('.ui-chatbox').css({'width':'300px !important','border-color':color,'borderStyle':'solid'});
			$('.ui-widget-header').css({'background':headerColor,'border':'1px solid','border-color':headerColor,'color':headerTextColor});
			$('.ui-widget-content').css({'border':'0.1px solid','border-color':headerColor});
			$('.ui-widget').css({'border':'0.2px solid','border-color':headerColor});
		});
		this.title=object['title']==undefined?"eguru chat":object['title'];
		addMessage(event,this,this.title);

		var channel = pusher.subscribe(window.channel_id);
		channel.bind( 'new_message', bind_data_to_chatbox);
		calling_obj = $(this);
		var left= object['left']==undefined?0:object['left'];
		change_position(left); 
		return calling_obj;
	};

	this.bind_data_to_chatbox = function (data){
		calling_obj.chatbox("option", "boxManager").addMsg('User name',data.text);
	};

	this.addMessage = function (event,ui,chat_title){
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
	};
	
	this.change_position = function(x_pos) {
		console.log("change_position executed");
		$( ".ui-chatbox" ).css({'left':x_pos});
	};
};