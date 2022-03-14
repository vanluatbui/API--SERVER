const { json } = require('express/lib/response');
const Admin = require('mongodb/lib/admin');

module.exports = {

    // API dang ky tai khoan User............................

    dangky: (req, res) => {

       // Lấy thông tin data đoạn JSON của body các thông tin về User được truyền vào để đăng kí
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

           //Lấy toàn bộ thông tin của table User
          var collection = db.collection('User');


          var query = { UserName : data.UserName };
          db.collection("User").find(query).toArray(function(err, result) {
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

    collection.insert([data], function (err, result) {
        if (err) {
            res.json({message: 'Dang ky that bai!', data : false})
        } else {
            res.json({message: 'Dang ky thanh cong!', data : true})
        }

        db.close();
      });
          })
        }
});
    },

    //------------------------------------------------------------------------

   // API dang nhap tai khoan User............................
   
   dangnhap: (req, res) => {

    let data = req.body;

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("CookingRecipe");

      //Kiểm tra username và password người dùng truyền vào có đúng không?
      var query = { UserName : data.UserName, MatKhau : data.MatKhau };
      dbo.collection("User").find(query).toArray(function(err, result) {
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

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("CookingRecipe");

var myquery = { UserName: username.toString() };
var newvalues = { $set: {HoTen : data.HoTen, MatKhau : data.MatKhau, SDT : data.SDT, Email : data.Email, DiaChi : data.DiaChi, Anh : data.Anh} };

//Cập nhật các thông tin User theo data JSON tương ứng mà User đó là username cần cập nhật...
dbo.collection("User").updateOne(myquery, newvalues, function(err, res) {
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
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("CookingRecipe");

      var query = { UserName : username.toString() };
      dbo.collection("User").find(query).toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
        db.close();
      });
    });
  },
}