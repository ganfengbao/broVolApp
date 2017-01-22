/**
 * Created by gfbaiwff on 2017/1/15.
 */
var MongoClient = require("mongodb").MongoClient;
var settings = require("../setting.js");

function _connectDB(callback){
    var url = settings.dburl;

    MongoClient.connect(url, function (err,db) {
        callback(err,db);
    });
}

exports.insertOne = function(collectionName,json,callback){
    _connectDB(function (err,db) {
        if(err){
            callback(err,null);
            return;
        }
        db.collection(collectionName).insertOne(json, function (err, result) {
            callback(err,result);
            db.close();
        })
    })
};

exports.find = function (collectionName,json,C,D) {
    if(arguments.length == 3){
        var callback = C;
        var shipnumber = 0;
        var limit = 0;
    }else if(arguments.length == 4){
        var args = C;
        var callback = D;
        var shipnumber = args.page *args.pagemount || 0;
        var limit = args.pagemount || 0;
        var sort = args.sort || {};
    }else{
        throw new Error("find �����������봫���������ĸ�");
        return;
    }
    _connectDB(function(err,db){
        var result = [];
        var cursor = db.collection(collectionName).find(json).skip(shipnumber).limit(limit).sort(sort);
        cursor.each(function(err,doc){
            if(err){
                callback(err,null);
                db.close();
                return;
            }
            if(doc != null){
                result.push(doc);
            }else{
                callback(null,result);
                db.close();
            }
        });
    });
};

exports.deleteMany = function(collectionName,json,callback){
    _connectDB(function(err,db){
        db.collection(collectionName).deleteMany(
            json,
            function(err,results){
                callback(err,results);
                db.close();
            }
        )
    });
};

exports.updateMany = function(collectionName,json1,json2,callback){
    _connectDB(function(err,db){
        db.collection(collectionName).updateMany(
            json1,json2,function(err,results){
                callback(err,results);
                db.close();
            }
        )
    });
};
