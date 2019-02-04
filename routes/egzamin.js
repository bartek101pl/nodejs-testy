//@Copyright 2018 BŚ
let bodyKlass = require("./class/test");
let bodypytania = require("./class/pytanieClass");
var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000', {reconnect: true});
let wynikiegzamin = [];
let id =1;
var testy_list = [];
socket.on('connect', function (socket) {
});
socket.emit("Im",{typ:"serwer"});
socket.on("egzaminStatus",(data)=>{
    let ii;
    for(let a = 0;a<testy_list.length;a++)
{
    if(testy_list[a].id ==  data.id)
    {   
        ii = testy_list[a].id;
        
        
        testy_list[a].status = "Test rozpoczęty";
        testy_list[a].load = data.load;
        //socket.emit("egzaminEvent",{status:"start",id:ii,typ:"startEgzamin"});
        
        break;
    }
}

});
socket.on("egzaminConnect",(data)=>{
    for(let a = 0;a<testy_list.length;a++)
{
    if(testy_list[a].id ==  data.id)
    {   
        ii = testy_list[a].id;
        
        
        testy_list[a].status = "Połączono";
        testy_list[a].load = data.load;
        //socket.emit("egzaminEvent",{status:"start",id:ii,typ:"startEgzamin"});
        
        break;
    }
}
});
socket.on("egzaminEnd",(data)=>{
    for(let a = 0;a<testy_list.length;a++)
    {
        if(testy_list[a].id ==  data.id)
        {   
            ii = testy_list[a].id;
            
            
            testy_list[a].status = "Zakończono";
            testy_list[a].load = data.load;
            //socket.emit("egzaminEvent",{status:"start",id:ii,typ:"startEgzamin"});
            
            break;
        }
    }
    });




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
  });

router.get("/egzamin",(req,res)=>{
res.render("egzamin/index");
});
router.get("/egzamin/wynik",(req,res)=>{
    res.render("egzamin/wyniki");
})
router.get("/egzamin/widok/wszystkie",(req,res)=>{
    res.render("egzamin/widokA");
});
router.post("/egzamin/save/egzamin",(req,res)=>{
    let data = req.body;
        
    for(let a =0;a<wynikiegzamin.length;a++)
    {
    if(wynikiegzamin[a].id == data.egzaminID)
    {   
        let query = "SELECT `id`,`imie`,`nazwisko`,`klasa_id` FROM `uczniowie` WHERE `id`="+data.uczenID;
        let uczen;
        con.query(query,(err,dataa,focus)=>{
            uczen = dataa[0];
            wynikiegzamin[a].odpowiedzi.push({uczenO:uczen,data:data});
            socket.emit("updateWyniki",{typ:"add",egzaminID:data.egzaminID})
        });
        
        break;
    }
    }
});
router.post("/egzamin/set",(req,res)=>{
if((req.body.test_id !=null)&&(req.body.klasa_id!=null)&&(req.body.ilosc_pytan!=null)&&(req.body.savW!=null)&&(req.body.goscT!=null)&&(req.body.synch!=null)&&(req.body.time))
{
    try{
        let g;
 g = testy_list.push(new bodyKlass(id,req.body.test_id,parseInt(req.body.klasa_id),req.body.ilosc_pytan,req.body.savW,req.body.goscT,req.body.synch,req.body.time,"Oczekiwanie"));
 wynikiegzamin.push({id: id,odpowiedzi:[]})
 id++;
con.query("SELECT * FROM `pytania` WHERE `idtestu`="+req.body.test_id+" ORDER BY rand() LIMIT "+req.body.ilosc_pytan+";", function (err, result, fields) {
    if (err) throw err;
    {
        //console.log(result);
        let lista = [];
        for(let a =0;a<result.length;a++)
        {
            lista.push(new bodypytania(result[a].id,a+1,result[a].tresc,result[a].odpA,result[a].odpB,result[a].odpC,result[a].odpD,result[a].imgSrc,result[a].poprawna,result[a].imgW,result[a].imgH))
        }
        testy_list[g-1].pytania = lista;
    }

});
//console.log(testy_list);
socket.emit("egzaminEvent",{klasaID:req.body.klasa_id,typ:"add"});
res.json({status: "true"});
    }catch(err)
    {
        res.json({status: "false"});
    }
}else{
    res.json({status: "false"});
}
});
router.post("/egzamin/get/all",(req,res)=>{
if(req.session.isAdmin)
res.json(testy_list);
else if(req.session.isUser)
{
    //console.log("id:"+req.session.userID+"| klasaid:"+req.session.klasaID)
    let current_Test = [];
    for(let a = 0;a<testy_list.length;a++)
    {
        //console.log(testy_list[a].klasa_id);
        if(testy_list[a].klasa_id === req.session.klasaID&&((testy_list[a].status == "Oczekiwanie")||(testy_list[a].status == "Połączono")))
        {
            current_Test.push(testy_list[a]);
        }
    }
    res.json(current_Test);
}
});
router.post("/egzamin/wyniki/id",(req,res)=>{
    if(req.session.isAdmin)
    {
        for(let a =0;a<wynikiegzamin.length;a++)
        {
            if(wynikiegzamin[a].id == req.body.egzaminId)
            {
                res.json(wynikiegzamin[a]);
                break;
            }
        }
        
    }
    
});
router.post("/egzamin/get/id",(req,res)=>{
let test = null;
for(let a = 0;a<testy_list.length;a++)
{
    if(testy_list[a].id ==  req.body.id)
    {   
        test = a;
        break;
    }else
    continue;
}
if(test != null)
res.json(testy_list[test]);
else
res.json({status: "false"});
});
router.post("/egzamin/dell",(req,res)=>{
//console.log(req.body.egza);
let klasa_id;
for(let a = 0;a<testy_list.length;a++)
{
    if(testy_list[a].id ==  req.body.egza)
    {   klasa_id = testy_list[a];
        testy_list.splice(a,1);
        break;
    }
}
for(let a = 0;a<wynikiegzamin.length;a++)
{
    if(wynikiegzamin[a].id ==  req.body.egza)
    {   
        wynikiegzamin.splice(a,1);
        socket.emit("egzaminEvent",{klasaID:klasa_id.klasa_id,typ:"dell",egzaminID:klasa_id.id});
        break;
    }
}
});

  module.exports = router;