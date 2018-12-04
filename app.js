//@Copyright 2018 BŚ
const ver = "0.0.0.4";
const express = require('express');
const session = require('express-session');
const app = express();
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
  let connect = false; 
  connectToDDB();
  console.log(connect);
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
var isConnect = function(req, res, next)
{
if(connect == false)
{   
 res.redirect("/error");
}else{
    return next();
}
}

var isLogin = function(req,res,next)
{
    if((req.session.login)&&(req.session.login == true))
    {
        return next();
    }else{
        res.redirect("/logowanie");
    }
}
//app.use sekcja dodawanie funkcji to serwera
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 900000 } }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.get("/version",function(req,res){
    res.send("<center><font size='30px'>V: <div id='ver'>"+ver+"</div></font></center>");
    console.log(parseURLParams(req.url));
})
//routes wczytywanie do zmiennych odpowiednich routes
const testy = require("./routes/testy")
//rendering i wczytywanie testów
app.get("/",isConnect,function(req,res,next){
res.render('test');
});
app.get("/admin",isConnect,function(req,res){
res.render("admin");
})
app.all("/testy*",isConnect,testy);
//w razie błędu należy wywietlić tą stronę
app.get("/error",function(req,res){
    res.render("error");
});
//post metody dostępu do danych z bazy danych


http.createServer(app).listen(app.get('port'),function(){
    console.log('Serwer Express nasłuchuje na porcie : http:192.168.0.100:'+app.get('port'));
});
function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}