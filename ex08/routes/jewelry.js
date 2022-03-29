var express = require('express');
var router = express.Router();

var db=require('../db');

/* 상품목록 JSON데이터 */
router.get('/list', function(req, res, next) {
    var page=req.query.page; 
    var start=(page-1)*4;
  
    //전체데이타갯수
    var sql='select count(*) total from tbl_jewelry';
    db.get().query(sql, function(err, rows){
      var total=rows[0].total;
  
      sql=`select *,format(price,0) fprice from tbl_jewelry order by code desc limit ${start},4`;
      db.get().query(sql, function(err, rows){
          res.send({rows:rows, total:total});
      });
    });
  });

//상품등록
router.get('/insert',function(req,res){
    var sql="select max(code) mcode from tbl_jewelry"
    db.get().query(sql,function(err, rows){
        var maxCode=rows[0].mcode;
        var code=maxCode+1;
        res.render('index',{title:"상품등록",pageName:'insert.ejs',code:code})
    });
});

//상품DB저장
router.post('/insert',function(req,res){
    var code=req.body.code;
    var title=req.body.title;
    var price=req.body.price;
    var image=req.body.image;
    var sql="insert into tbl_jewelry(code,title,price,image) values(?,?,?,?)";
    db.get().query(sql,[code,title,price,image],function(err, result){
        res.redirect('/');
    });
});

//정보읽어오기
router.get('/read',function(req,res){
    var code=req.query.code;
    var sql='select * from tbl_jewelry where code=?';
    db.get().query(sql,[code],function(err, rows){
        res.render('index',{title:"상품정보",pageName:'read.ejs',"vo":rows[0]});
    });
});

//수정
router.post('/update',function(req,res){
    var code=req.body.code;
    var title=req.body.title;
    var price=req.body.price;
    var image=req.body.image;
    var sql="update tbl_jewelry set title=?,price=?,image=? where code=?";
    db.get().query(sql,[title,price,image,code],function(err, result){
        res.redirect('/');
    });
});

//삭제
router.post('/delete',function(req,res){
    var code=req.body.code;
    var sql="delete from tbl_jewelry where code=?";
    db.get().query(sql,[code],function(err, result){
        res.redirect('/');
    });
});

module.exports = router;
