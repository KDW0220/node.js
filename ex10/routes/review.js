var express = require('express');
var router = express.Router();

var db=require('../db');

/* 목록 */
router.get('/list', function(req, res, next) {
    var code=req.query.code;
    var sql="select *,date_format(date,'%Y-%m-%d : %T') fdate from tbl_review where code=?";
    db.get().query(sql,[code],function(err,rows){
        res.send(rows);
    });
});


//저장
router.post('/insert',function(req,res){
    var code=req.body.code;
    var uid=req.body.uid;
    var text=req.body.text;
    var sql="insert into tbl_review(code,uid,text) values(?,?,?)";
    db.get().query(sql,[code,uid,text],function(err, result){
        res.sendStatus(200);
    });
});

//DB에서 리뷰삭제
router.post('/delete', function(req, res){
    var id=req.body.id;
    var sql='delete from tbl_review where id=?';
    db.get().query(sql, [id], function(err, rows){
      res.sendStatus(200);
    });
  });

module.exports = router;
