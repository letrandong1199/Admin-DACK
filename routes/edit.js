var express = require('express');
var router = express.Router();
const editController=require('../controllers/editController')
/* GET home page. */
router.get('/edit=:id',editController.getEditProduct);

router.post('/edit=:id',editController.postEditProduct);

module.exports = router;