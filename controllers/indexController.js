const express = require('express');
const pool=require('../models/data');
const router=express.Router();
const passport = require('passport');
/*GET home page. */
module.exports=function(req, res){
   // console.log(res);
    if(req.isAuthenticated())
      res.render('index',{title:'Trang chủ'});
    else
      res.redirect('/');
  };