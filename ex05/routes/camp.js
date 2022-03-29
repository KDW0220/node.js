var express = require('express');
var router = express.Router();

var db=require('../db');

router.get('/list', function(req, res, next) {
  var sql='select * from tbl_camp order by cid desc';
  db.get().query(sql,function(err, rows){
    res.send(rows);
  });
});

//캠핑장등록
router.get('/insert',function(req,res){
    var sql="select max(cid)+1 mcid from tbl_camp"
    db.get().query(sql,function(err, rows){
        res.render('index',{title:"캠핑장등록",pageName:'camp_insert.ejs',"vo":rows[0]})
    });
});

//캠핑장DB등록
router.post('/insert', function(req, res) {
    var cid=req.body.cid;
    var name=req.body.name;
    var tel=req.body.tel;
    var address=req.body.address;
    var sql="insert into tbl_camp(cid,name,tel,address) values(?,?,?,?)";
    db.get().query(sql,[cid,name,tel,address],function(err, result){
      res.redirect('/');
    });
});

//캠핑장 정보
router.get('/read',function(req,res){
    var cid=req.query.cid;
    var sql="select * from tbl_camp where cid=?"
    db.get().query(sql,[cid],function(err, rows){
        res.render('index',{title:"캠핑장정보",pageName:'camp_read.ejs',"vo":rows[0]})
    });
});


//특정 캠핑장 수정
router.post('/update', function(req, res) {
    var cid=req.body.cid;
    var name=req.body.name;
    var tel=req.body.tel;
    var address=req.body.address;
    var sql="update tbl_camp set name=?,tel=?,address=? where cid=?";
    db.get().query(sql,[name,tel,address,cid],function(err, result){
      res.redirect('/');
    });
});

//특정캠핑장 삭제
router.post('/delete',function(req, res){
    var cid=req.body.cid;
    var sql="delete from tbl_camp where cid=?";
    db.get().query(sql,[cid],function(err, result){
      res.redirect('/');
    });
});

module.exports = router;
