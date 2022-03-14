const { json } = require('express/lib/response');
const Admin = require('mongodb/lib/admin');

module.exports = {

   // API lay danh sach cac banner thuoc mot mon an nao do.............................

   ds_bannerTheoMonAn: (req, res) => {

    let monan = req.params.monan;
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("CookingRecipe");

      //Lấy ID của loại món ăn cần xuất DS các món ăn của nó
      var query = { TenMonAn : monan.toString() };
      dbo.collection("MonAn").find(query).toArray(function(err, result) {
        if (err) throw err;
        
       var  id = result[0]._id;


        //Xuất danh sách các banner thuộc món ăn đó
    var query2 = { MonAn : id.toString() };
    dbo.collection("Banner").find(query2).toArray(function(err, result) {
      if (err) throw err;
      
      res.json(result);
      db.close();
      });
        
      });
    });
  },
  
     // API them 1 banner.............................
insert_banner: (req, res) => {

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
       var collection = db.collection('Banner');

       db.collection('MonAn').find({TenMonAn : data.MonAn.toString()}).toArray(function(err, result) {
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
}
});
  },


   // API sua 1 banner.............................

  update_banner: (req, res) => {

    let data = req.body;

   let ID = new require('mongodb').ObjectID(req.params.idBanner);

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("CookingRecipe");

    dbo.collection('MonAn').find({TenMonAn : data.MonAn.toString()}).toArray(function(err, result) {
        if (err) throw err;

        //data.MonAn = result[0]._id.toString();
        //console.log(ID)

        var myquery = { _id : ID };
var newvalues = { $set: data };

dbo.collection("Banner").updateOne(myquery, newvalues, function(err, res) {
if (err) 
throw err;

db.close();
  });

  res.json({message: 'Cập nhật thành công !', data : true})
});
});
  },


  // API xoa 1 loai banner.............................

  delete_banner: (req, res) => {

    let ID = new require('mongodb').ObjectID(req.params.idBanner);

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("CookingRecipe");
        var myquery = { _id : ID };
      
        
        dbo.collection("Banner").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          db.close();
        });
  
       res.json({message: 'Xoá thành công !', data : true})
});
  },

}

