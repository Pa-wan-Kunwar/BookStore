require('dotenv').config();

const express = require('express');
const db = require('./db/dbConnect');
const appError = require("./utils/appError");

const app=express();

app.use(express.urlencoded({ extended: true }));

db.connect((err) => {
  if (err) throw err;
  console.log(' database Connected!');
});


app.use("/",require('./routes/addBook'));
app.use('/',require('./routes/showBooks'));
app.use('/',require('./routes/sellBook'));
app.use('/',require('./routes/deleteBook'));



app.all('*', (req, res, next) => {
  next(new appError('Page Not Found', 404));
})


app.use((err,req,res,next)=>{
  const {message = "something went wrong", status=500} = err;
  res.status(status).json({message});
})

app.listen(3000,(req,res)=>{
    console.log("Server is up and running");
})