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

router.get("/uczen/widok/ucznia",(req,res)=>{
    res.render("uczen/widokUcznia.html");
});

router.post("/uczen/isName",(req,res)=>{

    let query = "SELECT COUNT(id) as ilosc FROM `uczniowie` WHERE `imie`='"+req.body.name+"' AND `nazwisko`='"+req.body.sname+"'";
    con.query(query,(err,data,focus)=>{
        res.json(data);
    })
});
router.post("/uczen/add/uczen",(req,res)=>{
let query = "INSERT INTO `uczniowie`(`id`, `imie`, `nazwisko`, `klasa_id`, `haslo`, `login`) VALUES (null,'"+req.body.imie+"','"+req.body.nazwisko+"',"+req.body.KlasID+",'"+req.body.login+"','"+req.body.pass+"')"
con.query(query,(err,data,focus)=>{
    if(err)
    res.json({status: "false"})
    else
    {
        con.query("UPDATE `klasa` SET `ile_Uczni`=`ile_Uczni`+1 WHERE id = "+req.body.KlasID,(err,data,focus)=>{
            if(err)
            {
                res.json({status: "false"})
            }else
            {
                res.json({status: "true"})
            }
        });
    }
   
})
});

router.post("/uczen/dell/uczen",(req,res)=>{
let query = "DELETE FROM `uczniowie` WHERE `id`="+req.body.id;
con.query(query,(err,data,focus)=>{
    if(err)
    res.json({status: "false"})
    else
    {
        con.query("UPDATE `klasa` SET `ile_Uczni`=`ile_Uczni`-1 WHERE id = "+req.body.KlasID,(err,data,focus)=>{
            if(err)
            {
                res.json({status: "false"})
            }else
            {
                res.json({status: "true"})
            }
        });
    }
   
});
});

router.post("/uczen/reset/pass/login",(req,res)=>{
con.query("UPDATE `uczniowie` SET `haslo`=`nazwisko`,`login`=`imie` WHERE `id`="+req.body.id ,(err,data,focus)=>{
    if(err)
    {
        res.json({status: "false"})
    }else
    {
        res.json({status: "true"})
    }
});
});

router.post("/uczen/get/klasa/all",(req,res)=>{
    let query = "SELECT `id`,`imie`,`nazwisko`,`klasa_id` FROM `uczniowie`  WHERE `klasa_id`="+req.body.klasaID+" ORDER BY `nazwisko`,`imie`;";
    con.query(query,(err,data,focus)=>{
        res.json(data);
    });
})
router.post("/uczen/get/klasa",(req,res)=>{
    let query = "SELECT `id`,`imie`,`nazwisko`,`klasa_id` FROM `uczniowie` WHERE `id`="+req.body.id;
    con.query(query,(err,data,focus)=>{
        res.json(data);
    });
})

router.post("/uczen/logowanie",(req,res)=>{
    let query = "SELECT * FROM `uczniowie` WHERE `haslo`='"+req.body.pass+"' AND `login`='"+req.body.login+"'";
   // console.log(req.body);
   // console.log(query);
    con.query(query,(err,data,focus)=>{
        res.json(data);
    });
})

router.post("/uczen/zmiana/haslo",(req,res,next)=>{
    let query = "UPDATE `uczniowie` SET `haslo` = '"+req.body.newPass+"' WHERE `uczniowie`.`id`="+req.body.id+";";
    //console.log(query);
    con.query(query,(err,data,focus)=>{
            if(err)
        {
            res.json({status: "false"})
        }else
        {
            res.json({status: "true"})
        }
    })
});
router.post("/uczen/zmiana/loginu",(req,res,next)=>{
    let query = "UPDATE `uczniowie` SET `login` = '"+req.body.newLogin+"' WHERE `uczniowie`.`id`="+req.body.id+";";
    //console.log(query);
    con.query(query,(err,data,focus)=>{
            if(err)
        {
            res.json({status: "false"})
        }else
        {
            res.json({status: "true"})
        }
    })
});

router.post("/uczen/zmiana/klasy",(req,res,next)=>{
    let query = "UPDATE `uczniowie` SET `klasa_id` = '"+req.body.newKlas+"' WHERE `uczniowie`.`id`="+req.body.id+";";
    //console.log(query);
    con.query(query,(err,data,focus)=>{
            if(err)
        {
            res.json({status: "false"})
        }else
        {
            res.json({status: "true"})
        }
    })
});

router.post("/uczen/zmiana/nazwiska",(req,res,next)=>{
    let query = "UPDATE `uczniowie` SET `nazwisko` = '"+req.body.newSname+"' WHERE `uczniowie`.`id`="+req.body.id+";";
    //console.log(query);
    con.query(query,(err,data,focus)=>{
            if(err)
        {
            res.json({status: "false"})
        }else
        {
            res.json({status: "true"})
        }
    })
});

router.post("/uczen/zmiana/imienia",(req,res,next)=>{
    let query = "UPDATE `uczniowie` SET `imie` = '"+req.body.newName+"' WHERE `uczniowie`.`id`="+req.body.id+";";
    //console.log(query);
    con.query(query,(err,data,focus)=>{
            if(err)
        {
            res.json({status: "false"})
        }else
        {
            res.json({status: "true"})
        }
    })
});
  module.exports = router;