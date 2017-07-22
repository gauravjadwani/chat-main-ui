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
	var message = integration(data['text']);
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