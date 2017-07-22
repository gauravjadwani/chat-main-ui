calling_obj = null;
window.channel_id = 'presence-1234';

function pusher_creation() {
    key = '56fb1a2703a047b52627';
    pusher = new Pusher(key, {
        // encrypted: true,
        authEndpoint: 'auth.php',
        authTransport: 'ajax'
    });
      console.log("pusher object created");

    pusher.connection.bind('connected', function(change) {
        console.log(" pusher.connection.bind happend");
        $('.ui-chatbox-input-box').prop('disabled', false);
    });


    var channel = pusher.subscribe(channel_id);
    channel.bind('pusher:subscription_succeeded', function(members) {
        console.log("subscription_succeeded");
        var me =members.me;
        console.log(me);
  var userId = me.id;
  var userInfo = me.info;
  console.log(userId);
  console.log(me);
  console.log(userInfo);
        // var triggered = channel.trigger('client-t', { your: "data" });
    });

    channel.bind('pusher:subscription_error', function(status) {
        console.log("subscription_error" + status);
    });


    console.log(channel);
    console.log("binding channel from new_message");

    channel.bind('new_message', bind_data_to_chatbox);

}

var chat = $.fn.construct = function(object) {


  

    var color = object['color'] == undefined ? '#ffa433' : object['color'];
    var headerColor = object['headerColor'] == undefined ? '#ffa433' : object['headerColor'];
    var headerTextColor = object['headerTextColor'] == undefined ? '#ffffff' : object['headerTextColor'];
    $(document).ready(function() {
        // console.log("entred get ready");

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
emojis_object={':+1:':'twa twa-relaxed twa-lg emoji-content',':+2:':'twa twa-satisfied twa-lg emoji-content',':+3:':'twa twa-thumbsup twa-lg emoji-content',':+4:':'twa twa-laughing twa-lg emoji-content',':+5:':'twa twa-worried twa-lg emoji-content'};

        console.log("bootstrap framed popup");
        $(".ui-chatbox-input").append('<a href="javascript:void(0)" class="emoji-boxx" title="" data-toggle="popover" data-placement="top" data-content=""><i  class="twa twa-relaxed twa-lg prime" title="relaxed"></i></a>');

            i="";
            $.each( emojis_object, function( key, value ) {
                    // alert("key is "+key+" value"+value);
                    sstring=value.split(" ");
                    title=sstring[1].substring(sstring[1].indexOf("-")+1);
                    // alert(title);
                    $(".emoji-boxx").attr("data-content", i+"<i id="+key+" class='"+value+"' title='"+title+"'></i>");
                    i = $(".emoji-boxx").attr("data-content");
            });

        $('[data-toggle="popover"]').popover({
            html: true
        }).click(function(event) {
        console.log("bootstrap container clicked ");
        // var op=($(document).has( '.popover-content' ).length ? "Yes" : "No" );
        //     console.log("click"+op);
 
    });
         
         // console.log($('.popover-content').children().length);



        $(document).bind('DOMSubtreeModified', '.popover-content', function() {
            // console.log($('.popover-content').children().length);
            var op=($(document).has( '.popover-content' ).length ? "Yes" : "No" );
            console.log("DOMSubtreeModified "+op);
            // console.log(count++);
           
            if(op==="Yes"){
               if($('.popover-content').children().length==5){
                console.log("loaded");
               }
               else{
                 $('.prime').css('display', 'inline-block');
               }
            }
          

        });


     



        $(document).on('click', '.emoji-content', function(event) {
            console.log("clicked emoji-content");
            $('.ui-chatbox-input-box').prop('disabled', true);

            var id = $(this).attr('id');


            var content = $('.ui-chatbox-input-box').val();

            var u = $('.ui-chatbox-input-box').prop("selectionStart");

            part1 = content.substring(0, u) + id;


            part2 = content.substring(u, content.length);

            content = part1 + part2;
            $('.ui-chatbox-input-box').val(content);


            $('.ui-chatbox-input-box').prop('disabled', false);

            event.stopPropagation();
            console.log(" exitting clicked emoji-content");
        });

   pusher_creation();
    });



    var title = object['title'] == undefined ? "eguru chat" : object['title'];
    addMessage(window.event, this, title);
    var left = object['left'] == undefined ? 0 : object['left'];
    calling_obj = $(this);




 
    // console.log(channel);
    console.log("exitting document.ready");


    

    return $(this).change_position(left);
}


/*function client(data){
    console.log("client event triggered");


}*/
function bind_data_to_chatbox(data) {
    console.log("entred into bind data to chatbox ");


    function replacer(match, p1, p2, p3, offset, string) {

        console.log("match " + match);
        console.log("p1 " + p1);
        console.log("p2 " + p2);
        console.log("p3 " + p3);
        propertyis=emojis_object[match];
        console.log(propertyis);
      var  sstring=propertyis.split(" ");
           var title=sstring[1].substring(sstring[1].indexOf("-")+1);
           var emoji="<i id="+match+" class='"+propertyis+"' title='"+title+"'></i>";
       

        return emoji;


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
    console.log("entered into addmessge function");

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
}