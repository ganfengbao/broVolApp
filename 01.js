/**
 * Created by ganfengbao on 2017/1/23.
 */
var express = require('express');
var app = express();

app.use(express.static('./public'));
app.set("view engine",'ejs');

app.get('/', function (req,res) {
   res.render('index',{
       "username":"123456"
   });
});

app.listen(5000);