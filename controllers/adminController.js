const express = require('express');
const pool=require('../models/data');
const router=express.Router();
/*GET home page. */
module.exports=function(req, res){
    res.render('login',{title:'Đăng nhập'});
  };
  // app.post('/login', 
  // passport.authenticate('local', { failureRedirect: '/login' }),
  // function(req, res) {
  //   res.redirect('/');
  // })