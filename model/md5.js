/**
 * Created by ganfengbao on 2017/1/14.
 */
var crypto = require("crypto");
module.exports = function md5(userpass){
    var md5 = crypto.createHash("md5");
    var password = md5.update(userpass).digest('base64');
    return password;
};