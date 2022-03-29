var express = require('express');
var router = express.Router();

var db=require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '스타일관리' ,pageName: 'style_list.ejs' });
});

/* 스타일목록 */
router.get('/list', function(req, res, next) {
  var sid=req.query.sid;
  var sql='select * from tbl_style order by sid';
  db.get().query(sql, [sid], function(err, rows){
    res.send(rows);
  });    
});

//스타일DB등록
router.post('/insert', function(req, res) {
  var name=req.body.name;
  var sql="insert into tbl_style(name) values(?)";
  db.get().query(sql,[name],function(err, result){
    res.redirect('/');
  });
});

/* 일정 캠프의 스타일목록 */
router.get('/camp', function(req, res) {
  var cid=req.query.cid;
  var sql='select * from view_style where cid=? order by cid';
  db.get().query(sql, [cid], function(err, rows){
    res.send(rows);
  });    
});

router.post('/camp/insert', function(req, res) {
  var cid=req.body.cid;
  var sid=req.body.sid;
  var sql="insert into tbl_camp_style(cid,sid) values(?,?)";
  db.get().query(sql,[cid,sid],function(err, result){
    res.sendStatus(200);
  });
});

//DB에 캠핑장별 스타일삭제
router.post('/camp/delete', function(req, res){
  var cid=req.body.cid;
  var sid=req.body.sid;
  var sql='delete from tbl_camp_style where cid=? and sid=?';
  db.get().query(sql,[cid,sid],function(err,rows){
    res.sendStatus(200);
  });
});

module.exports = router;
