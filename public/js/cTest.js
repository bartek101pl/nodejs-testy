//@Copyright 2018 BŚ
window.onload = function(){
document.getElementById("nazwaT").value="";
document.getElementById("iloscT").value="";
document.getElementById("klasaT").value="";
document.getElementById("nazwaT").classList.remove("require");
document.getElementById("iloscT").classList.remove("require");
document.getElementById("klasaT").classList.remove("require");
const tabela = document.getElementById("testTable");
renewTest();
document.getElementById("utworz").addEventListener("click", function(){
    
let nazwa = document.getElementById("nazwaT").value;
let ilosc = document.getElementById("iloscT").value;
let klasa = document.getElementById("klasaT").value;
var Today = new Date();
    var Month = Today.getMonth();
    var Day = Today.getDate();
    var Year = Today.getFullYear();
    let data = Year+"-";
    if(Month<10)
    data+="0"+Month+"-";
    else
    data+=Month+"-";
    
    if(Day<10)
    data+="0"+Day;
    else
    data+="0"+Day;

if((nazwa.length >0)&&(ilosc.length>0)&&klasa.length>0)
{
    document.getElementById("nazwaT").value="";
    document.getElementById("iloscT").value="";
    document.getElementById("klasaT").value="";
    if(document.getElementById("nazwaT").classList.contains("require"))
        document.getElementById("nazwaT").classList.remove("require")
    if(document.getElementById("iloscT").classList.contains("require"))
        document.getElementById("iloscT").classList.remove("require")
    if(document.getElementById("klasaT").classList.contains("require"))
        document.getElementById("klasaT").classList.remove("require")      
$.post( "/testy/addTest", { name: nazwa, ilosc: ilosc,klasa: klasa,data: (data) },function(data,status){
    console.log(data);
    tabela.innerHTML="";
    for(let a = 0;a<data.length;a++)
    {
        let datae = new Date(data[a].data)
            let g = "";
            if(datae.getDate()<10)
            g+="0"+datae.getDate()+"-";
            else
            g+=datae.getDate()+"-";

        if(datae.getMonth()<10)
        g+="0"+datae.getMonth()+"-";
        else
        g+=datae.getMonth()+"-";
         g += datae.getFullYear();
        tabela.innerHTML+="<tr><td>"+(a+1)+".</td><td>"+data[a].nazwa+"</td><td>"+data[a].iloscPytan+"</td><td>"+data[a].klasa+"</td><td>"+g+"</td><td>"+
        '<form action="/testy/widok" method="GET"> <button  class="button_to_do" style="float: left; ">Podgląd</button><input type="number" name="id" value="'+data[a].id+'" style="display:none"></form>'+
        "</td><td>"+'<form action="/testy/start" method="GET"><button  class="button_to_do" style="float: left; ">Rozpocznij test</button><input type="number" name="id" value="'+data[a].id+'" style="display:none"></form>'+"</td><td>"+
        '<form action="/testy/edycja" method="GET"><button  class="button_to_do" style="float: left; ">Edytuj</button><input type="number" name="id" value="'+data[a].id+'" style="display:none"></form>'+"</td><td>"+
        '<div style="margin-left:0;"><button id="dellB'+a+'" class="button_to_do dellTest" name="'+data[a].id+'" style="float: left; ">Usuń test</button></div>'+"</td></tr>";
}
    przyciski();

} );
}else {
    if(nazwa.length ==0)
    {
        if( !document.getElementById("nazwaT").classList.contains("require"))
        document.getElementById("nazwaT").classList.toggle("require")  
    }
    if(ilosc.length ==0)
    {
        if( !document.getElementById("iloscT").classList.contains("require"))
        document.getElementById("iloscT").classList.toggle("require") 
    }
    if(klasa.length ==0)
    {
        if( !document.getElementById("klasaT").classList.contains("require"))
        document.getElementById("klasaT").classList.toggle("require") 
    }
}

});

function przyciski()
{
   let tr = document.getElementsByTagName("tr");
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
   let button = document.getElementsByClassName("dellTest");
  $(".dellTest").on("click",function(event){
       //console.log(event.target.getAttribute("name"));
       dellTest(event.target.getAttribute("name"))
   })
   //console.log(button);
}

function renewTest(){
            
    $.post( "/testy/showTable", {},function(data,status){
        console.log(data);
        tabela.innerHTML="";
        for(let a = 0;a<data.length;a++)
        {
            let datae = new Date(data[a].data)
            let g = "";
            if(datae.getDate()<10)
            g+="0"+datae.getDate()+"-";
            else
            g+=datae.getDate()+"-";

        if(datae.getMonth()<10)
        g+="0"+datae.getMonth()+"-";
        else
        g+=datae.getMonth()+"-";
        
      g += datae.getFullYear();
            tabela.innerHTML+="<tr><td>"+(a+1)+".</td><td>"+data[a].nazwa+"</td><td>"+data[a].iloscPytan+"</td><td>"+data[a].klasa+"</td><td>"+g+"</td><td>"+
            '<form action="/testy/widok" method="GET"> <button  class="button_to_do" style="float: left; ">Podgląd</button><input type="number" name="id" value="'+data[a].id+'" style="display:none"></form>'+
            "</td><td>"+'<form action="/testy/start" method="GET"><button  class="button_to_do" style="float: left; ">Rozpocznij test</button><input type="number" name="id" value="'+data[a].id+'" style="display:none"></form>'+"</td><td>"+
            '<form action="/testy/edycja" method="GET"><button  class="button_to_do" style="float: left; ">Edytuj</button><input type="number" name="id" value="'+data[a].id+'" style="display:none"></form>'+"</td><td>"+
            '<div style="margin-left:0;"><button id="dellB'+a+'" class="button_to_do dellTest" name="'+data[a].id+'" style="float: left; ">Usuń test</button></div>'+"</td></tr>";
            
        }
        przyciski();
    } ).then(()=>{
        sleep(500).then(()=>{
            document.getElementsByClassName("body").item(0).classList.remove("disable");
            document.getElementsByClassName("background").item(0).classList.toggle("disable");
        })
    });
}
function dellTest(a)
{
    if(confirm("Czy napewno chcesz usunąć test?"))
    {
        //console.log("del test id="+a);
        var query = "DELETE FROM `testy` WHERE `id`="+a;
        //console.log(query);
        document.getElementsByClassName("body").item(0).classList.toggle("disable");
            document.getElementsByClassName("background").item(0).classList.remove("disable");
        $.post( "/testy/zarzadzanie/bazadanych",{query: query},function(data,status){
            if(data.status =="true")
            {
                renewTest();
                new Promise(()=>{alert("Test został usunięty pomyślnie : "+data.data);}); 
            }
            //console.log(data);
        } );
    }
}
}
function sleep (time) {
    //użycie : sleep(czas).then(() => {});
    return new Promise((resolve) => setTimeout(resolve, time));
  }
