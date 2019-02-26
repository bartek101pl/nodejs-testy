    //@Copyright 2018 BŚ
    window.onload=function(){
        let wynik = 0;
        let p = parseURLParams(window.location.href);
        let egzaminID;

        try{
        egzaminID = p.test[0];
        }catch
        {
            window.location.href="/profil/testy/menu";
        }
        const socket = io();
        let aktualne = 0;
        let uczenID;
        let test;
        let pytania 
        let lastil = null;
        let li;
        socket.emit("Im",{typ:"egzamin",egzaminID: egzaminID});
        socket.on("egzaminEnd",(data)=>{
            if(data.typ == "stop")
            {
            endTest();
            alert("Test zakończony przez administratora");
            }else if(data.typ == "end")
            {
            alert("Test został usunięty!");
            window.location.href = "/profil/testy/menu";
            }
        })
        $.ajax({
            type: "POST",
            url: "/get/my/uczen/id",
            async: false,
            data: {},
            success: function(data) { if(data.klasaID != null) uczenID = data.klasaID }
         });
         $.post("/egzamin/get/id",{id: egzaminID},(data)=>{
             //console.log(data)
            if(data.status != "false")
            {
           // console.log(test.pytania);
            document.getElementById("lista_P").innerHTML = "";
            for(let a = 0;a<data.pytania.length;a++)
            {
                document.getElementById("lista_P").innerHTML += "<li class='boxssC'>"+(a+1)+"</li>"; 
                
            }
            $.ajax({
                type: "POST",
                url: "/testy/pobieranie/bazadanych",
                async: false,
                data: {idT:data.test_id},
                success: function(dane) { document.getElementById("temat").innerHTML = " "+dane[0].nazwa; test= data;}
             });
             
             
             for(var i = data.pytania.length - 1; i > 0; --i) {
                data.pytania = swap(data.pytania, i, ( Math.random() * (i + 1) ) | 0);
            } 
            // console.log(data.pytania);
             for(let a =0;a<data.pytania.length;a++)
             {
                 document.getElementById("pytania_box").innerHTML += cPytanie(data.pytania[a],a+1,data.pytania.length)
             }
            }
            else
            {
                alert("Nie ma takiego testu");
                window.location.href = "/profil/testy/menu";
            }

         }).then(()=>{
            pytania = document.getElementsByClassName("pytanieBody");
            for(let a = 0;a<pytania.length;a++)
            {
                let input = pytania[a].getElementsByTagName("input");
    //console.log(pytania[a].getAttribute("name"));
                for(let b = 0;b<input.length;b++)
                {
                input[b].setAttribute("disabled","");
                }
            }
            $("#to_end").on("click",()=>{endTest()});
            $("#to_next").on("click",()=>{
                if(aktualne+1 < test.pytania.length)
                show(aktualne+1)
                chli(aktualne)
            });
            $("#to_back").on("click",()=>{
                if(aktualne-1>=0)
                show(aktualne-1);
                chli(aktualne)
            });
            pytania.item(aktualne).classList.remove("disable");
            //console.log(pytania.length);
             li = document.getElementById("lista_P");
            lastil = li.getElementsByTagName("li").item(0);
            lastil.classList.toggle("active");
           
            li.addEventListener("click", function(event){
                if(event.target != li)
                {   if(lastil!=null)
                    lastil.classList.remove("active");
                    //console.log(event.target);
                    event.target.classList.toggle("active");
                    lastil = event.target;
                    show(ktore(lastil));
                }
            });
            $(".odp").on("click",function(){
                if ($(this).prop("checked")) {
                    

                    lastil.classList.add("correct");
                }
            })
            document.getElementById('to_check').addEventListener("click",function(){
                if(lastil.hasAttribute("style"))
                {
                    lastil.removeAttribute("style")
                }else{
                    lastil.setAttribute("style","background-color: rgb(228, 158, 7);")
                }
            });
            if(test.synch == "true")
             {
                document.getElementById("status").innerText = "Oczekiwanie na rozpoczęcie testu";
                socket.on("egzaminEvent",(data)=>
                {
                    if(data.typ == "start")
                    {
                        for(let a = 0;a<pytania.length;a++)
                        {
                            let input = pytania[a].getElementsByTagName("input");
                //console.log(pytania[a].getAttribute("name"));
                            for(let b = 0;b<input.length;b++)
                            {
                            input[b].removeAttribute("disabled");
                            }
                        }
                        sleep(500).then(()=>{
                            document.getElementsByClassName("body2").item(0).classList.remove("disable");
                            document.getElementsByClassName("background").item(0).classList.toggle("disable");
                        })
                    }
                })
             }else
             {
                for(let a = 0;a<pytania.length;a++)
                        {
                            let input = pytania[a].getElementsByTagName("input");
                //console.log(pytania[a].getAttribute("name"));
                            for(let b = 0;b<input.length;b++)
                            {
                            input[b].removeAttribute("disabled");
                            }
                        }
                        sleep(500).then(()=>{
                            document.getElementsByClassName("body2").item(0).classList.remove("disable");
                            document.getElementsByClassName("background").item(0).classList.toggle("disable");
                        })
             }
         }).then(()=>{
             
             
             
         });         
function show(a){
        pytania.item(aktualne).classList.toggle("disable");
        pytania.item(a).classList.remove("disable");
        if(a == (test.pytania.length-1))
        {
        document.getElementById("to_end").classList.remove("disable");
        document.getElementById("to_next").classList.add("disable");
        }
        else{
        document.getElementById("to_end").classList.add("disable")
        document.getElementById("to_next").classList.remove("disable");
        }
        aktualne = a;
}
function chli(a)
{
    let lii = document.getElementById('lista_P').getElementsByTagName("li");
    if(lastil!=null)
    lastil.classList.remove("active");
    lii[a].classList.toggle("active");
    lastil = lii[a];
}
function ktore(a)
    {
        let g = 0;
        while(a!= li.getElementsByTagName("li").item(g))
        g++;

        
        return g;
}
function cPytanie(pytanie,a,b)
{
    let q = "";
        q+='<div class="pytanieBody disable Pyta "name="'+a+'">'
        q+='<div class="pytanie_nuber">Pytanie nr <b class="numer">'+a+'</b> z <b>'+b+'</b></div>'
        q+='<div class="pytanie_tr">'
        q+=pytanie.pytanie;
        q+='</div>'
        if(pytanie.img != null)
        q+='<div style="text-align: center;"><img src="https://kwalifikacjewzawodzie.pl/wp-content/uploads/2018/11/b2_tabela50.png"  width="657" height="167" class="pytanie_img"></div>'
        else
        q+='<div style="text-align: center;"></div>'
        q+='<div class="pytania_box">'
        q+='<ol>'
        let tabela = [];
        tabela.push('<li><label><input type="radio" class="odp '+a+'" name="'+pytanie.id+'"  value="1">'+pytanie.odpA+'</label></li>');
        tabela.push('<li><label><input type="radio" class="odp '+a+'"name="'+pytanie.id+'" value="2">'+pytanie.odpB+'</label></li>');
        tabela.push('<li><label><input type="radio" class="odp '+a+'"name="'+pytanie.id+'" value="3">'+pytanie.odpC+'</label></li>');
        tabela.push('<li><label><input type="radio" class="odp '+a+'"name="'+pytanie.id+'" value="4">'+pytanie.odpD+'</label></li>');
        for(var i = tabela.length - 1; i > 0; --i) {
            tabela = swap(tabela, i, ( Math.random() * (i + 1) ) | 0);
        }
        for(let a = 0;a<tabela.length;a++)
        q+=tabela[a];
        q+='</ol>'
        q+='</div>'
        q+='</div>'

    return q;
}
async function endTest()
{
    document.getElementById("heder").classList.add("disable");
    $(".pytanieBody").addClass("disable");
    $("#to_end").addClass("disable");
    $("#to_back").addClass("disable");
//let anser = 0;
let odpowiedzi = [];
for(let a = 0;a<pytania.length;a++)
{
    let input = pytania[a].getElementsByTagName("input");
    thisP = test.pytania[pytania[a].getAttribute("name")-1];
    //console.log(pytania[a].getAttribute("name"));
    let odpowiedzV=null
    for(let b = 0;b<input.length;b++)
    {
        
        input[b].setAttribute("disabled","")
        //console.log(input[b].select());
        if(input[b].getAttribute("value") == thisP.ans)
        {
        if(input[b].checked)
        {
            odpowiedzV=input[b].getAttribute("value");
            wynik++;   
        }
        input[b].parentElement.parentElement.classList.add("correct")
        }else
        {
            if(input[b].checked)
            {
                odpowiedzV=input[b].getAttribute("value");
                input[b].parentElement.parentElement.classList.add("wrong")  
            } 
        }
        
    }
    if(odpowiedzV !=null)
    odpowiedzi.push({pytanie:thisP,odp:parseInt(odpowiedzV)});
    else
    odpowiedzi.push({pytanie:thisP,odp:odpowiedzV});
}
document.getElementById("p_zdobyte").innerHTML = wynik;
document.getElementById("p_dozdobycia").innerHTML = test.pytania.length;
document.getElementById("p_procent").innerHTML = "("+round_L(wynik/test.pytania.length*100)+"%)";
$(".wyniki2").removeClass("disable");
$("#to_show").on("click",()=>$(".pytanieBody").removeClass("disable"))
//console.log(wynik);
//console.log({egzaminID : parseInt(egzaminID),uczenID:uczenID,odpowiedzi:odpowiedzi,punktyZ:wynik,punktyM:test.pytania.length})
$.post("/egzamin/save/egzamin",{data :JSON.stringify({egzaminID : parseInt(egzaminID),uczenID:uczenID,odpowiedzi:odpowiedzi,punktyZ:wynik,punktyM:test.pytania.length})},(data)=>{
if(data.status == "false")
alert("Coś poszło nie tak")
});
socket.disconnect();

}
}
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
function fisherYatesShuffle(array) {
        for(var i = array.length - 1; i > 0; --i) {
            array = swap(array, i, ( Math.random() * (i + 1) ) | 0);
        }
        return array;
}   
function swap(array, a, b) {
        var holder = array[a];
        array[a] = array[b];
        array[b] = holder;
        return array;
}
    