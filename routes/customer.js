var express = require('express');
var router = express.Router();
const customerController=require('../controllers/customerController')
/* GET home page. */
router.get('/',customerController.showAllUser);
module.exports = router;