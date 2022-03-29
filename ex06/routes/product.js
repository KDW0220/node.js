var express = require('express');
var router = express.Router();

var db=require('../db');
/* 상품목록 JSON데이터 */
router.get('/list', function(req, res, next) {
    var page=req.query.page; 
    var start=(page-1)*4;
  
    //전체데이타갯수
    var sql='select count(*) total from tbl_product';
    db.get().query(sql, function(err, rows){
      var total=rows[0].total;
  
      sql=`select *,format(price,0) fprice from tbl_product order by code desc limit ${start},4`;
      db.get().query(sql, function(err, rows){
          res.send(rows);
      });
    });
  });

//상품등록
router.get('/insert',function(req,res){
    var sql="select max(code) mcode from tbl_product"
    db.get().query(sql,function(err, rows){
        var maxCode=rows[0].mcode;
        var newCode='P'+(parseInt(maxCode.substr(1))+1);
        res.render('index',{title:"상품등록",pageName:'insert.ejs',newCode:newCode})
    });
});

//상품DB저장
router.post('/insert',function(req,res){
    var code=req.body.code;
    var name=req.body.name;
    var price=req.body.price;
    var image=req.body.image;
    var sql="insert into tbl_product(code,name,price,image) values(?,?,?,?)";
    db.get().query(sql,[code,name,price,image],function(err, result){
        res.redirect('/');
    });
});

//정보읽어오기
router.get('/read',function(req,res){
    var code=req.query.code;
    var sql='select * from tbl_product where code=?';
    db.get().query(sql,[code],function(err, rows){
        res.render('index',{title:"상품정보",pageName:'read.ejs',"vo":rows[0]});
    });
});

//수정
router.post('/update',function(req,res){
    var code=req.body.code;
    var name=req.body.name;
    var price=req.body.price;
    var image=req.body.image;
    var sql="update tbl_product set name=?,price=?,image=? where code=?";
    db.get().query(sql,[name,price,image,code],function(err, result){
        res.redirect('/');
    });
});

//삭제
router.post('/delete',function(req,res){
    var code=req.body.code;
    var sql="delete from tbl_product where code=?";
    db.get().query(sql,[code],function(err, result){
        res.redirect('/');
    });
});

//파일업로드
var multer=require('multer');
var path='./public/upload';
var upload=multer({
    storage:multer.diskStorage({
        destination:(req, res, done)=>{
            done(null, path);
        },
        filename:(req, file, done)=>{
            done(null, Date.now()+'_'+file.originalname);
        }
    })
});



module.exports = router;
