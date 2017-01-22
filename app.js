/**
 * Created by gfbaiwff on 2017/1/22.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require("express-session");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var router = require('./router');

app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true
}));

app.use(express.static('./public'));
app.set('view engine','ejs');

app.get('/',function(req,res,next){
    res.render('index');
});

app.get('/reg',router.showRegister);
app.post("/doReg",router.doRegister);

app.listen(3000);