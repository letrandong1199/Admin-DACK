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

router.use('/', loginRouter);
router.use('/users', usersRouter);
router.use('/customer',customerRouter);
router.use('/change_info',changeRouter);
router.use('/shop',shopRouter);
router.use('/product',productRouter);
router.use('/bill',billRouter);
router.use('/chart',chartRouter);
router.use('/top',topRouter);
router.use('/index',indexRouter);
router.use('/edit',editRouter);
module.exports=router;