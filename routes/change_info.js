var express = require('express');
var router = express.Router();
const customerController=require('../controllers/customerController')

router.get('/change_info=:id',customerController.getEditCustomer);

router.post('/change_info=:id',customerController.postEditCustomer);

module.exports = router;