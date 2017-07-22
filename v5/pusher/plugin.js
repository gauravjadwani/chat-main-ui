calling_obj = null;
window.channel_id='presence-170';
window.count=1;


var chat = $.fn.construct=function(object){
	key = '56fb1a2703a047b52627';
	var pusher = new Pusher(key, {encrypted: true, authEndpoint: 'auth.php' });
	var color=object['color']==undefined?'#ffa433':object['color'];
	var headerColor=object['headerColor']==undefined?'#ffa433':object['headerColor'];
	var headerTextColor=object['headerTextColor']==undefined?'#ffffff':object['headerTextColor'];
	//"width");
	//$('.ui-chatbox'));
	$( document ).ready(function() {
		// "ready!" );
		$('.ui-chatbox').css({'width':'300px','border-color':color,'borderStyle':'solid','user-select':'none'});
		$('.ui-widget-header').css({'background':headerColor,'border':'1px solid','border-color':headerColor,'color':headerTextColor});
		$('.ui-widget-content').css({'border':'0.1px solid','border-color':headerColor});
		$('.ui-widget').css({'border':'0.2px solid','border-color':headerColor});


		//1 st time localstorage
		localstorage=localStorage.getItem(channel_id);
		localstorage_javascript=JSON.parse(localstorage);
		console.log(localstorage_javascript);
		if(localstorage_javascript)
		{
			console.log("1 st if entred");
				localstorage_javascript[channel_id].forEach(function(entry) {
	//"if entred");
	    ////entry);
	    //calling_obj.chatbox("option", "boxManager").addMsg(username,data.text.message);
	    //entry[Object.keys(entry)[0]]);
	    //entry[Object.keys(entry)[1]]);
	    /*console.log(Date.now());*/
	    $('.ui-chatbox-log').append(entry);
	    
	    // console.log(entry);

	});
		
		}
		else
		{
			/*console.log("else");*/

			////username);
			/*var i=Date.now();
			var arr=[];



			var obj={
				'name':'localstorage',
				[i]:''
			}*/
			//"dsd "+JSON.stringify(obj));
		//var obj={[i]:''};
		/*arr.push(obj);*/
		//var main_obj={[channel_id]:arr};
		//localStorage.setItem(channel_id, JSON.stringify(main_obj));	
		//$('.ui-chatbox-msg'));
		//localStorage.setItem(channel_id, JSON.stringify($('.ui-chatbox-msg')));
		}
		

	});

	pusher.connection.bind('connected', function( change )  	{
		$('.ui-chatbox-input-box').prop('disabled',false);
	});

	var title=object['title']==undefined?"eguru chat":object['title'];
	addMessage(window.event,this,title);
	
	var left= object['left']==undefined?0:object['left'];
	calling_obj = $(this);
	
	var channel=pusher.subscribe(window.channel_id);
	channel.bind('pusher:subscription_succeeded', function() {
		//"subscription_succeeded");
	/*	var triggered = channel.trigger('clientp-status', 'he');*/
	});
/*	channel.bind('client-status', function() {
		//"feaf");
	});
*/
	channel.bind( 'new_message', bind_data_to_chatbox);
	return $(this).change_position(left);
}

function bind_data_to_chatbox(data){
	console.log("encoded_msg"+data.text.message);
data.text.message=decodeURI(data.text.message);
if(role==data.text.role) {

		
		username='You';
	
		username='';	
		//'data '+data.text.message);
		calling_obj.chatbox("option", "boxManager").addMsg(username,data.text.message);
		count

	}		
	else {
		username='other';
		if(data.text.role=='ir')
			calling_obj.chatbox("option", "boxManager").addMsg('Interviewer',data.text.message);
		else
			calling_obj.chatbox("option", "boxManager").addMsg('Interviewee',data.text.message);
	}

	var localstorage=localStorage.getItem(channel_id);
	var localstorage_javascript=JSON.parse(localstorage);
	if(localstorage_javascript)
	{
		
		console.log("bind if");
		localstorage_javascript[channel_id].push($('.ui-chatbox-msg').last()[0].outerHTML);
		//console.log('concatinated id'+temp);
		//localstorage_javascript[channel_id]=temp;
		localStorage.setItem(channel_id,JSON.stringify(localstorage_javascript));
	}
	else
	{

		console.log("bind else");
		var obj={
		'name':'localstorage-chatmessage',
		[channel_id]:[]
	};
	console.log(obj);
	console.log(JSON.stringify(obj));
	
	obj[channel_id].push($('.ui-chatbox-msg').last()[0].outerHTML);
	console.log($('.ui-chatbox-msg').last()[0].outerHTML);

	localStorage.setItem(channel_id,JSON.stringify(obj));
	
	}

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