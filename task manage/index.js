const express = require('express');
const app = express();
const body_parser = require('body-parser');
const route = require('./routes/route');
const mongoose = require('./dataBase/database');
const cookie_parser = require('cookie-parser')

app.set('view engine' , 'ejs');

app.use(body_parser.urlencoded({extended : false}));
app.use(express.static(__dirname + '/assets'));
app.use(cookie_parser());
app.use('/', route);

mongoose
app.listen(3005, ()=>{
    console.log("server connected port 3005");
})     