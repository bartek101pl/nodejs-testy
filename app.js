//@Copyright 2018 BŚ
const ver = "0.1.20.1";
const express = require('express');
const session = require('express-session');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
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
  let connect = false; 
  connectToDDB();
  //console.log(connect);
  //funkcje przydatne podczas połączen
function connectToDDB()
{
    con.connect(function (err) {
        if (err) {
            connect = false;
            console.error("Wystąpił błąd podczas łączenia się z bazą danych!");
           
        }else{
            connect = true;
        }
    });
    return;
}
//sprawdza czy admin jest zalogowany
var isLogin = function(req,res,next)
{
    if((req.session.login)&&(req.session.login == true))
    {
        return next();
    }else{
        res.redirect("/logowanie");
    }
}
//app.use sekcja dodawanie funkcji do serwera
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 900000 } }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


//routes wczytywanie do zmiennych odpowiednich routes
const testy = require("./routes/testy")
//rendering i wczytywanie testów
app.get("/",function(req,res,next){
res.render('socketio');
});
//ładowanie strony admin
app.get("/admin",function(req,res){
res.render("admin");
})
//przekierowanie do odpowiedniego routes
app.all("/testy*",testy);
//socket.io
io.on('connection', function(socket){
    console.log('a user connected');
    socket.emit("a","debil");
    socket.join("romm123");
    socket.in(socket.in()).emit("a","asdasdas");
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });
  //end socket.io

  //uruchomienie serwera
  http.listen(app.get('port'),function(){
    console.log('Serwer Express nasłuchuje na porcie : http:192.168.0.100:'+app.get('port'));
});

//odpowiedzialne za wyświetlenie wersji oprogramowania
app.get("/version",function(req,res){
    res.send("<center><font size='30px'>V: <div id='ver'>"+ver+"</div></font></center>");
    console.log(parseURLParams(req.url));
})
//odpowiedzialne za wyświetlenie wersji oprogramowania
app.get("/wersja",function(req,res){
    res.send("<center><font size='30px'>V: <div id='ver'>"+ver+"</div></font></center>");
    console.log(parseURLParams(req.url));
})
//w razie błędu należy wywietlić tą stronę
app.get("/error",function(req,res){
    res.render("error");
});