
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
router.get("/profil/testy/uczen",(req,res)=>{
    res.render("user/egzamin/egzamin");
    });
router.post("/profil/logowanie",(req,res)=>{
    let query = "SELECT * FROM `uczniowie` WHERE `haslo`='"+req.body.pass+"' AND `login`='"+req.body.login+"';";
    con.query(query,(err,data,focus)=>{

        if(data.length > 0)
        {
            req.session.isAdmin = false;
            req.session.isUser = true;
            req.session.login = true;
            req.session.userID = data[0].id;
            req.session.klasaID = data[0].klasa_id;
            res.redirect("/profil");
        }else
        {
            res.redirect("/profil/logowanie");
        }

});
});
  module.exports = router;