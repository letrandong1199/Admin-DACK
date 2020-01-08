const express = require('express');
const pool=require('../models/data');
const router=express.Router();
module.exports.getEditProduct= async function(req,res){
    if(req.isAuthenticated()){
        const result = await pool.query('SELECT * FROM "index" as idx left join "detail" as dt ON idx.id = dt.id WHERE idx.id=$1', [req.params.id]);
        console.log(result.rows[0].id);
        res.render('edit',{
            data:result.rows[0],
            id : req.params.id
        });
    }
    else
        res.redirect('/');
};
module.exports.postEditProduct = async function(req, res)
{
    try{
        const name = req.body.name;
        const price = req.body.price;
        const type = req.body.type;
        const gender = req.body.gender;
        const brand = req.body.brand;
        const id=req.params.id;
        console.log(id);
        resul= pool.query('UPDATE index SET ("Ten","Gia","Loai","Gioitinh","Brand")=($1,$2,$3,$4,$5) WHERE "id"=$6',[name, price, type,gender,brand,id]);
        console.log(resul);
        res.redirect("/product")
    } catch{
        res.render("edit:=id",{
          title: "Chỉnh sửa sản phẩm",
          error: "Chỉnh sửa thất bại"
    })}
};