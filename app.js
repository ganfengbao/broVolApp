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

/*session功能*/
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true
}));

/*静态资源路径*/
app.use(express.static('./public'));
app.set('view engine','ejs');

app.get('/',router.showIndex);
app.get('/reg',router.showRegister);
app.post("/doReg",router.doRegister);
app.get('/login',router.showLogin);
app.post('/doLogin',router.doLogin);
app.get('/mybooks',router.showMybooks);

app.listen(3000);