
calling_obj = null;
window.channel_id = 'presence-17000';

var chat = $.fn.construct = function(object) {
	key = '56fb1a2703a047b52627';
	var pusher = new Pusher(key, {
		encrypted: true,
		authEndpoint: 'auth.php'
	});
	var color = object['color'] == undefined ? '#ffa433' : object['color'];
	var headerColor = object['headerColor'] == undefined ? '#ffa433' : object['headerColor'];
	var headerTextColor = object['headerTextColor'] == undefined ? '#ffffff' : object['headerTextColor'];
	$(document).ready(function() {
		$('.ui-chatbox').css({
			'width': '300px',
			'border-color': color,
			'borderStyle': 'solid',
			'user-select': 'none'
		});
		$('.ui-widget-header').css({
			'background': headerColor,
			'border': '1px solid',
			'border-color': headerColor,
			'color': headerTextColor
		});
		$('.ui-widget-content').css({
			'border': '0.1px solid',
			'border-color': headerColor
		});
		$('.ui-widget').css({
			'border': '0.2px solid',
			'border-color': headerColor
		});

        //1 st time localstorage
        localstorage = localStorage.getItem(channel_id);
        localstorage_javascript = JSON.parse(localstorage);
        if (localstorage_javascript) {
        	localstorage_javascript[channel_id].forEach(function(entry) {
        		window.box = $('.ui-chatbox-log').append(entry);
        	});
        	if(window.box.get(0)){
        		box.animate({
        			scrollTop: box.get(0).scrollHeight
        		}, 500, 'easeOutExpo');
        	}
        }
        else {
        	window.box = {};
        }

        $("textarea").attr("data-emojiable","true");
        // Initializes and creates emoji set from sprite sheet
        window.emojiPicker = new EmojiPicker({
          emojiable_selector: '[data-emojiable=true]',
          assetsPath: 'lib/img/',
          popupButtonClasses: 'fa fa-smile-o'
        });
        // Finds all elements with `emojiable_selector` and converts them to rich emoji input fields
        // You may want to delay this step if you have dynamically created input fields that appear later in the loading process
        // It can be called as many times as necessary; previously converted input fields will not be converted again
        window.emojiPicker.discover(:confounded:);

        console.log($( ".ui-chatbox-input-box" ).val());	

        //emojis
       	/*$( ".ui-chatbox-input" ).append( "<span class='emoji-button'>🙂</span>" );
       		$( ".ui-widget" ).after( "<div class='emoji-box'  style='display: none'></div>" );
            
            	$( ".emoji-box" ).append( "<span class='emoji-content' id='1'>🙂</span>" );
            	$( ".emoji-box" ).append( "<span class='emoji-content' id='2'>👿</span>" );
            	$( ".emoji-box" ).append( "<span class='emoji-content' id='3'>🗣</span>" );
            	$( ".emoji-box" ).append( "<span class='emoji-content' id='4'>👨‍</span>" );
            $( ".emoji-button" ).click(function() {
  		$( ".emoji-box" ).toggle();

  					 $( ".emoji-content" ).click(function() {
  					 	console.log("emoji clicked");
  					 	console.log(this);
  					 	var id = $(this).attr('id');
  					 	var innerhtml=$(this).html();
  					 	//console.log(id);
  					 	console.log(innerhtml);
  					 	var content=$('.ui-chatbox-input-box').val()+' '+innerhtml;
  					 	//console.log($('.ui-chatbox-input-box').val());
  					 	console.log("content is "+content);
  					 	$('.ui-chatbox-input-box').val(content);

  					 });

});*/


//emojis-popup bootstrap

	
// $( ".ui-chatbox-input" ).append( '<a href="javascript:void(0)" class="emoji-boxx" title="" data-toggle="popover" data-placement="top" data-content="">🙂</a>');

// $(".emoji-boxx").attr("data-content","<i id=:+1: class='twa twa-relaxed twa-lg' title='relaxed'></i>");
// var i=$(".emoji-boxx").attr("data-content");
// $(".emoji-boxx").attr("data-content", i+"<i id=:+2: class='twa twa-satisfied twa-lg' title='satisfied'></i>");
 /*$( ".emoji-content" ).click(function() {
  					 	console.log("emoji clicked");
  					 	console.log(this);
  					 	var id = $(this).attr('id');
  					 	console.log("this is "+id);
  					 	var innerhtml=$(this).html();
  					 	//console.log(id);
  					 	console.log(innerhtml);
  					 	var content=$('.ui-chatbox-input-box').val()+' '+innerhtml;
  					 	//console.log($('.ui-chatbox-input-box').val());
  					 	console.log("content is "+content);
  					 	$('.ui-chatbox-input-box').val(content);

  					 });
*/

 console.log($('[data-toggle="popover"]').popover({html:true}));

$(document).on('click','.twa',function(event){
	console.log("popup clicked");
	$('.ui-chatbox-input-box').prop('disabled', true);

	var id = $(this).attr('id');
  					 	console.log("this is "+id);
  					 	var innerhtml=$(this).html();
  					 	//console.log("innerhtml is "+innerhtml);
  					 	var content=$('.ui-chatbox-input-box').val()+id;
  					 	//console.log("the content is "+content);
  					 	$('.ui-chatbox-input-box').val(content);

				$('.ui-chatbox-input-box').prop('disabled', false);
				console.log("input-box enabled");
  					 event.stopPropagation();
	//console.log(this);
/*$('.ui-chatbox-input-box').click(function(){

$('.ui-chatbox-input-box').prop('disabled', false);
console.log("input-box enabled by clicking on the box");
});*/

  	$( ".emoji-content" ).click(function(event) {

						//console.log("emoji clicked");
  					 	//console.log(this);
  		// 			 	var id = $(this).attr('id');
  		// 			 	console.log("this is "+id);
  		// 			 	var innerhtml=$(this).html();
  		// 			 	//console.log("innerhtml is "+innerhtml);
  		// 			 	var content=$('.ui-chatbox-input-box').val()+id;
  		// 			 	//console.log("the content is "+content);
  		// 			 	$('.ui-chatbox-input-box').val(content);

				// $('.ui-chatbox-input-box').prop('disabled', false);
				// console.log("input-box enabled");
  		// 			 event.stopPropagation();

  	});

	
});

    });
	pusher.connection.bind('connected', function(change) {
		$('.ui-chatbox-input-box').prop('disabled', false);
	});
	var title = object['title'] == undefined ? "eguru chat" : object['title'];
	addMessage(window.event, this, title);
	var left = object['left'] == undefined ? 0 : object['left'];
	calling_obj = $(this);
	var channel = pusher.subscribe(window.channel_id);
	channel.bind('new_message', bind_data_to_chatbox);
	return $(this).change_position(left);
}

