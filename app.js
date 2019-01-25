//@Copyright 2018 BŚ
const ver = "0.0.20.9";
const express = require('express');
const session = require('express-session');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const egzaminIO = require("./routes/egzaminKontroler.js");
egzaminIO.start(io);
const ApliPerm = true; // uruchamianie opcji dostępu dla aplikacji desktop
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

var agent = function(req,res,next)
{
    //console.log(req.headers['user-agent']);
    
    if(("Desktop application" == req.headers['user-agent']))
    {if(!ApliPerm)
        {
        res.send("[{error:Odmowa dostępu}]")
        }else{
            if(req.headers['ver-agent'] == ver)
            {
                return next();
            }else{
                res.send("[{error:Błędna wersja}]")
            }
        }
    }else{
        return next();
    }
}
//sprawdza czy admin jest zalogowany
var isLogin = function(req,res,next)
{
    if((req.session.login)&&(req.session.login == true))
    {
        if((req.session.isAdmin)&&(req.session.isAdmin == true))
        return next();
        else
        res.redirect("/logowanie/admin");
    }else{
        res.redirect("/logowanie/admin");
    }
}
var isUser = function(req,res,next)
{
    if((req.session.login)&&(req.session.login == true))
    {
        if((req.session.isUser)&&(req.session.isUser == true))
        return next();
        else
        res.redirect("/logowanie/uczen");
    }else{
        res.redirect("/logowanie/uczen");
    }
}
var isPerm = function(req,res,next){
    //console.log(req.headers['user-agent']);
    if((req.session.login)&&(req.session.login == true))
    {
        if((req.session.isUser)&&(req.session.isUser == true))
        return next();
        else if((req.session.isAdmin)&&(req.session.isAdmin == true))
        return next(); 
        else
        res.json({status: "false"});
    }else if(("Desktop application" == req.headers['user-agent']))
    {
        if(!ApliPerm)
        {
            res.send("[{error:Odmowa dostępu}]")
        }else
        {
            if(req.headers['ver-agent'] == ver)
            {
                return next();
            }else{
                res.send("[{error:Błędna wersja}]")
            }
        }
    }
    else{
        res.json({status: "false"});
    }
};
//app.use sekcja dodawanie funkcji do serwera
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 9999009 } }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.post("/imPerm",(req,res)=>{
    res.send("Odmowa dostępu!")
});
//routes wczytywanie do zmiennych odpowiednich routes
const testy = require("./routes/testy");
const klasa = require("./routes/klasy");
const uczen = require("./routes/uczen");
const user = require("./routes/user");

//rendering i wczytywanie testów
app.get("/",function(req,res,next){
res.render('socketio');
});
//ładowanie strony admin
app.get("/admin",isLogin,function(req,res){
res.render("admin");
})
//przekierowanie do odpowiedniego routes
app.get("/profil*",user);
app.get("/testy*",isLogin,testy);
app.get("/klasa*",isLogin,klasa);
app.get("/uczen*",isLogin,uczen);
app.post("/testy*",isPerm ,testy);
app.post("/klasa*",isPerm ,klasa);
app.post("/uczen*",isPerm ,uczen);
app.post("/profil*",user);
app.get("/logowanie/admin",function(req,res){
    res.render("logowanie.html");
});
app.post("/logowanie/admin",function(req,res){
let query = "SELECT * FROM `admin` WHERE `login`='"+req.body.login+"' AND `haslo`='"+req.body.pass+"';";
con.query(query,(err,data)=>{
if(data.length>0)
{
    req.session.isUser = false;
    req.session.isAdmin = true;
    req.session.login = true;
    res.redirect("/admin");
}else
{
    res.redirect("/logowanie/admin");
}
});
});
app.get("/wyloguj/admin",(req,res)=>{
    req.session.isAdmin = false
    req.session.login = false
    res.redirect("/");
});
app.get("/wyloguj/uczen",(req,res)=>{
    req.session.isUser = false
    req.session.login = false
    res.redirect("/");
});
//socket.io

  //end socket.io

  //uruchomienie serwera
  http.listen(app.get('port'),function(){
    console.log('Serwer Express nasłuchuje na porcie : http:192.168.0.100:'+app.get('port'));
});

app.get("/img",(req,res)=>{
let data = parseURLParams(req.url);
res.sendfile("public/img/"+data.id[0]);
});

//odpowiedzialne za wyświetlenie wersji oprogramowania
app.get("/version",function(req,res){
    res.send("<center><font size='30px'>V: <div id='ver'>"+ver+"</div></font></center>");
    
})
//odpowiedzialne za wyświetlenie wersji oprogramowania
app.get("/wersja",agent,function(req,res){
    res.send("<center><font size='30px'>V: <div id='ver'>"+ver+"</div></font></center>");
    
})
app.post("/verSys",agent,(req,res)=>{
res.send(ver);
});
//w razie błędu należy wywietlić tą stronę
app.get("/error",function(req,res){
    res.render("error");
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
