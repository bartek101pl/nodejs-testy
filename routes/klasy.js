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
  router.get("/klasa/dodaj/klasa",(req,res)=>{
      res.render("klasy/addKlass");
  });
  router.get("/klasa",(req,res)=>{
      res.render("klasy/showKlass");
  })
  router.get("/klasa/widok/klasy",(req,res)=>{
    res.render("klasy/editKlass");
})
  router.post("/klasa/get/klasy",(req,res)=>{
let query = "SELECT * FROM `klasa`";
con.query(query,(err,data,focus)=>{
    res.json(data);
});
  });
  router.post("/klasa/get/klasy/data",(req,res)=>{
    let query = "SELECT * FROM `klasa`";
    let a = 0;
    if(req.body.name!="")
    {
        if(a==0)
        {
            query+=" WHERE `nazwa`='"+req.body.name+"'"
            a++;
        }else{
            query+=" AND `nazwa`='"+req.body.name+"'"
            a++;
        }
    }
    if((req.body.ileU!="")&&(req.body.ileU))
    {
        if(a==0)
        {
            query+=" WHERE `ile_Uczni`='"+req.body.ileU+"'"
            a++;
        }else{
            query+=" AND `ile_Uczni`='"+req.body.ileU+"'"
            a++;
        }
    }
    //console.error(query);
    con.query(query,(err,data,focus)=>{
        res.json(data);
    });
      });
  router.post("/klasa/add/klasa",(req,res)=>{
let query = "INSERT INTO `klasa`(`id`, `nazwa`, `ile_Uczni`, `ilosc_testo`, `data`) VALUES (null,'"+req.body.name+"','"+0+"','"+0+"','"+req.body.data+"')";
con.query(query,(err,data,focus)=>{
    if(err) throw err
    else{
        res.json({status: "true"});
    }
})
  });
  router.post("/klasa/dell/klasa",(req,res)=>{
    let query = "DELETE FROM `klasa` WHERE `id`='"+req.body.id+"';";
    con.query(query,(err,data,focus)=>{
        if(err) throw err
        else{
            res.json({status: "true"});
        }
    })
      });
router.post("/klasa/szukaj/nazwa",(req,res)=>{
        let query = "SELECT * FROM `klasa` WHERE `nazwa` LIKE '%"+req.body.name+"%'";
       // console.log(query);
        con.query(query,(err,data,focus)=>{
            
                res.json(data);
            
        })
      });
      router.post("/klasa/szukaj/id",(req,res)=>{
        let query = "SELECT * FROM `klasa` WHERE `id`='"+req.body.id+"'";
        // console.log(query);
         con.query(query,(err,data,focus)=>{
             
                 res.json(data);
             
         })
      })
  module.exports = router;