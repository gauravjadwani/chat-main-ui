<?php


$js = 'js/';
$css = 'css/';

?>
<!DOCTYPE html>

<html>

<head>

    <title>
        Chat
    </title>
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/smoothness/jquery-ui.css"
    type="text/css" media="screen"/>
    <link type="text/css" href="<?php echo $css; ?>jquery.ui.chatbox.css" rel="stylesheet"/>
    <link rel="stylesheet" href="css/twemoji-awesome.css">
    <link rel="stylesheet" href="css/demo.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

    <script type="text/javascript" src="https://code.jquery.com/jquery-1.9.1.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    <script src="https://ajax.aspnetcdn.com/ajax/jquery.ui/1.9.1/jquery-ui.min.js"></script>
    <script src="<?php echo $js; ?>jquery.ui.chatbox.js"></script>
    <script src="https://twemoji.maxcdn.com/2/twemoji.min.js?2.2.3"></script>
    <script src="https://js.pusher.com/4.0/pusher.min.js"></script>
    <script src="<?php echo $js; ?>custom.js"></script>
    <script type="text/javascript" src="<?php echo $js; ?>/emoticons.js"></script>
   <!--  <script type="text/javascript" src="plugin.js"></script> -->

    <!-- <script type="text/javascript" src="plugin.js"></script> -->

    <style type="text/css">
        #custom-handle {
            width: 3em;
            height: 1.6em;
            top: 50%;
            margin-top: -.8em;
            text-align: center;
            line-height: 1.6em;
        }

        .IE {
            width: 95%;
            background-color: #80ffaa;
            padding-top: 5px;
            padding-bottom: 5px;
            padding-left: 4px;
            margin: 5px;
            border-radius: 8px;
        }

        .IR {
            width: 95%;
            background-color: #ffffb3;
            padding-top: 5px;
            padding-bottom: 5px;
            padding-left: 4px;
            margin: 5px;
            border-radius: 8px;
        }

        .ui-chatbox-log {
            background-image: url('images/back.jpg');
        }
        #custom-handle{
            width :6em !important;
        }
        .time{
            /*width: 95%;*/
            float:right;
            font-size: 10px;
        }
        #slider{
            display: none;
        }
    </style>
    <script type="text/javascript">
    </script>
</head>

<body>
    <div class="container">
        <div class="row">
            <div class="row">
                &nbsp</div>
            <div class="row">
                &nbsp
            </div>
            <div class="row">
                <div id="slider">
                    <div id="custom-handle" class="ui-slider-handle"></div>
                </div>

            </div>
              <video controls="" autoplay="" name="media" id='v' onseeked="myfun()">
               <source src="https://s3-ap-southeast-1.amazonaws.com/opentok-uploadable/45540982/66df2207-374c-4d10-986a-4b07866c8079/archive.mp4" type="video/mp4">
                
                </track>
               </video>
            <!-- <div id="chatbox">
  
</div> -->
<script type="text/javascript">
  function myfun(){
 // alert('call');
 var vid = document.getElementById("v");

 // console.log('moved at '+vid.played.end(0));
 var time=vid.currentTime;
 var min=window.parseInt(time/60);
 var sec=time%60;
 console.log(('min : '+min+' sec : '+sec));
/* if()
  console.log('moved at '+ vid.currentTime);*/
  
    // alert('moved at '+ vid.currentTime);
  $('#slider').slider('option',"value", vid.currentTime)
  }
</script>
            <p id='1'></p>
            <p id='role'></p>

            <div class="row">
                <div class="col-lg-3">
                    Start
                </div>
                <div class="col-lg-6">
                    <div class="col-lg-3">
                    </div>
                    <div class="col-lg-6">
                        <i id='a' class="twa twa-play-button twa-2x" title="play"></i>
                        <i id='b' class="twa twa-stop-button twa-2x" title="stop"></i>

                    </div>
                    <div class="col-md-3">

                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="col-sm-3">

                    </div>
                    <div class="col-sm-7">

                    </div>
                    <div class="col-sm-2">end</div>
                </div>
            </div>

            <div id="chat_div">

            </div>
        </div>
