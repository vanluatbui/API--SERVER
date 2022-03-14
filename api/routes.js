module.exports = function(app) {

  // --------------------------------------------API of User------------------------------------------------------------------------------------

    let user = require('./controllers/UserController');

  
    // API dang ky tai khoan User............................
    app.route('/DangKy')
      .post(user.dangky);


      // API dang nhap tai khoan User............................
      app.route('/DangNhap')
      .post(user.dangnhap);
    

     // API cap nhat tai khoan User............................
    app.route('/CapNhatUser/:username')
      .put(user.update);


      // API lay thong tin tai khoan User nao do............................
      app.route('/User/:username')
      .get(user.info_user);



      // -----------------------------------------------API of Loai mon an------------------------------------------------------------------------------------


      let loaimonan = require('./controllers/LoaiMonAnController');
  
    // API lay danh sach cac loai mon an.............................
    app.route('/LoaiMonAn')
      .get(loaimonan.ds_loaimonan);


    // API them 1 loai mon an.............................
    app.route('/ThemLoaiMonAn')
      .post(loaimonan.insert_loaimonan);

      // API sua 1 loai mon an.............................
    app.route('/SuaLoaiMonAn/:idLoaiMonAn')
    .put(loaimonan.update_loaimonan);

      // API xoa 1 loai mon an.............................
    app.route('/XoaLoaiMonAn/:idLoaiMonAn')
    .delete(loaimonan.delete_loaimonan);

 

     // -------------------------------------------------------API of mon an------------------------------------------------------------------------------------


     let monan = require('./controllers/MonAnController');

     //API lay danh sach mon an thuoc chuoi mon an can tim kiem (chuoi con gan giong)......................................
     app.route('/SearchMonAn/:search')
       .get(monan.ds_monanSearch);
  
     // API lay danh sach cac mon an thuoc mot loai mon an nao do.............................
     app.route('/MonAn/:loaimonan')
       .get(monan.ds_monanTheoLoai);


       // API lay danh sach tat ca cac mon an.............................
     app.route('/MonAn')
     .get(monan.ds_monan);


     // API lay danh sach top 10 cac mon an moi nhat.............................
     app.route('/MonAnMoiNhat')
     .get(monan.ds_monanMoiNhat);


     // API lay danh sach cac mon an noi bat.............................
     app.route('/MonAnNoiBat')
     .get(monan.ds_monanNoiBat);

     // API them 1 mon an (trong JSON tạm thời truyền giá trị cho LoaiMonAn là tên loại món ăn (code tự động sẽ chuyển về giá trị ID tương ứng).............................
    app.route('/ThemMonAn')
    .post(monan.insert_monan);


      // API sua 1 mon an.............................
      app.route('/SuaMonAn/:idMonAn')
      .put(monan.update_monan);

       // API xoa 1 mon an.............................
    app.route('/XoaMonAn/:idMonAn')
    .delete(monan.delete_monan);



    // --------------------------------------------------------API of USER LIKE MON AN------------------------------------------------------------------------------------


    let likemonan = require('./controllers/LikeMonAnController');
  
    // API lay danh sach cac mon an nguoi dung da like.............................
    app.route('/LikeMonAn/:user')
      .get(likemonan.ds_monanUserLike);


      // API - User like mot mon an.............................
    app.route('/InsertLikeMonAn/')
    .post(likemonan.monanInsertLike);

    // API - User unlike mot mon an.............................
    app.route('/UnLikeMonAn/')
    .delete(likemonan.monanUnLike);



     // --------------------------------------------------------API of USER SAVE MON AN------------------------------------------------------------------------------------


     let savemonan = require('./controllers/SaveMonAnController');
  
     // API lay danh sach cac mon an nguoi dung da save.............................
     app.route('/SaveMonAn/:user')
       .get(savemonan.ds_monanUserSave);
 
 
       // API - User save mot mon an.............................
     app.route('/InsertSaveMonAn/')
     .post(savemonan.monanInsertSave);
 
     // API - User unsave mot mon an.............................
     app.route('/UnSaveMonAn/')
     .delete(savemonan.monanUnSave);


      // -------------------------------------------------------API of banner------------------------------------------------------------------------------------


      let banner = require('./controllers/BannerController');


      // API lay danh sach banner theo ten mon an......................
      app.route('/Banner/:monan')
       .get(banner.ds_bannerTheoMonAn);


      // API them 1 banner.................................................................
     app.route('/ThemBanner')
     .post(banner.insert_banner);
 
 
       // API sua 1 banner.............................
       app.route('/SuaBanner/:idBanner')
       .put(banner.update_banner);
 
        // API xoa 1 banner.............................
     app.route('/XoaBanner/:idBanner')
     .delete(banner.delete_banner);

  };