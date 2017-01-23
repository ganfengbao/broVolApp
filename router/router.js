/**
 * Created by gfbaiwff on 2017/1/14.
 */
var db = require("../model/db.js");
var md5 = require("../model/md5.js");

exports.showIndex = function(req,res,next){
    if(req.session.login == "1"){
            res.render('index',{
                "login":true,
                "username": req.session.username
            });
    }else{
        res.render('index',{
            "login":false,
            "username":""
        });
    }
};

exports.showRegister = function(req,res,next){
    res.render('reg');
};

exports.showLogin = function(req,res,next){
    res.render('login');
};

exports.showMybooks = function(req,res,next){
    res.render('mybooks');
};

exports.doRegister = function(req,res,next){
        var username = req.body.username;
        var email = req.body.email;
        var pw1 = Number(req.body.pw1).toString();
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

exports.doLogin = function (req,res,next) {
        var username = req.body.username;
        console.log(username);
        var pw = Number(req.body.pw).toString();
        password = md5(pw);
    console.log(password);
        db.find("users",{"username":username,"userpass":password},function(err,result){
            if(err){
                res.json("-5");
                return;
            }else{
                if(result.length == 0){
                    res.json("-1");
                    return;
                }else if(password == result[0].userpass){
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
};