function bind_data_to_chatbox(data) {

function replacer(match, p1, p2, p3, offset, string) {
  // p1 is nondigits, p2 digits, and p3 non-alphanumerics
  //return [p1, p2, p3].join(' - ');
  console.log("match "+match);
  console.log("p1 "+p1);
  console.log("p2 "+p2);
  console.log("p3 "+p3);
  return (match==":+1:"?"🙂":match==":+2:"?"👿":match==":+3:"?"%F0%9F%97%A3":"else");
  //return this;

}

	var message = integration(data['text']);
	console.log("this is message "+message);
	//var matched=message.match(/:\+(1|2|3|4):/g);

	message=message.replace(/:\+(1|2|3|4):/g,replacer);

	if(message != null){
		var new_obj = {};
		new_obj['text'] = {};
		new_obj['text']['role'] = data.text.role
		new_obj['text']['message'] = message
		new_obj['text']['channel_id'] = data.text.channel_id
		data = new_obj;

		if (role == data.text.role) {
			username = 'You';
			calling_obj.chatbox("option", "boxManager").addMsg(username, data.text.message);
		} else {
			username = 'other';
			if (data.text.role == 'ir')
				calling_obj.chatbox("option", "boxManager").addMsg('Interviewer', data.text.message);
			else
				calling_obj.chatbox("option", "boxManager").addMsg('Interviewee', data.text.message);
		}
		var localstorage = localStorage.getItem(channel_id);
		var localstorage_javascript = JSON.parse(localstorage);
		if (localstorage_javascript) {
			localstorage_javascript[channel_id].push($('.ui-chatbox-msg').last()[0].outerHTML);
			localStorage.setItem(channel_id, JSON.stringify(localstorage_javascript));
		} else {
			var obj = {
				'name': 'localstorage-chatmessage',
				[channel_id]: []
			};
			obj[channel_id].push($('.ui-chatbox-msg').last()[0].outerHTML);
			localStorage.setItem(channel_id, JSON.stringify(obj));
		}
	}
}

function addMessage(event, ui, chat_title) {
	if (window.box != undefined)
		window.box.chatbox("option", "boxManager").toggleBox();
	else {
		window.box = $(ui).chatbox({
			id: "User name",
			user: {
				key: "value"
			},
			title: chat_title,
		});
	}
}

$.fn.change_position = function(x_pos) {
	$(".ui-chatbox").css({
		'left': x_pos
	});
	return $(this);
};