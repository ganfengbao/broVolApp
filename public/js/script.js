
$(function(){
	//头部更多显示
	$('#gengduo').mouseover(function (){

		$("#gengduo").attr('class', 'sp_more m2');
	 	$("#nav_s1").show();		
	});	
	
	$('#gengduo').mouseout(function (){
    	$("#gengduo").attr('class', 'sp_more');
		$("#nav_s1").hide();
	});	
});