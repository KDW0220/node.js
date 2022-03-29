var express = require('express');
var router = express.Router();

var db=require('../db');

//로그인
router.get('/login', function(req, res, next) {
  res.render('index', { title: '로그인' ,pageName:'login.ejs',userid:req.session.userid});
});

router.post('/login',function(req,res){
  var result=0;
  var id=req.body.id;
  var pass=req.body.pass;
  var sql="select * from tbl_user where id=?";
  db.get().query(sql,[id],function(err, rows){
      if(rows.length==1){ //아이디 존재
        if(rows[0].pass==pass){
          result=1; //성공
          req.session.userid=id;
        }else{
          result=2; //실패
        }
      }
      res.send({result:result});
  });
});

router.get('/logout', function(req, res){
  req.session.destroy();
  res.clearCookie('userid');
  res.redirect('/');
});

module.exports = router;
