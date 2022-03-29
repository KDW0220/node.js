var express = require('express');
var router = express.Router();
var db=require('../db');

/* GET home page. */
router.get('/list', function(req, res, next) {
    var sql="select * from bbs order by id desc";
    db.get().query(sql,function(err,rows){
        res.send(rows);
    });
});

module.exports = router;
