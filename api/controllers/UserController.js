const { json } = require('express/lib/response');
const Admin = require('mongodb/lib/admin');

module.exports = {

    // API dang ky tai khoan User............................

    dangky: (req, res) => {

       // Lấy thông tin data đoạn JSON của body các thông tin về User được truyền vào để đăng kí
        let data = req.body;

       //Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://vanluat:12345@cluster0.owctn.mongodb.net/CookingRecipe?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {

           //Lấy toàn bộ thông tin của table User
          var collection = db.collection('User');


          var query = { UserName : data.UserName };
          
          collection.find(query).toArray(function(err, result) {
              if (result[0] != null)
              {
                res.json({message: "Dang ky that bai!", data : false});
                return;
              }
            
    // Insert Users (mọi sự đăng kí bên ngoài thì chức vụ là mặc định là Client)..................................
    // Mặc định ban đầu khi đăng kí, thông tin người dùng sẽ trống các trường SDT, DiaChi, Email, Anh (sẽ cập nhật về sau)

    data.Anh = "";
    data.Email = "";
    data.DiaChi = "";
    data.SDT = "";
    data.ChucVu = "Client";

    collection.insertOne(data, function (err, result) {
        if (err) {
            res.json({message: 'Dang ky that bai!', data : false})
        } else {
            res.json({message: 'Dang ky thanh cong!', data : true})
        }

        db.close();
      });
    });
  });
},

    //------------------------------------------------------------------------

   // API dang nhap tai khoan User............................
   
   dangnhap: (req, res) => {

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

     //Kiểm tra username và password người dùng truyền vào có đúng không?
     var query = { UserName : data.UserName, MatKhau : data.MatKhau };
     db.collection("User").find(query).toArray(function(err, result) {
       if (err) throw err;

       var x = JSON.stringify(result);

       if (x == "[]" )
       res.json({message : 'Dang nhap that bai !',data : false})
       else
       res.json({message : 'Dang nhap thanh cong !', data : true})
       db.close();
   });
 });
},

   //------------------------------------------------------------------------

   // API cap nhat tai khoan User............................

     update: (req, res) => {

    //Lấy dữ liệu JSON từ thân body truyền vào để biết các thông tin User cần cập nhật
    let data = req.body;
    //Lấy thông tin Username cần sửa thông tin của họ
    let username = req.params.username;

    var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://vanluat:12345@cluster0.owctn.mongodb.net/CookingRecipe?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {

  var myquery = { UserName: username.toString() };
var newvalues = { $set: {HoTen : data.HoTen, MatKhau : data.MatKhau, SDT : data.SDT, Email : data.Email, DiaChi : data.DiaChi, Anh : data.Anh} };

//Cập nhật các thông tin User theo data JSON tương ứng mà User đó là username cần cập nhật...
db.collection("User").updateOne(myquery, newvalues, function(err, res) {
if (err) 
throw err;

db.close();
  });
  res.json({message: 'Cập nhật thành công !', data : true})
});
  },

  //-----------------------------------------------------------------------

   // API lay thong tin tai khoan User nao do............................

   info_user: (req, res) => {

    let username = req.params.username;

    var mongoose = require('mongoose');

    //Set up default mongoose connection
    var mongoDB = 'mongodb+srv://vanluat:12345@cluster0.owctn.mongodb.net/CookingRecipe?retryWrites=true&w=majority';
    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
    
    //Get the default connection
    var db = mongoose.connection;
    
    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    
    db.once('open', function () {

      var query = { UserName : username.toString() };
      db.collection("User").find(query).toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
        db.close();
      });
    });
  },
}