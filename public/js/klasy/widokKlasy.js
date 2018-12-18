window.onload = ()=>{
let url = parseURLParams(window.location.href);
const id = parseInt(url.id);
const tabela = document.getElementById("testTable");
$.post("/klasa/szukaj/id",{id:id},(data,status)=>{
$("#nazwaKlasy").text(data[0].nazwa)
$("#iloscUczniow").text(data[0].ile_Uczni)
});
$("#addUczen").on("click",()=>{
window.location.href = "/uczen/add/uczen?id="+id;
});

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