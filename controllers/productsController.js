const express = require('express');
const pool=require('../models/data');
const router=express.Router();

module.exports.bill=function(req,res){
    res.render('bill',{tiltle:'Danh sách hóa đơn'})
};
module.exports.chart=function(req,res){
    res.render('chart',{title:'Biểu đồ'})
};
module.exports.getAddProduct=function(req,res){
    if(req.isAuthenticated()){
      res.render('add_product',{title:'Thêm sản phẩm'})
    }
    else
      res.redirect('/');
};
module.exports.postAddProduct = async function(req, res)
{
    try{
        if(req.isAuthenticated()){
            const name = req.body.name;
            const price = req.body.price;
            const type = req.body.type;
            const gender = req.body.gender;
            const brand = req.body.Brand;
            console.log(name);
            resul= pool.query('INSERT INTO index("Ten","Gia","Loai","Gioitinh","Brand", "Hinh") VALUES ($1, $2, $3,$4,$5, $6)',[name, price, type,gender,brand, "#"]);
            console.log(resul);
            res.redirect("/product");
        }
        else
            res.redirect('/');
    } catch{
        res.render("add_product",{
          title: "Thêm sản phẩm",
          error: "Thêm thất bại"
    })}
};


module.exports.showAllProduct=async function(req,res){
    const currentPage = Number(req.query.page) || 1;
    const offsetPage = (currentPage - 1) * 6;


    const allProducts= await pool.query('SELECT * FROM "index" ORDER BY "id"');
    const allProOffset = await pool.query('SELECT * FROM "index" ORDER BY "id" LIMIT 6 offset $1 ',[offsetPage]);
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
