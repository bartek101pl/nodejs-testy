//@Copyright 2018 BŚ
let titlee;
let dataUU ;
let contenerr;
let dataUrll;
let klasUU;
let testData;
let pytan;
let pytania = [];
let ae = false;
window.onload =  function(){
    titlee = document.getElementById("temat");
    dataUU = document.getElementById("dataU");
    contenerr = document.getElementById("contener");
    klasUU = document.getElementById("klasU");
    dataUrl = parseURLParams(window.location.href);
    let inputforID = document.getElementsByClassName("idinput");
    for(let g = 0;g<inputforID.length;g++)
    {
        inputforID.item(g).value = dataUrl.id[0];
    }
//console.log(dataUrl.id[0]); 
downloadData();

}
 async function downloadData()
{
    contenerr.innerHTML = "";
            ae = false;
            pytania = [];
    let g ="";
    
     $.post("/testy/pobieranie/bazadanych",{idT: dataUrl.id[0]},function(data,status){
        
        if(data.length > 0)
        {
            ae = true;
            //console.log(data);
            testData = data[0];
            let datae = new Date(data[0].data)
            
            if(datae.getDate()<10)
            g+="0"+datae.getDate()+"-";
            else
            g+=datae.getDate()+"-";

        if(datae.getMonth()+1<10)
        g+="0"+datae.getMonth()+1+"-";
        else
        g+=datae.getMonth()+1+"-";
        
      g += datae.getFullYear();
            //console.log(testData);
        }
    }).then(()=>{
        if(ae){
        titlee.innerText = testData.nazwa;
        dataUU.innerText = g;
        klasUU.innerText = testData.klasa;
        }
    }).then(() =>{
        if(ae){
        $.post("/testy/pobieranie/bazadanych",{idPT: testData.id},function(data,status){
            for(let a = 0;a<data.length;a++)
            {
                
                pytan = pytania.push(new pytanie(data[a].id,a+1,data[a].tresc,data[a].odpA,data[a].odpB,data[a].odpC,data[a].odpD,data[a].imgSrc,data[a].poprawna,data[a].imgW,data[a].imgH));
            }
        
    }).then(()=>{
        if(pytan>0)
        {
        for(let a = 0;a<pytan;a++){
            addPytanie(pytania[a]);
        }
    }
        else
        {
            document.getElementsByClassName("error_bodyy").item(0).classList.toggle("disable");
        }

        $(".dell").on("click",function(event){
            //console.log(event.target.getAttribute("name"));
            if(confirm("Czy napewno chcesz usunąć to pytanie?"))
            {
                let query = "DELETE FROM `pytania` WHERE `id`="+event.target.getAttribute("name");
                $.post( "/testy/zarzadzanie/bazadanych",{query: query},function(data,status){
                    if(data.status =="true")
                    {
                        
                         query = "UPDATE `testy` SET `iloscPytan`=`iloscPytan`-1 WHERE `id`="+testData.id+";";
                         $.post( "/testy/zarzadzanie/bazadanych",{query: query},function(data,status){});
                    }
            }).then(()=>{
                document.getElementsByClassName("body").item(0).classList.toggle("disable");
            document.getElementsByClassName("background").item(0).classList.toggle("disable");
            
            downloadData();
            });
        }        
        });
    }).then(()=>{
        sleep(500).then(()=>{
            document.getElementsByClassName("body").item(0).classList.remove("disable");
            document.getElementsByClassName("background").item(0).classList.toggle("disable");
        })
        
    });
}else
{
    sleep(500).then(()=>{
        document.getElementsByClassName("error_body").item(0).classList.remove("disable");
        document.getElementsByClassName("background").item(0).classList.toggle("disable");
    })
}
});
}
function addPytanie(aPytanie)
{
   let o = '<div class="pytanieBody ">';
       o+= '<div class="pytanie_nuber">Pytanie nr&nbsp;<b class="numer">'+aPytanie.nrP+'</b>&nbsp;z&nbsp;<b>'+testData.iloscPytan+'</b></div><div class="pytanie_tr">';
       o+=aPytanie.pytanie+"</div>"
      
       if(aPytanie.img != null)
       o+="<div style='text-align: center;'><img src='"+aPytanie.img+"'  width='"+aPytanie.imgW+"' height='"+aPytanie.imgH+"' class='pytanie_img'></div>";
        o+='<div class="pytania_box"><ol>';      
        o+='<li><label><input type="radio" class="odp1" disabled>'+aPytanie.odpA+'</label></li>';
        o+='<li><label><input type="radio" class="odp2" disabled>'+aPytanie.odpB+'</label></li>'; 
        o+='<li><label><input type="radio" class="odp3" disabled>'+aPytanie.odpC+'</label></li>'; 
        o+='<li><label><input type="radio" class="odp4" disabled>'+aPytanie.odpD+'</label></li>'; 
        o+='</ol></div>';
        o+='<form action="/testy/edycja/pytanie" method="GET"><button class="button_to_do" style="margin-bottom:20px;">Edytuj</button><input type="number" name="id" value="'+aPytanie.id+'" style="display:none"></form><button class="button_to_do dell" name="'+aPytanie.id+'" style="margin-bottom:20px;">Usuń</button></div>';
        
        contenerr.innerHTML+=o;
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