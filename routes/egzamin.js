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
    let data = JSON.parse(req.body.data);
        
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
        saveAnser(data);
        break;
    }
    }
});
async function saveAnser(data)
{
    //console.log(data);
    for(let a = 0;a<testy_list.length;a++)
    {
        if(testy_list[a].id ==  data.egzaminID && testy_list[a].savW == "true")
        {   
            let q ="INSERT INTO `pytania_wyniki`(`id`, `id_wyniki_egzamin`, `id_ucznia`, `zdobyte`, `max`, `odpowiedzi`) VALUES ";
            q+="(null,"+testy_list[a].mysql_ID+","+data.uczenID+","+data.punktyZ+","+data.punktyM+",'"+JSON.stringify(data)+"')";
            con.query(q,(err,result,fields)=>{
                if(!err)
                {
                    con.query("UPDATE `test_wynik` SET `s_wynik`=`s_wynik`+"+data.punktyZ+",`ile`=`ile`+1 WHERE `id`="+testy_list[a].mysql_ID,(err,result,fields)=>{});
                }
            });
            break;
        }else
        continue;
    }
    return;
}
router.post("/egzamin/set",(req,res)=>{
if((req.body.test_id !=null)&&(req.body.klasa_id!=null)&&(req.body.ilosc_pytan!=null)&&(req.body.savW!=null)&&(req.body.goscT!=null)&&(req.body.synch!=null)&&(req.body.time))
{
    try{
        let g;
 g = testy_list.push(new bodyKlass(id,req.body.test_id,parseInt(req.body.klasa_id),req.body.ilosc_pytan,req.body.savW,req.body.goscT,req.body.synch,req.body.time,"Oczekiwanie"));
 wynikiegzamin.push({id: id,odpowiedzi:[]})
 if(testy_list[g-1].savW == "true")
 {
        var Today = new Date();
        let Month = Today.getMonth()+1;
        let Day = Today.getDate();
        let Year = Today.getFullYear();
        let data = Year+"-";
        if(Month<10)
        data+="0"+Month+"-";
        else
        data+=Month+"-";
        
        if(Day<10)
        data+="0"+Day;
        else
        data+="0"+Day;
        let query="INSERT INTO `test_wynik`(`id`, `id_testu`, `id_klasy`, `data`, `s_wynik`, `ile`) VALUES (null,"+testy_list[g-1].test_id+","+testy_list[g-1].klasa_id+",'"+data+"',0,0)";
        con.query(query,(err,result)=>{
            if(!err)
            {
            //console.log(result.insertId);
            testy_list[g-1].mysql_ID = result.insertId;
            }
        });
    }
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
router.post("/egzamin/wyniki/save/all",(req,res)=>{
    let query = "SELECT `test_wynik`.`id`, `test_wynik`.`id_testu`,`pytania_wyniki`.`zdobyte`,`pytania_wyniki`.`max` ";
    query+=",`test_wynik`.`id_klasy`, `test_wynik`.`data`, `test_wynik`.`s_wynik`, `pytania_wyniki`.`id` as id_odpowiedzi, `test_wynik`.`ile` ,`testy`.`nazwa` FROM `test_wynik` ,`testy`,`pytania_wyniki`";
    query+="WHERE `test_wynik`.`id_testu` = `testy`.`id` AND `pytania_wyniki`.`id_wyniki_egzamin` = `test_wynik`.`id` ";
if(req.session.isAdmin)
{
if(req.body.id !="" && req.body.id != null)
query+=" AND `test_wynik`.`id`="+req.body.id;

if(req.body.klasa_id !="" && req.body.klasa_id != null)
query+=" AND `test_wynik`.`id_klasy`="+req.body.klasa_id;

con.query(query,(err,data,focus)=>{
    if(!err)
    res.json(data);
    else
    res.json({status:"false"});
});

}else if(req.session.isUser)
{
query+="AND `test_wynik`.`id_klasy`="+req.session.klasaID + " AND `pytania_wyniki`.`id_ucznia`="+req.session.userID;
//res.json({query : query});
con.query(query,(err,data,focus)=>{
    if(!err)
    res.json(data);
    else
    res.json({status:"false"});
})
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