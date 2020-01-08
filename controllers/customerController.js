const express = require('express');
const pool=require('../models/data');
const router=express.Router();

  module.exports.showAllUser=async function(req,res){
    if(req.isAuthenticated()){
    const currentPage = Number(req.query.page) || 1;
    const offsetPage = (currentPage - 1) * 6;


    const allUsers= await pool.query('SELECT * FROM "users"');
    const allUseOffset = await pool.query('SELECT * FROM "users" LIMIT 6 offset $1',[offsetPage]);
    console.log(allUseOffset);

    const limit = 6;
    const pageCount = Math.ceil(allUsers.rows.length / limit);
    const startIndex = allUseOffset.rows.length > 0 ? (currentPage - 1) * limit + 1 : 0;
    const endIndex = allUseOffset.rows.length > 0
      ? startIndex + allUseOffset.rows.length - 1
      : 0;
    const totalItems = allUsers.rows.length > 0 ? allUsers.rows.length : 0;
    let path = new URL(
      req.protocol + "://" + req.get("host") + req.originalUrl
    );
    path.searchParams.delete("page");
    path = path.toString();

    res.render('customer',{
        data:allUseOffset.rows,
        startIndex,
        endIndex,
        totalUsers: allUsers.rows.length,
        pageCount,
        currentPage,
        path
    });
  }
  else
  res.redirect('/');
};


module.exports.getEditCustomer= async function(req,res){
  if(req.isAuthenticated()){
    const result = await pool.query('SELECT * FROM "users" WHERE "id"=$1', [req.params.id]);
    console.log(result.rows[0]);
    res.render('change_info',{
      data:result.rows[0]
    });
  }
  else
    res.redirect('/');
  
};
module.exports.postEditCustomer = async function(req, res)
{
  try{
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
      const phonenumber = req.body.phonenumber;
      const email = req.body.email;
      const id=req.params.id;
      console.log(id);
      resul= pool.query('UPDATE users SET ("Ho","Ten","SDT","Email")=($1,$2,$3,$4) WHERE "id"=$5',[firstname, lastname, phonenumber,email,id]);
      console.log(resul);
      res.redirect("/customer")
  } catch{
      res.render("change_info:=id",{
        title: "Thay thông tin người dùng",
        error: "Chỉnh sửa thất bại"
  })}
};