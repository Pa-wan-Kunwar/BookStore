const express =  require('express');
const router = express.Router();
const db = require('../db/dbConnect');
const {v4 : uuid} = require('uuid');
const appError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const {schemaValidate}= require('../validateData')
router.post("/addBooks",catchAsync(async (req,res,next)=>{
    const data = {  id : uuid(),
                    bookName: req.body.bookName, 
                   publication: req.body.publication, 
                   author: req.body.author, 
                   price: req.body.price, 
                   quantity: req.body.quantity}

     const result = schemaValidate.validate(data)
     
    if(result.error)
        return next( new appError(result.error.details[0].message,400));
    

   await db.query("INSERT INTO Books SET ?",result.value,(err,data)=>{
       if(err) next(new appError(err.sqlMessage,502));
      if(!err){
          res.json({affectedRow:data.affectedRows, messege: "Successfully added to database"});
      }
    });
     
  }));




module.exports = router;