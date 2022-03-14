const { json } = require('express/lib/response');
const Admin = require('mongodb/lib/admin');

module.exports = {

    // API lay danh sach cac loai mon an.............................

    ds_loaimonan: (req, res) => {

      var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://vanluat:12345@cluster0.owctn.mongodb.net/CookingRecipe?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {

  db.collection("LoaiMonAn").find().toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
    db.close();
  });
});
  },

  // API them 1 loai mon an.............................

  insert_loaimonan: (req, res) => {

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

  var collection = db.collection('LoaiMonAn');

  collection.insertOne(data, function (err, result) {
 if (err) {
     res.json({message: 'That bai!', data : false})
 } else {
     res.json({message: 'Thanh cong!', data : true})
 }
 db.close();
 });
});
   },

   // API sua 1 loai mon an.............................

  update_loaimonan: (req, res) => {

    let data = req.body;

    let ID = new require('mongodb').ObjectID(req.params.idLoaiMonAn);

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
  var newvalues = { $set: {TenLoaiMonAn : data.TenLoaiMonAn} };
  
  db.collection("LoaiMonAn").updateOne(myquery, newvalues, function(err, res) {
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
      
        
  db.collection("LoaiMonAn").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    db.close();
  });

 res.json({message: 'Xoá thành công !', data : true});
  
});
  },
}