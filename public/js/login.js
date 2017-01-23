/**
 * Created by ganfengbao on 2017/1/23.
 */
$(function(){
   $("#login").click(function () {
       var username = $("#username").val();
       var pw = $("#pw").val();
       $.post("/doLogin",{"username":username,"pw":pw},function(data){
           if(data == 1){
               window.location.href = '/';
           }
       })
   })
});
