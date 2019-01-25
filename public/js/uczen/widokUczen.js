

window.onload = function(){
const imie = document.getElementById("nameUczen");
const nazw = document.getElementById("nazwiskoUczen");
let parm = parseURLParams(window.location.href);
let id_uczen, id_klasa,Dimie,Dnazw;
try{
id_uczen = parm.id[0];
id_klasa = parm.id_klasa[0]
}catch(err){
window.location.href= "/klasa";
}

imie.addEventListener("change",function(){
  imie.value = imie.value.firstToUpper();
  });
  nazw.addEventListener("change",()=>{
    nazw.value = nazw.value.firstToUpper();
    pass.value = nazw.value;
  });
$.post("/uczen/get/klasa",{id: id_uczen},(data)=>{
  if(data.length>0)
  {
imie.value = data[0].imie;
nazw.value = data[0].nazwisko;
Dimie = data[0].imie;
Dnazw = data[0].nazwisko;
  }else{
    alert("Nie ma takiego ucznia!");
    window.location.href= "/klasa";
  }
}).then(()=>sleep(500).then(()=>{
  document.getElementsByClassName("body").item(0).classList.remove("disable");
  document.getElementsByClassName("background").item(0).classList.toggle("disable");
}));

$("#utworz").on("click",()=>{
if(Dimie!=imie.value)
{
  $.post("/uczen/zmiana/imienia",{newName: imie.value, id:id_uczen},(data)=>{
    if(data.status === "true")
    alert("Imie zostało zmienione");
    else
    alert("Coś poszło nie tak podzcas zmiany imienia!")
  });
}

if(Dnazw != nazw.value)
{
  $.post("/uczen/zmiana/nazwiska",{newSname: nazw.value, id:id_uczen},(data)=>{
    if(data.status === "true")
    alert("Nazwisko zostało zmienione");
    else
    alert("Coś poszło nie tak podzcas zmiany Imienia!")
  });
}

});

$("#back").on("click",()=>{
window.location.href = "/klasa/widok/klasy?id="+id_klasa;
});
$("#dellStudent").on("click",()=>{
  $.post( "/uczen/dell/uczen",{id: id_uczen,KlasID:id_klasa},function(data,status){
    if(data.status =="true")
    {
       alert("Uczeń został usunięty");
       
    }
}).then(()=>{
  window.location.href = "/klasa/widok/klasy?id="+id_klasa;
});
  
  });
};
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

  String.prototype.firstToUpper = function(){
    return this.charAt(0).toUpperCase() + this.slice(1);
  };