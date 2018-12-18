//@Copyright 2018 BŚ

var express = require('express');
var router = express.Router();
var session = require('express-session');
const http = require('http')
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
    charset: 'utf8',
      debug: false
  });
  con.connect(function(err){
      if(err) throw err;
  })
router.get("/uczen/add/uczen",(req,res)=>{
    res.render("uczen/addUczen.html");
})

  module.exports = router;