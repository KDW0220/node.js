var express = require('express');
var router = express.Router();
var db=require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '시설물관리' ,pageName: 'facility_list.ejs' });
});

/* 시설물목록 */
router.get('/list', function(req, res, next) {
  var fid=req.query.fid;
  var sql='select * from tbl_facility order by fid';
  db.get().query(sql, [fid], function(err, rows){
    res.send(rows);
  });    
});

/* 특정 캠프의 시설물목록 */
router.get('/camp', function(req, res) {
  var cid=req.query.cid;
  var sql='select * from view_facility where cid=? order by cid';
  db.get().query(sql, [cid], function(err, rows){
    res.send(rows);
  });    
});

//DB에 캠핑장별 시설물등록
router.post('/camp/insert', function(req, res){
  var cid=req.body.cid;
  var fid=req.body.fid;
  var sql='insert into tbl_camp_facility(cid,fid) values(?,?)';
  db.get().query(sql,[cid,fid],function(err,rows){
    res.sendStatus(200);
  });
});

//DB에 캠핑장별 시설물삭제
router.post('/camp/delete', function(req, res){
  var cid=req.body.cid;
  var sid=req.body.fid;
  var sql='delete from tbl_camp_facility where cid=? and fid=?';
  db.get().query(sql,[cid,sid],function(err,rows){
    res.sendStatus(200);
  });
});


module.exports = router;
