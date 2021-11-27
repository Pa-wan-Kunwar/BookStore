const express = require('express');
const db = require('../db/dbConnect');
const appError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const {sellData} = require('../validateData');
const router = express.Router();

router.patch('/sellBook',catchAsync(async (req,res,next)=>{
    var {id,quantity=1} =req.body;
    const result = sellData.validate({id,quantity});
    console.log(result);
    
    await db.query("SELECT quantity FROM Books WHERE id= ?",result.value.id,(err,qt)=>{
        if(err) next( new appError(err.sqlMessage,502));
        
        else if(qt[0].quantity<result.value.quantity) next( new appError(`Insufficient quantity, ${qt[0].quantity} books left`,400));
        
        else{
            const leftQty = result.value.quantity - qt[0].quantity;
            db.query("UPDATE Books SET quantity = ? WHERE id = ?",[leftQty,result.value.id],(err,r)=>{
                if(err) next ( new appError("Unable To update quantity in database",502));
                else{
                    res.json({affectedRows:r.affectedRows,Message:`${quantity} Book(s) sold `});
                }
            });
        }
    })
    
}));




module.exports = router;