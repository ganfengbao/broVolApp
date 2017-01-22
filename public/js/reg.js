/**
 * Created by gfbaiwff on 2017/1/22.
 */
$(function(){
        $("#doReg").click(function(){
            var username = $("#username").val();
            var email = $("#email").val();
            var pw1 = $("#pw1").val();
            //$.ajax({
            //    url : "/doReg",
            //    method : "post",
            //    data : {"username":username,"email":email,"pw1":pw1},
            //    success: function(data){
            //    },
            //    error: function(data){
            //    }
            //});
            $.post("/doReg",{"username":username,"email":email,"pw1":pw1},function(data){
            })
        })
});