const express = require('express');
const pool=require('../models/data');
const router=express.Router();

module.exports=function(req, res){
    res.render('customer',{title:'Danh sách người dùng'});
  };

  module.exports.showAllUser=async function(req,res){
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