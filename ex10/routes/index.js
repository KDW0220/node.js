var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '한빛미디어' ,pageName:"list.ejs",userid:req.session.userid});
});

module.exports = router;
