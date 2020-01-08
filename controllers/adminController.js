const express = require('express');
const pool=require('../models/data');
var bcrypt = require('bcryptjs');
const passport = require('passport');
const router=express.Router();
/*GET home page. */
module.exports.getLogin = function(req, res, next) {
  if (req.isUnauthenticated()){
    res.render("login", {
      layout:'layout2',
      title: "Đăng nhập",
      headerTop: function() {
        if (req.isAuthenticated()) {
          return "headAuthen";
        } else {
          return "headUnAuthen";
        }
      },
      username: function(){
        if(req.isAuthenticated())
        {
          return req.user.username;
        }
      },
      error: req.flash("error")
    });
  }
  else res.redirect("/index");
}

  module.exports.postLogin = passport.authenticate("local.login", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true
  });

  module.exports.getRegister = function(req, res, next) {
    res.render('register',{layout:'layout2'})
  };
  module.exports.postRegister = async function(req, res)
{
    try{
        const id = await Date.now();
        const username = await req.body.username;
        const password = await req.body.password;
        const hashedPwd = await bcrypt.hashSync(password);
        await pool.query('INSERT INTO users(id, username, password) VALUES ($1, $2, $3)',[id, username, hashedPwd]);
        res.redirect("/index")
    } catch{
        res.render("register",{
          title: "Đăng nhập",
          headerTop: function() {
            if (req.isAuthenticated()) {
              return "headAuthen";
            } else {
              return "headUnAuthen";
            }
          },
          username: function(){
            if(req.isAuthenticated())
            {
              return req.user.username;
            }
          },
          error: "Tài khoản đã tồn tại!"
    })}
};
module.exports.getLogout = function (req, res){
  if(req.isAuthenticated())
     req.logout();
     res.redirect('/');
};