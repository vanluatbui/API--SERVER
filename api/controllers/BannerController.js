const { json } = require('express/lib/response');
const Admin = require('mongodb/lib/admin');

module.exports = {

   // API lay danh sach cac banner thuoc mot mon an nao do.............................

   ds_bannerTheoMonAn: (req, res) => {

    let monan = req.params.monan;

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
var query = { TenMonAn : monan.toString() };
db.collection("MonAn").find(query).toArray(function(err, result) {
  if (err) throw err;
  
 var  id = result[0]._id;
  //Xuất danh sách các banner thuộc món ăn đó
var query2 = { MonAn : id.toString() };
db.collection("Banner").find(query2).toArray(function(err, result) {
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

    var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://vanluat:12345@cluster0.owctn.mongodb.net/CookingRecipe?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {

  var collection = db.collection('Banner');

  db.collection('MonAn').find({TenMonAn : data.MonAn.toString()}).toArray(function(err, result) {
   if (err) throw err;

   //data.MonAn = result[0]._id.toString();

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


   // API sua 1 banner.............................

  update_banner: (req, res) => {

    let data = req.body;

   let ID = new require('mongodb').ObjectID(req.params.idBanner);

   var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://vanluat:12345@cluster0.owctn.mongodb.net/CookingRecipe?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {

  db.collection('MonAn').find({TenMonAn : data.MonAn.toString()}).toArray(function(err, result) {
    if (err) throw err;

    //data.MonAn = result[0]._id.toString();
    //console.log(ID)

    var myquery = { _id : ID };
var newvalues = { $set: data };

db.collection("Banner").updateOne(myquery, newvalues, function(err, res) {
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
  db.collection("Banner").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    db.close();
  });

 res.json({message: 'Xoá thành công !', data : true})
});     
  },
}

