

window.onload =()=>{
    const imie = document.getElementById("nameUczen");
    const nazw = document.getElementById("nazwiskoUczen");
    const log = document.getElementById("loginUczen");
    const pass = document.getElementById("hasloUczen");
   let parmss = parseURLParams(window.location.href);
   let klasaID;
   try{
     klasaID=parmss.id[0];
   }catch(error)
   {
    
    window.location.href = "/klasa";
   }
    clearInput();
    imie.addEventListener("change",()=>{
        imie.value = imie.value.firstToUpper();
        log.value = imie.value;
    });
    nazw.addEventListener("change",()=>{
        nazw.value = nazw.value.firstToUpper();
        pass.value = nazw.value;
    });
    function clearInput(){
        imie.value = "";
        nazw.value = "";
        log.value = "";
        pass.value = "";
    }
    $("#utworz").on("click",()=>{
        let isname = false;
        $.post("/uczen/isName",{name: imie.value , sname: nazw.value},(data)=>{
            
            if(data[0].ilosc> 0)
            {
                isname = true;
            }
        }).then(()=>{
            if(!isname)
            {
                $.post("/uczen/add/uczen",{imie: imie.value , nazwisko: nazw.value , login: log.value , pass: pass.value , KlasID: klasaID},(data)=>{
                        if(data.status === "true")
                        {
                            alert("Uczeń został dodany pomyślnie");
                        }
                });
            }else
            alert("Istnieje uczeń o tym imieniu i nazwisku!");
            
        });

    });
    $("#back").on("click",()=>{
        window.location.href = "/klasa/widok/klasy?id="+klasaID
    })
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

  String.prototype.firstToUpper = function(){
    return this.charAt(0).toUpperCase() + this.slice(1);
  };