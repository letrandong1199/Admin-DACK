const express = require('express');
const pool=require('../models/data');
const router=express.Router();

module.exports=function(req, res){
    res.render('customer',{title:'Danh sách người dùng'});
  };