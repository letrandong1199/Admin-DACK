var express = require('express');
var router = express.Router();
const editController=require('../controllers/editController')
/* GET home page. */
router.get('/edit=:id',editController.getDetailProduct);

module.exports = router;