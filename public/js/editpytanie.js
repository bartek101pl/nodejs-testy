

function sleep (time) {
    //użycie : sleep(czas).then(() => {});
    return new Promise((resolve) => setTimeout(resolve, time));
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
let id;
let id_T;
let zz = false;
let a =0;
let pytania ;

window.onload = function(){
    const el =  parseURLParams(window.location.href)
 id = el.id[0];
const pytaniee = document.getElementById("pytanie");
const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");
const p3 = document.getElementById("p3");
const p4 = document.getElementById("p4");
const zmian = document.getElementById("zmiana");
$("#cancle").on("click",function(){
    window.location.href = "/testy/widok?id="+id_T;
})
$("#save").on("click",function(){
    let query = "UPDATE `pytania` SET `tresc` ='"+pytaniee.value+"', `odpA` ='"+p1.value+"', `odpB` ='"+p2.value+"', `odpC` ='"+p3.value+"', `odpD` ='"+p4.value+"', `poprawna` = '"+a+"' WHERE `pytania`.`id` = "+id+";"
    console.log(query);
     $.post( "/testy/zarzadzanie/bazadanych",{query: query},function(data,status){
                if(data.status =="true")
                {
                    
                    new Promise(()=>{alert("Pytanie zostało pomyślnie zapisane : "+data.data);}); 
                }
                //console.log(data);
            } ).then(()=>{
                window.location.href = "/testy/widok?id="+id_T;
            });
});
zmian.addEventListener("click",function(){
zz = true;
});
p1.addEventListener('click',function(){
    if((zz)&&(a!=1)){
        switch(a)
        {
            case 1: p1.classList.remove("select");break;
            case 2: p2.classList.remove("select");break;
            case 3: p3.classList.remove("select");break;
            case 4: p4.classList.remove("select");break;
        }
        p1.classList.toggle("select");
        a=1;
        zz=false;
        //alert("Zmineiono poprawną odpowiedz na odpowiedz 1.")
        zmian.classList.toggle("editTable");
    }
    
})
p2.addEventListener('click',function(){
    if((zz)&&(a!=2)){
        switch(a)
        {
            case 1: p1.classList.remove("select");break;
            case 2: p2.classList.remove("select");break;
            case 3: p3.classList.remove("select");break;
            case 4: p4.classList.remove("select");break;
        }
        p2.classList.toggle("select");
        a=2;
        zz=false;
       // alert("Zmineiono poprawną odpowiedz na odpowiedz 2.")
        zmian.classList.toggle("editTable");
    }
    
})
p3.addEventListener('click',function(){
    if((zz)&&(a!=3)){
        switch(a)
        {
            case 1: p1.classList.remove("select");break;
            case 2: p2.classList.remove("select");break;
            case 3: p3.classList.remove("select");break;
            case 4: p4.classList.remove("select");break;
        }
        p3.classList.toggle("select");
        a=3;
        zz=false;
       // alert("Zmineiono poprawną odpowiedz na odpowiedz 3.")
        zmian.classList.toggle("editTable");
    }
    
})
p4.addEventListener('click',function(){
    if((zz)&&(a!=4)){
        switch(a)
        {
            case 1: p1.classList.remove("select");break;
            case 2: p2.classList.remove("select");break;
            case 3: p3.classList.remove("select");break;
            case 4: p4.classList.remove("select");break;
        }
        p4.classList.toggle("select");
        a=4;
        zz=false;
     //   alert("Zmineiono poprawną odpowiedz na odpowiedz 4.")
        zmian.classList.toggle("editTable");
    }
    
})
let ae = false;
// pytania =new pytanie(1,"1231@","1231@#","!2312312","123123123123","1231231231","1231231231@","3");
$.post("/testy/pobieranie/bazadanych",{idPP: id},function(data,status){
    //console.log(data[0].tresc)
    
        
    for(let aa = 0;a<data.length;a++)
    {
        id_T = data[aa].idtestu;
        pytania =new pytanie(data[aa].id,1,data[aa].tresc,data[aa].odpA,data[aa].odpB,data[aa].odpC,data[aa].odpD,data[aa].imgSrc,data[aa].poprawna,data[aa].imgW,data[aa].imgH);
        ae = true;
    }
               // console.log(pytania);
        
}).then(()=>{
    if(ae){
pytaniee.innerText = pytania.pytanie;
p1.innerText = pytania.odpA;
p2.innerText = pytania.odpB;
p3.innerText = pytania.odpC;
p4.innerText = pytania.odpD;
a = parseInt(pytania.ans);
    
switch(a)
{
    case 1: p1.classList.toggle("select");break;
    case 2: p2.classList.toggle("select");break;
    case 3: p3.classList.toggle("select");break;
    case 4: p4.classList.toggle("select");break;
}
    }
}).then(()=>{
    if(ae){
    sleep(500).then(()=>{
        document.getElementsByClassName("body").item(0).classList.remove("disable");
        document.getElementsByClassName("background").item(0).classList.toggle("disable");
    })
}else{
    sleep(500).then(()=>{
        document.getElementsByClassName("error_body").item(0).classList.remove("disable");
        document.getElementsByClassName("background").item(0).classList.toggle("disable");
    })
}
});
$("#dell").on("click",function(event){
    //console.log(event.target.getAttribute("name"));
    if(confirm("Czy napewno chcesz usunąć to pytanie?"))
    {
        let query = "DELETE FROM `pytania` WHERE `id`="+id;
        $.post( "/testy/zarzadzanie/bazadanych",{query: query},function(data,status){
            if(data.status =="true")
            {
                
                 
            }
    }).then(()=>{
        window.location.href = "/testy/widok?id="+id_T;
    });
}        
});
}