var express = require('express');
const { listen } = require('express/lib/application');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '상품목록', pageName:"list.ejs"});
});

module.exports = router;
