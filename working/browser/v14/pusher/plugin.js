calling_obj = null;
window.channel_id =prompt("Please enter tha channel id", "presence-");
me='';
max=10;

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
        // $('.ui-chatbox-input-box').prop('disabled', false);
    });


    channel = pusher.subscribe(channel_id);
    channel.bind('pusher:subscription_succeeded', function(members) {
        console.log("subscription_succeeded");
       $('.ui-chatbox-input-box').val('waiting......');
        me=members.me;
        // console.log(me.id);

        /*$('.ui-chatbox-input-box').on('keyup',function(event){
            console.log('keydown event');
            var currrent_length=$('.ui-chatbox-input-box').val().length;
            // console.log('keydown le '+currrent_length);
            if(currrent_length>=max){
                console.log('if');
                console.log('length is if '+currrent_length);
            
              $('.ui-chatbox-input-box').css("outline", "0.1px solid red");
              var y=$('.ui-chatbox-input-box').val().substr(0,max);
              console.log("substring "+y);
              console.log("substring length is "+y.length);

            $('.ui-chatbox-input-box').val(y);

            }
            else{
                console.log('else');
                console.log('limit excedded');
                 // $('.ui-chatbox-input-box').css("border", "2px solid red");
           
             console.log('length is '+$('.ui-chatbox-input-box').val().length);
            $('.ui-chatbox-input-box').css("outline", "");
            // event.stopPropagation();
            
            }
        })

*/
        $('.ui-chatbox-input-box').bind('input propertychange', function() { 
            console.log('input propertychange..'); 

 var currrent_length=$('.ui-chatbox-input-box').val().length;
            // console.log('keydown le '+currrent_length);
            if(currrent_length>=max){
                console.log('if');
                console.log('length is if '+currrent_length);
            
              $('.ui-chatbox-input-box').css("outline", "0.1px solid red");
              var y=$('.ui-chatbox-input-box').val().substr(0,max);
              console.log("substring "+y);
              console.log("substring length is "+y.length);

            $('.ui-chatbox-input-box').val(y);

            }
            else{
                console.log('else');
                console.log('limit excedded');
                 // $('.ui-chatbox-input-box').css("border", "2px solid red");
           
             console.log('length is '+$('.ui-chatbox-input-box').val().length);
            $('.ui-chatbox-input-box').css("outline", "");
            $('.ui-chatbox-input-box').focus();
            // event.stopPropagation();
            
            }

        });
        });
     

    channel.bind('pusher:subscription_error', function(status) {
        console.log("subscription_error" + status);
    });


    console.log(channel);
    console.log("binding channel from new_message");
    channel.bind('client-t',client);
    channel.bind('new_message', bind_data_to_chatbox);
    
    channel.bind('pusher:member_added', function(member) {
        console.log('member added');
         $('.ui-chatbox-input-box').val('');
        var triggered = channel.trigger('client-t', { your: "data" });

         $('.ui-chatbox-input-box').prop('disabled', false);
        /*console.log("member added");
        console.log(member.id);
        console.log(member.info);
        console.log(me.id);
        if(member.id==me.id){
            console.log('client triggered');
             var triggered = channel.trigger('client-t', { your: "data" });
        }*/
     });

    channel.bind('pusher:member_removed', function(member) {
        console.log('member removed');
        $('.ui-chatbox-input-box').val('member removed waiting for coming live.....');
        var triggered = channel.trigger('client-t', { your: "data" });
          $('.ui-chatbox-input-box').prop('disabled', true);

    });
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
// emojis_object={':+1:':'twa twa-relaxed twa-lg emoji-content',':+2:':'twa twa-satisfied twa-lg emoji-content',':+3:':'twa twa-thumbsup twa-lg emoji-content',':+4:':'twa twa-laughing twa-lg emoji-content',':+5:':'twa twa-worried twa-lg emoji-content'};

        console.log("bootstrap framed popup");
        $(".ui-chatbox-input").append('<a href="javascript:void(0)" class="emoji-boxx" title="" data-toggle="popover" data-trigger="focus" data-placement="top" data-content=""><i  class="twa twa-relaxed twa-lg prime" title="relaxed"></i></a>');

            display_emoticons('.emoji-boxx');

        $('[data-toggle="popover"]').popover({
            html: true
        }).click(function(event) {
        console.log("bootstrap container clicked ");
        // var op=($(document).has( '.popover-content' ).length ? "Yes" : "No" );
        //     console.log("click"+op);
 
    });
         
        




     



        $(document).on('click', '.emoji-content', function(event) {
            console.log("clicked emoji-content");
            var valu=$('.ui-chatbox-input-box').prop('disabled');
            if(valu==false)
            {
                  var valu=$('.ui-chatbox-input-box').prop('disabled',false);
            }
            
            var id = $(this).attr('id');

             
            var content = $('.ui-chatbox-input-box').val();

            if(content.length<=max){

            var u = $('.ui-chatbox-input-box').prop("selectionStart");

            part1 = content.substring(0, u) + id;


            part2 = content.substring(u, content.length);

            content = part1 + part2;
            $('.ui-chatbox-input-box').val(content);



        }
        else{
            console.log('emoticons cant be added beacause length exhauted');
             $('.ui-chatbox-input-box').css("outline", "0.1px solid red");

             // event.stopPropagation();
             console.log('else click emoji');
             // $('.ui-chatbox-input-box').focus($('.ui-chatbox-input-box').val(content));
        }
            // event.stopPropagation();
              // $('.ui-chatbox-input-box').prop('disabled', false);
             $('.ui-chatbox-input-box').focus();
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


function client(data)
{
     console.log('client event triggered');
     $('.ui-chatbox-input-box').val('');
     valu=$('.ui-chatbox-input-box').prop('disabled');
     if(valu=true)
     $('.ui-chatbox-input-box').prop('disabled', false);
 else
    $('.ui-chatbox-input-box').prop('disabled', true);
   
}
function bind_data_to_chatbox(data) {
    console.log(data);
    console.log("entred into bind data to chatbox ");


/*    function replacer(match) {

        console.log("match " + match);
        // console.log("p1 " + p1);
        // console.log("p2 " + p2);
        // console.log("p3 " + p3);

       var emoti= get_emotiocon(match);
        

        return emoti;


    }
*/
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
       var date = new Date(),
                            datevalues = [
                            date.getFullYear(),
                            date.getMonth()+1,
                            date.getDate(),
                            date.getHours(),
                            date.getMinutes(),
                            date.getSeconds(),
                            ];
                            console.log(datevalues);
                           var time=(datevalues[3]+':'+datevalues[4]+':'+datevalues[5]+'  '+datevalues[2]+'/'+datevalues[1]+'/'+datevalues[0]);

        if (role == data.text.role) {
            username = 'You';
            calling_obj.chatbox("option", "boxManager").addMsg(username, data.text.message,time);
        } else {
            username = 'other';
            if (data.text.role == 'ir')
                calling_obj.chatbox("option", "boxManager").addMsg('Interviewer', data.text.message,time);
            else
                calling_obj.chatbox("option", "boxManager").addMsg('Interviewee', data.text.message,time);
        }
        // var localstorage = localStorage.getItem(channel_id);
        // var localstorage_javascript = JSON.parse(localstorage);
        // if (localstorage_javascript) {
        //     localstorage_javascript[channel_id].push($('.ui-chatbox-msg').last()[0].outerHTML);
        //     localStorage.setItem(channel_id, JSON.stringify(localstorage_javascript));
        // } else {
        //     var obj = {
        //         'name': 'localstorage-chatmessage',
        //         [channel_id]: []
        //     };
        //     obj[channel_id].push($('.ui-chatbox-msg').last()[0].outerHTML);
        //     localStorage.setItem(channel_id, JSON.stringify(obj));
        // }
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