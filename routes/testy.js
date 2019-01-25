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
router.get("/testy/edycja/test",function(req,res,next){
    res.render("editTest")
})
router.get("/testy/edycja/pytanie",function(req,res,next){
    res.render("editPytanie")
})
router.get("/testy/tworzenie/pytanie",function(req,res,next){
    res.render("addPytanie");
})
router.get("/testy/widok",function(req,res){
    res.render("widokTestu");
})
router.post("/testy/addTest",function(req,res){
    //console.log(req.body);
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
            //console.log(result);
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
                //console.log(result);
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
        }else if((req.body.idPP)&&(req.body.idPP != ""))
        {
            qery = "SELECT * FROM `pytania` WHERE `id`='"+req.body.idPP+"'";
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
    router.post("/testy/pobieranie/bazadanych/szukaj",function(req,res){
        let a = 0;
        let query = "SELECT * FROM `testy` WHERE ";
        if((req.body.name)&&(req.body.name!=""))
        {if(a <=0)
            { a++;
            query+="`nazwa`='"+req.body.name+"'";
            }else{
                a++;
                query+=" AND `nazwa`='"+req.body.name+"'";
            }
        }
        if((req.body.ilosc)&&(req.body.ilosc!=""))
        {
            if(a <=0)
            {
                a++;
            query+="`iloscPytan`='"+req.body.ilosc+"'";
            }else{
                a++;
                query+=" AND `iloscPytan`='"+req.body.ilosc+"'";
            }
        }
        if((req.body.klasa)&&(req.body.klasa!=""))
        {if(a <=0)
            {
                a++;
            query+="`klasa`='"+req.body.klasa+"'";
            }else{
                a++;
                query+=" AND `klasa`='"+req.body.klasa+"'";
            }
        }
        if((req.body.data)&&((!req.body.data2)))
        {if(a <=0)
            {
                a++;
            query+="`data`='"+req.body.data+"'";
            }else{
                a++;
                query+=" AND `data`='"+req.body.data+"'";
            }
        } else if((req.body.data)&&((req.body.data2)))
        {
            if(a <=0)
            {
                a++;
            query+="`data`>='"+req.body.data+"'AND `data`<='"+req.body.data2+"'";
            }else{
                a++;
                query+=" AND `data`>='"+req.body.data+"' AND `data`<='"+req.body.data2+"'";
            }
        }
        console.log(query);
        con.query(query, function (err, result, fields) {
            if (err) throw err;
            {
                //console.log(result);
                res.json(result);
            }})
    });
    module.exports = router;