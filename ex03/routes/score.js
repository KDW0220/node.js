var express = require('express');
var router = express.Router();

var db=require('../db');

//특정학생의 성적목록
router.get('/list', function(req, res){
    var id=req.query.id;
    var sql='select id,date_format(sdate, "%Y-%m-%d") fdate,kor,eng,mat,(kor+eng+mat) tot,format((kor+eng+mat)/3,2) avg from tbl_score where id=? order by sdate desc'
    db.get().query(sql, [id], function(err, rows){
        res.send(rows);
    });
});

//성적 수정
router.post('/update', function(req, res){
    var id=req.body.id;
    var sdate=req.body.sdate;
    var kor=parseInt(req.body.kor);
    var eng=parseInt(req.body.eng);
    var mat=parseInt(req.body.mat);
    console.log(`${id}\n${sdate}\n${kor}\n${eng}\n${mat}`);
    var sql='update tbl_score set kor=?,eng=?,mat=? where id=? and sdate=?';
    console.log(sql);
    db.get().query(sql, [kor,eng,mat,id,sdate], function(err, result){
      res.sendStatus(200);
    });
  });

module.exports = router;
