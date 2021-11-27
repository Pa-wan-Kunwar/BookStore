
const db = require('../db/dbConnect');
const appError = require('../utils/appError')




module.exports.showBook= async (req,res,next)=>{
    const {bookName,publication,author} =req.body;
   
    if(bookName){
        if(publication){
           if(author)
               await db.query('SELECT * FROM Books WHERE bookName = ? AND publication = ? AND author = ?',
           [bookName,publication,author],(err,rows)=>{
                   if(err) return next( new appError(err.sqlMessage,502));
                   else res.json(rows);
               })
           else {
               await db.query('SELECT * FROM Books WHERE bookName = ? AND publication = ?',
               [bookName,publication],(err,rows)=>{
                   if(err) next( new appError(err.sqlMessage,502));
                   else res.json(rows);
               })
           }
        }
        else{
           await db.query('SELECT * FROM Books WHERE bookName = ? ',
           [bookName],(err,rows)=>{
               if(err) next( new appError(err.sqlMessage,502));
               else res.json(rows);
           })
        }
   
    }
    else if(publication){
        if(author){
           await db.query('SELECT * FROM Books WHERE publication = ? AND author = ?',
           [publication,author],(err,rows)=>{
               if(err) next( new appError(err.sqlMessage,502));
               else res.json(rows);
           })
        }
        else{
           await db.query('SELECT * FROM Books WHERE publication = ? ',
           [publication],(err,rows)=>{
               if(err) next( new appError(err.sqlMessage,502));
               else res.json(rows);
           })
        }
    }
    else if(author){
       await db.query('SELECT * FROM Books WHERE author = ?',
       [author],(err,rows)=>{
           if(err) next( new appError(err.sqlMessage,502));
           else res.json(rows);
       })
    }
    else{
        return next(new appError("Please apply at least one filter",400));
    }
   }