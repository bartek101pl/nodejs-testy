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
  router.get("/testy",function(req,res,next){
      res.render("testy");
  })
router.get("/testy/tworzenie/test",function(req,res,next){
    res.render("tworzenieT")
})
router.get("/testy/tworzenie/pytanie",function(req,res,next){
    console.log("działa22");
})
router.get("/testy/widok",function(req,res){
    res.render("widokTestu",{name: "int"});
})
router.post("/testy/addTest",function(req,res){
    console.log(req.body);
    let query = "INSERT INTO `testy` (`id`, `nazwa`, `iloscPytan`, `klasa`, `data`) VALUES (NULL, '"+req.body.name+"', '"+req.body.ilosc+"', '"+req.body.klasa+"', '"+req.body.data+"');";
    con.query(query,function(err,res){});
     qery = "SELECT * FROM `testy`";
            con.query(qery, function (err, result, fields) {
                if (err) throw err;
                {
                    //console.log(result);
                    res.json(result);
                }
    
            });
    });
    router.post("/testy/showTable",function(req,res){
        qery = "SELECT * FROM `testy`";
        con.query(qery, function (err, result, fields) {
            if (err) throw err;
            {
                console.log(result);
                res.json(result);
            }
    
        });
    });
    router.post("/testy/zarzadzanie/bazadanych",function(req,res){
    var Today = new Date();
    var Month = Today.getMonth();
    var Day = Today.getDate();
    var Year = Today.getFullYear();
    let send = "";
    if(Today.getHours()<10)
    send+="0"+Today.getHours();
    else
    send+=Today.getHours();
    send+=":";
    if(Today.getMinutes()<10)
    send+="0"+Today.getMinutes();
    else
    send+=Today.getMinutes();
    send+="|"+Day+"."+Month+"."+Year;
        con.query(req.body.query,function(err,result,call)
        {
            if(err) throw err;
            else
            {
                res.json({status:"true" , data: send});
            }
        })
    });
    router.post("/testy/pobieranie/bazadanych",function(req,res){
        //console.log(req.body.idT);
        if((req.body.idT)&&(req.body.idT != "")){
            qery = "SELECT * FROM `testy` WHERE `id`='"+req.body.idT+"'";
        con.query(qery, function (err, result, fields) {
            if (err) throw err;
            {
                console.log(result);
                res.json(result);
            }
    
        });
        }else if((req.body.idPT)&&(req.body.idPT != ""))
        {
            
            qery = "SELECT * FROM `pytania` WHERE `idtestu`='"+req.body.idPT+"'";
            //console.log(qery);
        con.query(qery, function (err, result, fields) {
            if (err) throw err;
            {
                //console.log(result);
                res.json(result);
            }
    
        });
        }
        
        
    });
  module.exports = router;