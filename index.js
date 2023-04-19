//entry point of application
const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('./config/mongoose');
var bodyParser = require('body-parser');
const csv = require('csv-parser');
const fs = require('fs');
const port=8000;

//url parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//directory where csv files will be stored 
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(express.static('assets'));
app.use('/',require('./routes/index.js'));


app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));


app.listen(port,(err)=>{
    if(err){console.log(`eror in listening to ${port}`);}

    console.log(`app running on port ${port}`);
})
