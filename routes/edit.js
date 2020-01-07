var express = require('express');
var router = express.Router();
const editController=require('../controllers/editController')
/* GET home page. */
router.get('/',editController);

module.exports = router;