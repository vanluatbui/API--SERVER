const { json } = require('express/lib/response');
const Admin = require('mongodb/lib/admin');

module.exports = {

    // API lay danh sach cac loai mon an.............................

    ds_loaimonan: (req, res) => {

        const mongoClient = require('mongodb').MongoClient;
       mongoClient.connect('mongodb://127.0.0.1:27017/CookingRecipe', function(err, db) {
       if (err) throw err;
       var loaimonan = db.collection('LoaiMonAn');
        loaimonan.find({}).toArray(function (err,data) {

        if (err) throw err;
         res.json(data);
    });
    db.close();
});
  },

  // API them 1 loai mon an.............................

  insert_loaimonan: (req, res) => {

     let data = req.body;

     //Kết nối CSDL
     var mongodb = require('mongodb');
     var MongoClient = mongodb.MongoClient;
     var url = 'mongodb://localhost:27017/CookingRecipe';

     MongoClient.connect(url, function (err, db) {
     if (err) {
       //Kết nối CSDL thất bại
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } 
    else {
      //Kết nối CSDL thành công
        console.log('Connection established to', url);

       var collection = db.collection('LoaiMonAn');

      collection.insert([data], function (err, result) {
     if (err) {
         res.json({message: 'That bai!', data : false})
     } else {
         res.json({message: 'Thanh cong!', data : true})
     }

     db.close();
   });
}
});
   },

   // API sua 1 loai mon an.............................

  update_loaimonan: (req, res) => {

    let data = req.body;

    let ID = new require('mongodb').ObjectID(req.params.idLoaiMonAn);

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("CookingRecipe");

var myquery = { _id : ID };
var newvalues = { $set: {TenLoaiMonAn : data.TenLoaiMonAn} };

dbo.collection("LoaiMonAn").updateOne(myquery, newvalues, function(err, res) {
if (err) 
throw err;

db.close();
  });
  
  res.json({message: 'Cập nhật thành công !', data : true})
});
  },

   // API xoa 1 loai mon an.............................

  delete_loaimonan: (req, res) => {

    let ID = new require('mongodb').ObjectID(req.params.idLoaiMonAn);

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("CookingRecipe");
        var myquery = { _id : ID };
      
        
        dbo.collection("LoaiMonAn").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          db.close();
        });
  
       res.json({message: 'Xoá thành công !', data : true})
});
  },
}