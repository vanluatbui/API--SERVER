const { json } = require('express/lib/response');
const Admin = require('mongodb/lib/admin');

module.exports = {

  //API lay danh sach mon an thuoc chuoi ten mon an can tim kiem (chuoi con gan giong)......................................

  ds_monanSearch: (req, res) => {

    let search = req.params.search;
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("CookingRecipe");

       //Xuất danh sách...
       var query = { TenMonAn : new RegExp(search.toString(), 'i')};
       dbo.collection("MonAn").find(query).toArray(function(err, result) {
         if (err) throw err;
         
         res.json(result);
         db.close();
         });
        
       });
  },


    // API lay danh sach cac mon an thuoc mot loai mon an nao do.............................

    ds_monanTheoLoai: (req, res) => {

        let loaimonan = req.params.loaimonan;
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
        
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("CookingRecipe");
    
          //Lấy ID của loại món ăn cần xuất DS các món ăn của nó
          var query = { TenLoaiMonAn : loaimonan.toString() };
          dbo.collection("LoaiMonAn").find(query).toArray(function(err, result) {
            if (err) throw err;
            
           var  id = result[0]._id;

            //Xuất danh sách các món ăn thuộc loại món ăn đó
        var query2 = { LoaiMonAn : id.toString() };
        dbo.collection("MonAn").find(query2).toArray(function(err, result) {
          if (err) throw err;
          
          res.json(result);
          db.close();
          });
            
          });
        });
      },

      
       // API lay danh sach tat ca cac mon an.............................

    ds_monan: (req, res) => {

        const mongoClient = require('mongodb').MongoClient;
        mongoClient.connect('mongodb://127.0.0.1:27017/CookingRecipe', function(err, db) {
        if (err) throw err;
        var monan = db.collection('MonAn');
         monan.find({}).toArray(function (err,data) {
 
         if (err) throw err;
          res.json(data);
     });
     db.close();
 });
   },


    // API lay danh sach top 10 cac mon an moi bat.............................

   ds_monanMoiNhat: (req, res) => {

    const mongoClient = require('mongodb').MongoClient;
    mongoClient.connect('mongodb://127.0.0.1:27017/CookingRecipe', function(err, db) {
    if (err) throw err;
    var monan = db.collection('MonAn').find().sort({Date : -1}).limit(10).toArray(function(err, result) {
        if (err) throw err;
     res.json(result);
 });
     db.close();
});
},


// API lay danh sach cac mon an noi bat.............................
ds_monanNoiBat: (req, res) => {

    const mongoClient = require('mongodb').MongoClient;
    mongoClient.connect('mongodb://127.0.0.1:27017/CookingRecipe', function(err, db) {
    if (err) throw err;
    var monan = db.collection('MonAn').find({NoiBat : true}).toArray(function(err, result) {
        if (err) throw err;
     res.json(result);
 });
     db.close();
});
},
  
     // API them 1 mon an.............................
insert_monan: (req, res) => {

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
       var collection = db.collection('MonAn');

       db.collection('LoaiMonAn').find({TenLoaiMonAn : data.LoaiMonAn.toString()}).toArray(function(err, result) {
        if (err) throw err;

        //data.LoaiMonAn = result[0]._id.toString();

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


   // API sua 1 mon an.............................

  update_monan: (req, res) => {

    let data = req.body;

   let ID = new require('mongodb').ObjectID(req.params.idMonAn);

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("CookingRecipe");

    dbo.collection('LoaiMonAn').find({TenLoaiMonAn : data.LoaiMonAn.toString()}).toArray(function(err, result) {
        if (err) throw err;

        //data.LoaiMonAn = result[0]._id.toString();
        //console.log(ID)

        var myquery = { _id : ID };
var newvalues = { $set: data };

dbo.collection("MonAn").updateOne(myquery, newvalues, function(err, res) {
if (err) 
throw err;

db.close();
  });

  res.json({message: 'Cập nhật thành công !', data : true})
});
});
  },


  // API xoa 1 loai mon an.............................

  delete_monan: (req, res) => {

    let ID = new require('mongodb').ObjectID(req.params.idMonAn);

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("CookingRecipe");
        var myquery = { _id : ID };
      
        
        dbo.collection("MonAn").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          db.close();
        });
  
       res.json({message: 'Xoá thành công !', data : true})
});
  },

}

