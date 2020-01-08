const express=require('express');
const router=express.Router();


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const customerRouter=require('./routes/customer');
const shopRouter=require('./routes/shop');
const changeRouter=require('./routes/change_info');
const productRouter=require('./routes/product');
const billRouter=require('./routes/bill');
const chartRouter=require('./routes/chart');
const topRouter=require('./routes/top');
const loginRouter=require('./routes/login');
const editRouter=require('./routes/edit');
const registerRouter=require('./routes/register');
const addRouter=require('./routes/add_product');


router.use('/add_product',addRouter);
router.use('/index', indexRouter);
router.use('/users', usersRouter);
router.use('/customer',customerRouter);
router.use('/',changeRouter);
router.use('/shop',shopRouter);
router.use('/product',productRouter);
router.use('/bill',billRouter);
router.use('/chart',chartRouter);
router.use('/top',topRouter);
router.use('/',loginRouter);
router.use('/register',registerRouter);
router.use('/',editRouter);
module.exports=router;