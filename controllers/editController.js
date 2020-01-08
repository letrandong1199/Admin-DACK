const express = require('express');
const pool=require('../models/data');
const router=express.Router();
module.exports.getDetailProduct= async function(req,res){
    const result = await pool.query('SELECT * FROM "index" as idx left join "detail" as dt ON idx.id = dt.id WHERE idx.id=$1', [req.params.id]);
    console.log(result.rows[0].Ten);
    res.render('edit',{
        data:result.rows[0]
    });
};