var express = require('express');
var router = express.Router();

var db=require('../db');

//address 목록 json 데이터출력
router.get('/', function(req, res, next) {
    var sql='select * from tbl_address order by id desc';
    db.get().query(sql,function(err,rows){
        res.send(rows);
    });
});

//주소등록
router.get('/insert',function(req,res){
    res.render('index',{title:"주소등록",pageName:'address_insert.ejs'})//뷰 화면 출력
});

//주소db저장
router.post('/insert',function(req,res){
    var name=req.body.name;
    var tel=req.body.tel;
    var address=req.body.address;
    var sql="insert into tbl_address(name,tel,address) values(?,?,?)";
    db.get().query(sql,[name,tel,address],function(err, result){
        res.redirect('/');
    });
    console.log(`${name}-${tel}-${address}`)
});

//특정아이디 주소 읽기
router.get("/read",function(req,res){
    var id=req.query.id;
    var sql="select * from tbl_address where id=?"
    db.get().query(sql,[id],function(err,rows){
        console.log(rows[0]);
        res.render('index',{title:"주소등록",pageName:'address_read.ejs', "vo":rows[0]})
    });
});

//특정아이디 수정하기
router.post('/update',function(req,res){
    var id=req.body.id; 
    var name=req.body.name;
    var tel=req.body.tel;
    var address=req.body.address;
    console.log(`${id}-${name}-${tel}-${address}`);
    var sql="update tbl_address set name=?,tel=?,address=? where id=?";
    db.get().query(sql,[name,tel,address,id],function(err, result){
        res.redirect('/');      
    });
});

//특정아이디를 DB에서 삭제
router.post('/delete',function(req,res){
    var id=req.body.id; 
    var sql="delete from tbl_address where id=?";
    console.log(`${id}`);
    db.get().query(sql,[id],function(err, result){
        res.redirect('/');      
    });
});




module.exports = router;
