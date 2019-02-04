//import io from 'socket.io-client';
window.onload= function()
{
    update();
    const socket = io();
    $.post("/get/my/klasa/id",{},(data)=>{
        if(data.klasaID != null)
        socket.emit("Im",{typ:"uczen",klasaID: data.klasaID});
    });
    socket.on("zmianaEgzamin",(data)=>{
        if(data.typ =="reload")
        update();
    })
    let testy_array;
    function update()
    {
        $("#egzaminyGrid").html("");
        $.post("/egzamin/get/all",{},(dane)=>{
            testy_array = dane;
            for(let a =0;a<dane.length;a++)
            {
            
            let q = "";
            //console.log(dane[a])
            
            $.post("/testy/pobieranie/bazadanych",{idT:dane[a].test_id},(data)=>{
            q+='<div class="egzaminyGridItem_uczen">';
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
            q+='</tbody>';
            q+='</table>';
            q+='<span>Status:</span><div class="statusE">'+dane[a].status+'</div><div style="clear:both;"></div>';
            q+='<button class="button_to_do dolacz" id="start"style="margin-top:1vw;margin-bottom:1vw;" name="'+a+'" >Dołącz</button>';
            q+='<button class="button_to_do wyniki" id="start"style="margin-top:1vw;margin-bottom:1vw;"  name="'+a+'">Wyniki</button>';
            q+='<div style="clear:both;"></div>';
            q+='</div>';
            
        }).then(()=>{document.getElementById("egzaminyGrid").innerHTML+=q}).then(()=>$(".dolacz").on("click",function(event){
            conect(event.target.getAttribute("name"))
        })));
            }
            
        }).then(()=>{});
    }
    function dell(a)
    {   //console.log(testy_array[a]);
        $.post("/egzamin/dell",{egza : testy_array[a].id},(data)=>{
            if(data.status == "false")
            alert("Coś poszło nie tak!");
        });
    }
    function conect(a)
    {   //console.log(testy_array[a]);
        window.location.href = "/profil/testy/uczen?test="+testy_array[a].id;
    }
}
