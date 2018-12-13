
window.onload = function()
{
    let idd =  parseURLParams(window.location.href);
    let id = idd.id;
    let data = [];
    let goodAnser = 0;
    const fast = document.getElementById("fastTekst");
    const pytanieT = document.getElementById("pytanie");
    const odpA =document.getElementById("p1");
    const odpB =document.getElementById("p2");
    const odpC =document.getElementById("p3");
    const odpD =document.getElementById("p4");
    const p1 = document.getElementById("p1");
    const p2 = document.getElementById("p2");
    const p3 = document.getElementById("p3");
    const p4 = document.getElementById("p4");
    const zmian = document.getElementById("zmiana");
    fast.value = "";
    pytanieT.value = "";
    odpA.value = "";
    odpB.value = "";
    odpC.value = "";
    odpD.value = "";
    goodAnser = 0;
    let zz = false;
    $("#save").on("click",function(){
        if(goodAnser== 0)
        {
            alert("Zaznacz poprawną odpowiedz!");
        }else{
            if((pytanieT.value == ""))
            if(!confirm("Brak tresci pytania czy kontynuować?"))
            return;
            if((odpA.value == ""))
            if(!confirm("Brak tresci odpowiedzi A czy kontynuować?"))
            return;
            if((odpB.value == ""))
            if(!confirm("Brak tresci odpowiedzi B czy kontynuować?"))
            return;
            if((odpC.value == ""))
            if(!confirm("Brak tresci odpowiedzi C czy kontynuować?"))
            return;
            if((odpD.value == ""))
            if(!confirm("Brak tresci odpowiedzi D czy kontynuować?"))
            return;

            let query = "INSERT INTO `pytania` (`id`, `idtestu`, `tresc`, `odpA`, `odpB`, `odpC`, `odpD`, `poprawna`, `imgSrc`, `imgW`, `imgH`) VALUES"
            query+="(NULL, '"+id+"', '"+pytanieT.value+"', '"+odpA.value+"', '"+odpB.value+"', '"+odpC.value+"', '"+odpD.value+"', '"+goodAnser+"', NULL, NULL, NULL);"
            //console.log(query);
            switch(goodAnser)
            {
                case 1: p1.classList.remove("select");break;
                case 2: p2.classList.remove("select");break;
                case 3: p3.classList.remove("select");break;
                case 4: p4.classList.remove("select");break;
            }
            $.post( "/testy/zarzadzanie/bazadanych",{query: query},function(data,status){
                query = "UPDATE `testy` SET `iloscPytan`=`iloscPytan`+1 WHERE `id`="+id+";";
                $.post( "/testy/zarzadzanie/bazadanych",{query: query},function(data,status){});
                
        }).then(()=>{
            if(!confirm("Pytanie zostało dodane. \n Czy chcesz dodać kolejne pytanie ?"))
            {
            window.location.href = "/testy/widok?id="+id;
            }else
            {
                fast.value = "";
                pytanieT.value = "";
                odpA.value = "";
                odpB.value = "";
                odpC.value = "";
                odpD.value = "";
                goodAnser = 0;
            }
        });
        }
    });
    $("#fast").on("click",function(){
        data = [];
        document.getElementsByClassName("body").item(0).classList.toggle("disable");
        document.getElementsByClassName("fastBox").item(0).classList.toggle("disable");
    });
    $("#cancleFast").on("click",function(){
        
        document.getElementsByClassName("body").item(0).classList.toggle("disable");
        document.getElementsByClassName("fastBox").item(0).classList.toggle("disable");
        fast.value = "";
    });
    $("#convert").on("click",function(){
        converrt(fast.value);
        console.log(data);
        if(data.length >0)
        pytanieT.value = removeFirstSpace(data[0]);
        if(data.length >1)
        odpA.value = removeFirstSpace(data[1]);
        if(data.length >2)
        odpB.value = removeFirstSpace(data[2]);
        if(data.length >3)
        odpC.value = removeFirstSpace(data[3]);
        if(data.length >4)
        odpD.value = removeFirstSpace(data[4]);
        document.getElementsByClassName("body").item(0).classList.toggle("disable");
        document.getElementsByClassName("fastBox").item(0).classList.toggle("disable");
        fast.value = "";
    });
    function converrt(a){
        data = null;
        data =  []
        a+="\n";
        let d = "";
        for(let g = 0;g<a.length;g++)
        {
            
            if(a[g] =='\n')
            {
                if(d != "")
                //console.log(d)
                
                data.push(d);
                d = "";
                
                
            }else{
                d+=a[g];
            }
        }
    }
    function removeFirstSpace(e)
    {if((e!="")&&(e.length > 0))
    {
        let g = "";
        let t = false;
        for(let a = 0; a<e.length;a++)
        {
            if((e[a] == " ")&&(a ==0))
            {

            }else if(((e[a] == " ")&&(a !=0)&&(!t)))
            {

            }else if((e[a] != " ")||(t))
            {
                t = true;
                g+=e[a];
            }

        }
        return g;
    }else{
        return "";
    }
        
    }
    zmian.addEventListener("click",function(){
        zz = true;
        });
    p1.addEventListener('click',function(){
        if((zz)&&(goodAnser!=1)){
            if(p1.value != ""){
            switch(goodAnser)
            {
                case 1: p1.classList.remove("select");break;
                case 2: p2.classList.remove("select");break;
                case 3: p3.classList.remove("select");break;
                case 4: p4.classList.remove("select");break;
            }
            p1.classList.toggle("select");
            goodAnser=1;
            zz=false;
        }else
        {
            alert("Nie możesz wybrać pustej odpowiedzi!")
        }
            //alert("Zmineiono poprawną odpowiedz na odpowiedz 1.")
            //zmian.classList.toggle("editTable");
        }
        
    })
    p2.addEventListener('click',function(){
        if((zz)&&(goodAnser!=2)){
            if(p2.value != ""){
            switch(goodAnser)
            {
                case 1: p1.classList.remove("select");break;
                case 2: p2.classList.remove("select");break;
                case 3: p3.classList.remove("select");break;
                case 4: p4.classList.remove("select");break;
            }
            p2.classList.toggle("select");
            goodAnser=2;
            zz=false;
        }else
        {
            alert("Nie możesz wybrać pustej odpowiedzi!")
        }
            //alert("Zmineiono poprawną odpowiedz na odpowiedz 1.")
            //zmian.classList.toggle("editTable");
        }
        
    })
    p3.addEventListener('click',function(){
        if((zz)&&(goodAnser!=3)){
            if(p3.value != ""){
            switch(goodAnser)
            {
                case 1: p1.classList.remove("select");break;
                case 2: p2.classList.remove("select");break;
                case 3: p3.classList.remove("select");break;
                case 4: p4.classList.remove("select");break;
            }
            p3.classList.toggle("select");
            goodAnser=3;
            zz=false;
        }else
        {
            alert("Nie możesz wybrać pustej odpowiedzi!")
        }
            //alert("Zmineiono poprawną odpowiedz na odpowiedz 1.")
            //zmian.classList.toggle("editTable");
        }
        
    })
    p4.addEventListener('click',function(){
        if((zz)&&(goodAnser!=4)){
            if(p4.value != ""){
            switch(goodAnser)
            {
                case 1: p1.classList.remove("select");break;
                case 2: p2.classList.remove("select");break;
                case 3: p3.classList.remove("select");break;
                case 4: p4.classList.remove("select");break;
            }
            p4.classList.toggle("select");
            goodAnser=4;
            zz=false;
        }else
        {
            alert("Nie możesz wybrać pustej odpowiedzi!")
        }
            //alert("Zmineiono poprawną odpowiedz na odpowiedz 1.")
            //zmian.classList.toggle("editTable");
        }
        
    })
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
}

