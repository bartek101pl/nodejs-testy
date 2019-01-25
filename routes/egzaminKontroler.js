var express = require('express');
var router = express.Router();
const request = require('request');
//let io = null;
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
 
router.start = function(io)
{
    io.on('connection', function(socket){
        console.log('a user connected');
        request.post('http://localhost:3000/klasa/get/klasy/data', {
  json: {
    todo: 'Buy the milk'
  }
  ,headers: { 'User-Agent': 'Desktop application','ver-agent':"0.0.20.9" }
}, (error, res, body) => {
  if (error) {
    console.error(error)
    return
  }
  console.log(`statusCode: ${res.statusCode}`)
  console.log(body[0].id)
})
        socket.emit("a","debil");
        socket.join("romm123");
        socket.in(socket.in()).emit("a","asdasdas");
        socket.on("send",(data)=>{
        socket.broadcast.emit("post",data);
        socket.emit("post",data);
        })
        socket.on('disconnect', function(){
          console.log('user disconnected');
        });
      });
}

  module.exports = router;
  