window.d = new Array();
/* Custom JS Functions */

function integration(jsObject) {
  if(!window.d[jsObject.message.tS]){
    window.d[jsObject.message.tS] = new Array();
  }
  window.d[jsObject.message.tS][jsObject.message.p] = jsObject.message.data;
  if(Object.keys(window.d[jsObject.message.tS]).length == jsObject.message.tP){
    var string_data = '';
    window.d[jsObject.message.tS].forEach(function(obj){
     string_data += obj;
   });
    return string_data;
  }
  return null;
}

function broad(data) {
  var check=integration(data['text']);
  if(check!=null) {
    var decompress_base64=LZString.decompressFromBase64(check);
    var decompress_LZ=LZString.decompressFromEncodedURIComponent(decompress_base64);
    decompress=JSON.parse(decompress_LZ);
    calculate_union(decompress);
  }
}

function disintegration_header(str, size){
  var timeStamp = Math.floor(Date.now());
  var numChunks = Math.ceil(str.length / size);
  var jsObject = [];
  for(var i = 0, o = 0; i < numChunks; ++i, o += size) {
    var obj = {};
    obj  = {
      tS                            : timeStamp,
      tP                            : numChunks,
      p                             : i,
      data       : str.substr(o, size)
    };
    jsObject[i] = obj;
  }
  return jsObject;
}

function process_send_data(){
  var payload=calculate_difference(eventButtons);
  eventButtons = false;
  payload=JSON.stringify(payload);
  var compressed = LZString.compressToEncodedURIComponent(payload);
  var again_com= LZString.compressToBase64(compressed);
  var chunk_array=disintegration_header(again_com,9000);
  localStorage.setItem(window.localStorageKey, JSON.stringify(lc.getSnapshot()));
  chunk_array.forEach(function(i){
    $.ajax({
      url: 'broadcast.php',
      type: 'post',
      data: {
        "text":{'payload_compressed':i,'channel_id':window.channel_id}
      },
      success: function() {
        console.log('ajax payload sent to broadcast.php');
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        if (XMLHttpRequest.readyState == 4) {
          alert('Network Error');
        }
        else if (XMLHttpRequest.readyState == 0) {
          alert('Please check your Network connectivity');
        }
        else {
          alert('Something went wrong');
        }
      }
    });
  });
}



window.receiver_previous=null;
window.run=1;

function calculate_union(data) {
  var return_data;
  if(window.receiver_previous!=null && Object.getOwnPropertyNames(data).length != 6){
    var object1 = jQuery.extend(true,{},window.receiver_previous);
    console.log("object1 "+JSON.stringify(object1));
    var object2 = data;
    $.extend(true, object1, object2);
    window.receiver_previous=jQuery.extend(true,{},object1);
    shape_object_1 = object1.shapes;
    shape_array_1 = [];
    var shape_keys = Object.getOwnPropertyNames(shape_object_1);
    shape_keys.forEach(function(key){
      shape_array_1.push(shape_object_1[key]);
    });
    object1.shapes = shape_array_1
    return_data = object1;
  }
  else{
    window.receiver_previous = jQuery.extend(true,{},data);
    shape_object_1 = data.shapes;
    shape_array_1 = [];
    var shape_keys = Object.getOwnPropertyNames(shape_object_1);
    shape_keys.forEach(function(key){
      shape_array_1.push(shape_object_1[key]);
    });
    data.shapes = shape_array_1
    return_data = data
  }
  lc.loadSnapshot(return_data);
  return return_data
}
window.sender_previous=null;

function clean(obj) {
  for (var propName in obj) {
    if(typeof obj[propName] == "object"){
      clean(obj[propName]);
      if(jQuery.isEmptyObject(obj[propName]))
        delete obj[propName];
    } 
    else if (obj[propName] == null || obj[propName] == undefined) {
      delete obj[propName];
    }
  }
}

function reduce(obj1, obj2) {
  for (var k in obj2) {
    if (obj1.hasOwnProperty(k) && obj2.hasOwnProperty(k)) {
      if (typeof obj1[k] == "object" && typeof obj2[k] == "object") {
        reduce(obj1[k], obj2[k]);
      }
      else if(obj1[k] == obj2[k]){
        delete obj1[k]
      }
      else 
        obj1[k] = obj2[k];
    }
    else{
      obj1[k] = obj2[k];
    }
  }
}

function calculate_difference(eButtons) {
  var diff;
  if(window.sender_previous != null && eButtons == false){
    var object1 = window.sender_previous;
    var object2 = lc.getSnapshot();
    object1.shapes = shape_object

    var shape_array = object2.shapes
    var shape_object = {}
    shape_array.forEach(function(obj){
      shape_object[obj.id] = obj
    });
    object2.shapes = shape_object
    reduce( object1, object2);
    clean(object1);
    diff=object1;
  }
  else{
    var object1 = lc.getSnapshot();
    console.log('Sender Else'+JSON.stringify(object1));
    var shape_array = object1.shapes;
    var shape_object = {}
    shape_array.forEach(function(obj){
      shape_object[obj.id] = obj
    });
    object1.shapes = shape_object
    diff=object1;
  }
  window.sender_previous=diff;
  return diff;
}