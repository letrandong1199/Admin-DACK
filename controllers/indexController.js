const express = require('express');
const pool=require('../models/data');
const router=express.Router();
/*GET home page. */
module.exports=function(req, res){
    console.log(res);
    res.render('index',{title:'Trang chủ'});
  };