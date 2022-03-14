const { json } = require('express/lib/response');
const Admin = require('mongodb/lib/admin');

module.exports = {

  //API lay danh sach mon an thuoc chuoi ten mon an can tim kiem (chuoi con gan giong)......................................

  ds_monanSearch: (req, res) => {

    let search = req.params.search;

    var mongoose = require('mongoose');

    //Set up default mongoose connection
    var mongoDB = 'mongodb+srv://vanluat:12345@cluster0.owctn.mongodb.net/CookingRecipe?retryWrites=true&w=majority';
    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
    
    //Get the default connection
    var db = mongoose.connection;
    
    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    
    db.once('open', function () {
    
  //Xuất danh sách...
  var query = { TenMonAn : new RegExp(search.toString(), 'i')};
  db.collection("MonAn").find(query).toArray(function(err, result) {
    if (err) throw err;
    
    res.json(result);
    db.close();
    });
  });
},


    // API lay danh sach cac mon an thuoc mot loai mon an nao do.............................

    ds_monanTheoLoai: (req, res) => {

        let loaimonan = req.params.loaimonan;

        var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://vanluat:12345@cluster0.owctn.mongodb.net/CookingRecipe?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {

   //Lấy ID của loại món ăn cần xuất DS các món ăn của nó
   var query = { TenLoaiMonAn : loaimonan.toString() };
   db.collection("LoaiMonAn").find(query).toArray(function(err, result) {
     if (err) throw err;
     
    var  id = result[0]._id;

     //Xuất danh sách các món ăn thuộc loại món ăn đó
 var query2 = { LoaiMonAn : id.toString() };
 db.collection("MonAn").find(query2).toArray(function(err, result) {
   if (err) throw err;
   
   res.json(result);
   db.close();
  });          
 });
});
      },

      
       // API lay danh sach tat ca cac mon an.............................

    ds_monan: (req, res) => {

      var mongoose = require('mongoose');

      //Set up default mongoose connection
      var mongoDB = 'mongodb+srv://vanluat:12345@cluster0.owctn.mongodb.net/CookingRecipe?retryWrites=true&w=majority';
      mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
      
      //Get the default connection
      var db = mongoose.connection;
      
      //Bind connection to error event (to get notification of connection errors)
      db.on('error', console.error.bind(console, 'MongoDB connection error:'));
      
      db.once('open', function () {
      
        db.collection("MonAn").find().toArray(function(err, result) {
          if (err) throw err;
          res.json(result);
          db.close();
        });
      });
   },


    // API lay danh sach top 10 cac mon an moi bat.............................

   ds_monanMoiNhat: (req, res) => {

    var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://vanluat:12345@cluster0.owctn.mongodb.net/CookingRecipe?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {
  db.collection('MonAn').find().sort({Date : -1}).limit(10).toArray(function(err, result) {
    if (err) throw err;
 res.json(result);
 db.close();
});
});
},


// API lay danh sach cac mon an noi bat.............................
ds_monanNoiBat: (req, res) => {

  var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://vanluat:12345@cluster0.owctn.mongodb.net/CookingRecipe?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {

  db.collection('MonAn').find({NoiBat : true}).toArray(function(err, result) {
    if (err) throw err;
 res.json(result);
 db.close();
});
});
},
  
     // API them 1 mon an.............................
insert_monan: (req, res) => {

    let data = req.body;

    var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://vanluat:12345@cluster0.owctn.mongodb.net/CookingRecipe?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {
  var collection = db.collection('MonAn');
  db.collection('LoaiMonAn').find({TenLoaiMonAn : data.LoaiMonAn.toString()}).toArray(function(err, result) {
    if (err) throw err;

    //data.LoaiMonAn = result[0]._id.toString();

    collection.insertOne(data, function (err, result) {
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


   // API sua 1 mon an.............................

  update_monan: (req, res) => {

    let data = req.body;

   let ID = new require('mongodb').ObjectID(req.params.idMonAn);

   var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://vanluat:12345@cluster0.owctn.mongodb.net/CookingRecipe?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {

  db.collection('LoaiMonAn').find({TenLoaiMonAn : data.LoaiMonAn.toString()}).toArray(function(err, result) {
    if (err) throw err;

   // data.LoaiMonAn = result[0]._id.toString();
    //console.log(ID)

    var myquery = { _id : ID };
var newvalues = { $set: data };

db.collection("MonAn").updateOne(myquery, newvalues, function(err, res) {
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

    var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://vanluat:12345@cluster0.owctn.mongodb.net/CookingRecipe?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {
  var myquery = { _id : ID };
  db.collection("MonAn").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    db.close();
  });

 res.json({message: 'Xoá thành công !', data : true})

});
  },

}

