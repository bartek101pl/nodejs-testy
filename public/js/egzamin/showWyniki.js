window.onload = function(){
let egzaminID = parseURLParams(window.location.href).test[0];
let test;
 $.post("/egzamin/get/id",{id:egzaminID},(data)=>{
     test = data;
 }).then(()=>{$.post("/testy/pobieranie/bazadanych",{idT:test.test_id},(dane)=>{
    document.getElementById("temat").innerHTML = " "+dane[0].nazwa;
    document.getElementById("numer").innerHTML = " "+test.id;
 }).then(()=>{
$.post("/egzamin/wyniki/id",{egzaminId:egzaminID},(data)=>{
    console.log(data);
    let q = "";
    for(let a =0;a<data.odpowiedzi.length;a++)
    {
        q+="<tr><td>"+(a+1)+".</td><td>"+data.odpowiedzi[a].uczenO.imie+" "+data.odpowiedzi[a].uczenO.nazwisko+"</td>"
        q+="<td>"+data.odpowiedzi[a].data.punktyZ+"/"+data.odpowiedzi[a].data.punktyM+"</td><td>"+round_L((data.odpowiedzi[a].data.punktyZ/data.odpowiedzi[a].data.punktyM*100))+"%</td></tr>";
    }
    document.getElementById("wyniki").innerHTML = q;
})
});
});
let socket = io();
socket.emit("Im",{typ :"wyniki",egzaminID:egzaminID});

socket.on("event",(data)=>{
    console.log(data)
    if(data.typ == "reload")
    {
        $.post("/egzamin/wyniki/id",{egzaminId:egzaminID},(data)=>{
            console.log(data);
            let q = "";
            for(let a =0;a<data.odpowiedzi.length;a++)
            {
                q+="<tr><td>"+(a+1)+".</td><td>"+data.odpowiedzi[a].uczenO.imie+" "+data.odpowiedzi[a].uczenO.nazwisko+"</td>"
                q+="<td>"+data.odpowiedzi[a].data.punktyZ+"/"+data.odpowiedzi[a].data.punktyM+"</td><td>"+round_L((data.odpowiedzi[a].data.punktyZ/data.odpowiedzi[a].data.punktyM*100))+"%</td></tr>";
            }
            document.getElementById("wyniki").innerHTML = q;
        })  
    }
})

};

function round_L(a)
{
    let g = parseInt(a*100);
    return parseFloat(g/100);
}
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
function sleep (time) {
        //użycie : sleep(czas).then(() => {});
        return new Promise((resolve) => setTimeout(resolve, time));
}