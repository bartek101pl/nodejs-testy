//@Copyright 2018 BŚ
const ver = "0.0.20.9";
var express = require('express');
var router = express.Router();
const request = require('request');
//let id = 1;
const mysql = require('mysql');
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
  //let userList = [];
router.start = function(io)
{
    io.on('connection', function(socket){
        //console.log('a user connected');
        socket.on("Im",(data)=>{
         // console.log(data);
          if(data.typ == "serwer")
          socket.join("serwer");
          else if(data.typ == "admin")
          socket.join("admin");
          else if(data.typ == "uczen")
          socket.join(("uczen"+data.klasaID));
          else if (data.typ == "egzamin")
          {
          socket.join(("egzamin"+data.egzaminID));
          socket.in("serwer").emit("egzaminConnect",{id:data.egzaminID,load:io.sockets.adapter.rooms["egzamin"+data.egzaminID].length});
          socket.in("admin").emit("zmianaEgzamin",{typ: "dane",k:"uczniowie",dane:io.sockets.adapter.rooms["egzamin"+data.egzaminID].length,id:data.egzaminID});
          socket.in("admin").emit("zmianaEgzamin",{typ: "dane",k:"Status",dane:"Połączono",id:data.egzaminID});
          }else if(data.typ == "wyniki")
          {
            socket.join("wyniki"+data.egzaminID);
          }

         // console.log(socket.id);
        });
        /*socket.emit("a","debil");
        socket.join("romm123");
        socket.in(socket.in()).emit("a","asdasdas");
        socket.on("send",(data)=>{
        socket.broadcast.emit("post",data);
        socket.emit("post",data);
        })*/
        socket.on("updateWyniki",(data)=>{
          //console.log(data);
          if(data.typ == "add")
          {
            socket.in("wyniki"+data.egzaminID).emit("event",{typ:"reload"});
          }
        });
        socket.on("egzaminEvent",(data)=>{
          if(data.typ == "dell" || data.typ == "add")
          {
          socket.in("admin").emit("zmianaEgzamin",{typ: "reload"});
          socket.in(("uczen"+data.klasaID)).emit("zmianaEgzamin",{typ: "reload"});
          socket.in("egzamin"+data.egzaminID).emit("egzaminEnd",{typ:"end"});
          //console.log(io.sockets.adapter.rooms["uczen"+data.klasaID].length); - ilośc połaczonych uczniów
          }else if(data.typ =="startEgzamin")
          {
            let room = "egzamin"+data.egzaminID.toString();
            let ll = null;
            try{
             ll = io.sockets.adapter.rooms[room].length;
            //console.log(ll)
            if(ll>0){
              socket.in(("serwer")).emit("egzaminStatus",{staus: "start",load: ll ,id : data.egzaminID});
             // console.log();
             socket.in("admin").emit("zmianaEgzamin",{typ: "dane",k:"Status",dane:"Test rozpoczęty",id:data.egzaminID});
             socket.emit("zmianaEgzamin",{typ: "dane",k:"Status",dane:"Test rozpoczęty",id:data.egzaminID});
             //console.log(io.sockets.adapter.rooms["admin"].length);
              socket.in("egzamin"+data.egzaminID).emit("egzaminEvent",{typ:"start"});
              
              }
            }catch(err)
            {

            }
              
            
          }else if(data.typ == "egzaminEnd")
          {
            socket.in(("serwer")).emit("egzaminEnd",{staus: "END",id : data.egzaminID});
            socket.in("admin").emit("zmianaEgzamin",{typ: "dane",k:"Status",dane:"Zakończono",id:data.egzaminID});
            socket.emit("zmianaEgzamin",{typ: "dane",k:"Status",dane:"Zakończono",id:data.egzaminID});
            socket.in("egzamin"+data.egzaminID).emit("egzaminEnd",{typ:"stop"});
          }else if(data.typ == "egzaminChange")
          {
            
          }
        });
        /*socket.on("egzamin",(data)=>{
          socket.broadcast.emit("egzaminS","update");
          socket.emit("egzaminS","update");
          })*/
        socket.on('disconnecting', function(){
          var self = this;
          var rooms = Object.keys(self.rooms);
          let tekst;
          //console.log(rooms);
          try{
          tekst = rooms[1].toString();
          }catch(err)
          {

          }
          //console.log(rooms[1]);
          let nazwa ="",idEgza ="";
          try{
          for(let a = 0;a< tekst.length;a++)
          {
            if(a<7)
              nazwa+=tekst[a];
            else
              idEgza+=tekst[a];
          }
          //console.log(nazwa);
          if(nazwa == "egzamin")
          {
              socket.in("admin").emit("zmianaEgzamin",{typ: "dane",k:"uczniowie",dane:io.sockets.adapter.rooms[rooms[1]].length-1,id:parseInt(idEgza)});
              if(io.sockets.adapter.rooms[rooms[1]].length-1 == 0)
              {
                socket.in("admin").emit("zmianaEgzamin",{typ: "dane",k:"Status",dane:"Oczekiwanie",id:parseInt(idEgza)});
              }
          }
        }catch(err)
        {

        }
        });
      });
}
function postData(link,data)
{
    //'http://localhost:3000/klasa/get/klasy/data'
    //json: {
     //   todo: 'Buy the milk'
    //}
    request.post(link, {
        data
        ,headers: { 'User-Agent': 'Desktop application','ver-agent':ver }
      }, (error, res, body) => {
        if (error) {
          console.error(error)
          return
        }
        console.log(`statusCode: ${res.statusCode}`)
        console.log(body[0].id)
      })
}
  module.exports = router;
  