</body>
<script type="text/javascript">
    var queryString = window.location.search;

    var u = queryString.substring(queryString.indexOf('=') + 1);
    calling_obj = null;
    window.channel_id = 'presence-10';
    me = '';
    max = 10;
    username = 'ir';
    session_init = '';
    session_end = '';

    pause = false;
  
    state = 'play';
    inter=null;
 
   
    var chat = $.fn.construct = function(object) {




        var color = object['color'] == undefined ? '#ffa433' : object['color'];
        var headerColor = object['headerColor'] == undefined ? '#ffa433' : object['headerColor'];
        var headerTextColor = object['headerTextColor'] == undefined ? '#ffffff' : object['headerTextColor'];
        $(document).ready(function() {
            
            slider_value = '';
            var vid = document.getElementById("v");
            // console.log('d'+vid);
            vid.autoplay = false;
            vid.load();
            
            
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

            $.ajax({
                url: 'transcript.php',
                type: 'POST',
                async: "false",
                data: {
                    "channel_id": u
                },
                success: function(result) {

                    obj = result;
                    var i = JSON.parse(obj);
                    session_init = Object.values(i)[0] - 10;
                    session_end = Object.values(i)[Object.values(i).length - 1] + 10;
                    load = session_init;
                


                    clickk();
                    slider_c(session_init, session_end);
                }
            });

            function clickk() {

               vid.onplay = function() {
        // alert("The video has started to play");
                        var sc=session_init;
                        inter = setInterval(move_slider, 1000);
            };

            vid.onpause = function() {
        // alert("The video has started to pause");
           
        clearInterval(inter);
            };

           /*     $('#a').click(function() {
                    if (state == 'play') {
                        // console.log('play');
                        var sc=session_init;
                        inter = setInterval(move_slider, 1000);
                        state = 'pause';
                        $("#a").toggleClass('twa-play-button twa-pause-button');
                            if( $(this).hasClass('twa-pause-button')){
                                $(this).attr('title', 'pause');

                            }
                                            } else {
                        console.log('pause');
                        clearInterval(inter);
                        state = 'play';
                        $("#a").toggleClass('twa-pause-button twa-play-button');

                        if( $(this).hasClass('twa-play-button')){
                             $(this).attr('title', 'play');
                        }
                    }

                });*/

           

                
                 $(document).on('click', '.ui-slider', function(event) {
                    console.log('dw');
                 });
            }

            function slider_c(session_init, session_end) {
                $(function() {
                    handle = $("#custom-handle");
                    slider = $("#slider").slider({
                        create: function() {
                            console.log('slider created');
                            $(this).slider('option',"value",0)
                        handle.text($(this).slider("value"));

                        },
                        change: function(event, ui) {
                            console.log('slider changed');
                          
                            var value=ui.value;
                            console.log('the value of ui is change '+ui.value);
                
                           handle.text(ui.value);
                        
                            if(load==session_end)
                            {
                                 clearInterval(inter);
                                $("#a").toggleClass('twa-play-button twa-pause-button');
                                  
                            }
                            

                        
                            $('#chat_div').empty();
                            console.log('value of the load is '+ value+session_init);
                            bind_data_to_chatbox(obj, value+session_init);
                        },
                        slide: function(event, ui) {

                            // console.log('slider slided');
                            console.log('the value of slide is '+ui.value);
                            var value=ui.value;
                            console.log('the value inside slide is '+value);
                                           
                        },
                        min: 0,
                        max: session_end-session_init
                    });
                });

            }


        });
        var title = object['title'] == undefined ? "eguru chat" : object['title'];
        addMessage(window.event, this, title);
        var left = object['left'] == undefined ? 0 : object['left'];
        calling_obj = $(this);
        return $(this).change_position(left);
    }

    function move_slider() {
        console.log('nmove slider happened');
      
 console.log('nmove slider the value is '+slider.slider('option','value'));
        var r=slider.slider('option','value');
               slider.slider('option','value',++r);
       
       
    }

      
    function bind_data_to_chatbox(data, slide_value) {
            // console.log('bind data'+slide_value-session_init);       
        var i = JSON.parse(data);
        $.each(i, function(key, value) {
            if (value <= slide_value) {
                // console.log('value iss ' + value);

                var data = key.split("/-/");
                var time = data[2]
                var role = data[1];
                var msg = data[0] + '-----' + time;
                msg = msg.replace(/:\+(1|2|3|4|5):/g, replacer);
                var date = new Date(time*1000),
                            datevalues = [
                            date.getFullYear(),
                            date.getMonth()+1,
                            date.getDate(),
                            date.getHours(),
                            date.getMinutes(),
                            date.getSeconds(),
                            ];
                            console.log(datevalues);
                           var timee=(datevalues[3]+':'+datevalues[4]+':'+datevalues[5]+'  '+datevalues[2]+'/'+datevalues[1]+'/'+datevalues[0]);
                if (role == 'ie') {
                    username = 'IE';
                    calling_obj.chatbox("option", "boxManager").addMsg('IE', msg,timee);
                } else {
                    username = 'IR';
                    calling_obj.chatbox("option", "boxManager").addMsg('IR', msg,timee);
                }

            }
        });
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
            'right': x_pos
        });
        return $(this);
    }
    var chat_box = $('#chat_div').construct({
        'left': '200px'
    });
</script>

</html>