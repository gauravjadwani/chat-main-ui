calling_obj = null;
window.channel_id = 'presence-17000';
window.count = 1;

var chat = $.fn.construct = function (object) {
    console.log("Plugin constructed");
    var key = '56fb1a2703a047b52627';
    var pusher = new Pusher(key, {
        encrypted: true,
        authEndpoint: 'auth.php'
    });
    var color = object['color'] == undefined ? '#ffa433' : object['color'];
    var headerColor = object['headerColor'] == undefined ? '#ffa433' : object['headerColor'];
    var headerTextColor = object['headerTextColor'] == undefined ? '#ffffff' : object['headerTextColor'];
    $(document).ready(function () {
        console.log("entred get ready");
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
        /*       localstorage = localStorage.getItem(channel_id);
         localstorage_javascript = JSON.parse(localstorage);
         if (localstorage_javascript) {
         localstorage_javascript[channel_id].forEach(function(entry) {
         window.box = $('.ui-chatbox-log').append(entry);
         });
         if (window.box.get(0)) {
         box.animate({
         scrollTop: box.get(0).scrollHeight
         }, 500, 'easeOutExpo');
         }
         } else {
         window.box = {};
         }*/


        //emojis-popup bootstrap

        console.log("bootstrap framed popup");
        $(".ui-chatbox-input").append('<a href="javascript:void(0)" class="emoji-boxx" title="" data-toggle="popover" data-placement="top" data-content=""><i id=:+1: class="twa twa-relaxed twa-lg emoji-content" title="relaxed"></i></a>');

        $(".emoji-boxx").attr("data-content", "<i id=:+1: class='twa twa-relaxed twa-lg emoji-content' title='relaxed'></i>");
        var i = $(".emoji-boxx").attr("data-content");
        $(".emoji-boxx").attr("data-content", i + "<i id=:+2: class='twa twa-satisfied twa-lg emoji-content' title='satisfied'></i>");
        i = $(".emoji-boxx").attr("data-content");
        $(".emoji-boxx").attr("data-content", i + "<i id=:+3: class='twa twa-thumbsup twa-lg emoji-content' title='thumbsup'></i>");
        i = $(".emoji-boxx").attr("data-content");
        $(".emoji-boxx").attr("data-content", i + "<i id=:+4: class='twa twa-laughing twa-lg emoji-content' title='laughing'></i>");
        i = $(".emoji-boxx").attr("data-content");
        $(".emoji-boxx").attr("data-content", i + "<i id=:+5: class='twa twa-worried twa-lg emoji-content' title='worried'></i>");

        $('[data-toggle="popover"]').popover({
            html: true
        }).click(function (event) {
            console.log("bootstrap container clicked ");
        });

        $(document).on('click', '.emoji-content', function (event) {
            console.log("clicked emoji-content");
            $('.ui-chatbox-input-box').prop('disabled', true);

            var id = $(this).attr('id');
            var content = $('.ui-chatbox-input-box').val();
            var u = $('.ui-chatbox-input-box').prop("selectionStart");
            var part1 = content.substring(0, u) + id;
            var part2 = content.substring(u, content.length);

            content = part1 + part2;
            $('.ui-chatbox-input-box').val(content);
            $('.ui-chatbox-input-box').prop('disabled', false);

            event.stopPropagation();
            console.log(" exitting clicked emoji-content");
        });

        console.log("exitting document.ready");
    });

    pusher.connection.bind('connected', function (change) {
        console.log(" pusher.connection.bind happend");
        $('.ui-chatbox-input-box').prop('disabled', false);
    });

    var title = object['title'] == undefined ? "eguru chat" : object['title'];

    addMessage(window.event, this, title);

    var left = object['left'] == undefined ? 0 : object['left'];
    var calling_obj = $(this);

    channel = pusher.subscribe(window.channel_id);
    console.log(channel);
    console.log("binding channel from new_message");

    channel.bind('new_message', bind_data_to_chatbox);
    console.log(channel);

    return $(this).change_position(left);
};

function bind_data_to_chatbox(data) {
    console.log("entred into bind data to chatbox ");

    function replacer(match, p1, p2, p3, offset, string) {

        console.log("match " + match);
        console.log("p1 " + p1);
        console.log("p2 " + p2);
        console.log("p3 " + p3);

        switch (match) {
            case ":+1:":
                match = "<i id=:+1: class='twa twa-relaxed twa-lg' title='relaxed'></i>";
                console.log(" from switch case +1");
                break;
            case ":+2:":
                match = "<i id=:+2: class='twa twa-satisfied twa-lg' title='satisfied'></i>";
                break;
            case ":+3:":
                match = "<i id=:+3: class='twa twa-thumbsup twa-lg' title='thumbsup'></i>";
                break;
            case ":+4:":
                match = "<i id=:+4: class='twa twa-laughing twa-lg' title='laughing'></i>";
                break;
            case ":+5:":
                match = "<i id=:+5: class='twa twa-worried twa-lg' title='worried'></i>";
                console.log("+5");
                break;

            default:
                match = "default";

        }
        return match;


    }

    var message = integration(data['text']);
    console.log("this is message " + message);

    message = message.replace(/:\+(1|2|3|4|5):/g, replacer);
    console.log("message replacer " + message);

    if (message != null) {
        var new_obj = {};
        new_obj['text'] = {};
        new_obj['text']['role'] = data.text.role
        new_obj['text']['message'] = message
        new_obj['text']['channel_id'] = data.text.channel_id
        data = new_obj;
        var username = 'You';
        if (role == data.text.role) {
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
                'channel_id': []
            };
            obj[channel_id].push($('.ui-chatbox-msg').last()[0].outerHTML);
            localStorage.setItem(channel_id, JSON.stringify(obj));
        }
    }
}

function addMessage(event, ui, chat_title) {
    console.log("entered into addmessge function");

    if (window.box != undefined)
        window.box.chatbox("option", "boxManager").toggleBox();
    else {
        window.box = $(ui).chatbox({
            id: "User name",
            user: {
                key: "value"
            },
            title: chat_title
        });
    }
}

$.fn.change_position = function (x_pos) {
    $(".ui-chatbox").css({
        'left': x_pos
    });
    return $(this);
};