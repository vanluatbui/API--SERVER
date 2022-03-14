const { json } = require('express/lib/response');
const Admin = require('mongodb/lib/admin');

module.exports = {

    // API lay danh sach cac mon an nguoi dung da like.............................

    ds_monanUserLike: (req, res) => {

        let user = req.params.user;

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("CookingRecipe");

      var query = { UserName : user.toString() };
      dbo.collection("UserLikeMonAn").find(query).toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
        db.close();
      });
    });
  },


  // API - User like mot mon an.............................

  monanInsertLike: (req, res) => {

    let data = req.body;

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("CookingRecipe");

  var collection = dbo.collection('UserLikeMonAn');

  dbo.collection('MonAn').find({TenMonAn : data.MonAn.toString()}).toArray(function(err, result) {
    if (err) throw err;

    //data.MonAn = result[0]._id.toString();

collection.insert([data], function (err, result) {
    if (err) {
   res.json({message: 'That bai!', data : false})
    } else {
   res.json({message: 'Thanh cong!', data : true})
        }
db.close();
  });      
});     
});
  },


  // API - User unlike mot mon an.............................

  monanUnLike: (req, res) => {

    let data = req.body;
      
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("CookingRecipe");
        var myquery = {UserName  : data.UserName, MonAn : data.MonAn };
      
        
        dbo.collection("UserLikeMonAn").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          db.close();
        });
  
       res.json({message: 'Xoá thành công !', data : true})
});
  },
}