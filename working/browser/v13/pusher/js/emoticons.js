emojis_object={':+1:':'twa twa-relaxed twa-lg emoji-content',':+2:':'twa twa-satisfied twa-lg emoji-content',':+3:':'twa twa-thumbsup twa-lg emoji-content',':+4:':'twa twa-laughing twa-lg emoji-content',':+5:':'twa twa-worried twa-lg emoji-content'};
function display_emoticons(ref)
{
console.log('display_emoticons');

	i="";
            $.each( emojis_object, function( key, value ) {
                    // alert("key is "+key+" value"+value);
                    sstring=value.split(" ");
                    title=sstring[1].substring(sstring[1].indexOf("-")+1);
                    // alert(title);
        $(ref).attr("data-content", i+"<i id="+key+" class='"+value+"' title='"+title+"'></i>");
        i = $(ref).attr("data-content");
            });

}

function get_emotiocon(match){
		classis=emojis_object[match];
        console.log('classis'+classis);
      var  sstring=classis.split(" ");
           var title=sstring[1].substring(sstring[1].indexOf("-")+1);
           var emo="<i id="+match+" class='"+classis+"' title='"+title+"'></i>";
       
           return emo;

}

function replacer(match) {

        console.log("match " + match);
        // console.log("p1 " + p1);
        // console.log("p2 " + p2);
        // console.log("p3 " + p3);

       var emoti= get_emotiocon(match);
        

        return emoti;


    }