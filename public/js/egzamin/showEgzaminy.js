//import io from 'socket.io-client';
window.onload= function()
{
    update();
    const socket = io();
    socket.emit("Im",{typ:"admin"});
    socket.on("zmianaEgzamin",(data)=>{
        //console.log(data);
        if(data.typ =="reload")
        update();
        else if(data.typ =="dane")
        {
            if(data.k == "Status")
            {
                $("#status"+data.id).html(data.dane)
                if(data.dane === "Test rozpoczęty")
                {
                    document.getElementById("start").innerText = "Zakończ";
                }else if(data.dane == "Połączono")
                {
                    document.getElementById("start").innerText ="Rozpocznij";
                }
            }else if(data.k == "uczniowie")
            {
                $("#uczniowie"+data.id).html(data.dane)
            }
        }
    })
    let testy_array;
    function update()
    {
        $("#egzaminyGrid").html("");
        $.post("/egzamin/get/all",{},(dane)=>{
            testy_array = dane;
            testy = dane;
            for(let a =0;a<dane.length;a++)
            {
            
            let q = "";
            //console.log(dane[a])
           
            $.post("/testy/pobieranie/bazadanych",{idT:dane[a].test_id},(data)=>{
                q+='<div class="egzaminyGridItem">';
            q+='<h1>Egzamin z testu: '+data[0].nazwa
            q+='</h1>';
            q+='<table>';
            q+='<tbody>';
            if(data.length>0)
            {
                q+='<tr><td>Nazwa testu:</td><td>'+data[0].nazwa+'</td></tr>';
            }else{
                q+='<tr><td>Nazwa testu:</td><td>UNDEFINED</td></tr>';
            }
            q+='<tr><td>Numer egzaminu:</td><td>'+data[0].id+'</td></tr>';
        }).then(()=>$.post("/klasa/szukaj/id",{id:dane[a].klasa_id},(data)=>{
            if(data.length >0)
            {
                q+='<tr><td>Nazwa Klasy:</td><td>'+data[0].nazwa+'</td></tr>';
            }else{
                q+='<tr><td>Nazwa Klasy:</td><td>UNDEFINED</td></tr>';
            }
        }).then(()=>{
            q+='<tr><td>Ilość pytań:</td><td>'+dane[a].ilosc_pytan+'</td></tr>';
            q+='<tr><td>Ilość czasu:</td><td>'+dane[a].time+'</td></tr>';
            q+='<tr><td>Ilość uczniów:</td><td id="uczniowie'+dane[a].id+'">'+dane[a].load+'</td></tr>';
            q+='<tr><td>Tryb gościa:</td><td>'+dane[a].goscT+'</td></tr>';
            q+='<tr><td>Zapis wyników:</td><td>'+dane[a].savW+'</td></tr>';
            q+='<tr><td>Synchronizacja:</td><td>'+dane[a].synch+'</td></tr>';
            q+='</tbody>';
            q+='</table>';
            q+='<span>Status:</span><div class="statusE"id="status'+dane[a].id+'">'+dane[a].status+'</div><div style="clear:both;"></div>';
            if(dane[a].goscT == "false")
            if(dane[a].status == "Oczekiwanie" || dane[a].status == "Połączono")
            q+='<button class="button_to_do start" id="start"style="margin-top:1vw;margin-bottom:1vw;"  name="'+a+'">Rozpocznij</button>';
            else if(dane[a].status == "Test rozpoczęty")
            q+='<button class="button_to_do " id="start"style="margin-top:1vw;margin-bottom:1vw;"  name="'+a+'">Zakończ</button>';
            q+='<button class="button_to_do wyniki" id="start"style="margin-top:1vw;margin-bottom:1vw;" name="'+a+'" >Wyniki</button>';
            q+='<button class="button_to_do " id="start"style="margin-top:1vw;margin-bottom:1vw;"  name="'+a+'">Pytania</button>';
            q+='<button class="button_to_do dellEgza" id="start"style="margin-top:1vw;margin-bottom:1vw;"  name="'+a+'">Usuń</button>';
            q+='<div style="clear:both;"></div>';
            q+='</div>';
            
        }).then(()=>$("#egzaminyGrid").html($("#egzaminyGrid").html()+q)).then(()=>{$(".dellEgza").on("click",function(event){
            dell(event.target.getAttribute("name"))
        })
        $(".start").on("click",function(event){
            if($(".start").html() =="Rozpocznij")
            socket.emit("egzaminEvent",{typ:"startEgzamin",egzaminID:(testy_array[event.target.getAttribute("name")].id)})
            else if($(".start").html() =="Zakończ")
            socket.emit("egzaminEvent",{typ:"egzaminEnd",egzaminID:(testy_array[event.target.getAttribute("name")].id)})
            //console.log(testy_array[event.target.getAttribute("name")].id);
        });
        $(".wyniki").on("click",function(event){
            
            window.location.href="/egzamin/wynik?test="+ testy_array[event.target.getAttribute("name")].id
            //console.log(testy_array[event.target.getAttribute("name")].id);
        });
    }));
            }
            
        });
        
    }
    function dell(a)
    {   //console.log(testy_array[a]);
        $.post("/egzamin/dell",{egza : testy_array[a].id},(data)=>{});
    }
}
let testy;//do usunięcia
