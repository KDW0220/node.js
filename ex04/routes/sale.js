var express = require('express');
var router = express.Router();

var db=require('../db');

/* 상품판매목록 */
router.get('/list', function(req, res, next) {
  var code=req.query.code;
  var sql ='select *, format(price*quantity,0) sum,';
      sql+='date_format(sdate, "%Y-%m-%d") fdate ';
      sql+='from tbl_sale ';
      sql+='where code=? ';
      sql+='order by id desc'
  db.get().query(sql, [code], function(err, rows){
    res.send(rows);
  });    
});

//db저장
router.post('/insert',function(req,res){
  var code=req.body.code;
  var sdate=req.body.sdate;
  var price=req.body.price;
  var quantity=req.body.quantity;
  var sql="insert into tbl_sale(code,sdate,price,quantity) values(?,?,?,?)";
  db.get().query(sql,[code,sdate,price,quantity],function(err, result){
      res.redirect('/');
  });
});

router.post('/update',function(req,res){
  var id=req.body.id; 
  var sdate=req.body.sdate;
  var price=req.body.price;
  var quantity=req.body.quantity;
  var sql="update tbl_sale set sdate=?,price=?,quantity=? where id=?";
  db.get().query(sql,[sdate,price,quantity,id],function(err, result){
      res.redirect('/');      
  });
});

router.post('/delete',function(req,res){
  var id=req.body.id; 
  var sql="delete from tbl_sale where id=?";
  db.get().query(sql,[id],function(err, result){
      res.redirect('/');      
  });
});

module.exports = router;
