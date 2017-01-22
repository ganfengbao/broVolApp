/**
 * Created by gfbaiwff on 2017/1/14.
 */
var db = require("../model/db.js");
var md5 = require("../model/md5.js");

exports.showIndex = function(req,res,next){
    res.render('index',{
        "login":req.session.login == "1" ? true:false,
        "username": req.session.login == "1" ? req.session.username : ""
    });
};
exports.showRegister = function(req,res,next){
    res.render('reg');
};

exports.doRegister = function(req,res,next){
        var username = req.body.username;
        var email = req.body.email;
        var pw1 = Number(req.body.pw1).toString();
        console.log(req.body);
        console.log(username);
        console.log(pw1);
        password = md5(pw1);

        db.find("users",{"username":username},function(err,result){
           if(err){
               res.json("-3");
               return;
           }else{
               if(result.length != 0){
                   res.json("-1");
                   return;
               }
               db.insertOne("users",{
                   "username":username,
                   "userpass":password,
                   "email":email
               },function(err,result){
                  if(err){
                      res.json("-3");
                      return;
                  }else{
                      req.session.login = "1";
                      req.session.username = username;
                      res.json("1");
                  }
               });
           }
    });
};

exports.showLogin = function(req,res,next){
    res.render('login');
};

exports.doLogin = function (req,res,next) {
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        var username = fields.username;
        var password = fields.password;
        password = md5(password);

        db.find("users",{"username":username,"password":password},function(err,result){
            if(err){
                res.json("-5");
                return;
            }else{
                if(result.length == 0){
                    res.json("-1");
                    return;
                }else if(password == result[0].password){
                    req.session.login = "1";
                    req.session.username = username;
                    res.json("1");
                    return;
                }else{
                    res.json("-2");
                    return;
                }
            }
        });
    });
};