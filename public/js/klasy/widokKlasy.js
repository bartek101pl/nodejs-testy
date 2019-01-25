window.onload = ()=>{
let url = parseURLParams(window.location.href);
let id ;
try{
    id = parseInt(url.id[0]);
}catch(err)
{
    window.location.href = "/klasa";
}
const tabela = document.getElementById("testTable");
$("#addUczen").on("click",()=>{
window.location.href = "/uczen/add/uczen?id="+id;
});
show();
function show(){
    $.post("/klasa/szukaj/id",{id:id},(data,status)=>{
        if(data.length >0)
        {
        $("#nazwaKlasy").text(data[0].nazwa)
        $("#iloscUczniow").text(data[0].ile_Uczni)
        }else{
            window.location.href = "/klasa";  
        }
        });
    $("#testTable").html("");
$.post("/uczen/get/klasa/all",{klasaID: id},(data)=>{
//console.log(data);
let cont = "";
for(let a = 0; a<data.length;a++)
{
cont+="<tr style='text-align:center;'><td>"+(a+1)+".</td><td class='user' name='"+data[a].id+"'><b name='"+data[a].id+"'>"+data[a].imie+" "+data[a].nazwisko+"</b></td><td>NULL</td><td>"
cont+='<div style="margin-left:0;"><button id="dellB'+a+'" class="button_to_do dellTest" name="'+data[a].id+'" style="float: left; ">Usuń</button></div>'
cont+="</td><td>"+'<div style="margin-left:0;"><button id="dellB'+a+'" style="width:100%;margin:0 0 0 0;" class="button_to_do resetPass" name="'+data[a].id
cont+='" style="float: left; ">Resetuj hasło i login</button></div>'+"</td>W</tr>";
}
$("#testTable").html(cont);
przyciski();
}).then(()=>sleep(500).then(()=>{
    document.getElementsByClassName("body").item(0).classList.remove("disable");
    document.getElementsByClassName("background").item(0).classList.toggle("disable");
}));
                
}
function przyciski()
    {
        let tr = tabela.getElementsByTagName("tr");
        for(let a = 0;a<tr.length;a++)
        {
            let button = tr.item(a).getElementsByTagName("button");
            for(let b = 0;b<button.length;b++)
            {
                 button.item(b).addEventListener("mouseover",function(event){
                     event.target.parentNode.parentNode.parentNode.classList.toggle("just");
                 })
                 button.item(b).addEventListener("mouseout",function(event){
                     event.target.parentNode.parentNode.parentNode.classList.remove("just");
                 })
            }
        }
        $(".dellTest").on("click",function(event){
            //console.log(event.target.getAttribute("name"));
            dellUser(event.target.getAttribute("name"))
        })

        $(".resetPass").on("click",function(event){
            //console.log(event.target.getAttribute("name"));
            ResetPass(event.target.getAttribute("name"))
        })
        $(".user").on("click",function(event){
            //console.log(event.target.getAttribute("name"));
            showProfil(event.target.getAttribute("name"))
        })
    }

    function dellUser(a)
    {
        if(confirm("Czy napewno chcesz usunąć Ucznia?"))
        {
            //console.log("del test id="+a);
            //var query = "DELETE FROM `testy` WHERE `id`="+a;
            //console.log(query);
            document.getElementsByClassName("body").item(0).classList.toggle("disable");
                document.getElementsByClassName("background").item(0).classList.remove("disable");
            $.post( "/uczen/dell/uczen",{id: a,KlasID:id},function(data,status){
                if(data.status =="true")
                {
                    sleep(500).then(()=>show())
                }
            } );;
        }
    }
    function showProfil(a)
    {
        window.location.href = "/uczen/widok/ucznia/?id="+a+"&id_klasa="+id;
    }
    function ResetPass(a)
    {
        if(confirm("Czy napewno chcesz zresetować hasło i login?"))
        {
            //console.log("del test id="+a);
            //var query = "DELETE FROM `testy` WHERE `id`="+a;
            //console.log(query);
                //document.getElementsByClassName("body").item(0).classList.toggle("disable");
                //document.getElementsByClassName("background").item(0).classList.remove("disable");
            $.post( "/uczen/reset/pass/login",{id: a},function(data,status){
                if(data.status =="true")
                {
                    alert("Hasło i login zostały zresetowane.");
                    //sleep(500).then(()=>show())
                }
            } );;
        }
    }

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