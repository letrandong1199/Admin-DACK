var express = require('express');
var router = express.Router();
const productsController=require('../controllers/productsController');
router.get('/',productsController.getAddProduct);
router.post('/',productsController.postAddProduct); 
module.exports = router;