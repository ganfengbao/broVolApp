/**
 * Created by gfbaiwff on 2017/1/22.
 */
$(function(){
        $("#doReg").click(function(){
            var username = $("#username").val();
            var email = $("#email").val();
            var pw1 = $("#pw1").val();
            $.post("/doReg",{"username":username,"email":email,"pw1":pw1},function(data){
            })
        })
});