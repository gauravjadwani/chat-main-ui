<!-- localStorage.setItem(window.localStorageKey, JSON.stringify(lc.getSnapshot())); -->
<?php
$a='name';
?>
<html>
<head>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<script type="text/javascript">
		/*obj = jQuery.parseJSON( '{'+<?php echo $a?>+': "John" }' );
		alert(JSON.stringify(obj));*/

		//var date=new Date();
		var role='ir';
	/*	var i=Date.now();
		var arr=[];
		var obj={[i]:'hi','role':role};
		arr.push(obj);
		arr.push(obj);
		
		var main_obj={'channel_id':arr};
		console.log(JSON.stringify(main_obj));*/	

	/*	main_obj['channel_id'].forEach(function(entry) {
    //console.log(entry);
    //calling_obj.chatbox("option", "boxManager").addMsg(username,data.text.message);
   // console.log(entry);
    console.log(entry[Object.keys(entry)[0]]);
    console.log(entry[Object.keys(entry)[1]]);
});*/

var obj={
	'name':'guarav',
	'arr':[]
};

obj.arr.push('fil');
console.log(obj.arr);

</script>
</head>
</html>