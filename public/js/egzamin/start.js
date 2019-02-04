//@Copyright 2018 BŚ
window.onload = function(){
const parms = parseURLParams(window.location.href);
let test_id,klasa_id,ilosc_pytan,savW,goscT,synch,time;
try{
    test_id = parms.test_id[0];
}catch(err)
{
    test_id = null;
}
try{
    klasa_id = parms.klasa_id[0];
}catch(err)
{
    klasa_id = null;
}
try{
    ilosc_pytan = parms.ilosc_pytan[0];
}catch(err)
{
    ilosc_pytan = null;
}
try{
    savW = parms.savW[0];
    if(savW == "true")
    $("#saveW").attr( 'checked', true )
}catch(err)
{
    savW = false;
}
try{
    goscT = parms.goscT[0];
    if(goscT== "true")
    $("#goscT").attr( 'checked', true )
}catch(err)
{
    goscT = false;
}
try{
    time = parms.time[0];
    $("#time").val(time);
}catch(err)
{
    time = 15;
}
try{
    synch = parms.synch[0];
    if(synch== "false")
    $("#synch").attr( 'checked', false )
}catch(err)
{
    synch = true;
}
$("#showKlasa").on("click",()=>{
    $("#klasyB").toggleClass("disable");
    if($("#showKlasa").hasClass('up'))
    {
        $("#showKlasa").removeClass("up");
        $("#showKlasa").toggleClass("down");
    }else{
        $("#showKlasa").removeClass("down");
        $("#showKlasa").toggleClass("up");
    }
})
$("#showOpcje").on("click",()=>{
    $("#opcjeB").toggleClass("disable");
    if($("#showOpcje").hasClass('up'))
    {
        $("#showOpcje").removeClass("up");
        $("#showOpcje").toggleClass("down");
    }else{
        $("#showOpcje").removeClass("down");
        $("#showOpcje").toggleClass("up");
    }
});
$("#showTest").on("click",()=>{
    $("#testyB").toggleClass("disable");
    if($("#showTest").hasClass('up'))
    {
        $("#showTest").removeClass("up");
        $("#showTest").toggleClass("down");
    }else{
        $("#showTest").removeClass("down");
        $("#showTest").toggleClass("up");
    }
});
$("#zmianaS").on("click",()=>{
    let a = -1;
    let query = "/egzamin?";
if(klasa_id!=null)
{
    if(++a==0)
    query+="klasa_id="+klasa_id;
    else
    query+="&klasa_id="+klasa_id;
}
if(test_id!=null)
{
    if(++a==0)
    query+="test_id="+test_id;
    else
    query+="&test_id="+test_id;
}
if(savW!=null)
{
    if(++a==0)
    query+="savW="+$("#saveW").is(":checked");
    else
    query+="&savW="+$("#saveW").is(":checked");
}else{
    if(++a==0)
    query+="savW="+$("#saveW").is(":checked");
    else
    query+="&savW="+$("#saveW").is(":checked");
}
if(goscT!=null)
{
    if(++a==0)
    query+="goscT="+$("#goscT").is(":checked");
    else
    query+="&goscT="+$("#goscT").is(":checked");
}else{
 if(++a==0)
    query+="goscT="+$("#goscT").is(":checked");
    else
    query+="&goscT="+$("#goscT").is(":checked");
}
if(synch!=null)
{
    if(++a==0)
    query+="synch="+$("#synch").prop( "checked" );
    else
    query+="&synch="+$("#synch").prop( "checked" );
}else
{
    if(++a==0)
    query+="synch="+$("#synch").prop( "checked" );
    else
    query+="&synch="+$("#synch").prop( "checked" );
}
if(ilosc_pytan!=null)
{
    if(++a==0)
    query+="ilosc_pytan="+$("#opcje").val();
    else
    query+="&ilosc_pytan="+$("#opcje").val();
}else
{
    if(++a==0)
    query+="ilosc_pytan="+$("#opcje").val();
    else
    query+="&ilosc_pytan="+$("#opcje").val();
}
if(time!=null)
{
    if(++a==0)
    query+="time="+$("#time").val();
    else
    query+="&time="+$("#time").val();
}else
{
    if(++a==0)
    query+="time="+$("#time").val();
    else
    query+="&time="+$("#time").val();
}

window.location.href = query;
});
loadData();
function loadData()
{
    $.post( "/testy/showTable", {},function(data,status){
        //console.log(data.length);
        $("#testTable").html("");
        let tekst = "";
        for(let a = 0;a<data.length;a++)
        {
            let datae = new Date(data[a].data)
            let g = "";
            if(datae.getDate()<10)
            g+="0"+datae.getDate()+"-";
            else
            g+=datae.getDate()+"-";

        if(datae.getMonth()+1<10)
        g+="0"+(datae.getMonth()+1)+"-";
        else
        g+=datae.getMonth()+1+"-";

      g += datae.getFullYear();
        if((test_id==data[a].id)&&(test_id != null))
        {
        tekst+="<tr class='select just'>";
        $("#selectT").html("(Wybrano)");
        $("#testyB").toggleClass("disable");
    if($("#showTest").hasClass('up'))
    {
        $("#showTest").removeClass("up");
        $("#showTest").toggleClass("down");
    }else{
        $("#showTest").removeClass("down");
        $("#showTest").toggleClass("up");
    }
        }
        else
        tekst+="<tr>"
        tekst+="<td style='text-align:center;'>"+(a+1)+".</td><td>"+data[a].nazwa+"</td><td>"+data[a].iloscPytan+"</td><td>"+data[a].klasa+"</td><td style='text-align:center;'>"+g+"</td><td>"+
        '<div style="margin-left:0;"><button id="dellB'+a+'" class="button_to_do dellTest" name="'+data[a].id+'" style="float: left; ">Wybierz test</button></div>'+"</td></tr>";
        if((test_id==data[a].id)&&(test_id != null))
        {
            let q = "";
            let max;
            for(let b = 1;b<=data[a].iloscPytan;b++)
            {
                q+="<option>"+b+"</option>";
                max = b;
            }
            

            $("#opcje").html(q);
            if(ilosc_pytan!=null)
            $("#opcje").val(ilosc_pytan);
            else
            $("#opcje").val(max);
        }
        }
        
        $("#testTable").html(tekst);
        przyciskiT();
    }).then(()=>{
        let tekst2 = "";
    $("#klasaTable").html("");
    $.post("/klasa/get/klasy",{},(data,status)=>{
        for(let a =0;a<data.length;a++)
        {let datae = new Date(data[a].data)
            let g = "";
            if(datae.getDate()<10)
            g+="0"+datae.getDate()+"-";
            else
            g+=datae.getDate()+"-";

        if(datae.getMonth()+1<10)
        g+="0"+(datae.getMonth()+1)+"-";
        else
        g+=datae.getMonth()+"-";
         g += datae.getFullYear();
         let c = "";
            if((klasa_id == data[a].id)&&(klasa_id != null))
            {
            c += "<tr class='select just'>";
            $("#klasyB").toggleClass("disable");
            $("#selectK").html("(Wybrano)");
            if($("#showKlasa").hasClass('up'))
            {
                $("#showKlasa").removeClass("up");
                $("#showKlasa").toggleClass("down");
            }else{
                $("#showKlasa").removeClass("down");
                $("#showKlasa").toggleClass("up");
            }
            }
            else
            c+="<tr>";
            c+="<td style='text-align:center;'>"+(a+1)+".</td>";
            c+="<td>"+data[a].nazwa+"</td>";
            c+="<td>"+data[a].ile_Uczni+"</td>";
            c+="<td style='text-align:center;'>"+g+"</td>";
            c+='<td><div style="margin-left:0;"><button id="dellB'+a+'" class="button_to_do dellTest" name="'+data[a].id+'" style="float: left; ">Wybierz klase</button></div></td>';
            c+="</tr>"
            tekst2 +=c;
        }
        $("#klasaTable").html(tekst2);
        przyciskiK();
        if(test_id==null)
        {
            $("#opcjeB").toggleClass("disable");
    if($("#showOpcje").hasClass('up'))
    {
        $("#showOpcje").removeClass("up");
        $("#showOpcje").toggleClass("down");
    }else{
        $("#showOpcje").removeClass("down");
        $("#showOpcje").toggleClass("up");
    }
        }

    })
    })
    
}
function przyciskiT()
{
    let przyciski = document.getElementById("testTable").getElementsByClassName("dellTest");
    for(let a = 0; a<przyciski.length;a++)
    {
        przyciski[a].addEventListener("click",function(event){
            sleectT(event.target.getAttribute("name"));
        });
    }
}
function przyciskiK()
{
    let przyciski = document.getElementById("klasaTable").getElementsByClassName("dellTest");
    for(let a = 0; a<przyciski.length;a++)
    {
        przyciski[a].addEventListener("click",function(event){
            sleectK(event.target.getAttribute("name"));
        });
    }
}
function sleectT(idT)
{
    let a = -1;
    let query = "/egzamin?";
    if(klasa_id!=null)
    {
        if(++a==0)
        query+="klasa_id="+klasa_id;
        else
        query+="&klasa_id="+klasa_id;
    }
    
        if(++a==0)
        query+="test_id="+idT;
        else
        query+="&test_id="+idT;
    
   
    if(savW!=null)
    {
        if(++a==0)
        query+="savW="+savW;
        else
        query+="&savW="+savW;
    }
    if(goscT!=null)
    {
        if(++a==0)
        query+="goscT="+goscT;
        else
        query+="&goscT="+goscT;
    }
    if(synch!=null)
    {
        if(++a==0)
        query+="synch="+synch;
        else
        query+="&synch="+synch;
    }
    if(time!=null)
    {
        if(++a==0)
        query+="time="+time;
        else
        query+="&time="+time;
    }
    if(ilosc_pytan!=null)
    {
        if(++a==0)
        query+="ilosc_pytan="+ilosc_pytan;
        else
        query+="&ilosc_pytan="+ilosc_pytan;
    }
    window.location.href = query;
    
}
function sleectK(idK)
{
    let a = -1;
    let query = "/egzamin?";
    
        if(++a==0)
        query+="klasa_id="+idK;
        else
        query+="&klasa_id="+idK;
    
    if(test_id!=null)
    {
        if(++a==0)
        query+="test_id="+test_id;
        else
        query+="&test_id="+test_id;
    }
    
    if(savW!=null)
    {
        if(++a==0)
        query+="savW="+savW;
        else
        query+="&savW="+savW;
    }
    if(goscT!=null)
    {
        if(++a==0)
        query+="goscT="+goscT;
        else
        query+="&goscT="+goscT;
    }
    if(synch!=null)
    {
        if(++a==0)
        query+="synch="+synch;
        else
        query+="&synch="+synch;
    }
    if(time!=null)
    {
        if(++a==0)
        query+="time="+time;
        else
        query+="&time="+time;
    }
    if(ilosc_pytan!=null)
    {
        if(++a==0)
        query+="ilosc_pytan="+ilosc_pytan;
        else
        query+="&ilosc_pytan="+ilosc_pytan;
    }
    window.location.href = query;
    
}
$("#start").on("click",()=>{
if((test_id!=null)&&(klasa_id!=null)&&(ilosc_pytan!=null)&&(savW!=null)&&(goscT!=null)&&(synch!=null)&&(time!=null))
{
    
   $.post("/egzamin/set",{test_id: test_id, klasa_id: klasa_id,ilosc_pytan:ilosc_pytan,savW:savW,goscT:goscT,synch:synch,time:time},(datat)=>{
       if(datat.status == "true")
       {
            window.location.href = "/egzamin/widok/wszystkie";
       }else{
           alert("Coś poszło nie tak!");
       }
   }) 
}else{
    console.log("Error");
}
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