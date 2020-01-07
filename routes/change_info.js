var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('change_info', { title: 'Chỉnh sửa thông tin' });
});

module.exports = router;