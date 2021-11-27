const express = require('express');
const db = require('../db/dbConnect');
const appError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync');
const {showBook} = require("../controllers/showBook");

const router = express.Router();


router.get('/showAllBooks',catchAsync(async (req,res,next)=>{

    await db.query("SELECT * FROM Books",(err,rows)=>{
        if(err){
            // console.log(err);
            throw new appError("Unable to get data",502);
        }
        else{
            res.json(rows);
        }
    });

}));

router.get('/showAvailableBooks',catchAsync(async (req,res,next)=>{
 await db.query("SELECT * FROM Books WHERE quantity>0",(err,rows)=>{
     if(err) throw new appError("unable to get data",502);
     else res.json(rows);
 });
}));

router.get('/filterBooks', catchAsync(showBook));

module.exports = router;