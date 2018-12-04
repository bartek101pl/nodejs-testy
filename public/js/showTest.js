//@Copyright 2018 BŚ
let titlee;
let dataUU ;
let contenerr;
let dataUrll;
let klasUU;
let testData;
let pytan;
let pytania = [];
window.onload = function(){
    titlee = document.getElementById("temat");
    dataUU = document.getElementById("dataU");
    contenerr = document.getElementById("contener");
    klasUU = document.getElementById("klasU");
    dataUrl = parseURLParams(window.location.href);
//console.log(dataUrl.id[0]); 
downloadData();

}
async function downloadData()
{
    let g ="";
     $.post("/testy/pobieranie/bazadanych",{idT: dataUrl.id[0]},function(data,status){
        
        
            //console.log(data);
            testData = data[0];
            let datae = new Date(data[0].data)
            
            if(datae.getDate()<10)
            g+="0"+datae.getDate()+"-";
            else
            g+=datae.getDate()+"-";

        if(datae.getMonth()<10)
        g+="0"+datae.getMonth()+"-";
        else
        g+=datae.getMonth()+"-";
        
      g += datae.getFullYear();
            //console.log(testData);
    }).then(()=>{
        titlee.innerText = testData.nazwa;
        dataUU.innerText = g;
        klasUU.innerText = testData.klasa;
    }).then(() =>{
        $.post("/testy/pobieranie/bazadanych",{idPT: testData.id},function(data,status){
        
        
            
            for(let a = 0;a<data.length;a++)
            {
                pytan = pytania.push(new pytanie(a+1,data[a].tresc,data[a].odpA,data[a].odpB,data[a].odpC,data[a].odpD,data[a].imgSrc,data[a].poprawna,data[a].imgW,data[a].imgH));
            }
            
    }).then(()=>{
        
        for(let a = 0;a<pytan;a++){
            addPytanie(pytania[a]);
        }
    }).then(()=>{
        sleep(500).then(()=>{
            document.getElementsByClassName("body").item(0).classList.remove("disable");
            document.getElementsByClassName("background").item(0).classList.toggle("disable");
        })
        
    });
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
        o+='<form action="/testy/edycja/pytanie" method="GET"><button class="button_to_do" style="margin-bottom:20px;">Edytuj</button><input type="number" name="id" value="'+aPytanie.id+'" style="display:none"></form><button class="button_to_do" style="margin-bottom:20px;">Usuń</button></div>';
        
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