const express = require('express');
const pool=require('../models/data');
const router=express.Router();

module.exports.bill=function(req,res){
    res.render('bill',{tiltle:'Danh sách hóa đơn'})
};
module.exports.chart=function(req,res){
    res.render('chart',{title:'Biểu đồ'})
};


module.exports.showAllProduct=async function(req,res){
    const currentPage = Number(req.query.page) || 1;
    const offsetPage = (currentPage - 1) * 6;


    const allProducts= await pool.query('SELECT * FROM "index"');
    const allProOffset = await pool.query('SELECT * FROM "index" LIMIT 6 offset $1',[offsetPage]);
    console.log(allProOffset);

    const limit = 6;
    const pageCount = Math.ceil(allProducts.rows.length / limit);
    const startIndex = allProOffset.rows.length > 0 ? (currentPage - 1) * limit + 1 : 0;
    const endIndex = allProOffset.rows.length > 0
      ? startIndex + allProOffset.rows.length - 1
      : 0;
    const totalItems = allProducts.rows.length > 0 ? allProducts.rows.length : 0;
    let path = new URL(
      req.protocol + "://" + req.get("host") + req.originalUrl
    );
    path.searchParams.delete("page");
    path = path.toString();

    res.render('product',{
        data:allProOffset.rows,
        startIndex,
        endIndex,
        totalItems: allProducts.rows.length,
        pageCount,
        currentPage,
        path
    });
}