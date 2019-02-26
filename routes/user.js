
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

router.get("/profil",(req,res)=>{
    res.render("user/index");
});

router.get("/profil/logowanie",(req,res)=>{
    res.render("user/logowanie");
});
router.get("/profil/testy/menu",(req,res)=>{
res.render("user/egzamin/widokA");
});
router.get("/profil/testy/wyniki",(req,res)=>{
    res.render("user/egzamin/wynikiAll");
    });

  module.exports = router;